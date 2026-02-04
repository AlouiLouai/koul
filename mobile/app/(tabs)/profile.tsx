import React from 'react';
import { ProfileContainer } from '../../src/features/profile';
import { useStats } from '../../src/hooks/useStats';
import { useUI } from '../../src/hooks/UIContext';

export default function ProfileScreen() {
  const { isPro } = useStats();
  const { setIsAuthenticated, setShowUpgrade } = useUI();

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ProfileContainer 
      onLogout={handleLogout} 
      onShowUpgrade={() => setShowUpgrade(true)}
      isPro={isPro} 
    />
  );
}
