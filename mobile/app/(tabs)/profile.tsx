import React from 'react';
import { AuthenticatedHeader } from '@/features/profile/AuthenticatedHeader';
import { GlassView } from '@/components/GlassView';
import { GuestHeader } from '@/features/profile/GuestHeader';
import { Text, View } from 'react-native';
import { ImpactStats } from '@/features/profile/ImpactStats';
import { useTheme } from '@/theme/ThemeContext';
import { PremiumBanner } from '@/features/profile/PremiumBanner';
import { SettingsList } from '@/features/profile/SettingsList';

export default function ProfileScreen() {
  const { colors } = useTheme();

  return <>
    <View style={{ marginBottom: 24, paddingHorizontal: 4 }}>
      <Text style={{ fontSize: 28, fontWeight: '900', color: colors.text, letterSpacing: -0.5 }}>Profil <Text style={{ color: colors.primary }}>echakhsi</Text></Text>
      <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textSecondary, opacity: 0.6 }}>Idarat el-7issab w el-hadaf 🇹🇳</Text>
    </View>

    <GlassView style={{
      alignItems: 'center',
      padding: 24,
      width: '100%',
      marginBottom: 24,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)'
    }} intensity={40} borderRadius={36}>
      <AuthenticatedHeader />
      <GuestHeader />
    </GlassView>

    <ImpactStats />
    <PremiumBanner />
    <SettingsList />

    <View style={{ paddingVertical: 40, alignItems: 'center' }}>
      <Text style={{
        fontSize: 11,
        fontWeight: '900',
        color: colors.textSecondary,
        letterSpacing: 1,
        opacity: 0.5
      }}>KOUL TUNISIA • VERSION 1.0.0</Text>
    </View>
  </>
}
