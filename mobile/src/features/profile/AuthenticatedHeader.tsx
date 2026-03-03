import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import {
    Settings,
    Trophy,
} from 'lucide-react-native';
import { useTheme } from '@/theme/ThemeContext';
import { useAuthState } from '@/features/auth/AuthState';
export function AuthenticatedHeader() {
    const { colors, mode } = useTheme();
    const { user, isAuthenticated } = useAuthState();
    const name = user?.user_metadata.full_name || user?.email;
    const avatar = user?.user_metadata.avatar_url ||
        user?.user_metadata.picture
    if (!isAuthenticated) return null;
    return (
        <View style={styles.container}>
            <View style={styles.avatarWrapper}>
                <View style={[styles.avatarBorder, { borderColor: colors.primary }]}>
                    <Image source={{ uri: avatar }} style={styles.bigAvatar} />
                </View>
                <View style={[styles.editBadge, { backgroundColor: colors.text, borderColor: colors.glass }]}>
                    <Settings size={14} color={mode === 'dark' ? '#000' : '#fff'} />
                </View>
            </View>
            <Text style={[styles.profileName, { color: colors.text }]}>{name}</Text>
            <View style={[styles.rankBadge, { backgroundColor: colors.warning + '15', borderColor: colors.warning + '30' }]}>
                <Trophy size={14} color={colors.warning} fill={colors.warning} />
                <Text style={[styles.rankText, { color: colors.warning }]}>CHEF EL 7OUMA 👑</Text>
            </View>
            <View style={styles.levelModule}>
                <View style={styles.levelHeader}>
                    <Text style={[styles.levelText, { color: colors.textSecondary }]}>Niveau 5</Text>
                    <Text style={[styles.xpText, { color: colors.primary }]}>1,250 / 2,000 XP</Text>
                </View>
                <View style={[styles.progressTrack, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                    <View style={[styles.progressFill, { width: '62.5%', backgroundColor: colors.primary }]} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 20,
    },
    avatarBorder: {
        padding: 4,
        borderRadius: 64,
        borderWidth: 1.5,
        borderStyle: 'dashed',
    },
    bigAvatar: {
        width: 108,
        height: 108,
        borderRadius: 54,
    },
    editBadge: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    profileName: {
        fontSize: 26,
        fontWeight: '900',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    rankBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        gap: 8,
        borderWidth: 1,
        marginBottom: 32,
    },
    rankText: {
        fontWeight: '900',
        fontSize: 11,
        letterSpacing: 1,
    },
    levelModule: {
        width: '100%',
        paddingHorizontal: 4,
    },
    levelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    levelText: {
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    xpText: {
        fontSize: 11,
        fontWeight: '900',
    },
    progressTrack: {
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
});