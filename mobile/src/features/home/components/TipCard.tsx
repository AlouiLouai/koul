import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

export const TipCard = memo(() => {
  const { colors } = useTheme();
  return (
    <GlassView style={styles.tipCard} intensity={45} borderRadius={28}>
      <View style={[styles.glowBlob, { backgroundColor: colors.warning }]} />
      <View style={[styles.ribbon, { backgroundColor: colors.warning }]} />
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={[styles.miniIcon, { backgroundColor: colors.warning + '20' }]}>
            <Lightbulb size={12} color={colors.warning} fill={colors.warning} />
          </View>
          <Text style={[styles.tagText, { color: colors.warning }]}>KLEM KBAR</Text>
        </View>
        <View style={[styles.tipBadge, { backgroundColor: colors.warning + '18', borderColor: colors.warning + '60' }]}>
          <Text style={[styles.tipBadgeText, { color: colors.warning }]}>HIKMA</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.tipText, { color: colors.textSecondary }]} numberOfLines={4}>
          "El zit zitouna dhheb, ama mgharfa barka tekfi! Ma tgharraghach. 🫒"
        </Text>
      </View>
    </GlassView>
  );
});

const styles = StyleSheet.create({
  tipCard: { padding: 16, height: 148, justifyContent: 'space-between' },
  glowBlob: { position: 'absolute', right: -26, top: -18, width: 110, height: 110, borderRadius: 55, opacity: 0.18 },
  ribbon: { position: 'absolute', left: 0, top: 16, width: 4, height: 44, borderRadius: 3 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  miniIcon: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tagText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  tipBadge: { borderWidth: 1, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999 },
  tipBadgeText: { fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  content: { flex: 1, justifyContent: 'center' },
  tipText: { fontSize: 13, fontWeight: '800', lineHeight: 18, fontStyle: 'italic' },
});