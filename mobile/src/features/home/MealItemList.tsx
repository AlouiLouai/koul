import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp, Droplets, Flame, Wheat } from 'lucide-react-native';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';

interface MealItem {
    item: string;
    calories: number;
    portion_estimate: string;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
}

interface MealItemListProps {
    items: MealItem[];
}

export const MealItemList = ({ items }: MealItemListProps) => {
    const [expanded, setExpanded] = useState(false);
    const { colors, mode } = useTheme();

    const visibleItems = expanded ? items : items.slice(0, 2);
    const hasMore = items.length > 2;

    return (
        <View style={styles.container}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Moukawinet Sa7n</Text>

            <View style={styles.list}>
                {visibleItems.map((item, idx) => (
                    <View key={idx} style={styles.cardWrapper}>
                        <GlassView intensity={40} borderRadius={20} style={[styles.itemCard, { backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', borderColor: colors.glassBorder }]}>
                            <View style={styles.itemHeader}>
                                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                                <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={2}>{item.item}</Text>
                            </View>

                            <Text style={[styles.itemCals, { color: colors.warning }]}>{item.calories} <Text style={styles.unitSmall}>kcal</Text></Text>
                            <Text style={[styles.itemPortion, { color: colors.textSecondary }]} numberOfLines={1}>{item.portion_estimate}</Text>

                            <View style={[styles.macros, { borderTopColor: colors.glassBorder }]}>
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
                            </View>
                        </GlassView>
                    </View>
                ))}
            </View>

            {hasMore && (
                <TouchableOpacity
                    style={[styles.expandBtn, { backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}
                    onPress={() => setExpanded(!expanded)}
                >
                    <Text style={[styles.expandText, { color: colors.textSecondary }]}>
                        {expanded ? "Na9es" : `Chouf el kol (${items.length - 2})`}
                    </Text>
                    {expanded ? <ChevronUp size={16} color={colors.textSecondary} /> : <ChevronDown size={16} color={colors.textSecondary} />}
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { width: '100%' },
    sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 16, paddingHorizontal: 4 },
    list: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    cardWrapper: { width: '48.5%' },
    itemCard: { padding: 12, borderWidth: 1, height: '100%' },
    itemHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 },
    dot: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
    itemName: { fontSize: 13, fontWeight: '800', flex: 1 },
    itemCals: { fontSize: 15, fontWeight: '900', marginBottom: 2 },
    unitSmall: { fontSize: 10, fontWeight: '700', opacity: 0.6 },
    itemPortion: { fontSize: 10, fontWeight: '700', marginBottom: 12, opacity: 0.8 },
    macros: { gap: 6, paddingTop: 8, borderTopWidth: 1 },
    macroRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    macroText: { fontSize: 10, fontWeight: '700' },
    expandBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, marginTop: 16, borderRadius: 20 },
    expandText: { fontSize: 13, fontWeight: '800', marginRight: 8 }
});