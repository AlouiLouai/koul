import React, { useCallback } from 'react';
import { ScanContainer } from '@/features/scan';
import { useStats } from '@/hooks/useStats';
import { useUI } from '@/hooks/UIContext';
import { router } from 'expo-router';

export default function ScanScreen() {
  const { logMeal, dailyScans, incrementScans, isPro } = useStats();
  const { isAuthenticated } = useUI();

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
