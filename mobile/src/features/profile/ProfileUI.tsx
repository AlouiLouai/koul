import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Switch } from 'react-native';
import { User as UserIcon, Sparkles, Settings, Bell, History, LogOut, Zap, ChevronRight, Star, ChefHat, Crown, Flame, Target, Trophy } from 'lucide-react-native';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';

interface ProfileUIProps {
  onLogout: () => void;
  onShowUpgrade: () => void;
  userName?: string;
  isPro?: boolean;
}

const StatItem = ({ label, value, icon: Icon, color }: any) => {
    const { colors } = useTheme();
    return (
        <GlassView style={styles.statItem} intensity={30} borderRadius={24}>
            <View style={[styles.statIconCircle, { backgroundColor: color + '15' }]}>
                <Icon size={18} color={color} strokeWidth={2.5} />
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
        </GlassView>
    );
};

const SettingItem = ({ icon: Icon, label, value, color, onPress, isSwitch, switchValue, onSwitchChange }: any) => {
    const { colors } = useTheme();
    const iconColor = color || colors.text;

    return (
        <TouchableOpacity 
            style={styles.settingItem} 
            onPress={onPress} 
            activeOpacity={isSwitch ? 1 : 0.6}
            disabled={isSwitch}
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
    userName = "John Doe", 
    isPro = false 
}: ProfileUIProps) => {
  const { colors, mode } = useTheme();

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
        {/* Header Section */}
        <GlassView style={styles.headerCard} intensity={50} borderRadius={32}>
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
                <Text style={[styles.rankText, { color: colors.warning }]}>Sultan el Koujina 👑</Text>
            </View>

            {/* Level Progress */}
            <View style={styles.levelModule}>
                <View style={styles.levelHeader}>
                    <Text style={[styles.levelText, { color: colors.text }]}>Niveau 5</Text>
                    <Text style={[styles.xpText, { color: colors.primary }]}>1,250 / 2,000 XP</Text>
                </View>
                <View style={[styles.progressTrack, { backgroundColor: colors.glassBorder }]}>
                    <View style={[styles.progressFill, { width: '62.5%', backgroundColor: colors.primary }]} />
                </View>
            </View>
        </GlassView>

        {/* Quick Impact Stats */}
        <View style={styles.statsRow}>
            <StatItem label="Ayyém" value="12" icon={Flame} color="#f97316" />
            <StatItem label="Scans" value="42" icon={Target} color={colors.primary} />
            <StatItem label="Kou'ous" value="8" icon={Trophy} color={colors.warning} />
        </View>

        {/* Premium "VIP" Section */}
        {!isPro && (
            <TouchableOpacity onPress={onShowUpgrade} activeOpacity={0.9}>
                <GlassView 
                    style={[styles.proCard, { backgroundColor: mode === 'dark' ? '#00000060' : '#18181bE6' }]} 
                    intensity={80} 
                    borderRadius={32}
                >
                    <View style={styles.proCardContent}>
                        <View style={styles.proTextSection}>
                            <View style={styles.proHeader}>
                                <Crown size={20} color={colors.warning} fill={colors.warning} />
                                <Text style={[styles.proTitle, { color: '#fff' }]}>KOUL Premium</Text>
                            </View>
                            <Text style={[styles.proSubtitle, { color: '#a1a1aa' }]}>Walli M3allem w sayer l'AI</Text>
                            
                            <View style={styles.proBulletList}>
                                <Text style={styles.proBullet}>• Menu Sahri (Fridge Chef)</Text>
                                <Text style={styles.proBullet}>• Coach Personnel 🤖</Text>
                            </View>
                        </View>
                        
                        <View style={styles.priceSection}>
                            <Text style={[styles.priceVal, { color: colors.warning }]}>5 TND</Text>
                            <Text style={styles.priceSub}>/ ch'har</Text>
                            <View style={[styles.unlockBtn, { backgroundColor: colors.primary }]}>
                                <Text style={styles.unlockText}>Unlock</Text>
                            </View>
                        </View>
                    </View>
                    {/* Decorative Pattern */}
                    <View style={styles.proDeco} />
                </GlassView>
            </TouchableOpacity>
        )}

        {/* Settings List */}
        <View style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>EL PARRAMETRE</Text>
            <GlassView style={styles.settingsList} intensity={40} borderRadius={32}>
                <SettingItem icon={UserIcon} label="Ma3loumet echakhsia" value="Bedel" color={colors.primary} />
                <SettingItem icon={Zap} label="Ahdef el makla" value="Bulking" color={colors.warning} />
                <SettingItem icon={Bell} label="Notifications" value="Mkhadma" color="#3b82f6" />
                <SettingItem icon={History} label="Historique l'Scans" color="#6366f1" />
                <View style={[styles.divider, { backgroundColor: colors.glassBorder }]} />
                <SettingItem icon={LogOut} label="Okhroj" color={colors.error} onPress={onLogout} />
            </GlassView>
        </View>

        <Text style={[styles.versionText, { color: colors.textSecondary }]}>Version 1.0.0 (Tunisia Edition 🇹🇳)</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  scrollContent: {
      paddingTop: 20,
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
