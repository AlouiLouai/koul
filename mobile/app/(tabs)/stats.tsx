import React from 'react';
import { StatsContainer } from '../../src/features/stats';
import { useStats } from '../../src/hooks/useStats';
import { useUI } from '../../src/hooks/UIContext';

export default function StatsScreen() {
  const { isPro } = useStats();
  const { setShowUpgrade, showUpgrade } = useUI();

  return (
    <StatsContainer 
      isPro={isPro} 
      onShowUpgrade={() => setShowUpgrade(true)} 
      isUpgradeVisible={showUpgrade}
    />
  );
}
