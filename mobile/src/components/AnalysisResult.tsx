import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Zap, Flame, Wheat, Droplets, Sparkles, AlertTriangle, ThumbsUp, Activity, Gauge, Volume2, Star, Trophy, Crown } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import { GlassView } from './GlassView';
import { useTheme } from '../theme/ThemeContext';
import type { AnalysisResponse } from '../types';

interface AnalysisResultProps {
  data: AnalysisResponse;
}

// --- Rarity Logic ---
type Rarity = 'LEGENDARY' | 'EPIC' | 'RARE' | 'COMMON' | 'POOR';

const getRarityConfig = (score: number, colors: any) => {
  if (score >= 9) return {
    type: 'LEGENDARY',
    label: 'OSTOURA (Legendary)',
    color: '#fbbf24', // Amber/Gold
    glow: '#f59e0b',
    icon: Crown,
    bgTint: 'rgba(251, 191, 36, 0.15)',
    border: '#fcd34d'
  };
  if (score >= 7.5) return {
    type: 'EPIC',
    label: 'TAYARA (Epic)',
    color: '#a855f7', // Purple
    glow: '#9333ea',
    icon: Trophy,
    bgTint: 'rgba(168, 85, 247, 0.15)',
    border: '#c084fc'
  };
  if (score >= 5.5) return {
    type: 'RARE',
    label: 'BEHI (Rare)',
    color: '#3b82f6', // Blue
    glow: '#2563eb',
    icon: Star,
    bgTint: 'rgba(59, 130, 246, 0.15)',
    border: '#60a5fa'
  };
  if (score >= 4) return {
    type: 'COMMON',
    label: '3ADI (Common)',
    color: '#71717a', // Zinc
    glow: '#52525b',
    icon: Activity,
    bgTint: 'rgba(113, 113, 122, 0.1)',
    border: '#a1a1aa'
  };
  return {
    type: 'POOR',
    label: 'KARTHA (Poor)',
    color: '#ef4444', // Red
    glow: '#dc2626',
    icon: AlertTriangle,
    bgTint: 'rgba(239, 68, 68, 0.15)',
    border: '#f87171'
  };
};

const MacroCard = ({ label, value, unit, color, icon: Icon }: any) => {
  const { colors } = useTheme();
  return (
    <GlassView style={styles.macroCard} intensity={30} borderRadius={24}>
      <View style={[styles.macroIconBg, { backgroundColor: color.bg + '30' }]}>
        <Icon size={16} color={color.text} strokeWidth={2.5} />
      </View>
      <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>{label}</Text>
      <View>
        <Text style={[styles.macroValue, { color: colors.text }]}>{value}</Text>
        <Text style={[styles.macroUnit, { color: colors.textSecondary }]}>{unit}</Text>
      </View>
    </GlassView>
  );
};

