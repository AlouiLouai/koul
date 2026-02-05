import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame, Wheat, Droplets } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

interface MacroCardProps {
  label: string;
  value: string | number;
  unit: string;
  color: {
    bg: string;
    text: string;
  };
  icon: any;
}

const MacroCard = ({ label, value, unit, color, icon: Icon }: MacroCardProps) => {
  const { colors } = useTheme();
  
  return (
    <GlassView intensity={20} borderRadius={20} style={styles.macroCard}>
      <View style={styles.cardHeader}>
        <Text style={[styles.label, { color: colors.textSecondary }]} numberOfLines={1}>{label}</Text>
        <View style={[styles.iconCircle, { backgroundColor: color.bg + '15' }]}>
            <Icon size={12} color={color.text} strokeWidth={2.5} />
        </View>
      </View>
      <View style={styles.valueRow}>
        <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
        <Text style={[styles.unit, { color: colors.textSecondary }]}>{unit}</Text>
      </View>
    </GlassView>
  );
};

interface MacroGridProps {
  protein: number;
  carbs: number;
  fat: number;
}

export const MacroGrid = ({ protein, carbs, fat }: MacroGridProps) => {
  return (
    <View style={styles.grid}>
        <MacroCard 
            label="Protéine" 
            value={protein.toFixed(1)} 
            unit="g" 
            color={{ bg: '#2563eb', text: '#2563eb' }} 
            icon={Flame} 
        />
        <MacroCard 
            label="Carbs" 
            value={carbs.toFixed(0)} 
            unit="g" 
            color={{ bg: '#10b981', text: '#10b981' }} 
            icon={Wheat} 
        />
        <MacroCard 
            label="Dhoune" 
            value={fat.toFixed(0)} 
            unit="g" 
            color={{ bg: '#f59e0b', text: '#f59e0b' }} 
            icon={Droplets} 
        />
    </View>
  );
};

const styles = StyleSheet.create({
    grid: { flexDirection: 'row', gap: 10, marginBottom: 20, marginTop: 8 },
    macroCard: { flex: 1, padding: 12, height: 85, justifyContent: 'space-between', backgroundColor: '#fff' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    iconCircle: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
    label: { fontSize: 9, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5, flex: 1 },
    valueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 1 },
    value: { fontSize: 20, fontWeight: '900' },
    unit: { fontSize: 11, fontWeight: '800' }
});