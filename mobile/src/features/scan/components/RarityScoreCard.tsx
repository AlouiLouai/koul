import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Activity, AlertTriangle, Crown, Star, Trophy } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

interface RarityScoreCardProps {
  score: number;
  calories: number;
  verdict: string;
}

const getRarityConfig = (score: number) => {
  if (score >= 9) return {
    type: 'LEGENDARY',
    label: 'MEKLET MLOUK 👑',
    color: '#fbbf24',
    icon: Crown,
    bgTint: 'rgba(251, 191, 36, 0.15)',
    border: '#fcd34d',
    xp: '+150 XP'
  };
  if (score >= 7.5) return {
    type: 'EPIC',
    label: 'BENNA SAFIA 🇹🇳',
    color: '#a855f7',
    icon: Trophy,
    bgTint: 'rgba(168, 85, 247, 0.15)',
    border: '#c084fc',
    xp: '+100 XP'
  };
  if (score >= 5.5) return {
    type: 'RARE',
    label: 'MECHI ROU7EK 🌥️',
    color: '#3b82f6',
    icon: Star,
    bgTint: 'rgba(59, 130, 246, 0.15)',
    border: '#60a5fa',
    xp: '+50 XP'
  };
  if (score >= 4) return {
    type: 'COMMON',
    label: '3LA GADOU 😐',
    color: '#71717a',
    icon: Activity,
    bgTint: 'rgba(113, 113, 122, 0.1)',
    border: '#a1a1aa',
    xp: '+20 XP'
  };
  return {
    type: 'POOR',
    label: 'KARTHA 🚨',
    color: '#ef4444',
    icon: AlertTriangle,
    bgTint: 'rgba(239, 68, 68, 0.15)',
    border: '#f87171',
    xp: '+5 XP'
  };
};

export const RarityScoreCard = ({ score, calories, verdict }: RarityScoreCardProps) => {
  const { colors, mode } = useTheme();
  const rarity = getRarityConfig(score);
  const RarityIcon = rarity.icon;
  
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
        Animated.sequence([
            Animated.timing(glowAnim, { toValue: 1, duration: 1000, useNativeDriver: false }),
            Animated.timing(glowAnim, { toValue: 0, duration: 1000, useNativeDriver: false })
        ])
    ).start();
  }, []);

  const animatedGlow = glowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
        mode === 'dark' ? 'rgba(56, 189, 248, 0.05)' : 'rgba(37, 99, 235, 0.05)',
        rarity.bgTint,
        mode === 'dark' ? 'rgba(251, 113, 133, 0.1)' : 'rgba(225, 29, 72, 0.1)'
    ]
  });

  return (
    <GlassView 
      intensity={30} 
      borderRadius={32}
      style={[
        styles.card, 
        { borderColor: rarity.color + '80', backgroundColor: mode === 'dark' ? 'rgba(0,0,0,0.6)' : '#fff' }
      ]}
    >
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: animatedGlow, borderRadius: 32 }]} />
        
        <View style={styles.header}>
            <View style={[styles.badge, { backgroundColor: rarity.bgTint, borderColor: rarity.color + '40' }]}>
                <RarityIcon size={14} color={rarity.color} fill={rarity.type === 'LEGENDARY' ? rarity.color : 'none'} />
                <Text style={[styles.badgeText, { color: rarity.color }]}>{rarity.label}</Text>
            </View>
        </View>

        <View style={styles.mainInfo}>
            <View style={styles.scoreSection}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>KCAL TOTAL</Text>
                <Text style={[styles.scoreNum, { color: colors.text }]}>{calories}</Text>
            </View>
            
            <View style={styles.verdictCol}>
                <View style={styles.verdictHeader}>
                    <Text style={[styles.label, { color: colors.textSecondary }]}>EL 7OKM</Text>
                </View>
                <Text style={[styles.verdictText, { color: colors.text }]} numberOfLines={3}>
                    "{verdict}"
                </Text>
            </View>
        </View>
    </GlassView>
  );
};

const styles = StyleSheet.create({
    card: { padding: 20, marginBottom: 16, borderWidth: 2, overflow: 'hidden' },
    header: { flexDirection: 'row', marginBottom: 16, zIndex: 10 },
    badge: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
    badgeText: { fontSize: 11, fontWeight: '900', letterSpacing: 1 },
    mainInfo: { flexDirection: 'row', alignItems: 'center', gap: 20, zIndex: 10 },
    scoreSection: { minWidth: 80 },
    scoreNum: { fontSize: 40, fontWeight: '900', letterSpacing: -1, lineHeight: 44 },
    label: { fontSize: 9, fontWeight: '900', letterSpacing: 1.2, marginBottom: 4 },
    verdictCol: { flex: 1, paddingLeft: 20, borderLeftWidth: 1, borderLeftColor: 'rgba(150,150,150,0.2)', gap: 2 },
    verdictHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    verdictText: { fontSize: 14, fontWeight: '700', fontStyle: 'italic', lineHeight: 20 }
});