export default function AnalysisResult({ data }: AnalysisResultProps) {
  const { colors, mode } = useTheme();
  const score = data.health_score ?? 0;
  const rarity = getRarityConfig(score, colors);
  const RarityIcon = rarity.icon;

  // Animation for the "Stamp" effect
  const stampScale = useRef(new Animated.Value(2)).current;
  const stampOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(stampScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(stampOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Tounsi Personality Logic (Verdict)
  const getDerjaVerdict = (d: AnalysisResponse['totals'], s: number) => {
    if (s >= 9) return "Ya m3allem! Hédhi mekla thez biha l'coupe 🏆";
    if (s >= 7) return "Sa7a! Mekla ndhifa w mawzouna.";
    if (d.fat > 30) return "Rod belek mel zit! T9oul mekel 'Briket' 🛢️";
    if (d.calories > 1000) return "Ouh! Hédhi 'Bomb' calorique. A3mel jarriye mba3ed 🏃";
    return "Mouch khayeb, ama rod belek 3la sa7tek.";
  };
  const verdictText = getDerjaVerdict(data.totals, score);

  const handleSpeak = () => {
    Speech.speak(verdictText, { language: 'fr-FR' }); // Adjust locale if Tounsi TTS available
  };

  return (
    <View style={styles.container}>
      
      {/* --- GAMIFIED RARITY CARD --- */}
      <View style={styles.rarityContainer}>
        <GlassView 
          style={[
            styles.rarityCard, 
            { borderColor: rarity.border, backgroundColor: mode === 'dark' ? '#00000060' : '#ffffff80' }
          ]} 
          intensity={60} 
          borderRadius={32}
          noBorder
        >
            {/* Rarity Header */}
            <View style={[styles.rarityHeader, { backgroundColor: rarity.bgTint, borderColor: rarity.border }]}>
                <RarityIcon size={16} color={rarity.color} fill={rarity.type === 'LEGENDARY' ? rarity.color : 'transparent'} />
                <Text style={[styles.rarityTitle, { color: rarity.color }]}>{rarity.label}</Text>
            </View>

            {/* Score & Stamp */}
            <View style={styles.scoreSection}>
                <View>
                   <Text style={[styles.totalCals, { color: colors.text }]}>{data.totals.calories}</Text>
                   <Text style={[styles.calsLabel, { color: colors.textSecondary }]}>KCAL TOTAL</Text>
                </View>
                
                <Animated.View style={[styles.stampContainer, { transform: [{ scale: stampScale }], opacity: stampOpacity, borderColor: rarity.color }]}>
                    <Text style={[styles.stampScore, { color: rarity.color }]}>{score}</Text>
                    <Text style={[styles.stampMax, { color: rarity.color }]}>/10</Text>
                </Animated.View>
            </View>

            {/* Verdict */}
            <View style={[styles.verdictBox, { backgroundColor: colors.background[0] + '80' }]}>
               <View style={styles.verdictTop}>
                  <Text style={[styles.verdictLabel, { color: colors.textSecondary }]}>EL 7OKM (VERDICT)</Text>
                  <TouchableOpacity onPress={handleSpeak}>
                    <Volume2 size={16} color={colors.primary} />
                  </TouchableOpacity>
               </View>
               <Text style={[styles.verdictText, { color: colors.text }]}>"{verdictText}"</Text>
            </View>
        </GlassView>
        
        {/* Glow Effect behind card */}
        <View style={[styles.cardGlow, { backgroundColor: rarity.glow }]} />
      </View>

      {/* --- MACRO BENTO GRID --- */}
      <View style={styles.gridContainer}>
        <MacroCard 
            label="Protéine" 
            value={data.totals.protein} 
            unit="g" 
            color={{ bg: colors.primary, text: colors.primary }} 
            icon={Flame} 
        />
        <MacroCard 
            label="Carbs" 
            value={data.totals.carbs} 
            unit="g" 
            color={{ bg: colors.success, text: colors.success }} 
            icon={Wheat} 
        />
        <MacroCard 
            label="Dhoune" 
            value={data.totals.fat} 
            unit="g" 
            color={{ bg: colors.warning, text: colors.warning }} 
            icon={Droplets} 
        />
      </View>

      {/* --- AI CHEF INSIGHT --- */}
      {data.reasoning_log ? (
        <GlassView style={[styles.insightCard, { borderColor: '#8b5cf6' }]} intensity={30} borderRadius={24}>
          <View style={styles.insightHeader}>
              <Sparkles size={16} color="#8b5cf6" fill="#8b5cf6" />
              <Text style={styles.insightTitle}>T7lil l'Chef (AI Insight)</Text>
          </View>
          <Text style={[styles.insightText, { color: colors.text }]}>
              {data.reasoning_log}
          </Text>
        </GlassView>
      ) : null}

      {/* --- MEAL BREAKDOWN --- */}
      <View style={styles.listContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Mkawnet l'Sa7n</Text>
        <View style={styles.list}>
            {data.meal_analysis.map((item, idx) => (
                <GlassView key={idx} style={styles.itemCard} intensity={40} borderRadius={20}>
                    <View style={styles.itemRow}>
                        <View style={[styles.dot, { backgroundColor: colors.success }]} />
                        <Text style={[styles.itemName, { color: colors.text }]}>{item.item}</Text>
                        <Text style={[styles.itemCals, { color: colors.textSecondary }]}>{item.calories} kcal</Text>
                    </View>
                    <Text style={[styles.itemPortion, { color: colors.textSecondary }]}>
                       {item.portion_estimate} ({item.mass_g}g)
                    </Text>
                </GlassView>
            ))}
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    marginTop: 10,
  },
  // Rarity Card Styles
  rarityContainer: {
    position: 'relative',
    marginBottom: 24,
    marginHorizontal: 4,
  },
  cardGlow: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: -10,
    borderRadius: 40,
    opacity: 0.25,
    zIndex: -1,
  },
  rarityCard: {
    padding: 24,
    borderWidth: 2,
    overflow: 'hidden',
  },
  rarityHeader: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  rarityTitle: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  totalCals: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -2,
    lineHeight: 48,
  },
  calsLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  stampContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-15deg' }],
  },
  stampScore: {
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 32,
  },
  stampMax: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  verdictBox: {
    padding: 16,
    borderRadius: 16,
  },
  verdictTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  verdictLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  verdictText: {
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'italic',
  },

  // Macro Grid
  gridContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  macroCard: {
    flex: 1,
    padding: 16,
    height: 110,
    justifyContent: 'space-between',
  },
  macroIconBg: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  macroValue: {
    fontSize: 20,
    fontWeight: '900',
  },
  macroUnit: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  // Insight
  insightCard: {
    padding: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#7c3aed',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  insightText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
  },

  // List
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  list: {
    gap: 12,
  },
  itemCard: {
    padding: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  itemCals: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  itemPortion: {
    fontSize: 12,
    paddingLeft: 16,
  },
  listContainer: {},
});