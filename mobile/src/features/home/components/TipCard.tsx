import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

export const TipCard = memo(() => {
  const { colors } = useTheme();
  return (
    <GlassView style={styles.tipCard} intensity={40} borderRadius={28}>
      <View style={styles.tipHeader}>
        <View style={[styles.tipIconBox, { backgroundColor: colors.warning + '20' }]}>
          <Lightbulb size={18} color={colors.warning} fill={colors.warning} />
        </View>
        <Text style={[styles.tipTitle, { color: colors.text }]}>Nasi7a</Text>
      </View>
      <Text style={[styles.tipText, { color: colors.textSecondary }]} numberOfLines={3}>
        "Zit zitouna behi, ama rod belek mel quantité!"
      </Text>
    </GlassView>
  );
});

const styles = StyleSheet.create({
  tipCard: { padding: 16, height: 148, justifyContent: 'center' },
  tipHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  tipIconBox: { padding: 8, borderRadius: 12 },
  tipTitle: { fontSize: 14, fontWeight: '900' },
  tipText: { fontSize: 11, fontWeight: '600', lineHeight: 15 },
});
