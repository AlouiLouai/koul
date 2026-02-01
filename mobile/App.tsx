import React, { useState, Suspense, lazy, useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Utensils, Scan, Sun, Moon } from 'lucide-react-native';

// --- Critical Imports (Loaded Immediately) ---
import { AuthContainer } from './src/features/auth';
import { BottomTabs } from './src/components/BottomTabs';
import { LogSuccessModal } from './src/components/LogSuccessModal';
import { UpgradeScreen } from './src/components/UpgradeScreen';
import { useStats } from './src/hooks/useStats';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { LiquidBackground } from './src/components/LiquidBackground';
import { GlassView } from './src/components/GlassView';

// --- Lazy Imports (Code Splitting for Performance) ---
const HomeContainer = lazy(() => import('./src/features/home').then(module => ({ default: module.HomeContainer })));
const StatsContainer = lazy(() => import('./src/features/stats').then(module => ({ default: module.StatsContainer })));
const ProfileContainer = lazy(() => import('./src/features/profile').then(module => ({ default: module.ProfileContainer })));

// --- Types ---
type Tab = 'home' | 'stats' | 'profile';

// --- Sub-Components (Memoized for Render Performance) ---

const LoadingFallback = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

import { AppLogo } from './src/components/AppLogo';

// ... (skipping some imports)

const Header = React.memo(() => {
  const { colors, mode, toggleTheme } = useTheme();
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <AppLogo size={40} borderRadius={12} intensity={50} />
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>KOUL</Text>
        </View>
      </View>
      
      <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7}>
        <GlassView style={styles.themeToggle} intensity={30} borderRadius={20}>
          {mode === 'dark' ? (
             <Sun size={20} color={colors.warning} fill={colors.warning} />
          ) : (
             <Moon size={20} color={colors.textSecondary} fill={colors.textSecondary} />
          )}
        </GlassView>
      </TouchableOpacity>
    </View>
  );
});

// --- Main Application Content ---

const AppContent = () => {
  // Navigation State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showLogSuccess, setShowLogSuccess] = useState(false);
  const { mode } = useTheme();

  // Global Data State (Shared across tabs)
  const { logMeal, dailyScans, incrementScans, isPro, upgradeToPro } = useStats();

  // --- Handlers ---
  
  const handleAuthenticated = useCallback((user: any) => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setActiveTab('home');
  }, []);

  const handleLogMeal = useCallback((totals: any) => {
    logMeal(totals);
  }, [logMeal]);

  const handleShowLogSuccess = useCallback(() => {
    setShowLogSuccess(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowLogSuccess(false);
  }, []);

  const handleViewStats = useCallback(() => {
    setShowLogSuccess(false);
    setActiveTab('stats');
  }, []);

  const handleUpgradeSuccess = useCallback(() => {
    upgradeToPro();
    // Keep the upgrade screen open for a moment to show success message
  }, [upgradeToPro]);

  // --- Render Helpers ---

  const renderContent = useMemo(() => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeContainer 
             onLogMeal={handleLogMeal}
             onShowLogSuccess={handleShowLogSuccess}
             dailyScans={dailyScans}
             incrementScans={incrementScans}
             isPro={isPro}
             onShowUpgrade={() => setShowUpgrade(true)}
          />
        );
      case 'stats':
        return (
          <StatsContainer 
            isPro={isPro} 
            onShowUpgrade={() => setShowUpgrade(true)} 
          />
        );
      case 'profile':
        return (
          <ProfileContainer 
            onLogout={handleLogout} 
            onShowUpgrade={() => setShowUpgrade(true)}
            isPro={isPro} 
          />
        );
      default:
        return null;
    }
  }, [activeTab, handleLogMeal, handleShowLogSuccess, handleLogout, dailyScans, incrementScans, isPro]);

  // --- Main Render ---

  if (!isAuthenticated) {
    return <AuthContainer onAuthenticated={handleAuthenticated} />;
  }

  return (
    <LiquidBackground>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
        
        {/* Main Content Area */}
        <View style={styles.mainAppContainer}>
          {/* Persistent Header */}
          <View style={styles.contentPadding}>
            <Header />
          </View>

          {/* Dynamic Content with Suspense */}
          <Suspense fallback={<LoadingFallback />}>
              <View style={styles.tabContentContainer}>
                {renderContent}
              </View>
          </Suspense>
          
          {/* Navigation */}
          <BottomTabs activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as Tab)} />
        </View>

        {/* Overlays / Modals */}
        {showUpgrade && (
          <View style={styles.absoluteContainer}>
            <UpgradeScreen 
                onClose={() => setShowUpgrade(false)} 
                onUpgrade={handleUpgradeSuccess}
            />
          </View>
        )}

        <LogSuccessModal 
          visible={showLogSuccess} 
          onClose={handleCloseModal}
          onViewStats={handleViewStats}
        />

      </SafeAreaView>
    </LiquidBackground>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    // Background color removed in favor of LiquidBackground
  },
  mainAppContainer: {
    flex: 1,
    position: 'relative',
  },
  contentPadding: {
    paddingHorizontal: 20, // Global horizontal gutter
  },
  tabContentContainer: {
    flex: 1,
    paddingHorizontal: 20, // Ensures all screens have left/right padding
    marginBottom: 0, 
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 12, 
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLogoContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoOverlay: {
    position: 'absolute',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  themeToggle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});