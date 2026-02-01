import React, { useState } from 'react';
import { ProfileUI } from './ProfileUI';

interface ProfileContainerProps {
  onLogout: () => void;
  onShowUpgrade: () => void;
  isPro: boolean;
}

export const ProfileContainer = ({ onLogout, onShowUpgrade, isPro }: ProfileContainerProps) => {
  // Logic: In a real app, this would come from a useUser() hook
  const [user, setUser] = useState({
    name: 'John Doe',
  });

  return (
    <ProfileUI
      onLogout={onLogout}
      onShowUpgrade={onShowUpgrade}
      userName={user.name}
      isPro={isPro}
    />
  );
};
