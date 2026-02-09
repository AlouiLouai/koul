import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { AppLogo } from './AppLogo';
import { useTheme } from '../theme/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';


interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const { colors } = useTheme();
  
  // Animation Values
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(50)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(20)).current;
  
  const containerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Sequence of animations
    const animation = Animated.sequence([
      // 1. Logo Entrance
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      
      // 2. Title Entrance
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      
      // 3. Subtitle Entrance
      Animated.parallel([
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(subtitleTranslateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ]);

    animation.start();

    // Exit Timer
    const timer = setTimeout(() => {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
      <LinearGradient
        colors={[colors.background[0], colors.background[1] || colors.background[0]]}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.content}>
        {/* Logo Section */}
        <Animated.View 
          style={[
            styles.logoWrapper, 
            { 
              opacity: logoOpacity,
              transform: [
                { scale: logoScale },
                { translateY: logoTranslateY }
              ] 
            }
          ]}
        >
          <AppLogo size={120} borderRadius={38} inverted />
        </Animated.View>

        {/* Text Section */}
        <View style={styles.textWrapper}>
          <Animated.Text 
            style={[
              styles.title, 
              { 
                color: colors.text,
                opacity: titleOpacity,
                transform: [{ translateY: titleTranslateY }]
              }
            ]}
          >
            KOUL.
          </Animated.Text>
          <Animated.Text 
            style={[
              styles.subtitle, 
              { 
                color: colors.textSecondary,
                opacity: subtitleOpacity,
                transform: [{ translateY: subtitleTranslateY }]
              }
            ]}
          >
            Sawer sahnek, taba3 ta9tek.
          </Animated.Text>
        </View>
      </View>
      
      {/* Subtle branding at bottom */}
      <Animated.View style={[styles.footer, { opacity: subtitleOpacity }]}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Premium AI Nutrition
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  logoWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 15,
  },
  textWrapper: {
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    opacity: 0.8,
    maxWidth: '80%',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    opacity: 0.5,
  }
});
