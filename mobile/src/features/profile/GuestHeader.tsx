
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
            <View style={[styles.guestIconCircle, { backgroundColor: colors.primary + '10' }]}>
                <UserIcon size={48} color={colors.primary} strokeWidth={1.5} />
            </View>
            <View style={styles.guestTextSection}>
                <Text style={[styles.guestTitle, { color: colors.text }]}>Mar7ba Bik! 👋</Text>
                <Text style={[styles.guestSubtitle, { color: colors.textSecondary }]}>
                    Connecti bch tkhabi makeltek w ttaba3 progress-ek.
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
                <Text style={[styles.secureText, { color: colors.success }]}>Data mte3ek mahfoutha</Text>
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
        width: 90,
        height: 90,
        borderRadius: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    guestTextSection: {
        alignItems: 'center',
        marginBottom: 24,
        gap: 8,
    },
    guestTitle: {
        fontSize: 26,
        fontWeight: '900',
    },
    guestSubtitle: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 20,
        fontWeight: '600',
    },
    connectBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 20,
        gap: 12,
        width: '100%',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    connectBtnText: {
        fontSize: 16,
        fontWeight: '800',
    },
    secureBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    secureText: {
        fontSize: 11,
        fontWeight: '700',
    },
})