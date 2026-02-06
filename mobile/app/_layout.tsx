import React, { useState, useCallback, useEffect } from 'react';
import { Slot, useRouter } from 'expo-router';
import { ThemeProvider, useTheme } from '../src/theme/ThemeContext';
import { useStatsStore } from '../src/store/useStatsStore';
import { UIProvider, useUI } from '../src/hooks/UIContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LiquidBackground } from '../src/components/LiquidBackground';
import { SplashScreen } from '../src/components/SplashScreen';
import { AuthContainer } from '../src/features/auth';
import { UpgradeScreen } from '../src/components/UpgradeScreen';
import { LogSuccessModal } from '../src/components/LogSuccessModal';
import { ClickToPayModal } from '../src/components/ClickToPayModal';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppLogo } from '../src/components/AppLogo';
import { GlassView } from '../src/components/GlassView';
import { Sun, Moon } from 'lucide-react-native';
import { GoogleLogo } from '../src/components/GoogleLogo';

const Header = React.memo(() => {
  const { colors, mode, toggleTheme } = useTheme();
  const { isAuthenticated, setShowLoginModal } = useUI();
  const router = useRouter();
  
  const handleGoHome = () => {
    router.replace('/');
  };
  
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.headerLeft} 
        onPress={handleGoHome}
        activeOpacity={0.7}
      >
        <AppLogo size={36} borderRadius={10} intensity={50} animated={false} />
        <View>
          <Text style={[styles.headerTitle, { color: colors.primary }]}>KOUL</Text>
        </View>
      </TouchableOpacity>
      
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
            <GlassView style={styles.userAvatar} intensity={30} borderRadius={20}>
                <Text style={{ fontWeight: 'bold', color: colors.primary }}>U</Text>
            </GlassView>
        ) : (
            <TouchableOpacity onPress={() => setShowLoginModal(true)} activeOpacity={0.8}>
                <GlassView style={styles.iconBtn} intensity={30} borderRadius={20}>
                    <GoogleLogo size={20} />
                </GlassView>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

function RootLayoutNav() {
  const { 
    showUpgrade, setShowUpgrade, 
    showLogSuccess, setShowLogSuccess,
    showLoginModal, setShowLoginModal,
    setIsAuthenticated,
    showSplash, setShowSplash,
    showClickToPay, setShowClickToPay
  } = useUI();
  const { upgradeToPro, lastResetDate, resetDaily } = useStatsStore();
  const { mode } = useTheme();
  const router = useRouter();

  // Handle Daily Reset
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastResetDate !== today) {
      resetDaily();
    }
  }, [lastResetDate, resetDaily]);

  const handleAuthenticated = useCallback(() => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
  }, [setIsAuthenticated, setShowLoginModal]);

  const handleUpgradeIntent = useCallback(() => {
    setShowUpgrade(false);
    setShowClickToPay(true);
  }, [setShowUpgrade, setShowClickToPay]);

  const handlePaymentComplete = useCallback(() => {
    upgradeToPro();
    setShowClickToPay(false);
    router.replace('/stats');
  }, [upgradeToPro, setShowClickToPay, router]);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <LiquidBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
        
        <View style={styles.mainAppContainer}>
          <View style={styles.contentPadding}>
            <Header />
          </View>

          <View style={styles.tabContentContainer}>
            {/* 
              Using Slot instead of Stack here to avoid nesting Navigators inside Views 
              which is a common source of Fabric crashes in Expo Router.
              The routing logic will now be handled by the (tabs)/_layout.tsx
            */}
            <Slot />
          </View>
        </View>

        {showUpgrade && (
          <View style={styles.absoluteContainer}>
            <UpgradeScreen 
                onClose={() => setShowUpgrade(false)} 
                onUpgrade={handleUpgradeIntent}
                onRedirectHome={() => {
                    setShowUpgrade(false);
                    router.replace('/');
                }}
            />
          </View>
        )}

        <ClickToPayModal 
          visible={showClickToPay}
          onClose={() => setShowClickToPay(false)}
          onComplete={handlePaymentComplete}
        />

        <LogSuccessModal 
          visible={showLogSuccess} 
          onClose={() => setShowLogSuccess(false)}
          onAddMore={() => {
            setShowLogSuccess(false);
            router.push('/scan');
          }}
          onViewStats={() => { 
            setShowLogSuccess(false); 
            router.push('/stats');
          }}
        />

        <AuthContainer 
           onAuthenticated={handleAuthenticated} 
           isModal={true} 
           visible={showLoginModal} 
           onClose={() => setShowLoginModal(false)}
        />
      </SafeAreaView>
    </LiquidBackground>
  );
}

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60,
          },
          mutations: {
            retry: 2,
          },
        },
      })
  );

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UIProvider>
            <RootLayoutNav />
          </UIProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainAppContainer: {
    flex: 1,
    position: 'relative',
  },
  contentPadding: {
    paddingHorizontal: 20,
  },
  tabContentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  absoluteContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
});
