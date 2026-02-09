import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark';

interface ThemeColors {
  background: readonly [string, string, string]; // Gradient colors
  glass: string;
  glassBorder: string;
  text: string;
  textSecondary: string;
  primary: string;
  accent: string; // Tunisian Red / Hot Action
  success: string;
  warning: string;
  error: string;
  tint: 'light' | 'dark' | 'default';
}

interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

// "Crystal Morning" - Crisp, airy, pearlescent
const LightColors: ThemeColors = {
  background: ['#fdfcf0', '#f1f5f9', '#e0f2fe'], // Warmer "Sahara/Oasis" vibe
  glass: 'rgba(255, 255, 255, 0.3)', 
  glassBorder: 'rgba(15, 23, 42, 0.18)',
  text: '#0f172a', // Slate 900
  textSecondary: '#475569', // Slate 600
  primary: '#2563eb', // Blue 600 - The new App Color
  accent: '#e11d48', // Tunisian Red
  success: '#10b981', // Emerald 500
  warning: '#f59e0b', // Amber 500
  error: '#ef4444', // Red 500
  tint: 'light',
};

// "Deep Ocean Glass" - Moody, bioluminescent, rich
const DarkColors: ThemeColors = {
  background: ['#020617', '#0f172a', '#1e293b'], // Deep slate/night gradient
  glass: 'rgba(15, 23, 42, 0.75)', // Darker, smokier glass
  glassBorder: 'rgba(255, 255, 255, 0.38)', // More visible premium edge
  text: '#f1f5f9', // Slate 100
  textSecondary: '#94a3b8', // Slate 400
  primary: '#38bdf8', // Sky 400 - Glowing accent
  accent: '#fb7185', // Softer red for dark mode
  success: '#34d399', // Emerald 400 - Bioluminescent green
  warning: '#fbbf24', // Amber 400
  error: '#f87171', // Red 400
  tint: 'dark',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(systemScheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    if (systemScheme) {
      setMode(systemScheme);
    }
  }, [systemScheme]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = mode === 'light' ? LightColors : DarkColors;

  return (
    <ThemeContext.Provider value={{ mode, colors, toggleTheme, setTheme: setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
