import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Droplets, Flame, Wheat, Leaf, ChevronDown } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

interface MealItem {
  item: string;
  calories: number;
  portion_estimate: string;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g?: number;
}

interface MealItemListProps {
  items: MealItem[];
}

export const MealItemList = ({ items }: MealItemListProps) => {
  const { colors, mode } = useTheme();
  const [showAll, setShowAll] = useState(false);
  
  const INITIAL_COUNT = 2;
  const visibleItems = showAll ? items : items.slice(0, INITIAL_COUNT);
  const hasMore = items.length > INITIAL_COUNT;

  return (
    <View style={styles.container}>
        <View style={styles.headerRow}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Moukawinet Sa7n</Text>
        </View>
        
        <View style={styles.grid}>
            {visibleItems.map((item, idx) => (
                <View key={idx} style={styles.cardWrapper}>
                    <GlassView intensity={40} borderRadius={20} style={[styles.itemCard, { backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.4)', borderColor: colors.glassBorder }]}>
                        <View style={styles.itemHeader}>
                            <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                            <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={1}>{item.item}</Text>
                        </View>
                        
                        <View style={styles.calsRow}>
                            <Text style={[styles.itemCals, { color: colors.text }]}>{item.calories} <Text style={styles.unitSmall}>kcal</Text></Text>
                            <Text style={[styles.itemPortion, { color: colors.textSecondary }]}>{item.portion_estimate}</Text>
                        </View>
                        
                        <View style={styles.macrosList}>
                            <View style={styles.macroRow}>
                                <Flame size={10} color={colors.primary} />
                                <Text style={[styles.macroText, { color: colors.textSecondary }]}>{item.protein_g}g Protéine</Text>
                            </View>
                            <View style={styles.macroRow}>
                                <Wheat size={10} color={colors.success} />
                                <Text style={[styles.macroText, { color: colors.textSecondary }]}>{item.carbs_g}g Carbs</Text>
                            </View>
                            <View style={styles.macroRow}>
                                <Droplets size={10} color={colors.warning} />
                                <Text style={[styles.macroText, { color: colors.textSecondary }]}>{item.fat_g}g Dhoune</Text>
                            </View>
                            <View style={styles.macroRow}>
                                <Leaf size={10} color="#10b981" />
                                <Text style={[styles.macroText, { color: colors.textSecondary }]}>{item.fiber_g || 0}g Fibres</Text>
                            </View>
                        </View>
                    </GlassView>
                </View>
            ))}
        </View>

        {hasMore && (
            <TouchableOpacity 
                style={styles.loadMoreBtn} 
                onPress={() => setShowAll(!showAll)}
                activeOpacity={0.7}
            >
                <GlassView intensity={10} borderRadius={12} style={styles.loadMoreInner}>
                    <Text style={[styles.loadMoreText, { color: colors.textSecondary }]}>
                        {showAll ? 'Na9es' : `Chouf akther (${items.length - INITIAL_COUNT})`}
                    </Text>
                    <ChevronDown 
                        size={14} 
                        color={colors.textSecondary} 
                        style={{ transform: [{ rotate: showAll ? '180deg' : '0deg' }] }}
                    />
                </GlassView>
            </TouchableOpacity>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: { width: '100%', marginBottom: 32 },
    headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, paddingHorizontal: 4 },
    sectionTitle: { fontSize: 14, fontWeight: '900', opacity: 0.8 },
    countBadge: { display: 'none' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
    cardWrapper: { width: '48%' },
    itemCard: { padding: 12, borderWidth: 0, minHeight: 140, backgroundColor: 'transparent' },
    itemHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
    dot: { width: 6, height: 6, borderRadius: 3 },
    itemName: { fontSize: 13, fontWeight: '900', flex: 1 },
    calsRow: { marginBottom: 10 },
    itemCals: { fontSize: 14, fontWeight: '900' },
    unitSmall: { fontSize: 10, fontWeight: '700', opacity: 0.6 },
    itemPortion: { fontSize: 10, fontWeight: '600', opacity: 0.6 },
    macrosList: { gap: 4 },
    macroRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    macroText: { fontSize: 11, fontWeight: '600' },
    loadMoreBtn: { marginTop: 16, width: '100%' },
    loadMoreInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, gap: 6, backgroundColor: 'rgba(0,0,0,0.04)' },
    loadMoreText: { fontSize: 13, fontWeight: '800' }
});