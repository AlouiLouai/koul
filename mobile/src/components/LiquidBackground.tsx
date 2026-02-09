import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

interface LiquidBackgroundProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const LiquidBackground: React.FC<LiquidBackgroundProps> = ({ children, style }) => {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={colors.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
