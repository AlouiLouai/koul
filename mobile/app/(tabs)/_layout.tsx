import { Tabs } from 'expo-router';
import { TabBar } from '@/components/TabBar';
import { AppHeader } from '@/components/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';
import { LiquidBackground } from '@/components/LiquidBackground';

export default function TabsLayout() {
  return (
    <LiquidBackground>
      <SafeAreaView style={{ flex: 1, }} edges={['top', 'left', 'right']}>
        <View style={{ flex: 1, position: 'relative', }}>
          <View style={{ paddingHorizontal: 20, }}>
            <AppHeader />
          </View>
          <View style={{ flex: 1, paddingHorizontal: 14, }}>
            <Tabs
              tabBar={props => <TabBar {...props} />}
              detachInactiveScreens={true}
              screenLayout={({ children }) => {
                return (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{ paddingBottom: 110 }}>
                    {children}
                  </ScrollView>
                );
              }}
              screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                sceneStyle: { backgroundColor: 'transparent' }
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
    </LiquidBackground>
  );
}