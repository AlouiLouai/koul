import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { GlassView } from '../../components/GlassView';

interface CircularProgressProps {
  label: string;
  value: number;
  total: number;
  unit: string;
  color: string;
}

const CircularProgress = ({ label, value, total, unit, color }: CircularProgressProps) => {
  const { colors } = useTheme();
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  // Calculate percentage, maxing at 100%
  const percentage = Math.min(value / total, 1);
  const strokeDashoffset = circumference - (percentage * circumference);

  return (
    <View style={styles.macroItem}>
      <View style={styles.svgWrapper}>
        <Svg width={size} height={size}>
          {/* Background Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.glassBorder}
            strokeWidth={strokeWidth}
            fill="transparent"
            opacity={0.2}
          />
          {/* Progress Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View style={styles.innerValue}>
          <Text style={[styles.valueText, { color: colors.text }]}>{value.toFixed(0)}</Text>
          <Text style={[styles.unitText, { color: colors.textSecondary }]}>{unit}</Text>
        </View>
      </View>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </View>
  );
};

interface MacroGridProps {
  protein: number;
  carbs: number;
  fat: number;
}

export const MacroGrid = ({ protein, carbs, fat }: MacroGridProps) => {
  const { colors } = useTheme();
  
  // Reasonable max values for the circular scale
  const maxProtein = 100;
  const maxCarbs = 150;
  const maxFat = 80;

  return (
    <GlassView intensity={20} borderRadius={32} style={styles.container}>
      <View style={styles.grid}>
        <CircularProgress
          label="Proteine"
          value={protein}
          total={maxProtein}
          unit="g"
          color={colors.primary}
        />
        <CircularProgress
          label="Carbs"
          value={carbs}
          total={maxCarbs}
          unit="g"
          color={colors.success}
        />
        <CircularProgress
          label="Dhoune"
          value={fat}
          total={maxFat}
          unit="g"
          color={colors.warning}
        />
      </View>
    </GlassView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  macroItem: {
    alignItems: 'center',
    gap: 10,
  },
  svgWrapper: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerValue: {
    position: 'absolute',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 18,
    fontWeight: '900',
  },
  unitText: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: -2,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
