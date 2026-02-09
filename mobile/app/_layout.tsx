import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { AppProviders } from '@/components/AppProviders';
import { initializeSupabaseClient } from '@/lib/supabase';
import { AuthStateProvider } from '@/features/auth/AuthState';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { ModalsProvider } from '@/modals/ModalsProvider';

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
        <GestureHandlerRootView>
          <ModalsProvider>
            <Stack screenOptions={{ headerShown: false }} >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="login" options={{ presentation: 'modal' }} />
              <Stack.Screen name="upgrade" options={{ presentation: 'modal' }} />
              <Stack.Screen name="payment" options={{ presentation: 'modal' }} />
            </Stack>
          </ModalsProvider>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </AuthStateProvider>
    </AppProviders>
  );
}