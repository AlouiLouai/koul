import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { Flame, Wheat, Droplets } from 'lucide-react-native';

interface CircularProgressProps {
  label: string;
  value: number;
  total: number;
  unit: string;
  color: string;
  icon: any;
}

const CircularProgress = ({ label, value, total, unit, color, icon: Icon }: CircularProgressProps) => {
  const { colors } = useTheme();
  const size = 95;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  const percentage = Math.min(value / total, 1);
  const strokeDashoffset = circumference - (percentage * circumference);

  return (
    <View style={styles.macroItem}>
      <View style={styles.svgWrapper}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color + '20'}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
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
        <View style={styles.innerContent}>
          <Icon size={16} color={color} fill={color} style={styles.icon} />
          <Text style={[styles.labelInternal, { color: colors.textSecondary }]}>{label}</Text>
          <Text style={[styles.valueText, { color: colors.text }]}>
            {value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}<Text style={styles.unitText}>{unit}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

interface MacroGridProps {
  protein: number;
  carbs: number;
  fat: number;
}

export const MacroGrid = ({ protein, carbs, fat }: MacroGridProps) => {
  
  const maxProtein = 100;
  const maxCarbs = 150;
  const maxFat = 80;

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <CircularProgress
          label="Protéine"
          value={protein}
          total={maxProtein}
          unit="g"
          color="#3b82f6"
          icon={Droplets}
        />
        <CircularProgress
          label="Carbs"
          value={carbs}
          total={maxCarbs}
          unit="g"
          color="#10b981"
          icon={Wheat}
        />
        <CircularProgress
          label="Dhoune"
          value={fat}
          total={maxFat}
          unit="g"
          color="#f59e0b"
          icon={Flame}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  macroItem: {
    alignItems: 'center',
  },
  svgWrapper: {
    width: 95,
    height: 95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 2,
  },
  labelInternal: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 1,
  },
  valueText: {
    fontSize: 16,
    fontWeight: '900',
  },
  unitText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
