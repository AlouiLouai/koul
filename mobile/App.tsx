import React, { useState, Suspense, lazy, useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Text, ActivityIndicator } from 'react-native';
import { Utensils, Scan } from 'lucide-react-native';

// --- Critical Imports (Loaded Immediately) ---
import { AuthContainer } from './src/features/auth';
import { BottomTabs } from './src/components/BottomTabs';
import { LogSuccessModal } from './src/components/LogSuccessModal';
import { UpgradeScreen } from './src/components/UpgradeScreen';
import { useStats } from './src/hooks/useStats';

// --- Lazy Imports (Code Splitting for Performance) ---
const HomeContainer = lazy(() => import('./src/features/home').then(module => ({ default: module.HomeContainer })));
const StatsContainer = lazy(() => import('./src/features/stats').then(module => ({ default: module.StatsContainer })));
const ProfileContainer = lazy(() => import('./src/features/profile').then(module => ({ default: module.ProfileContainer })));

// --- Types ---
type Tab = 'home' | 'stats' | 'profile';

// --- Sub-Components (Memoized for Render Performance) ---

const LoadingFallback = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#10b981" />
  </View>
);

const Header = React.memo(() => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <View style={styles.headerLogoContainer}>
        <View style={styles.logoOverlay}>
          <Utensils size={14} color="#10b981" strokeWidth={3} />
        </View>
        <Scan size={26} color="#10b981" strokeWidth={2} />
      </View>
      <View>
        <Text style={styles.headerTitle}>KOUL</Text>
      </View>
    </View>
  </View>
));

// --- Main Application ---

export default function App() {
  // Navigation State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showLogSuccess, setShowLogSuccess] = useState(false);

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
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
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
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF7',
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
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10b981',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0fdf4',
    position: 'relative',
  },
  logoOverlay: {
    position: 'absolute',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#27272a',
    letterSpacing: -0.5,
  },
});