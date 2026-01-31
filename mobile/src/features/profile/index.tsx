import React, { useState } from 'react';
import { ProfileUI } from './ProfileUI';

interface ProfileContainerProps {
  onLogout: () => void;
  onShowUpgrade: () => void;
}

export const ProfileContainer = ({ onLogout, onShowUpgrade }: ProfileContainerProps) => {
  // Logic: In a real app, this would come from a useUser() hook
  const [user, setUser] = useState({
    name: 'John Doe',
    isPro: false, // Set to false to show the Sales Pitch
  });

  return (
    <ProfileUI
      onLogout={onLogout}
      onShowUpgrade={onShowUpgrade}
      userName={user.name}
      isPro={user.isPro}
    />
  );
};
