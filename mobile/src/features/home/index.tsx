import React from 'react';
import { HomeUI } from './HomeUI';

interface HomeContainerProps {
  onLogMeal: (totals: any) => void;
  onShowLogSuccess: () => void;
  dailyScans: number;
  incrementScans: () => void;
  isPro: boolean;
  onShowUpgrade: () => void;
  isGuest?: boolean;
  onTriggerAuth?: () => void;
}

export const HomeContainer = ({ 
  isGuest = false, 
  onTriggerAuth
}: HomeContainerProps) => {
  return (
    <HomeUI
      isGuest={isGuest}
      onTriggerAuth={onTriggerAuth}
    />
  );
};
