import React, { useCallback } from 'react';
import { ScanContainer } from '../../src/features/scan';
import { useStats } from '../../src/hooks/useStats';
import { useUI } from '../../src/hooks/UIContext';

export default function ScanScreen() {
  const { logMeal, dailyScans, incrementScans, isPro } = useStats();
  const { isAuthenticated, setShowUpgrade, setShowLoginModal } = useUI();

  const handleLogMeal = useCallback((totals: any) => {
    logMeal(totals);
  }, [logMeal]);

  return (
    <ScanContainer 
       onLogMeal={handleLogMeal}
       dailyScans={dailyScans}
       incrementScans={incrementScans}
       isPro={isPro}
       onShowUpgrade={() => setShowUpgrade(true)}
       isGuest={!isAuthenticated}
       onTriggerAuth={() => setShowLoginModal(true)}
    />
  );
}
