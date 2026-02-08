import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { LiquidBackground } from '@/components/LiquidBackground';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { AppProviders } from '@/components/AppProviders';
import { initializeSupabaseClient } from '@/lib/supabase';
import { AuthStateProvider } from '@/features/auth/AuthState';




/* function RootLayoutNav() {
  const {
    showUpgrade, setShowUpgrade,
    showLogSuccess, setShowLogSuccess,
    showLoginModal, setShowLoginModal,
    setIsAuthenticated,
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


  return (

    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />

      <View style={styles.mainAppContainer}>
        <View style={styles.contentPadding}>
          <AppHeader />
        </View>

        <View style={styles.tabContentContainer}>
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
  );
} */






// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let appStateSubscription: Awaited<ReturnType<typeof initializeSupabaseClient>> | null = null;
    async function doAsyncStuff() {
      // TODO: Replace with actual logic to load initial data
      // check session , storage , preferences, .... etc.
      await new Promise(resolve => setTimeout(resolve, 500));
      appStateSubscription = await initializeSupabaseClient();
    }

    doAsyncStuff().finally(() => {
      setIsReady(true);
    });
    return () => {
      appStateSubscription?.remove();
    }
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <AppProviders>
      <AuthStateProvider>
        <LiquidBackground>
          <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="(tabs)" />
          </Stack>
        </LiquidBackground>
        <StatusBar style="auto" />
      </AuthStateProvider>
    </AppProviders>
  );
}

/* const styles = StyleSheet.create({
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
}); */
