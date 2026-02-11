import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import {
    User as UserIcon, Settings, Bell, History, LogOut,
    Zap, ChevronRight, Flame, Target, Trophy,
    ShieldCheck, Lock, Sparkles
} from 'lucide-react-native';
import { GlassView } from '@/components/GlassView';
import { useTheme } from '@/theme/ThemeContext';
import { GoogleLogo } from '@/components/GoogleLogo';


interface ProfileUIProps {
    onLogout: () => void;
    onShowUpgrade: () => void;
    onTriggerAuth: () => void;
    userName?: string;
    isPro?: boolean;
    isAuthenticated?: boolean;
}

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

const SettingItem = ({ icon: Icon, label, value, color, onPress, isSwitch, switchValue, onSwitchChange, disabled }: any) => {
    const { colors } = useTheme();
    const iconColor = color || colors.text;

    return (
        <TouchableOpacity
            style={[styles.settingItem, disabled && { opacity: 0.5 }]}
            onPress={onPress}
            activeOpacity={isSwitch ? 1 : 0.6}
            disabled={isSwitch || disabled}
        >
            <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.background[1] + '80' }]}>
                    <Icon size={20} color={iconColor} />
                </View>
                <Text style={[styles.settingLabel, { color: colors.text }]}>{label}</Text>
            </View>
            <View style={styles.settingRight}>
                {isSwitch ? (
                    <Switch
                        value={switchValue}
                        onValueChange={onSwitchChange}
                        trackColor={{ false: '#767577', true: colors.primary }}
                        thumbColor={'#fff'}
                    />
                ) : (
                    <>
                        {value && <Text style={[styles.settingValue, { color: colors.textSecondary }]}>{value}</Text>}
                        <ChevronRight size={16} color={colors.textSecondary} />
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

export const ProfileUI = ({
    onLogout,
    onShowUpgrade,
    onTriggerAuth,
    userName = "Guest",
    isPro = false,
    isAuthenticated = false
}: ProfileUIProps) => {
    const { colors, mode } = useTheme();

    return (
        <>
            {/* Profile Header Card */}
            <GlassView style={styles.headerCard} intensity={50} borderRadius={32}>
                {isAuthenticated ? (
                    // Authenticated Header
                    <>
                        <View style={styles.avatarWrapper}>
                            <View style={[styles.avatarBorder, { borderColor: colors.primary }]}>
                                <View style={[styles.bigAvatar, { backgroundColor: colors.primary + '15' }]}>
                                    <Text style={[styles.bigAvatarText, { color: colors.primary }]}>{userName.charAt(0)}</Text>
                                </View>
                            </View>
                            <View style={[styles.editBadge, { backgroundColor: colors.text, borderColor: colors.glass }]}>
                                <Settings size={14} color={colors.background[0]} />
                            </View>
                        </View>

                        <Text style={[styles.profileName, { color: colors.text }]}>{userName}</Text>

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
                ) : (
                    // Guest Header
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
                            onPress={onTriggerAuth}
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
                )}
            </GlassView>

            {/* Quick Impact Stats */}
            <View style={styles.statsRow}>
                <StatItem label="Ayyém" value="12" icon={Flame} color="#f97316" locked={!isAuthenticated} />
                <StatItem label="Scans" value="42" icon={Target} color={colors.accent} locked={!isAuthenticated} />
                <StatItem label="Kou'ous" value="8" icon={Trophy} color={colors.warning} locked={!isAuthenticated} />
            </View>

            {/* Premium "VIP" Section */}
            {!isPro && (
                <TouchableOpacity onPress={onShowUpgrade} activeOpacity={0.9}>
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
            )}

            {/* Settings List */}
            <View style={styles.settingsGroup}>
                <Text style={styles.groupTitle}>PARAMETRES</Text>
                <GlassView style={styles.settingsList} intensity={40} borderRadius={32}>
                    <SettingItem
                        icon={UserIcon}
                        label="Ma3loumet echakhsia"
                        value={isAuthenticated ? "Modifier" : "S'inscrire"}
                        color={colors.primary}
                        onPress={!isAuthenticated ? onTriggerAuth : undefined}
                    />
                    <SettingItem
                        icon={Zap}
                        label="Objectifs Nutritionnels"
                        value={isAuthenticated ? "Bulking" : "Locked"}
                        color={colors.warning}
                        disabled={!isAuthenticated}
                    />
                    <SettingItem
                        icon={Bell}
                        label="Notifications"
                        color="#3b82f6"
                    />
                    <SettingItem
                        icon={History}
                        label="Historique l'Scans"
                        color="#6366f1"
                        disabled={!isAuthenticated}
                    />

                    {isAuthenticated && (
                        <>
                            <View style={[styles.divider, { backgroundColor: colors.glassBorder }]} />
                            <SettingItem
                                icon={LogOut}
                                label="Okhroj"
                                color={colors.error}
                                onPress={onLogout}
                            />
                        </>
                    )}
                </GlassView>
            </View>

            <Text style={[styles.versionText, { color: colors.textSecondary }]}>KOUL Tunisia v1.0.0 🇹🇳</Text>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 10,
        paddingBottom: 140,
        paddingHorizontal: 20,
    },

    // Header Design
    headerCard: {
        alignItems: 'center',
        padding: 24,
        width: '100%',
        marginBottom: 20,
    },

    // Guest Header
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

    // Authenticated Header
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

    // Stats Row
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
    },

    // Premium VIP Card
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

    // Settings Group
    settingsGroup: {
        width: '100%',
    },
    groupTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#a1a1aa',
        letterSpacing: 1.5,
        marginBottom: 12,
        marginLeft: 4,
    },
    settingsList: {
        padding: 8,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingLabel: {
        fontSize: 15,
        fontWeight: '700',
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    settingValue: {
        fontSize: 13,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        marginHorizontal: 16,
        marginVertical: 4,
    },
    versionText: {
        marginTop: 32,
        textAlign: 'center',
        fontSize: 11,
        fontWeight: 'bold',
    }
});
