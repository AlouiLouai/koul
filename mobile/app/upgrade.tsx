import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Crown, Zap, X, } from 'lucide-react-native';
import { ActionButton } from '@/components/ActionButton';
import { useTheme } from '@/theme/ThemeContext';
import { GlassView } from '@/components/GlassView';
import { router } from 'expo-router';
import { PlanCard } from '@/components/PlanCard';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function UpgradeScreen() {
    const { colors } = useTheme();
    const [selectedPlan, setSelectedPlan] = useState('free');

    const plans = [
        {
            id: 'free',
            title: 'Gratuit (Lyoum)',
            price: '0 TND',
            features: ['3 Scans f\'nhar 📸', 'Stats msekrin 📊'],
            color: colors.primary,
            disabled: false,
        },
        {
            id: 'premium',
            title: 'Premium',
            price: '5 TND / Ch\'har',
            features: ['Scans Illimités ✨', 'Stats Kamla 📈', 'Coach AI 🤖'],
            color: colors.accent,
            disabled: false,
        },
        {
            id: 'vip',
            title: 'VIP Coach',
            price: '15 TND / Ch\'har',
            features: ['Koulchy Premium ⭐', 'Menus l\'lik enti 🍽️'],
            color: colors.warning,
            disabled: true,
            badge: 'Coming Soon',
        }
    ];

    const handleSelect = (planId: string) => {
        setSelectedPlan(planId);
    };

    const activeColor = plans.find(p => p.id === selectedPlan)?.color || colors.primary;

    return (

        <SafeAreaView style={{ flex: 1, }} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.topHeader}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                        <GlassView intensity={20} borderRadius={20} style={styles.closeIcon}>
                            <X size={20} color={colors.textSecondary} />
                        </GlassView>
                    </TouchableOpacity>
                </View>

                <View style={styles.heroSection}>
                    <View style={[styles.iconBg, { backgroundColor: colors.warning + '15', borderColor: colors.warning + '30' }]}>
                        <Crown size={36} color={colors.warning} fill={colors.warning} />
                    </View>
                    <Text style={[styles.title, { color: colors.text }]}>Walli <Text style={{ color: colors.warning }}>Premium</Text></Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Ikhtar el plan illi ysa3dek bch twalli m3allem.
                    </Text>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    style={styles.scroll}
                >
                    {plans.map((plan) => (
                        <PlanCard
                            key={plan.id}
                            {...plan}
                            active={selectedPlan === plan.id}
                            onSelect={() => !plan.disabled && handleSelect(plan.id)}
                        />
                    ))}
                </ScrollView>

                <View style={styles.footer}>
                    <ActionButton
                        text={selectedPlan === 'free' ? "N7eb neb9a Gratuit" : "Abda el Tajrba"}
                        variant="primary"
                        onPress={() => {
                            if (selectedPlan === 'free') {
                                router.back();
                            } else {
                                router.replace('/payment');
                            }
                        }}
                        icon={<Zap size={18} color="#fff" fill="#fff" />}
                        style={{ backgroundColor: activeColor }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        width: '100%',
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginBottom: -10,
    },
    closeBtn: { zIndex: 10 },
    closeIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

    heroSection: { alignItems: 'center', marginBottom: 16 },
    iconBg: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 1.5 },
    title: { fontSize: 24, fontWeight: '900', marginBottom: 4, letterSpacing: -0.5 },
    subtitle: { fontSize: 13, textAlign: 'center', lineHeight: 18, maxWidth: '80%' },

    scroll: { maxHeight: 400 },
    scrollContent: { gap: 10, paddingBottom: 10 },

    footer: { width: '100%', gap: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(150,150,150,0.1)' },
});