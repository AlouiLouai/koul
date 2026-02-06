import React, { useState } from 'react';
import { ProfileUI } from './ProfileUI';

interface ProfileContainerProps {
  onLogout: () => void;
  onShowUpgrade: () => void;
  isPro: boolean;
  isAuthenticated: boolean;
  onTriggerAuth: () => void;
}

export const ProfileContainer = ({ 
  onLogout, 
  onShowUpgrade, 
  isPro,
  isAuthenticated,
  onTriggerAuth
}: ProfileContainerProps) => {
  // Logic: In a real app, this would come from a useUser() hook
  const [user] = useState({
    name: isAuthenticated ? 'Louai B.' : 'Guest',
  });

  return (
    <ProfileUI
      onLogout={onLogout}
      onShowUpgrade={onShowUpgrade}
      onTriggerAuth={onTriggerAuth}
      userName={user.name}
      isPro={isPro}
      isAuthenticated={isAuthenticated}
    />
  );
};
