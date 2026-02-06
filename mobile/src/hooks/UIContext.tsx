import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
  showUpgrade: boolean;
  setShowUpgrade: (show: boolean) => void;
  showLogSuccess: boolean;
  setShowLogSuccess: (show: boolean) => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
  showClickToPay: boolean;
  setShowClickToPay: (show: boolean) => void;
  logout: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showLogSuccess, setShowLogSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showClickToPay, setShowClickToPay] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
    setShowSplash(true);
  };

  return (
    <UIContext.Provider value={{
      showUpgrade,
      setShowUpgrade,
      showLogSuccess,
      setShowLogSuccess,
      showLoginModal,
      setShowLoginModal,
      isAuthenticated,
      setIsAuthenticated,
      showSplash,
      setShowSplash,
      showClickToPay,
      setShowClickToPay,
      logout
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
