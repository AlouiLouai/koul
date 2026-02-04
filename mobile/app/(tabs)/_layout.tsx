import React, { useEffect, useRef } from 'react';
import { Tabs } from 'expo-router';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Home, PieChart, User as UserIcon, Camera } from 'lucide-react-native';
import { GlassView } from '../../src/components/GlassView';
import { useTheme } from '../../src/theme/ThemeContext';

const TabButton = ({ icon: Icon, isActive, onPress }: any) => {
  const { colors } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isActive ? 1.1 : 1,
      useNativeDriver: true,
      friction: 10,
      tension: 50,
    }).start();
  }, [isActive]);

  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.7}
      style={tabStyles.tabButtonWrapper}
    >
      <Animated.View style={[
        tabStyles.tabIconContainer, 
        isActive && { backgroundColor: colors.primary + '20' },
        { transform: [{ scale }] }
      ]}>
        <Icon 
          size={24} 
          color={isActive ? colors.primary : colors.textSecondary} 
          strokeWidth={isActive ? 2.5 : 2}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

function CustomTabBar({ state, navigation }: any) {
  return (
    <View style={tabStyles.container}>
      <GlassView 
        style={tabStyles.dockContainer} 
        intensity={60} 
        borderRadius={32}
        noBorder={true}
      >
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let icon;
          if (route.name === 'index') icon = Home;
          else if (route.name === 'scan') icon = Camera;
          else if (route.name === 'stats') icon = PieChart;
          else if (route.name === 'profile') icon = UserIcon;

          return (
            <TabButton
              key={route.key}
              icon={icon}
              isActive={isFocused}
              onPress={onPress}
            />
          );
        })}
      </GlassView>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs 
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
        sceneStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          headerShown: false,
        }} 
      />
      <Tabs.Screen 
        name="scan" 
        options={{ 
          title: 'Scan',
          headerShown: false,
        }} 
      />
      <Tabs.Screen 
        name="stats" 
        options={{ 
          title: 'Stats',
          headerShown: false,
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          headerShown: false,
        }} 
      />
    </Tabs>
  );
}

const tabStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24, 
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 50,
  },
  dockContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'space-between',
    width: 'auto',
    minWidth: 220,
    gap: 20,
  },
  tabButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
  tabIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
