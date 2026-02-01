import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Utensils } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

export const TrendingDishCard = memo(() => {
  const { colors } = useTheme();
  return (
    <GlassView style={styles.dishCard} intensity={60} borderRadius={28}>
      <View style={styles.dishContent}>
          <View style={[styles.dishBadge, { backgroundColor: colors.primary + '20' }]}>
              <Text style={[styles.dishBadgeText, { color: colors.primary }]}>TOP #1</Text>
          </View>
          <Text style={[styles.dishTitle, { color: colors.text }]}>Couscous Bel 7out</Text>
          <Text style={[styles.dishDesc, { color: colors.textSecondary }]}>Bnin w s7i, ama kather m'lkhodhra!</Text>
      </View>
      <View style={[styles.dishIconBox, { borderColor: colors.glassBorder }]}>
          <Utensils size={32} color={colors.text} />
      </View>
    </GlassView>
  );
});

const styles = StyleSheet.create({
  dishCard: { padding: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dishContent: { flex: 1, paddingRight: 16 },
  dishBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, marginBottom: 10 },
  dishBadgeText: { fontSize: 11, fontWeight: '900' },
  dishTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  dishDesc: { fontSize: 13, lineHeight: 18 },
  dishIconBox: { width: 72, height: 72, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
});
