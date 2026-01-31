import React, { useState, useCallback } from 'react';
import { AuthUI } from './AuthUI';
// import { useGoogleAuth } from '../../hooks/useGoogleAuth'; // Future hook

interface AuthContainerProps {
  onAuthenticated: (user: any) => void;
}

export const AuthContainer = ({ onAuthenticated }: AuthContainerProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = useCallback(async () => {
    setIsLoading(true);
    
    // MOCK LOGIN FOR EXPO GO (Logic is here, UI just shows spinner)
    // When you switch to native, this logic changes, but UI stays the same!
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

  return (
    <AuthUI 
      onGoogleLogin={handleGoogleLogin} 
      isLoading={isLoading} 
    />
  );
};
