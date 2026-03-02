import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Utensils, Zap } from 'lucide-react-native';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';
import { useStatsStore } from '@/features/stats/useStatsStore';

export const TrendingDishCard = () => {
  const { colors } = useTheme();
  const { todayStats } = useStatsStore();

  const getSmartSuggestion = () => {
    if (todayStats.protein < 50) {
      return {
        title: "Kousksi l'7out 🐟",
        desc: "Na9sik protein! Kousksi l'7out m3abi bel Omega-3 w 50g protein.",
        tag: "HIGH PROTEIN",
        color: colors.primary
      };
    }
    if (todayStats.fat > 60) {
      return {
        title: "Slata Tounsiya 🥗",
        desc: "Barcha zit l'youm! Ghassil badnek b'slata ferchk w tharfa zit zitouna.",
        tag: "DETOX / LOW FAT",
        color: colors.success
      };
    }
    return {
      title: "Kafteji Royal 🌶️",
      desc: "7ar w mcharwret, ama rod belek mel zit! Mekla mte3 ra7a.",
      tag: "BNEEN 🔥",
      color: colors.accent
    };
  };

  const suggestion = getSmartSuggestion();

  return (
    <GlassView style={styles.dishCard} intensity={60} borderRadius={28}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={[styles.miniIcon, { backgroundColor: suggestion.color + '20' }]}>
            <Zap size={12} color={suggestion.color} fill={suggestion.color} />
          </View>
          <Text style={[styles.tagText, { color: suggestion.color }]}>YÉ-GUEDDIK (Smart Tip)</Text>
        </View>
      </View>

      <View style={styles.contentRow}>
        <View style={styles.dishContent}>
          <View style={styles.titleRow}>
            <Text style={[styles.dishTitle, { color: colors.text }]}>{suggestion.title}</Text>
            <View style={[styles.macroBadge, { backgroundColor: suggestion.color + '15' }]}>
               <Text style={[styles.macroBadgeText, { color: suggestion.color }]}>{suggestion.tag}</Text>
            </View>
          </View>
          <Text style={[styles.dishDesc, { color: colors.textSecondary }]}>{suggestion.desc}</Text>
        </View>
        <View style={[styles.dishIconBox, { borderColor: colors.glassBorder, backgroundColor: suggestion.color + '10' }]}>
          <Utensils size={28} color={suggestion.color} />
        </View>
      </View>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  dishCard: { padding: 16, paddingVertical: 20, justifyContent: 'space-between', borderLeftWidth: 4 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  miniIcon: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tagText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  contentRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dishContent: { flex: 1, paddingRight: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 6 },
  dishTitle: { fontSize: 18, fontWeight: '900' },
  macroBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  macroBadgeText: { fontSize: 9, fontWeight: '900' },
  dishDesc: { fontSize: 13, lineHeight: 18, fontWeight: '600', opacity: 0.8 },
  dishIconBox: { width: 60, height: 60, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
});