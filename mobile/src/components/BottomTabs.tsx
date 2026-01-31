import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Platform } from 'react-native';
import { Home, PieChart, User as UserIcon } from 'lucide-react-native';

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomTabs = ({ activeTab, onTabChange }: BottomTabsProps) => {
  const TabButton = ({ name, icon: Icon, isActive, onPress }: any) => {
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
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Animated.View style={[
          tabStyles.tabIconContainer, 
          isActive && tabStyles.activeTabContainer,
          { transform: [{ scale }] }
        ]}>
          <Icon 
            size={24} 
            color={isActive ? '#10b981' : '#a1a1aa'} 
            strokeWidth={isActive ? 2.5 : 2}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tabStyles.container}>
      <View style={tabStyles.dockContainer}>
        <TabButton 
          name="home" 
          icon={Home} 
          isActive={activeTab === 'home'} 
          onPress={() => onTabChange('home')} 
        />
        <TabButton 
          name="stats" 
          icon={PieChart} 
          isActive={activeTab === 'stats'} 
          onPress={() => onTabChange('stats')} 
        />
        <TabButton 
          name="profile" 
          icon={UserIcon} 
          isActive={activeTab === 'profile'} 
          onPress={() => onTabChange('profile')} 
        />
      </View>
    </View>
  );
};

const tabStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 24, 
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 50,
  },
  dockContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.95)', // Slight glass effect
    borderRadius: 32,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
    justifyContent: 'space-between',
    width: 'auto',
    minWidth: 220,
    gap: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
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
  activeTabContainer: {
    backgroundColor: '#ecfdf5',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});
