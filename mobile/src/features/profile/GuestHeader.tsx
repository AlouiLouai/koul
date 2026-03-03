
import { GoogleLogo } from '@/components/GoogleLogo'
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import {
    User as UserIcon,
    ShieldCheck,
} from 'lucide-react-native';
import { useTheme } from '@/theme/ThemeContext';
import { useModals } from '@/modals/ModalsProvider';
import { useAuthState } from '../auth/AuthState';
export function GuestHeader() {
    const { colors, mode } = useTheme();
    const { presentModal } = useModals();
    const { isGuest } = useAuthState();
    if (!isGuest) return null;
    return (
        <View style={styles.guestHeader}>
            <View style={[styles.guestIconCircle, { backgroundColor: colors.primary + '15' }]}>
                <UserIcon size={52} color={colors.primary} strokeWidth={1.5} />
            </View>
            <View style={styles.guestTextSection}>
                <Text style={[styles.guestTitle, { color: colors.text }]}>Mar7ba Bik! 👋</Text>
                <Text style={[styles.guestSubtitle, { color: colors.textSecondary }]}>
                    Connecti bch tkhabi makeltek w ttaba3 progress-ek l'youm.
                </Text>
            </View>
            <TouchableOpacity
                style={[styles.connectBtn, { backgroundColor: mode === 'dark' ? '#fff' : '#000' }]}
                onPress={() => presentModal('login')}
                activeOpacity={0.8}
            >
                <GoogleLogo size={20} />
                <Text style={[styles.connectBtnText, { color: mode === 'dark' ? '#000' : '#fff' }]}>Connecti b&apos;Google</Text>
            </TouchableOpacity>
            <View style={styles.secureBadge}>
                <ShieldCheck size={12} color={colors.success} />
                <Text style={[styles.secureText, { color: colors.success }]}>Data mte3ek mahfoutha m3ana</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    guestHeader: {
        alignItems: 'center',
        width: '100%',
    },
    guestIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    guestTextSection: {
        alignItems: 'center',
        marginBottom: 32,
        gap: 10,
    },
    guestTitle: {
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    guestSubtitle: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 10,
        fontWeight: '700',
        opacity: 0.7,
    },
    connectBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 24,
        gap: 12,
        width: '100%',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 8,
    },
    connectBtnText: {
        fontSize: 16,
        fontWeight: '900',
    },
    secureBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        opacity: 0.8,
    },
    secureText: {
        fontSize: 11,
        fontWeight: '800',
    },
})