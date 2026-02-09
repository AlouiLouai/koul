import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { ArrowRight, Sparkles } from 'lucide-react-native';
import { LiquidBackground } from '@/components/LiquidBackground';
import { GlassView } from '@/components/GlassView';
import { AppLogo } from '@/components/AppLogo';
import { useTheme } from '@/theme/ThemeContext';

const { width } = Dimensions.get('window');

interface AuthUIProps {
  onGoogleLogin: () => void;
  isLoading: boolean;
}

export const AuthUI = ({ onGoogleLogin, isLoading }: AuthUIProps) => {
  const { colors, mode } = useTheme();

  // Animations
  const animEntrance = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const orbScale = useRef(new Animated.Value(1)).current;
  const orbRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Single Sequence Entrance
    Animated.timing(animEntrance, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    }).start();

    // Floating Effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -10, duration: 2500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) })
      ])
    ).start();

    // Orb Dynamics
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(orbScale, { toValue: 1.2, duration: 6000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
          Animated.timing(orbScale, { toValue: 1, duration: 6000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) })
        ]),
        Animated.timing(orbRotate, { toValue: 1, duration: 40000, useNativeDriver: true, easing: Easing.linear })
      ])
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spin = orbRotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const formY = animEntrance.interpolate({ inputRange: [0, 1], outputRange: [100, 0] });
  const formOpacity = animEntrance.interpolate({ inputRange: [0.5, 1], outputRange: [0, 1] });

  return (
    <LiquidBackground>
      <View style={styles.container}>

        {/* Living Background Orb - Matching Main Screen Blue */}
        <Animated.View style={[
          styles.orb,
          {
            backgroundColor: colors.primary,
            transform: [{ scale: orbScale }, { rotate: spin }],
            opacity: 0.1
          }
        ]} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <View style={{ height: 80 }} />

          <Animated.View style={[
            styles.formContainer,
            {
              opacity: formOpacity,
              transform: [{ translateY: formY }]
            }
          ]}>
            <View style={styles.welcomeText}>
              {/* Centered Inverted Logo - Refined Size */}
              <View style={styles.brandingHeader}>
                <AppLogo size={64} borderRadius={20} inverted />
              </View>

              <Text style={[styles.headerText, { color: colors.text }]}>Mar7ba Bik.</Text>
              <Text style={[styles.subHeaderText, { color: colors.textSecondary }]}>
                Sawar sahnek, Erwi 3rougek.
              </Text>
            </View>

            <TouchableOpacity
              onPress={onGoogleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
              style={{ alignSelf: 'center', width: 280 }}
            >
              <GlassView style={[
                styles.googleBtn,
                {
                  backgroundColor: mode === 'dark' ? '#18181b' : '#fff',
                  borderColor: colors.text + '20',
                  borderWidth: 1,
                  shadowColor: colors.accent,
                }
              ]} intensity={20} borderRadius={24}>
                {isLoading ? (
                  <View style={styles.loadingWrapper}>
                    <ActivityIndicator color={colors.text} size="small" />
                    <Text style={[styles.btnText, { color: colors.text, flex: 0 }]}>Lahtha...</Text>
                  </View>
                ) : (
                  <>
                    <View style={[styles.iconCircle, { shadowColor: '#000', elevation: 2 }]}>
                      <Text style={{ fontSize: 24, fontWeight: '900', color: '#4285F4' }}>G</Text>
                    </View>
                    <Text style={[styles.btnText, { color: colors.text }]}>Connecti b&apos; Google</Text>
                    <ArrowRight size={20} color={colors.text} opacity={0.4} />
                  </>
                )}
              </GlassView>
            </TouchableOpacity>

            <View style={styles.healthTagline}>
              <Sparkles size={14} color={colors.primary} />
              <Text style={[styles.footerText, { color: colors.textSecondary, marginTop: 0 }]}>
                KOUL MLI7, T3ICH MLI7
              </Text>
            </View>

            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              © 2026 KHOUL AI • Tounes
            </Text>
          </Animated.View>

        </ScrollView>
      </View>
    </LiquidBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  orb: {
    position: 'absolute',
    top: -width * 0.5,
    left: -width * 0.2,
    width: width * 1.4,
    height: width * 1.4,
    borderRadius: width * 0.7,
    zIndex: 0,
  },
  formContainer: {
    paddingHorizontal: 24,
    width: '100%',
  },
  brandingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  leafIcon: {
    marginLeft: -2,
    marginTop: -10,
  },
  welcomeText: {
    gap: 4,
    marginBottom: 32,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.7,
  },
  healthTagline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 8,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  loadingWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
  },
  footerText: {
    fontSize: 11,
    textAlign: 'center',
    opacity: 0.5,
    fontWeight: '600',
    marginTop: 40,
  },
});