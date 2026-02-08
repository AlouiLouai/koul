import React, { useState, useCallback, useEffect } from 'react';
import { Slot, useRouter } from 'expo-router';
import { ThemeProvider, useTheme } from '../src/theme/ThemeContext';
import { useStatsStore } from '@/store/useStatsStore';
import { UIProvider, useUI } from '@/hooks/UIContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LiquidBackground } from '@/components/LiquidBackground';
import { SplashScreen } from '@/components/SplashScreen';
import { AuthContainer } from '@/features/auth';
import { UpgradeScreen } from '@/components/UpgradeScreen';
import { LogSuccessModal } from '@/components/LogSuccessModal';
import { ClickToPayModal } from '@/components/ClickToPayModal';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppHeader } from '@/components/AppHeader';



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
            <AppHeader />
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
});
