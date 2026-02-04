import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Flame, Wheat, Droplets, Sparkles, AlertTriangle, Activity, Star, Trophy, Crown, Leaf, Dumbbell, Scale, Heart, ChevronDown, ChevronUp } from 'lucide-react-native';
import { GlassView } from './GlassView';
import { useTheme } from '../theme/ThemeContext';
import type { AnalysisResponse } from '../types';

interface AnalysisResultProps {
  data: AnalysisResponse;
}

// --- Rarity Logic ---
const getRarityConfig = (score: number) => {
  if (score >= 9) return {
    type: 'LEGENDARY',
    label: 'MEKLET MLOUK 👑',
    color: '#fbbf24',
    glow: '#f59e0b',
    icon: Crown,
    bgTint: 'rgba(251, 191, 36, 0.15)',
    border: '#fcd34d'
  };
  if (score >= 7.5) return {
    type: 'EPIC',
    label: 'BENNA SAFIA 🇹🇳',
    color: '#a855f7',
    glow: '#9333ea',
    icon: Trophy,
    bgTint: 'rgba(168, 85, 247, 0.15)',
    border: '#c084fc'
  };
  if (score >= 5.5) return {
    type: 'RARE',
    label: 'MECHI ROU7EK 🌥️',
    color: '#3b82f6',
    glow: '#2563eb',
    icon: Star,
    bgTint: 'rgba(59, 130, 246, 0.15)',
    border: '#60a5fa'
  };
  if (score >= 4) return {
    type: 'COMMON',
    label: '3LA GADOU 😐',
    color: '#71717a',
    glow: '#52525b',
    icon: Activity,
    bgTint: 'rgba(113, 113, 122, 0.1)',
    border: '#a1a1aa'
  };
  return {
    type: 'POOR',
    label: 'KARTHA 🚨',
    color: '#ef4444',
    glow: '#dc2626',
    icon: AlertTriangle,
    bgTint: 'rgba(239, 68, 68, 0.15)',
    border: '#f87171'
  };
};

const MacroCard = ({ label, value, unit, color, icon: Icon }: any) => {
  const { colors } = useTheme();
  return (
    <GlassView style={styles.macroCard} intensity={30} borderRadius={24} noBorder={false}>
      <View style={[styles.macroIconBg, { backgroundColor: color.bg + '30' }]}>
        <Icon size={16} color={color.text} strokeWidth={2.5} />
      </View>
      <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>{label}</Text>
      <View>
        <Text style={[styles.macroValue, { color: colors.text }]}>
            {value}<Text style={{ fontSize: 12, fontWeight: '600', color: colors.textSecondary }}>{unit}</Text>
        </Text>
      </View>
    </GlassView>
  );
};

const getGoalColor = (level: string | undefined, colors: any) => {
  switch (level?.toLowerCase()) {
    case 'high': return colors.success;
    case 'medium': return colors.warning;
    case 'low': return colors.error;
    default: return colors.textSecondary;
  }
};

