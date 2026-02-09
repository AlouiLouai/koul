import React, { useCallback } from 'react';
import { ScanContainer } from '@/features/scan';
import { useStatsStore } from '@/features/stats/useStatsStore';
import { router } from 'expo-router';
import { useAuthState } from '@/features/auth/AuthState';

export default function ScanScreen() {
  const { logMeal, dailyScans, incrementScans } = useStatsStore();
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
