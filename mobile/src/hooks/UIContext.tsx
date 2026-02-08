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
  const [showClickToPay, setShowClickToPay] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
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
