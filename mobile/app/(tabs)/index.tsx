import React, { useCallback } from 'react';
import { HomeContainer } from '@/features/home';
import { useStatsStore } from '@/features/stats/useStatsStore';
import { useUI } from '@/hooks/UIContext';
import { useAuthState } from '@/features/auth/AuthState';

export default function HomeScreen() {
  const { logMeal, dailyScans, incrementScans, } = useStatsStore();
  const { isAuthenticated, isPro } = useAuthState();
  const { setShowLogSuccess } = useUI();

  const handleLogMeal = useCallback((totals: any) => {
    logMeal(totals);
  }, [logMeal]);

  return (
    <HomeContainer
      onLogMeal={handleLogMeal}
      onShowLogSuccess={() => setShowLogSuccess(true)}
      dailyScans={dailyScans}
      incrementScans={incrementScans}
      isPro={isPro}
      isGuest={!isAuthenticated}
    />
  );
}
