import React, { useState, Suspense, lazy, useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';

// --- Critical Imports ---
import { AuthContainer } from './src/features/auth';
import { SplashScreen } from './src/components/SplashScreen';
import { BottomTabs } from './src/components/BottomTabs';
import { LogSuccessModal } from './src/components/LogSuccessModal';
import { UpgradeScreen } from './src/components/UpgradeScreen';
import { useStats } from './src/hooks/useStats';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { LiquidBackground } from './src/components/LiquidBackground';
import { GlassView } from './src/components/GlassView';
import { AppLogo } from './src/components/AppLogo';

// --- Lazy Imports ---
const HomeContainer = lazy(() => import('./src/features/home').then(module => ({ default: module.HomeContainer })));
const StatsContainer = lazy(() => import('./src/features/stats').then(module => ({ default: module.StatsContainer })));
const ProfileContainer = lazy(() => import('./src/features/profile').then(module => ({ default: module.ProfileContainer })));

type Tab = 'home' | 'stats' | 'profile';

const LoadingFallback = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

import { User, LogIn } from 'lucide-react-native';

// ... (previous imports)

// Updated Header Component
const Header = React.memo(({ isAuthenticated, onLogin }: { isAuthenticated: boolean; onLogin: () => void }) => {
  const { colors, mode, toggleTheme } = useTheme();
  return (
    <View style={styles.header}>
      {/* Left: Brand */}
      <View style={styles.headerLeft}>
        <AppLogo size={36} borderRadius={10} intensity={50} />
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>KOUL</Text>
        </View>
      </View>
      
      {/* Right: Actions */}
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7} style={{ marginRight: 8 }}>
            <GlassView style={styles.iconBtn} intensity={20} borderRadius={20}>
            {mode === 'dark' ? (
                <Sun size={18} color={colors.warning} fill={colors.warning} />
            ) : (
                <Moon size={18} color={colors.textSecondary} fill={colors.textSecondary} />
            )}
            </GlassView>
        </TouchableOpacity>

        {isAuthenticated ? (
            // Authenticated: User Avatar
            <GlassView style={styles.userAvatar} intensity={30} borderRadius={20}>
                <Text style={{ fontWeight: 'bold', color: colors.primary }}>U</Text>
            </GlassView>
        ) : (
            // Guest: Smart "Connect" Call-to-Action
            <TouchableOpacity onPress={onLogin} activeOpacity={0.8}>
                <GlassView style={[styles.connectBtn, { backgroundColor: colors.primary }]} intensity={80} borderRadius={20}>
                    <User size={14} color="#fff" />
                    <Text style={styles.connectText}>Connecti</Text>
                </GlassView>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

const AppContent = () => {
  // Navigation & Splash State
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  
  // Modals
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showLogSuccess, setShowLogSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Global Data
  const { logMeal, dailyScans, incrementScans, isPro, upgradeToPro } = useStats();
  const { mode } = useTheme();

  // --- Handlers ---
  
  const handleAuthenticated = useCallback((user: any) => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setActiveTab('home');
  }, []);

  const handleTriggerAuth = useCallback(() => {
    setShowLoginModal(true);
  }, []);

  const handleLogMeal = useCallback((totals: any) => {
    logMeal(totals);
  }, [logMeal]);

  // --- Render Helpers ---

  const renderContent = useMemo(() => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeContainer 
             onLogMeal={handleLogMeal}
             onShowLogSuccess={() => setShowLogSuccess(true)}
             dailyScans={dailyScans}
             incrementScans={incrementScans}
             isPro={isPro}
             onShowUpgrade={() => setShowUpgrade(true)}
             isGuest={!isAuthenticated}
             onTriggerAuth={handleTriggerAuth}
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
  }, [activeTab, isAuthenticated, handleLogMeal, handleTriggerAuth, dailyScans, incrementScans, isPro]);

  if (showSplash) {
      return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <LiquidBackground>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
        
        {/* Main App */}
        <View style={styles.mainAppContainer}>
          <View style={styles.contentPadding}>
            <Header isAuthenticated={isAuthenticated} onLogin={handleTriggerAuth} />
          </View>

          <Suspense fallback={<LoadingFallback />}>
              <View style={styles.tabContentContainer}>
                {renderContent}
              </View>
          </Suspense>
          
          <BottomTabs activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as Tab)} />
        </View>

        {/* Modals & Overlays */}
        {showUpgrade && (
          <View style={styles.absoluteContainer} pointerEvents="box-none">
            <UpgradeScreen 
                onClose={() => setShowUpgrade(false)} 
                onUpgrade={upgradeToPro}
            />
          </View>
        )}

        <LogSuccessModal 
          visible={showLogSuccess} 
          onClose={() => setShowLogSuccess(false)}
          onViewStats={() => { setShowLogSuccess(false); setActiveTab('stats'); }}
        />

        {/* The Lazy Auth Modal */}
        <AuthContainer 
           onAuthenticated={handleAuthenticated} 
           isModal={true} 
           visible={showLoginModal} 
           onClose={() => setShowLoginModal(false)}
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
  headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  iconBtn: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
  },
  userAvatar: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
  },
  connectBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 6,
  },
  connectText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 13,
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