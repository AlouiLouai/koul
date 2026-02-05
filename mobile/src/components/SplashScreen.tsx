import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { AppLogo } from './AppLogo'; // Assumes AppLogo is in same folder or adjust import
import { useTheme } from '../theme/ThemeContext';


interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Entrance Animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Exit Timer (1.5s total visible time)
    const timer = setTimeout(() => {
        // Exit Animation
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start(() => onFinish());
    }, 2000); // 2 seconds total (enter + stay + exit)

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background[0] }]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        
        {/* Logo Section */}
        <View style={styles.logoWrapper}>
            <AppLogo size={100} borderRadius={32} inverted />
        </View>

        {/* Text Section */}
        <View style={styles.textWrapper}>
            <Text style={[styles.title, { color: colors.text }]}>Mar7ba Bik.</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Sawer sahnek, taba3 ta9tek.
            </Text>
        </View>

      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
  },
  logoWrapper: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 10,
  },
  textWrapper: {
      alignItems: 'center',
      gap: 8,
  },
  title: {
      fontSize: 32,
      fontWeight: '900',
      letterSpacing: -1,
  },
  subtitle: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      opacity: 0.8,
  }
});
