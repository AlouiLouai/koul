import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Utensils } from 'lucide-react-native';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';

export const TrendingDishCard = () => {
  const { colors } = useTheme();
  return (
    <GlassView style={styles.dishCard} intensity={60} borderRadius={28}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={[styles.miniIcon, { backgroundColor: colors.accent + '20' }]}>
            <Utensils size={12} color={colors.accent} />
          </View>
          <Text style={[styles.tagText, { color: colors.accent }]}>BNEEN 🔥</Text>
        </View>
      </View>

      <View style={styles.contentRow}>
        <View style={styles.dishContent}>
          <Text style={[styles.dishTitle, { color: colors.text }]}>Kafteji Royal 🌶️</Text>
          <Text style={[styles.dishDesc, { color: colors.textSecondary }]}>7ar w mcharwret, ama rod belek 3al zit!</Text>
        </View>
        <View style={[styles.dishIconBox, { borderColor: colors.glassBorder }]}>
          <Utensils size={28} color={colors.text} />
        </View>
      </View>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  dishCard: { padding: 16, justifyContent: 'space-between' },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  miniIcon: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tagText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  contentRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dishContent: { flex: 1, paddingRight: 12 },
  dishTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  dishDesc: { fontSize: 13, lineHeight: 18 },
  dishIconBox: { width: 60, height: 60, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
});