import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Crown, Check, Zap } from 'lucide-react-native';
import { BottomSheetModal } from './BottomSheetModal';
import { ActionButton } from './ActionButton';
import { useTheme } from '../theme/ThemeContext';

interface UpgradeScreenProps {
  onClose: () => void;
  onUpgrade: () => void;
}

const PlanCard = ({ title, price, features, active, disabled, onSelect, badge, color }: any) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity 
            activeOpacity={disabled ? 1 : 0.8} 
            onPress={onSelect}
            style={[
                styles.planCard, 
                { 
                    borderColor: active ? color : (disabled ? colors.glassBorder : colors.textSecondary),
                    backgroundColor: active ? color + '10' : (disabled ? 'transparent' : colors.background[1]),
                    opacity: disabled ? 0.6 : 1
                }
            ]}
        >
            <View style={styles.planHeader}>
                <View>
                    <Text style={[styles.planTitle, { color: active ? color : colors.text }]}>{title}</Text>
                    {price && <Text style={[styles.planPrice, { color: colors.textSecondary }]}>{price}</Text>}
                </View>
                {active && <View style={[styles.activeBadge, { backgroundColor: color }]}><Check size={12} color="#fff" /></View>}
                {badge && <View style={[styles.comingSoonBadge, { backgroundColor: colors.text }]}><Text style={styles.comingSoonText}>{badge}</Text></View>}
            </View>

            <View style={styles.featuresList}>
                {features.map((f: string, i: number) => (
                    <View key={i} style={styles.featureRow}>
                        <Check size={14} color={active || !disabled ? color : colors.textSecondary} />
                        <Text style={[styles.featureText, { color: colors.textSecondary }]}>{f}</Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );
};

export const UpgradeScreen = ({ onClose, onUpgrade }: UpgradeScreenProps) => {
  const { colors } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState('premium');

  return (
    <BottomSheetModal visible={true} onClose={onClose}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Crown size={48} color={colors.warning} fill={colors.warning + '40'} />
                <Text style={[styles.title, { color: colors.text }]}>Walli Premium</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    Ikhtar el plan illi ysa3dek bch twalli m3allem.
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* FREE PLAN */}
                <PlanCard 
                    title="Gratuit (Actuel)" 
                    price="0 TND" 
                    features={['3 Scans / Jour', 'Statistiques limitées']} 
                    active={false}
                    disabled={true}
                    color={colors.textSecondary}
                />

                {/* PREMIUM PLAN */}
                <PlanCard 
                    title="Premium" 
                    price="5 TND / Ch'har" 
                    features={['Scans Illimités 📸', 'Statistiques Kamla 📊', 'Suivi Hebdo/Mensuel 🗓️']} 
                    active={selectedPlan === 'premium'}
                    disabled={false}
                    onSelect={() => setSelectedPlan('premium')}
                    color={colors.accent} // BRAND COLOR
                />

                {/* VIP PLAN */}
                <PlanCard 
                    title="VIP Coach" 
                    price="15 TND / Ch'har" 
                    features={['Premium Inclus ⭐', 'Coach IA Personnel 🤖', 'Menus Personnalisés 🍽️']} 
                    active={false}
                    disabled={true}
                    badge="Coming Soon"
                    color={colors.primary}
                />
            </ScrollView>

            <View style={styles.footer}>
                <ActionButton 
                    text={selectedPlan === 'premium' ? "Abda 10 Jours Gratuit" : "Coming Soon"} 
                    variant="primary" 
                    onPress={onUpgrade}
                    disabled={selectedPlan !== 'premium'}
                    icon={<Zap size={18} color="#fff" />}
                />
                <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
                    <Text style={[styles.cancelText, { color: colors.textSecondary }]}>Batel, n7eb neb9a Gratuit</Text>
                </TouchableOpacity>
            </View>
        </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
      height: '95%', // Occupy most of the sheet
      paddingBottom: 20,
  },
  header: {
      alignItems: 'center',
      marginBottom: 24,
  },
  title: {
      fontSize: 28,
      fontWeight: '900',
      marginTop: 8,
  },
  subtitle: {
      fontSize: 14,
      textAlign: 'center',
      maxWidth: '80%',
      marginTop: 4,
  },
  scrollContent: {
      gap: 20,
      paddingBottom: 24,
  },
  planCard: {
      padding: 20,
      borderRadius: 24,
      borderWidth: 2,
  },
  planHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
  },
  planTitle: {
      fontSize: 18,
      fontWeight: '900',
  },
  planPrice: {
      fontSize: 14,
      fontWeight: '600',
      marginTop: 2,
  },
  activeBadge: {
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
  },
  comingSoonBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
  },
  comingSoonText: {
      fontSize: 10,
      fontWeight: '900',
      color: '#fff',
      textTransform: 'uppercase',
  },
  featuresList: {
      gap: 8,
  },
  featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  featureText: {
      fontSize: 13,
      fontWeight: '500',
  },
  footer: {
      marginTop: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: 'rgba(150,150,150,0.1)',
  },
  cancelBtn: {
      alignItems: 'center',
      marginTop: 16,
  },
  cancelText: {
      fontSize: 13,
      fontWeight: '600',
      textDecorationLine: 'underline',
  },
});