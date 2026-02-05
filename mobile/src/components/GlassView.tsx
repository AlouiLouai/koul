import React from 'react';
import { View, ViewStyle, Platform, StyleProp, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../theme/ThemeContext';

interface GlassViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  borderRadius?: number;
  noBorder?: boolean;
}

export const GlassView: React.FC<GlassViewProps> = ({ 
  children, 
  style, 
  intensity = 40, 
  borderRadius = 24,
  noBorder = false,
}) => {
  const { colors, mode } = useTheme();

  // Manual border styles because Tailwind doesn't support directional opacity well for borders in RN
  const borderStyle = noBorder === false ? {
    borderWidth: 1.5,
    borderColor: colors.glassBorder,
    borderTopColor: mode === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
    borderLeftColor: mode === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
    borderRightColor: mode === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
    borderBottomColor: mode === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
  } : {};

  return (
    <View 
      style={[
        styles.container,
        { borderRadius, backgroundColor: colors.glass }, 
        borderStyle,
        style
      ]}
    >
      <BlurView 
        intensity={intensity} 
        tint={mode === 'dark' ? 'dark' : 'light'}
        experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : 'none'}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});