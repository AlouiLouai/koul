import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '@/components/TabBar';
import { View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1, }} edges={['top', 'left', 'right']}>
      <View style={{ flex: 1, position: 'relative', }}>
        <View style={{ paddingHorizontal: 20, }}>
          <AppHeader />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 20, }}>
          <Tabs
            tabBar={props => <TabBar {...props} />}
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              sceneStyle: { backgroundColor: 'transparent' },
            }}
          >
            <Tabs.Screen name="index" options={{ title: 'Home' }} />
            <Tabs.Screen name="scan" options={{ title: 'Scan' }} />
            <Tabs.Screen name="stats" options={{ title: 'Stats' }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
          </Tabs>
        </View>
      </View>
    </SafeAreaView>
  );
}

