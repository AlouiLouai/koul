import React from 'react';
import { ProfileUI } from '@/features/profile/ProfileUI';
import { useAuthState } from '@/features/auth/AuthState';
import { useModals } from '@/modals/ModalsProvider';
import { router } from 'expo-router';

export default function ProfileScreen() {

  const { isAuthenticated, user, isPro } = useAuthState();
  const { presentModal } = useModals()
  return <ProfileUI
    isAuthenticated={isAuthenticated}
    userName={user?.email ?? 'Guest'}
    onLogout={() => { }}
    onShowUpgrade={() => { router.push('/upgrade') }}
    onTriggerAuth={() => {
      presentModal('login')
    }}
    isPro={isPro} />;
}
