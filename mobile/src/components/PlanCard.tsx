import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShieldCheck, Check } from 'lucide-react-native';
import { useTheme } from '@/theme/ThemeContext';
import { GlassView } from '@/components/GlassView';

interface PlanCardProps {
    title: string;
    price: string;
    features: string[];
    active: boolean;
    disabled: boolean;
    onSelect: () => void;
    badge?: string;
    color: string;
}

export function PlanCard({ title, price, features, active, disabled, onSelect, badge, color }: PlanCardProps) {
    const { colors, mode } = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={disabled && !badge ? 1 : 0.8}
            onPress={onSelect}
            style={styles.planBtn}
        >
            <GlassView
                intensity={active ? (mode === 'dark' ? 40 : 60) : 20}
                borderRadius={28}
                style={[
                    styles.planCard,
                    {
                        borderColor: active ? color : (mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'),
                        borderWidth: active ? 2 : 1,
                    }
                ]}
            >
                <View style={styles.planHeader}>
                    <View style={styles.planTitleContainer}>
                        <Text style={[styles.planTitle, { color: active ? color : colors.text }]}>
                            {title}
                        </Text>
                        {price && <Text style={[styles.planPrice, { color: colors.textSecondary }]}>{price}</Text>}
                    </View>
                    {active ? (
                        <View style={[styles.activeBadge, { backgroundColor: color }]}>
                            <Check size={14} color="#fff" strokeWidth={3} />
                        </View>
                    ) : (
                        badge && (
                            <View style={[styles.comingSoonBadge, { backgroundColor: colors.textSecondary + '20' }]}>
                                <Text style={[styles.comingSoonText, { color: colors.textSecondary }]}>{badge}</Text>
                            </View>
                        )
                    )}
                </View>

                <View style={styles.featuresList}>
                    {features.map((f: string, i: number) => (
                        <View key={i} style={styles.featureRow}>
                            <ShieldCheck size={14} color={active ? color : colors.textSecondary} opacity={0.7} />
                            <Text style={[styles.featureText, { color: colors.textSecondary }]} numberOfLines={1}>{f}</Text>
                        </View>
                    ))}
                </View>
            </GlassView>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({

    planBtn: { width: '100%' },
    planCard: { padding: 16, borderWidth: 1 },
    planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
    planTitleContainer: { flex: 1 },
    planTitle: { fontSize: 16, fontWeight: '900' },
    planPrice: { fontSize: 12, fontWeight: '600', marginTop: 1 },
    activeBadge: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    comingSoonBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
    comingSoonText: { fontSize: 8, fontWeight: '900', textTransform: 'uppercase' },

    featuresList: { gap: 4 },
    featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    featureText: { fontSize: 12, fontWeight: '600' },
});