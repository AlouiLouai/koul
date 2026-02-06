import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Crown, Zap, X, ShieldCheck, Check } from 'lucide-react-native';
import { BottomSheetModal } from './BottomSheetModal';
import { ActionButton } from './ActionButton';
import { useTheme } from '../theme/ThemeContext';
import { GlassView } from './GlassView';

interface UpgradeScreenProps {
  onClose: () => void;
  onUpgrade: () => void;
  onRedirectHome?: () => void;
}

const PlanCard = ({ title, price, features, active, disabled, onSelect, badge, color, mode }: any) => {
    const { colors } = useTheme();

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

export const UpgradeScreen = ({ onClose, onUpgrade, onRedirectHome }: UpgradeScreenProps) => {
  const { colors, mode } = useTheme();
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
    <BottomSheetModal visible={true} onClose={onClose}>
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
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
                        mode={mode}
                    />
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <ActionButton 
                    text={selectedPlan === 'free' ? "N7eb neb9a Gratuit" : "Abda el Tajrba"} 
                    variant="primary" 
                    onPress={selectedPlan === 'free' ? (onRedirectHome || onClose) : onUpgrade}
                    icon={<Zap size={18} color="#fff" fill="#fff" />}
                    style={{ backgroundColor: activeColor }}
                />
            </View>
        </View>
    </BottomSheetModal>
  );
};

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
  
  footer: { width: '100%', gap: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(150,150,150,0.1)' },
});