import { GlassView } from "@/components/GlassView";
import { useTheme } from "@/theme/ThemeContext";
import { router } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useAuthState } from "@/features/auth/AuthState";

export function PremiumBanner() {
    const { colors, mode } = useTheme();
    const { isPro } = useAuthState()
    if (isPro) return null;
    return (
        <TouchableOpacity onPress={() => router.push('/upgrade')} activeOpacity={0.9}>
            <GlassView
                style={[styles.proCard, { backgroundColor: mode === 'dark' ? '#111827' : '#18181bE6' }]}
                intensity={80}
                borderRadius={32}
            >
                <View style={styles.proCardContent}>
                    <View style={styles.proTextSection}>
                        <View style={styles.proHeader}>
                            <Sparkles size={20} color={colors.warning} fill={colors.warning} />
                            <Text style={[styles.proTitle, { color: '#fff' }]}>KOUL PREMIUM 💎</Text>
                        </View>
                        <Text style={[styles.proSubtitle, { color: '#a1a1aa' }]}>Unlock absolute food tracking power</Text>

                        <View style={styles.proBulletList}>
                            <Text style={styles.proBullet}>• AI Scanning illimité</Text>
                            <Text style={styles.proBullet}>• Analyses approfondies</Text>
                        </View>
                    </View>

                    <View style={styles.priceSection}>
                        <Text style={[styles.priceVal, { color: colors.accent }]}>5 TND</Text>
                        <View style={[styles.unlockBtn, { backgroundColor: colors.primary }]}>
                            <Text style={styles.unlockText}>Unlock</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.proDeco} />
            </GlassView>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    proCard: {
        width: '100%',
        padding: 24,
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden',
    },
    proCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    proTextSection: {
        flex: 1,
    },
    proHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    proTitle: {
        fontSize: 18,
        fontWeight: '900',
    },
    proSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 12,
    },
    proBulletList: {
        gap: 4,
    },
    proBullet: {
        color: '#d4d4d8',
        fontSize: 11,
        fontWeight: '500',
    },
    priceSection: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    priceVal: {
        fontSize: 24,
        fontWeight: '900',
    },
    priceSub: {
        color: '#71717a',
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: -4,
        marginBottom: 12,
    },
    unlockBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    unlockText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    proDeco: {
        position: 'absolute',
        right: -20,
        top: -20,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.03)',
    },
})