import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';

interface OilEstimateProps {
  amount: number;
  calories: number;
}

export const OilEstimate = ({ amount, calories }: OilEstimateProps) => {
  const { colors } = useTheme();

  return (
    <GlassView intensity={25} borderRadius={20} style={[styles.container, { borderColor: calories > 200 ? colors.error : colors.warning }]}>
      <View style={styles.header}>
        <Flame size={16} color={calories > 200 ? colors.error : colors.warning} fill={calories > 200 ? colors.error : colors.warning} />
        <Text style={[styles.title, { color: colors.text }]}>Zit Mkhabbi (Hidden Oil)</Text>
      </View>
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        Famma 7keyet <Text style={[styles.highlight, { color: colors.text }]}>{amount} mgharef</Text> ({calories} kcal)
      </Text>
    </GlassView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, marginBottom: 12, borderStyle: 'dashed', borderWidth: 1.5 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  title: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 },
  message: { fontSize: 13, fontWeight: '600' },
  highlight: { fontWeight: '900' }
});