import React, { useCallback } from 'react';
import { HomeContainer } from '@/features/home';
import { useStats } from '@/hooks/useStats';
import { useUI } from '@/hooks/UIContext';

export default function HomeScreen() {
  const { logMeal, dailyScans, incrementScans, isPro } = useStats();
  const { isAuthenticated, setShowUpgrade, setShowLogSuccess, setShowLoginModal } = useUI();

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
      onShowUpgrade={() => setShowUpgrade(true)}
      isGuest={!isAuthenticated}
      onTriggerAuth={() => setShowLoginModal(true)}
    />
  );
}
