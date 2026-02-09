import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CreditCard, ShieldCheck, CheckCircle2, Smartphone } from 'lucide-react-native';

import { ActionButton } from '@/components/ActionButton';
import { useTheme } from '@/theme/ThemeContext';
import { GlassView } from '@/components/GlassView';
import { LiquidBackground } from "@/components/LiquidBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path, Rect } from 'react-native-svg';

const ClickToPayLogo = ({ size = 60 }: { size?: number }) => (
    <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Svg width={size * 2} height={size} viewBox="0 0 120 60">
            {/* Abstract Click to Pay Icon */}
            <Rect x="10" y="10" width="40" height="28" rx="4" fill="#000" />
            <Rect x="15" y="15" width="10" height="6" rx="1" fill="#FFD700" />
            <Path
                d="M60 15 Q 75 15 75 30 Q 75 45 60 45"
                stroke="#000"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
            />
            <Path
                d="M68 20 Q 78 20 78 30 Q 78 40 68 40"
                stroke="#000"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
            />
            <Path
                d="M76 25 Q 81 25 81 30 Q 81 35 76 35"
                stroke="#000"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.3"
            />
        </Svg>
        <Text style={{ fontSize: 18, fontWeight: '800', color: '#000', marginTop: -5 }}>Click to Pay</Text>
    </View>
);

export default function PaymentScreen() {
    const handlePaymentComplete = () => {
        router.back();
    }
    const { colors, mode } = useTheme();
    return (
        <SafeAreaView style={{ flex: 1, }} edges={['top', 'left', 'right']}>
            <LiquidBackground>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>Paiement Sécurisé</Text>
                    </View>

                    <View style={styles.content}>
                        <ClickToPayLogo />

                        <View style={styles.infoBox}>
                            <Text style={[styles.mainMessage, { color: colors.text }]}>
                                Utilisez votre compte Click to Pay pour finaliser l&apos;abonnement.
                            </Text>
                            <Text style={[styles.subMessage, { color: colors.textSecondary }]}>
                                Pas besoin de saisir vos numéros de carte à chaque fois.
                            </Text>
                        </View>

                        <View style={styles.cardPreview}>
                            <GlassView intensity={mode === 'dark' ? 30 : 50} borderRadius={20} style={styles.cardInner}>
                                <View style={styles.cardTop}>
                                    <CreditCard size={24} color={colors.primary} />
                                    <Text style={[styles.cardType, { color: colors.text }]}>VISA</Text>
                                </View>
                                <View style={styles.cardMiddle}>
                                    <Text style={[styles.cardNumber, { color: colors.text }]}>•••• •••• •••• 4242</Text>
                                </View>
                                <View style={styles.cardBottom}>
                                    <Text style={[styles.cardHolder, { color: colors.textSecondary }]}>LOUAI B.</Text>
                                    <Text style={[styles.cardExpiry, { color: colors.textSecondary }]}>12/28</Text>
                                </View>
                            </GlassView>
                        </View>

                        <View style={styles.benefits}>
                            <View style={styles.benefitItem}>
                                <ShieldCheck size={18} color="#10b981" />
                                <Text style={[styles.benefitText, { color: colors.textSecondary }]}>Sécurisé par EMVCo</Text>
                            </View>
                            <View style={styles.benefitItem}>
                                <Smartphone size={18} color={colors.primary} />
                                <Text style={[styles.benefitText, { color: colors.textSecondary }]}>Authentification Mobile</Text>
                            </View>
                        </View>

                        <View style={styles.footer}>
                            <ActionButton
                                text="Confirmer le paiement"
                                variant="primary"
                                onPress={handlePaymentComplete}
                                icon={<CheckCircle2 size={20} color="#fff" />}
                                style={{ backgroundColor: '#000' }}
                            />
                            <Text style={styles.terms}>
                                En cliquant, vous acceptez les conditions de service de KOUL et Click to Pay.
                            </Text>
                        </View>
                    </View>
                </View>
            </LiquidBackground>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        paddingVertical: 10, paddingHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
    },
    closeBtn: {},
    closeIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

    content: {
        alignItems: 'center',
        width: '100%',
    },
    infoBox: {
        alignItems: 'center',
        marginBottom: 24,
        gap: 8,
    },
    mainMessage: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    subMessage: {
        fontSize: 13,
        textAlign: 'center',
        opacity: 0.8,
    },

    cardPreview: {
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 24,
    },
    cardInner: {
        padding: 20,
        height: 160,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardType: {
        fontWeight: '900',
        fontSize: 18,
        fontStyle: 'italic',
    },
    cardMiddle: {
        marginVertical: 10,
    },
    cardNumber: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 2,
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardHolder: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    cardExpiry: {
        fontSize: 12,
        fontWeight: '700',
    },

    benefits: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    benefitText: {
        fontSize: 11,
        fontWeight: '600',
    },

    footer: {
        width: '100%',
        gap: 16,
    },
    terms: {
        fontSize: 10,
        textAlign: 'center',
        opacity: 0.5,
        paddingHorizontal: 40,
    }
});