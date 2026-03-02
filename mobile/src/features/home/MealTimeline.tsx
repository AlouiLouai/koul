import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Camera, Image as ImageIcon } from 'lucide-react-native';
import { GlassView } from '@/components/GlassView';
import { useTheme } from '@/theme/ThemeContext';
import { useStatsStore } from '@/features/stats/useStatsStore';

export const MealTimeline = () => {
  const { colors } = useTheme();
  const { dailyScans } = useStatsStore();

  return (
    <GlassView style={styles.container} intensity={50} borderRadius={32}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Sa7ni l'Youm</Text>
        <View style={styles.badge}>
            <Text style={styles.badgeText}>{dailyScans} MEKLET</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {dailyScans > 0 ? (
          // Mocking visual items since we don't store photos in store yet
          [...Array(dailyScans)].map((_, i) => (
            <View key={i} style={[styles.mealItem, { backgroundColor: colors.primary + '10', borderColor: colors.glassBorder }]}>
               <ImageIcon size={20} color={colors.primary} opacity={0.5} />
               <Text style={[styles.mealLabel, { color: colors.textSecondary }]}>Wajba {i+1}</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Camera size={24} color={colors.textSecondary} opacity={0.3} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Ma scannit chay l'youm...</Text>
          </View>
        )}
      </ScrollView>
    </GlassView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, height: 170, justifyContent: 'space-between' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '900' },
  badge: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  badgeText: { fontSize: 10, fontWeight: '900', color: '#64748b' },
  scroll: { marginTop: 15 },
  mealItem: { width: 80, height: 80, borderRadius: 20, marginRight: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
  mealLabel: { fontSize: 9, fontWeight: '800' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', width: 140, gap: 8 },
  emptyText: { fontSize: 11, fontWeight: '700', textAlign: 'center' }
});