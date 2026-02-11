import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import {
    User as UserIcon, Bell, History,
    Zap, ChevronRight
} from 'lucide-react-native';
import { GlassView } from '@/components/GlassView';
import { useTheme } from '@/theme/ThemeContext';
import { useAuthState } from '@/features/auth/AuthState';
import { useModals } from '@/modals/ModalsProvider';

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
export function SettingsList() {
    const { colors } = useTheme();
    const { isAuthenticated, isGuest } = useAuthState();
    const { presentModal } = useModals();
    return (
        <View style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>PARAMETRES</Text>
            <GlassView style={styles.settingsList} intensity={40} borderRadius={32}>
                <SettingItem
                    icon={UserIcon}
                    label="Ma3loumet echakhsia"
                    value={isAuthenticated ? "Modifier" : "S'inscrire"}
                    color={colors.primary}
                    onPress={() => isGuest ? presentModal('login') : undefined}
                />
                <SettingItem
                    icon={Zap}
                    label="Objectifs Nutritionnels"
                    value={isAuthenticated ? "Bulking" : "Locked"}
                    color={colors.warning}
                    disabled={isGuest}
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
                    disabled={isGuest}
                />
            </GlassView>
        </View>
    );
}

const styles = StyleSheet.create({
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