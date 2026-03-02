
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppLogo } from '@/components/AppLogo';
import { GlassView } from '@/components/GlassView';
import { Sun, Moon } from 'lucide-react-native';
import { useTheme } from '@/theme/ThemeContext';
import { useRouter } from 'expo-router';
import { UserMenu } from '@/features/auth/UserMenu';


export function AppHeader() {
    const { colors, mode, toggleTheme } = useTheme();
    const router = useRouter();
    const handleGoHome = () => {
        router.replace('/');
    };
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.headerLeft}
                onPress={handleGoHome}
                activeOpacity={0.7}
            >
                <AppLogo size={36} borderRadius={10} intensity={50} animated={false} />
                <View>
                    <Text style={[styles.headerTitle, { color: colors.primary }]}>KOUL</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.headerRight}>
                <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7} style={{ marginRight: 8 }}>
                    <GlassView style={styles.iconBtn} intensity={20} borderRadius={20}>
                        {mode === 'dark' ? (
                            <Sun size={18} color={colors.warning} fill={colors.warning} />
                        ) : (
                            <Moon size={18} color={colors.textSecondary} fill={colors.textSecondary} />
                        )}
                    </GlassView>
                </TouchableOpacity>

                <GlassView style={styles.streakBadge} intensity={40} borderRadius={16}>
                    <Text style={styles.streakText}>🔥 3 Jours</Text>
                </GlassView>

                <UserMenu />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userAvatar: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginRight: 10,
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(245, 158, 11, 0.2)',
    },
    streakText: {
        fontWeight: '900',
        fontSize: 12,
        color: '#f59e0b',
    },
});