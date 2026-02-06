import React, { useEffect, useRef } from 'react';
import { Tabs } from 'expo-router';
import { View, TouchableOpacity, Animated, StyleSheet, Platform } from 'react-native';
import { Home, PieChart, User as UserIcon, Camera } from 'lucide-react-native';
import { GlassView } from '../../src/components/GlassView';
import { useTheme } from '../../src/theme/ThemeContext';

const TabButton = ({ icon: Icon, isActive, onPress }: any) => {
  const { colors, mode } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;
  const highlightScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isActive ? 1.1 : 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.timing(opacity, {
        toValue: isActive ? 1 : 0.6,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(highlightScale, {
        toValue: isActive ? 1 : 0,
        useNativeDriver: true,
        friction: 7,
        tension: 35,
      })
    ]).start();
  }, [isActive]);

  // Premium Blue Light tint for active state
  const activeBgColor = mode === 'dark' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)';
  const inactiveColor = mode === 'dark' ? 'rgba(148, 163, 184, 0.5)' : '#94a3b8';

  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.7}
      style={tabStyles.tabButtonWrapper}
    >
      <View style={tabStyles.iconWrapper}>
        <Animated.View 
            style={[
                tabStyles.highlightCircle, 
                { 
                    backgroundColor: activeBgColor,
                    transform: [{ scale: highlightScale }]
                }
            ]} 
        />
        <Animated.View style={{ opacity, transform: [{ scale }] }}>
            <Icon 
              size={24} 
              color={isActive ? colors.primary : inactiveColor} 
              strokeWidth={isActive ? 2.5 : 2}
            />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

function CustomTabBar({ state, navigation }: any) {
  const { mode } = useTheme();

  return (
    <View style={tabStyles.container}>
      <GlassView 
        style={[
            tabStyles.dockContainer,
            { 
                backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.6)',
                borderColor: mode === 'dark' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.3)',
            }
        ]} 
        intensity={mode === 'dark' ? 90 : 60}
        borderRadius={45}
      >
        <View style={tabStyles.innerContainer}>
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
        </View>
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
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="scan" options={{ title: 'Scan' }} />
      <Tabs.Screen name="stats" options={{ title: 'Stats' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

const tabStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 24, 
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 100,
  },
  dockContainer: {
    width: '100%',
    maxWidth: 360,
    paddingHorizontal: 8,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 12,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  highlightCircle: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
  }
});