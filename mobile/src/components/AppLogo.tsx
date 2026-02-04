import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Utensils, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassView } from './GlassView';
import { useTheme } from '../theme/ThemeContext';

interface AppLogoProps {
  size?: number;
  intensity?: number;
  borderRadius?: number;
  inverted?: boolean;
}

export const AppLogo = ({ size = 40, intensity = 50, borderRadius = 12, inverted = false }: AppLogoProps) => {
  const { colors } = useTheme();

  // Layout Calculations
  const utensilSize = size * 0.55;
  const sparkleSize = size * 0.35;
  const strokeWidth = Math.max(2, size / 20); 

  // Colors
  const iconColor = inverted === true ? '#ffffff' : colors.primary;
  const secondaryColor = colors.warning; // Always yellow for consistency
  
  const Content = () => (
    <View style={styles.innerContainer}>
       {/* The Meal (Subject) */}
       <Utensils 
         size={utensilSize} 
         color={iconColor} 
         strokeWidth={strokeWidth}
         style={{ marginRight: size * 0.05, marginBottom: -size * 0.02 }}
       />

       {/* The Prediction (AI/Magic) - Moved slightly away to not cover the knife */}
       <View style={[styles.sparkleContainer, { top: size * 0.1, right: size * 0.1 }]}>
          <Sparkles 
            size={sparkleSize} 
            color={secondaryColor} 
            fill={secondaryColor}
            strokeWidth={0} 
          />
           <Sparkles 
            size={sparkleSize} 
            color={secondaryColor} 
            strokeWidth={1.5}
            style={{ position: 'absolute' }}
          />
       </View>
    </View>
  );

  if (inverted === true) {
      return (
          <LinearGradient
            colors={[colors.primary, '#60a5fa']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
                styles.container, 
                { width: size, height: size, borderRadius, borderWidth: 0 } 
            ]}
          >
              <Content />
          </LinearGradient>
      );
  }

  return (
    <GlassView 
      style={[styles.container, { width: size, height: size }]} 
      intensity={intensity} 
      borderRadius={borderRadius}
      noBorder={false}
    >
      <Content />
    </GlassView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  innerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
  },
  sparkleContainer: {
      position: 'absolute',
      zIndex: 2,
  },
});
