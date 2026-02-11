import React from 'react';
import { AuthenticatedHeader } from '@/features/profile/AuthenticatedHeader';
import { GlassView } from '@/components/GlassView';
import { GuestHeader } from '@/features/profile/GuestHeader';
import { Text } from 'react-native';
import { ImpactStats } from '@/features/profile/ImpactStats';
import { useTheme } from '@/theme/ThemeContext';
import { PremiumBanner } from '@/features/profile/PremiumBanner';
import { SettingsList } from '@/features/profile/SettingsList';

export default function ProfileScreen() {
  const { colors } = useTheme();

  return <>
    <GlassView style={{
      alignItems: 'center',
      padding: 24,
      width: '100%',
      marginBottom: 20,
    }} intensity={50} borderRadius={32}>
      <AuthenticatedHeader />
      <GuestHeader />
    </GlassView>
    <ImpactStats />
    <PremiumBanner />
    <SettingsList />
    <Text style={{
      marginTop: 32,
      textAlign: 'center',
      fontSize: 11,
      fontWeight: 'bold',
      color: colors.textSecondary
    }}>KOUL Tunisia v1.0.0 🇹🇳</Text>
  </>
}
