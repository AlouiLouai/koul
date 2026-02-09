import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Utensils, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassView } from './GlassView';
import { useTheme } from '../theme/ThemeContext';

interface AppLogoProps {
  size?: number;
  intensity?: number;
  borderRadius?: number;
  inverted?: boolean;
  animated?: boolean;
}

export const AppLogo = ({ 
  size = 40, 
  intensity = 50, 
  borderRadius = 12, 
  inverted = false,
  animated = true 
}: AppLogoProps) => {
  const { colors } = useTheme();
  
  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const entranceAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;

  useEffect(() => {
    if (animated) {
      // Entrance animation
      Animated.spring(entranceAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();

      // Pulse animation for sparkles
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );

      // Rotation animation for sparkles
      const rotate = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );

      pulse.start();
      rotate.start();

      return () => {
        pulse.stop();
        rotate.stop();
      };
    }
  }, [animated]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg'],
  });

  // Layout Calculations
  const utensilSize = size * 0.55;
  const sparkleSize = size * 0.35;
  // Thinner stroke for a cleaner, high-end look. 
  // We keep it between 1.2 and 2.5 for maximum clarity.
  const strokeWidth = Math.min(2.5, Math.max(1.2, size / 45)); 

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

       {/* The Prediction (AI/Magic) */}
       <Animated.View 
         style={[
           styles.sparkleContainer, 
           { 
             top: size * 0.1, 
             right: size * 0.1,
             transform: [
               { scale: pulseAnim },
               { rotate: spin }
             ]
           }
         ]}
       >
          <Sparkles 
            size={sparkleSize} 
            color={secondaryColor} 
            fill={secondaryColor}
            strokeWidth={0} 
          />
           <Sparkles 
            size={sparkleSize} 
            color={secondaryColor} 
            strokeWidth={1}
            style={{ position: 'absolute' }}
          />
       </Animated.View>
    </View>
  );

  if (inverted === true) {
      return (
          <Animated.View style={{ transform: [{ scale: entranceAnim }] }}>
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
          </Animated.View>
      );
  }

  return (
    <Animated.View style={{ transform: [{ scale: entranceAnim }] }}>
      <GlassView 
        style={[styles.container, { width: size, height: size }]} 
        intensity={intensity} 
        borderRadius={borderRadius}
        noBorder={false}
      >
        <Content />
      </GlassView>
    </Animated.View>
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