export default function AnalysisResult({ data }: AnalysisResultProps) {
  const { colors, mode } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const score = data.health_score ?? 0;
  const rarity = getRarityConfig(score);
  const RarityIcon = rarity.icon;

  const visibleItems = expanded ? data.meal_analysis : data.meal_analysis.slice(0, 2);
  const hasMore = data.meal_analysis.length > 2;

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

  const getDerjaVerdict = (d: AnalysisResponse['totals'], s: number) => {
    if (s >= 9) return "W7ach protein! 💪 Hédhi mekla thez biha l'coupe 🏆";
    if (s >= 7) return "Sa7a! Mekla ndhifa, w mouch mcharwtra b'zit.";
    if (d.fat > 30) return "Rod belek mel zit! T9oul mekel 'Brik' 3la sbe7 🛢️";
    if (d.calories > 1000) return "Ouh! Hédhi 'Bomb' calorique... Barcha 3jin (Mlewi/Chapati?) 🥖";
    return "Mouch khayeb, ama rod belek 3la sa7tek. Na9es khobz!";
  };
  const verdictText = getDerjaVerdict(data.totals, score);

  return (
    <View style={styles.container}>
      <View style={styles.rarityContainer}>
        <GlassView 
          style={[
            styles.rarityCard, 
            { borderColor: rarity.border, backgroundColor: mode === 'dark' ? '#00000060' : '#ffffff80' }
          ]} 
          intensity={60} 
          borderRadius={32}
          noBorder={true}
        >
            <View style={[styles.rarityHeader, { backgroundColor: rarity.bgTint, borderColor: rarity.border }]}>
                <RarityIcon size={16} color={rarity.color} fill={rarity.type === 'LEGENDARY' ? rarity.color : 'none'} />
                <Text style={[styles.rarityTitle, { color: rarity.color }]}>{rarity.label}</Text>
            </View>

            <View style={styles.scoreSection}>
                <View>
                   <Text style={[styles.calsLabel, { color: colors.textSecondary }]}>KCAL TOTAL</Text>
                   <Text style={[styles.totalCals, { color: colors.text }]}>{data.totals.calories}</Text>
                </View>
                
                <View style={styles.verdictInline}>
                    <Text style={[styles.verdictLabel, { color: colors.textSecondary }]}>EL 7OKM</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                       <Text style={[styles.verdictText, { color: colors.text, maxWidth: 160 }]} numberOfLines={3}>"{verdictText}"</Text>
                    </View>
                </View>
            </View>
        </GlassView>
        <View style={[styles.cardGlow, { backgroundColor: rarity.glow }]} />
      </View>

      <View style={styles.gridContainer}>
        <MacroCard 
            label="Protéine" 
            value={data.totals.protein.toFixed(1)} 
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

      {/* --- Oil Estimate --- */}
      {data.oil_estimate && (
        <GlassView style={[styles.oilCard, { borderColor: data.oil_estimate.calories > 200 ? colors.error : colors.warning }]} intensity={25} borderRadius={20} noBorder={false}>
            <View style={styles.oilHeader}>
                <Droplets size={16} color={data.oil_estimate.calories > 200 ? colors.error : colors.warning} fill={data.oil_estimate.calories > 200 ? colors.error : colors.warning} />
                <Text style={[styles.oilTitle, { color: colors.text }]}>Zit Mkhabbi (Hidden Oil)</Text>
            </View>
            <Text style={[styles.oilText, { color: colors.textSecondary }]}>
                Famma 7keyet <Text style={{fontWeight: 'bold', color: colors.text}}>{data.oil_estimate.amount_tbsp} mgharef</Text> ({data.oil_estimate.calories} kcal)
            </Text>
        </GlassView>
      )}

      {/* --- Goals --- */}
      {data.goals && (
        <View style={styles.goalsContainer}>
            <View style={[styles.goalBadge, { backgroundColor: getGoalColor(data.goals.weight_loss, colors) + '20' }]}>
                <Scale size={14} color={getGoalColor(data.goals.weight_loss, colors)} />
                <Text style={[styles.goalText, { color: getGoalColor(data.goals.weight_loss, colors) }]}>Tan9is</Text>
            </View>
            <View style={[styles.goalBadge, { backgroundColor: getGoalColor(data.goals.muscle_gain, colors) + '20' }]}>
                <Dumbbell size={14} color={getGoalColor(data.goals.muscle_gain, colors)} />
                <Text style={[styles.goalText, { color: getGoalColor(data.goals.muscle_gain, colors) }]}>Muscle</Text>
            </View>
            <View style={[styles.goalBadge, { backgroundColor: getGoalColor(data.goals.diabetes_friendly, colors) + '20' }]}>
                <Heart size={14} color={getGoalColor(data.goals.diabetes_friendly, colors)} />
                <Text style={[styles.goalText, { color: getGoalColor(data.goals.diabetes_friendly, colors) }]}>Sa77a</Text>
            </View>
        </View>
      )}

      {/* --- Ray Nutritionist Insight --- */}
      <GlassView style={[styles.insightCard, { borderColor: '#8b5cf6' }]} intensity={30} borderRadius={24} noBorder={false}>
        <View style={styles.insightHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Sparkles size={16} color="#8b5cf6" fill="#8b5cf6" />
                <Text style={styles.insightTitle}>Ray nutritionist:</Text>
            </View>
            <Text style={[styles.insightScoreText, { color: colors.text }]}>
                {data.health_score} / 10
            </Text>
        </View>
        <Text style={[styles.insightAdvice, { color: colors.textSecondary }]}>
            {data.health_score && data.health_score >= 8 ? "Bravo! Rak fi s7i7, kamel haka! 🌟" :
             data.health_score && data.health_score >= 5 ? "Mouch khayeb, ama rod belek mel quantité! ⚖️" :
             "Rod belek! Hédhi marra fil fal. 🚨"}
        </Text>
      </GlassView>

      <View style={styles.listContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Moukawinet Sa7n</Text>
        <View style={styles.list}>
            {visibleItems.map((item, idx) => (
                <GlassView key={idx} style={styles.itemCard} intensity={40} borderRadius={16} noBorder={false}>
                    {/* Header: Dot + Name */}
                    <View style={{flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 4}}>
                        <View style={[styles.dot, { backgroundColor: colors.primary, marginTop: 4 }]} />
                        <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={2}>{item.item}</Text>
                    </View>
                    
                    {/* Cals */}
                    <Text style={[styles.itemCals, { color: colors.text }]}>{item.calories} <Text style={{fontSize: 9, fontWeight: 'normal', color: colors.textSecondary}}>kcal</Text></Text>
                    
                    {/* Portion Info */}
                    <Text style={[styles.itemPortion, { color: colors.textSecondary }]} numberOfLines={1}>
                       {item.portion_estimate}
                    </Text>

                    {/* Detailed Item Macros */}
                    <View style={styles.itemMacrosGrid}>
                        <View style={styles.miniMacro}>
                            <Flame size={12} color={colors.primary} />
                            <Text style={[styles.miniMacroText, { color: colors.textSecondary }]}>{item.protein_g}g Protéine</Text>
                        </View>
                        <View style={styles.miniMacro}>
                            <Wheat size={12} color={colors.success} />
                            <Text style={[styles.miniMacroText, { color: colors.textSecondary }]}>{item.carbs_g}g Carbs</Text>
                        </View>
                        <View style={styles.miniMacro}>
                            <Droplets size={12} color={colors.warning} />
                            <Text style={[styles.miniMacroText, { color: colors.textSecondary }]}>{item.fat_g}g Dhoune</Text>
                        </View>
                        {item.fiber_g !== undefined && (
                            <View style={styles.miniMacro}>
                                <Leaf size={12} color="#10b981" />
                                <Text style={[styles.miniMacroText, { color: colors.textSecondary }]}>{item.fiber_g}g Fibres</Text>
                            </View>
                        )}
                    </View>
                </GlassView>
            ))}
        </View>
        
        {hasMore && (
            <TouchableOpacity 
                style={[styles.loadMoreBtn, { backgroundColor: colors.background[1] }]} 
                onPress={() => setExpanded(!expanded)}
            >
                <Text style={[styles.loadMoreText, { color: colors.textSecondary }]}>
                    {expanded ? "Na9es" : `Chouf akther (${data.meal_analysis.length - 2})`}
                </Text>
                {expanded ? <ChevronUp size={16} color={colors.textSecondary} /> : <ChevronDown size={16} color={colors.textSecondary} />}
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 40, marginTop: 10 },
  rarityContainer: { position: 'relative', marginBottom: 16, marginHorizontal: 4 },
  cardGlow: { position: 'absolute', top: 20, left: 20, right: 20, bottom: -10, borderRadius: 40, opacity: 0.25, zIndex: -1 },
  rarityCard: { padding: 16, borderWidth: 2, overflow: 'hidden' },
  rarityHeader: { flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, marginBottom: 16 },
  rarityTitle: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 },
  scoreSection: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 0 },
  totalCals: { fontSize: 42, fontWeight: '900', letterSpacing: -1, lineHeight: 42 },
  calsLabel: { fontSize: 10, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 2 },
  verdictInline: { flex: 1, paddingLeft: 16, borderLeftWidth: 1, borderLeftColor: 'rgba(150,150,150,0.2)', justifyContent: 'center', gap: 4 },
  verdictLabel: { fontSize: 9, fontWeight: 'bold', opacity: 0.7, textTransform: 'uppercase' },
  verdictText: { fontSize: 12, fontWeight: '600', fontStyle: 'italic', lineHeight: 16 },
  gridContainer: { flexDirection: 'row', gap: 8, marginBottom: 16, marginTop: 16 },
  macroCard: { flex: 1, padding: 12, height: 90, justifyContent: 'space-between' },
  macroIconBg: { position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  macroLabel: { fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5 },
  macroValue: { fontSize: 18, fontWeight: '900' },
  macroUnit: { fontSize: 9, fontWeight: 'bold' },
  oilCard: { padding: 12, borderWidth: 1, marginBottom: 12, borderStyle: 'dashed' },
  oilHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  oilTitle: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase' },
  oilText: { fontSize: 12, fontWeight: '500' },
  goalsContainer: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  goalBadge: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 8, borderRadius: 12 },
  goalText: { fontSize: 10, fontWeight: '900', textTransform: 'uppercase' },
  insightCard: { padding: 16, borderWidth: 1, marginBottom: 16 },
  insightHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  insightTitle: { fontSize: 10, fontWeight: '900', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1 },
  insightText: { fontSize: 12, fontWeight: '500', lineHeight: 18 },
  insightScoreText: { fontSize: 14, fontWeight: '900' },
  insightAdvice: { fontSize: 12, fontStyle: 'italic', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '900', marginBottom: 8, paddingHorizontal: 4 },
  list: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  itemCard: { width: '48%', padding: 12, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)' },
  itemRow: { flexDirection: 'column', alignItems: 'flex-start', marginBottom: 4 },
  dot: { width: 6, height: 6, borderRadius: 3, marginBottom: 4 },
  itemName: { fontSize: 13, fontWeight: 'bold', marginBottom: 2 },
  itemCals: { fontSize: 12, fontWeight: '900', color: '#f59e0b' },
  itemPortion: { fontSize: 10, marginBottom: 8, opacity: 0.8 },
  itemMacrosGrid: { flexDirection: 'column', gap: 4, marginTop: 4 },
  miniMacro: { flexDirection: 'row', alignItems: 'center', gap: 4, width: '100%' },
  miniMacroText: { fontSize: 10, fontWeight: '600' },
  loadMoreBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 12, marginTop: 16 },
  loadMoreText: { fontSize: 12, fontWeight: 'bold', marginRight: 6 },
  listContainer: {},
});
