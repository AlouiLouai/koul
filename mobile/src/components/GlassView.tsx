import React from 'react';
import { StyleSheet, View, ViewStyle, Platform, StyleProp } from 'react-native';
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
  const { colors } = useTheme();

  // Combine borders with theme colors
  const borderStyle = !noBorder ? {
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderTopColor: colors.mode === 'light' ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.2)',
    borderLeftColor: colors.mode === 'light' ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.2)',
    borderRightColor: colors.mode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.05)',
    borderBottomColor: colors.mode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.05)',
  } : {};

  return (
    <View style={[
      styles.container, 
      { borderRadius, backgroundColor: colors.glass }, 
      borderStyle,
      styles.shadow,
      style
    ]}>
      <BlurView 
        intensity={intensity} 
        tint={colors.tint} 
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
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
