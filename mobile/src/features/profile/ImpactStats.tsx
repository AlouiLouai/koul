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
    const { colors } = useTheme();
    return (
        <GlassView style={styles.statItem} intensity={30} borderRadius={24}>
            <View style={[styles.statIconCircle, { backgroundColor: locked ? '#71717a15' : color + '15' }]}>
                {locked ? <Lock size={16} color="#71717a" /> : <Icon size={18} color={color} strokeWidth={2.5} />}
            </View>
            <Text style={[styles.statValue, { color: locked ? '#71717a' : colors.text }]}>
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
        marginBottom: 24,
    },
    statItem: {
        padding: 16,
        alignItems: 'center',
        width: '31%',
    },
    statIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '900',
    },
    statLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop: 2,
    }
})