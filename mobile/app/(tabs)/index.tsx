import React, { useCallback } from 'react';
import { HomeContainer } from '@/features/home';
import { useStats } from '@/hooks/useStats';
import { useUI } from '@/hooks/UIContext';
import { useAuthState } from '@/features/auth/AuthState';

export default function HomeScreen() {
  const { logMeal, dailyScans, incrementScans, } = useStats();
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
