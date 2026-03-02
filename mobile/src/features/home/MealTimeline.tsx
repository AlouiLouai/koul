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
    <GlassView style={styles.container} intensity={40} borderRadius={24}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: colors.text }]}>Sa7ni l'Youm</Text>
          <Text style={[styles.subText, { color: colors.textSecondary }]}>Wajbetik tawwa</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>{dailyScans}</Text>
        </View>
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {dailyScans > 0 ? (
            [...Array(dailyScans)].map((_, i) => (
              <View key={i} style={[styles.mealItem, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }]}>
                 <View style={[styles.imagePlaceholder, { backgroundColor: colors.primary + '10' }]}>
                   <ImageIcon size={18} color={colors.primary} opacity={0.6} />
                 </View>
                 <Text style={[styles.mealLabel, { color: colors.textSecondary }]}>Wajba {i+1}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <View style={[styles.emptyIconBox, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                <Camera size={20} color={colors.textSecondary} opacity={0.3} />
              </View>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Ma scannit chay...</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </GlassView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, height: 180, justifyContent: 'space-between' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  titleSection: { gap: 2 },
  title: { fontSize: 13, fontWeight: '900', letterSpacing: 0.5 },
  subText: { fontSize: 10, fontWeight: '700', opacity: 0.5 },
  badge: { width: 24, height: 24, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 11, fontWeight: '900' },
  scrollContainer: { height: 95, marginTop: 10 },
  scrollContent: { alignItems: 'center' },
  mealItem: { width: 70, height: 90, borderRadius: 16, marginRight: 10, borderWidth: 1, padding: 8, alignItems: 'center', gap: 6 },
  imagePlaceholder: { width: 54, height: 54, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  mealLabel: { fontSize: 9, fontWeight: '800', opacity: 0.8 },
  emptyState: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingLeft: 4 },
  emptyIconBox: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 11, fontWeight: '700', opacity: 0.4 }
});