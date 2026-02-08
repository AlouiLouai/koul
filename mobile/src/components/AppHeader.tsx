
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppLogo } from '@/components/AppLogo';
import { GlassView } from '@/components/GlassView';
import { Sun, Moon } from 'lucide-react-native';
import { GoogleLogo } from '@/components/GoogleLogo';
import { useTheme } from '@/theme/ThemeContext';
import { useUI } from '@/hooks/UIContext';
import { useRouter } from 'expo-router';


export function AppHeader() {
    const { colors, mode, toggleTheme } = useTheme();
    const { isAuthenticated, setShowLoginModal } = useUI();
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

                {isAuthenticated ? (
                    <GlassView style={styles.userAvatar} intensity={30} borderRadius={20}>
                        <Text style={{ fontWeight: 'bold', color: colors.primary }}>U</Text>
                    </GlassView>
                ) : (
                    <TouchableOpacity onPress={() => setShowLoginModal(true)} activeOpacity={0.8}>
                        <GlassView style={styles.iconBtn} intensity={30} borderRadius={20}>
                            <GoogleLogo size={20} />
                        </GlassView>
                    </TouchableOpacity>
                )}
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
});