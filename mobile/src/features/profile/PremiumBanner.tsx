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
                style={[styles.proCard, { borderColor: colors.warning + '40', borderWidth: 1 }]}
                intensity={mode === 'dark' ? 60 : 40}
                borderRadius={32}
            >
                <View style={styles.proCardContent}>
                    <View style={styles.proTextSection}>
                        <View style={styles.proHeader}>
                            <View style={[styles.proIconBox, { backgroundColor: colors.warning + '20' }]}>
                                <Sparkles size={18} color={colors.warning} fill={colors.warning} />
                            </View>
                            <Text style={[styles.proTitle, { color: colors.text }]}>KOUL PREMIUM 💎</Text>
                        </View>
                        <Text style={[styles.proSubtitle, { color: colors.textSecondary }]}>Saye7 el-W7ach eli fik l'youm</Text>

                        <View style={styles.proBulletList}>
                            <View style={styles.bulletItem}>
                                <View style={[styles.bulletDot, { backgroundColor: colors.primary }]} />
                                <Text style={[styles.proBullet, { color: colors.textSecondary }]}>AI Scanning illimité</Text>
                            </View>
                            <View style={styles.bulletItem}>
                                <View style={[styles.bulletDot, { backgroundColor: colors.primary }]} />
                                <Text style={[styles.proBullet, { color: colors.textSecondary }]}>Analyses makhdouma mli7</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.priceSection}>
                        <Text style={[styles.priceVal, { color: colors.primary }]}>5 TND</Text>
                        <View style={[styles.unlockBtn, { backgroundColor: colors.primary }]}>
                            <Text style={styles.unlockText}>ABONNI</Text>
                        </View>
                    </View>
                </View>
            </GlassView>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    proCard: {
        width: '100%',
        padding: 22,
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden',
    },
    proCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    proTextSection: {
        flex: 1,
        gap: 8,
    },
    proHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    proIconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    proTitle: {
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    proSubtitle: {
        fontSize: 12,
        fontWeight: '700',
        opacity: 0.6,
    },
    proBulletList: {
        gap: 6,
        marginTop: 4,
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    bulletDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
    },
    proBullet: {
        fontSize: 11,
        fontWeight: '800',
    },
    priceSection: {
        alignItems: 'flex-end',
        gap: 10,
    },
    priceVal: {
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: -1,
    },
    unlockBtn: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
    },
    unlockText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
})