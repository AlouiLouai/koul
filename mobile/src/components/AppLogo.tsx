import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Utensils, Scan } from 'lucide-react-native';
import { GlassView } from './GlassView';
import { useTheme } from '../theme/ThemeContext';

interface AppLogoProps {
  size?: number;
  intensity?: number;
  borderRadius?: number;
}

export const AppLogo = ({ size = 40, intensity = 50, borderRadius = 12 }: AppLogoProps) => {
  const { colors } = useTheme();
  
  // Scales based on base size
  const iconSize = size * 0.65;
  const overlaySize = size * 0.35;
  const strokeWidth = size > 60 ? 3 : 2;

  return (
    <GlassView 
      style={[styles.container, { width: size, height: size }]} 
      intensity={intensity} 
      borderRadius={borderRadius}
    >
      <View style={styles.logoOverlay}>
        <Utensils 
            size={overlaySize} 
            color={colors.primary} 
            strokeWidth={strokeWidth + 1} 
        />
      </View>
      <Scan 
        size={iconSize} 
        color={colors.primary} 
        strokeWidth={strokeWidth} 
      />
    </GlassView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoOverlay: {
    position: 'absolute',
    zIndex: 1,
  },
});