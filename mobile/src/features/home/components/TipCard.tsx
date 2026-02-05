import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

export const TipCard = memo(() => {
  const { colors } = useTheme();
  return (
    <GlassView style={styles.tipCard} intensity={40} borderRadius={28}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={[styles.miniIcon, { backgroundColor: colors.warning + '20' }]}>
            <Lightbulb size={12} color={colors.warning} fill={colors.warning} />
          </View>
          <Text style={[styles.tagText, { color: colors.warning }]}>KLEM KBAR</Text>
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
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  miniIcon: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tagText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  content: { flex: 1, justifyContent: 'center' },
  tipText: { fontSize: 13, fontWeight: '700', lineHeight: 18, fontStyle: 'italic' },
});
