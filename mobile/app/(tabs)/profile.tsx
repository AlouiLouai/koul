import React from 'react';
import { ProfileContainer } from '../../src/features/profile';
import { useStats } from '../../src/hooks/useStats';
import { useUI } from '../../src/hooks/UIContext';

export default function ProfileScreen() {
  const { isPro } = useStats();
  const { logout, setShowUpgrade, isAuthenticated, setShowLoginModal } = useUI();

  return (
    <ProfileContainer 
      onLogout={logout} 
      onShowUpgrade={() => setShowUpgrade(true)}
      isPro={isPro} 
      isAuthenticated={isAuthenticated}
      onTriggerAuth={() => setShowLoginModal(true)}
    />
  );
}
