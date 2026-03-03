import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    Flame, Target, Trophy,
    Lock,
} from 'lucide-react-native';
import { GlassView } from '@/components/GlassView';
import { useTheme } from '@/theme/ThemeContext';
import { useAuthState } from '../auth/AuthState';

const StatItem = ({ label, value, icon: Icon, color, locked }: any) => {
    const { colors, mode } = useTheme();
    const lockedColor = mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
    const lockedBg = mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

    return (
        <GlassView style={styles.statItem} intensity={30} borderRadius={28}>
            <View style={[styles.statIconCircle, { backgroundColor: locked ? lockedBg : color + '15' }]}>
                {locked ? <Lock size={16} color={lockedColor} /> : <Icon size={20} color={color} fill={color + '20'} />}
            </View>
            <Text style={[styles.statValue, { color: locked ? lockedColor : colors.text }]}>
                {locked ? '--' : value}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
        </GlassView>
    );
};
export function ImpactStats() {
    const { isGuest } = useAuthState();
    const { colors } = useTheme();
    return (
        <View style={styles.statsRow}>
            <StatItem label="Ayyém" value="12" icon={Flame} color="#f97316" locked={isGuest} />
            <StatItem label="Scans" value="42" icon={Target} color={colors.accent} locked={isGuest} />
            <StatItem label="Kou'ous" value="8" icon={Trophy} color={colors.warning} locked={isGuest} />
        </View>
    );
}
const styles = StyleSheet.create({
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 32,
        paddingHorizontal: 2,
    },
    statItem: {
        paddingVertical: 20,
        paddingHorizontal: 12,
        alignItems: 'center',
        width: '31%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    statIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    statLabel: {
        fontSize: 9,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 4,
        opacity: 0.6,
    }
})