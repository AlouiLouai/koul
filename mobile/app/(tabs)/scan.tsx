import React, { useCallback } from 'react';
import { ScanContainer } from '@/features/scan';
import { useStats } from '@/hooks/useStats';
import { router } from 'expo-router';
import { useAuthState } from '@/features/auth/AuthState';

export default function ScanScreen() {
  const { logMeal, dailyScans, incrementScans } = useStats();
  const { isAuthenticated, isPro } = useAuthState();

  const handleLogMeal = useCallback((totals: any) => {
    logMeal(totals);
  }, [logMeal]);

  return (
    <ScanContainer
      onShowUpgrade={() => router.push('/upgrade')}
      onLogMeal={handleLogMeal}
      dailyScans={dailyScans}
      incrementScans={incrementScans}
      isPro={isPro}
      isGuest={!isAuthenticated}
    />
  );
}
