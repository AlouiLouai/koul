import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { User as UserIcon, Sparkles, Settings, Bell, History, LogOut, Zap, ChevronRight, Star, ChefHat, Crown, Flame, Target, Trophy } from 'lucide-react-native';

interface ProfileUIProps {
  onLogout: () => void;
  onShowUpgrade: () => void;
  userName?: string;
  isPro?: boolean;
}

const StatItem = ({ label, value, icon: Icon, color }: any) => (
    <View style={styles.statItem}>
        <View style={[styles.statIconCircle, { backgroundColor: color + '15' }]}>
            <Icon size={18} color={color} strokeWidth={2.5} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const SettingItem = ({ icon: Icon, label, value, color = "#18181b", onPress }: any) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} activeOpacity={0.6}>
        <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: '#fafafa' }]}>
                <Icon size={20} color={color} />
            </View>
            <Text style={styles.settingLabel}>{label}</Text>
        </View>
        <View style={styles.settingRight}>
            {value && <Text style={styles.settingValue}>{value}</Text>}
            <ChevronRight size={16} color="#d4d4d8" />
        </View>
    </TouchableOpacity>
);

export const ProfileUI = ({ 
    onLogout, 
    onShowUpgrade, 
    userName = "John Doe", 
    isPro = false 
}: ProfileUIProps) => {
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
        {/* Header Section */}
        <View style={styles.headerCard}>
            <View style={styles.avatarWrapper}>
                <View style={styles.avatarBorder}>
                    <View style={styles.bigAvatar}>
                        <Text style={styles.bigAvatarText}>{userName.charAt(0)}</Text>
                    </View>
                </View>
                <View style={styles.editBadge}>
                    <Settings size={14} color="#fff" />
                </View>
            </View>
            
            <Text style={styles.profileName}>{userName}</Text>
            
            <View style={styles.rankBadge}>
                <Trophy size={14} color="#f59e0b" fill="#f59e0b" />
                <Text style={styles.rankText}>Sultan el Koujina 👑</Text>
            </View>

            {/* Level Progress */}
            <View style={styles.levelModule}>
                <View style={styles.levelHeader}>
                    <Text style={styles.levelText}>Niveau 5</Text>
                    <Text style={styles.xpText}>1,250 / 2,000 XP</Text>
                </View>
                <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: '62.5%' }]} />
                </View>
            </View>
        </View>

        {/* Quick Impact Stats */}
        <View style={styles.statsRow}>
            <StatItem label="Ayyém" value="12" icon={Flame} color="#f97316" />
            <StatItem label="Scans" value="42" icon={Target} color="#10b981" />
            <StatItem label="Kou'ous" value="8" icon={Trophy} color="#f59e0b" />
        </View>

        {/* Premium "VIP" Section */}
        {!isPro && (
            <TouchableOpacity style={styles.proCard} onPress={onShowUpgrade} activeOpacity={0.9}>
                <View style={styles.proCardContent}>
                    <View style={styles.proTextSection}>
                        <View style={styles.proHeader}>
                            <Crown size={20} color="#f59e0b" fill="#f59e0b" />
                            <Text style={styles.proTitle}>KOUL Premium</Text>
                        </View>
                        <Text style={styles.proSubtitle}>Walli M3allem w sayer l'AI</Text>
                        
                        <View style={styles.proBulletList}>
                            <Text style={styles.proBullet}>• Menu Sahri (Fridge Chef)</Text>
                            <Text style={styles.proBullet}>• Coach Personnel 🤖</Text>
                        </View>
                    </View>
                    
                    <View style={styles.priceSection}>
                        <Text style={styles.priceVal}>5 TND</Text>
                        <Text style={styles.priceSub}>/ ch'har</Text>
                        <View style={styles.unlockBtn}>
                            <Text style={styles.unlockText}>Unlock</Text>
                        </View>
                    </View>
                </View>
                {/* Decorative Pattern */}
                <View style={styles.proDeco} />
            </TouchableOpacity>
        )}

        {/* Settings List */}
        <View style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>EL PARRAMETRE</Text>
            <View style={styles.settingsList}>
                <SettingItem icon={UserIcon} label="Ma3loumet echakhsia" value="Bedel" color="#10b981" />
                <SettingItem icon={Zap} label="Ahdef el makla" value="Bulking" color="#f59e0b" />
                <SettingItem icon={Bell} label="Notifications" value="Mkhadma" color="#3b82f6" />
                <SettingItem icon={History} label="Historique l'Scans" color="#6366f1" />
                <View style={styles.divider} />
                <SettingItem icon={LogOut} label="Okhroj" color="#ef4444" onPress={onLogout} />
            </View>
        </View>

        <Text style={styles.versionText}>Version 1.0.0 (Tunisia Edition 🇹🇳)</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFFBF7',
  },
  scrollContent: {
      paddingTop: 20,
      paddingBottom: 140, 
      paddingHorizontal: 20,
  },
  
  // Header Design
  headerCard: {
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 32,
      padding: 24,
      width: '100%',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#f4f4f5',
      shadowColor: '#000',
      shadowOpacity: 0.02,
      shadowRadius: 15,
  },
  avatarWrapper: {
      position: 'relative',
      marginBottom: 16,
  },
  avatarBorder: {
      padding: 4,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: '#10b981',
      borderStyle: 'dashed',
  },
  bigAvatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#ecfdf5',
      alignItems: 'center',
      justifyContent: 'center',
  },
  bigAvatarText: {
      fontSize: 40,
      fontWeight: '900',
      color: '#10b981',
  },
  editBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 32,
      height: 32,
      backgroundColor: '#18181b',
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: '#fff',
  },
  profileName: {
      fontSize: 24,
      fontWeight: '900',
      color: '#18181b',
      marginBottom: 6,
  },
  rankBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fffbeb',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      gap: 6,
      borderWidth: 1,
      borderColor: '#fcd34d',
      marginBottom: 24,
  },
  rankText: {
      fontWeight: '900',
      color: '#d97706',
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
      color: '#18181b',
  },
  xpText: {
      fontSize: 12,
      fontWeight: '700',
      color: '#10b981',
  },
  progressTrack: {
      height: 10,
      backgroundColor: '#f4f4f5',
      borderRadius: 5,
      overflow: 'hidden',
  },
  progressFill: {
      height: '100%',
      backgroundColor: '#10b981',
  },

  // Stats Row
  statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 24,
  },
  statItem: {
      backgroundColor: '#fff',
      borderRadius: 24,
      padding: 16,
      alignItems: 'center',
      width: '31%',
      borderWidth: 1,
      borderColor: '#f4f4f5',
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
      color: '#18181b',
  },
  statLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#a1a1aa',
      textTransform: 'uppercase',
      marginTop: 2,
  },

  // Premium VIP Card
  proCard: {
      width: '100%',
      backgroundColor: '#18181b',
      borderRadius: 32,
      padding: 24,
      marginBottom: 32,
      position: 'relative',
      overflow: 'hidden',
      elevation: 8,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
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
      color: '#fff',
      fontSize: 18,
      fontWeight: '900',
  },
  proSubtitle: {
      color: '#a1a1aa',
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
      color: '#f59e0b',
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
      backgroundColor: '#10b981',
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
      backgroundColor: '#fff',
      borderRadius: 32,
      padding: 8,
      borderWidth: 1,
      borderColor: '#f4f4f5',
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
      color: '#18181b',
  },
  settingRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  settingValue: {
      fontSize: 13,
      color: '#a1a1aa',
      fontWeight: '600',
  },
  divider: {
      height: 1,
      backgroundColor: '#f4f4f5',
      marginHorizontal: 16,
      marginVertical: 4,
  },
  versionText: {
      marginTop: 32,
      textAlign: 'center',
      fontSize: 11,
      color: '#d4d4d8',
      fontWeight: 'bold',
  }
});
