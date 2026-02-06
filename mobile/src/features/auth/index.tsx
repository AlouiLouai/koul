import React, { useState, useCallback } from 'react';
import { AuthUI } from './AuthUI';
import { LoginModal } from './LoginModal';

interface AuthContainerProps {
  onAuthenticated: (user: any) => void;
  isModal?: boolean;
  visible?: boolean;
  onClose?: () => void;
}

export const AuthContainer = ({ onAuthenticated, isModal = false, visible = false, onClose }: AuthContainerProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = useCallback(async () => {
    setIsLoading(true);
    
    // MOCK LOGIN FOR EXPO GO
    setTimeout(() => {
      console.log('Mocking Google Login Success');
      setIsLoading(false);
      onAuthenticated({ 
        email: 'test@example.com',
        name: 'Test User',
        photo: 'https://via.placeholder.com/150'
      });
    }, 1500);
  }, [onAuthenticated]);

  if (isModal) {
    return (
      <LoginModal 
        visible={visible} 
        onClose={onClose || (() => {})} 
        onLogin={handleGoogleLogin} 
        isLoading={isLoading} 
      />
    );
  }

  return (
    <AuthUI 
      onGoogleLogin={handleGoogleLogin} 
      isLoading={isLoading} 
    />
  );
};
