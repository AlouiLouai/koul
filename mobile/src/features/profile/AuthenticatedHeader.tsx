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
    const { colors } = useTheme();
    const { user, isAuthenticated } = useAuthState();
    const name = user?.user_metadata.full_name || user?.email;
    const avatar = user?.user_metadata.avatar_url ||
        user?.user_metadata.picture
    if (!isAuthenticated) return null;
    return (
        <>
            <View style={styles.avatarWrapper}>
                <View style={[styles.avatarBorder, { borderColor: colors.primary }]}>
                    <Image source={{ uri: avatar }} style={styles.bigAvatar} />
                </View>
                <View style={[styles.editBadge, { backgroundColor: colors.text, borderColor: colors.glass }]}>
                    <Settings size={14} color={colors.background[0]} />
                </View>
            </View>
            <Text style={[styles.profileName, { color: colors.text }]}>{name}</Text>
            <View style={[styles.rankBadge, { backgroundColor: colors.warning + '10', borderColor: colors.warning }]}>
                <Trophy size={14} color={colors.warning} fill={colors.warning} />
                <Text style={[styles.rankText, { color: colors.warning }]}>Chef El 7ouma 👑</Text>
            </View>
            <View style={styles.levelModule}>
                <View style={styles.levelHeader}>
                    <Text style={[styles.levelText, { color: colors.text }]}>Niveau 5</Text>
                    <Text style={[styles.xpText, { color: colors.primary }]}>1,250 / 2,000 XP</Text>
                </View>
                <View style={[styles.progressTrack, { backgroundColor: colors.glassBorder }]}>
                    <View style={[styles.progressFill, { width: '62.5%', backgroundColor: colors.primary }]} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    avatarBorder: {
        padding: 4,
        borderRadius: 60,
        borderWidth: 2,
        borderStyle: 'dashed',
    },
    bigAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigAvatarText: {
        fontSize: 40,
        fontWeight: '900',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
    },
    profileName: {
        fontSize: 24,
        fontWeight: '900',
        marginBottom: 6,
    },
    rankBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 6,
        borderWidth: 1,
        marginBottom: 24,
    },
    rankText: {
        fontWeight: '900',
        fontSize: 12,
    },
    levelModule: {
        width: '100%',
    },
    levelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    levelText: {
        fontSize: 13,
        fontWeight: '900',
    },
    xpText: {
        fontSize: 12,
        fontWeight: '700',
    },
    progressTrack: {
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
    },
});