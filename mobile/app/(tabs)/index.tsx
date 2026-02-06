import React, { useCallback } from 'react';
import { HomeContainer } from '../../src/features/home';
import { useStats } from '../../src/hooks/useStats';
import { useUI } from '../../src/hooks/UIContext';

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
