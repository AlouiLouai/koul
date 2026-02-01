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
import { Utensils, ArrowRight, Sparkles } from 'lucide-react-native';
import { LiquidBackground } from '../../components/LiquidBackground';
import { GlassView } from '../../components/GlassView';
import { AppLogo } from '../../components/AppLogo';
import { useTheme } from '../../theme/ThemeContext';

const { width } = Dimensions.get('window');

interface AuthUIProps {
  onGoogleLogin: () => void;
  isLoading: boolean;
}

export const AuthUI = ({ onGoogleLogin, isLoading }: AuthUIProps) => {
  const { colors } = useTheme();
  
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
      useNativeDriver: false, // Animating layout properties later? No, mostly opacity/translate.
      easing: Easing.out(Easing.exp),
    }).start();

    // Floating Effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -15, duration: 2500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) })
      ])
    ).start();

    // Orb Dynamics
    Animated.loop(
      Animated.parallel([
          Animated.sequence([
              Animated.timing(orbScale, { toValue: 1.3, duration: 5000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
              Animated.timing(orbScale, { toValue: 1, duration: 5000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) })
          ]),
          Animated.timing(orbRotate, { toValue: 1, duration: 30000, useNativeDriver: true, easing: Easing.linear })
      ])
    ).start();
  }, []);

  const spin = orbRotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const logoY = animEntrance.interpolate({ inputRange: [0, 1], outputRange: [100, 0] });
  const formY = animEntrance.interpolate({ inputRange: [0, 1], outputRange: [200, 0] });
  const formOpacity = animEntrance.interpolate({ inputRange: [0.5, 1], outputRange: [0, 1] });

  return (
    <LiquidBackground>
      <View style={styles.container}>
        
        {/* Living Background Orb */}
        <Animated.View style={[
            styles.orb, 
            { 
                backgroundColor: colors.primary,
                transform: [{ scale: orbScale }, { rotate: spin }],
                opacity: 0.12
            } 
        ]} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* Header Section */}
            <Animated.View style={[
              styles.logoContainer, 
              { 
                opacity: animEntrance,
                transform: [{ translateY: Animated.add(logoY, floatAnim) }]
              }
            ]}>
              <View style={styles.logoWrapper}>
                 <Animated.View style={[styles.glowRing, { borderColor: colors.primary, transform: [{ rotate: spin }] }]} />
                 <AppLogo size={100} borderRadius={50} intensity={40} />
              </View>
              
              <View style={styles.titleWrapper}>
                <Text style={[styles.appTitle, { color: colors.text }]}>KOUL</Text>
                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.appYear, { color: colors.primary }]}>2026</Text>
              </View>

              <GlassView style={styles.tagline} intensity={20} borderRadius={20}>
                  <Text style={[styles.taglineText, { color: colors.text }]}>THE FUTURE OF HEALTH</Text>
              </GlassView>
            </Animated.View>

            {/* Combined Login Section */}
            <Animated.View style={[
              styles.formContainer,
              {
                opacity: formOpacity,
                transform: [{ translateY: formY }]
              }
            ]}>
              <View style={styles.welcomeText}>
                <Text style={[styles.headerText, { color: colors.text }]}>Mar7ba Bik.</Text>
                <Text style={[styles.subHeaderText, { color: colors.textSecondary }]}>
                   Sawar sahnek, Erwi 3rougek.
                </Text>
              </View>

              <TouchableOpacity
                onPress={onGoogleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <GlassView style={[styles.googleBtn, { backgroundColor: colors.text }]} intensity={20} borderRadius={24}>
                    {isLoading ? (
                      <ActivityIndicator color={colors.background[0]} />
                    ) : (
                      <>
                        <View style={styles.iconCircle}>
                           <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text}}>G</Text>
                        </View>
                        <Text style={[styles.btnText, { color: colors.background[0] }]}>Login with Google</Text>
                        <ArrowRight size={20} color={colors.background[0]} />
                      </>
                    )}
                </GlassView>
              </TouchableOpacity>
              
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                © 2026 KOUL AI • Tunisia
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
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  logoWrapper: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
  },
  logoGlass: {
      width: 100,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.5)',
  },
  glowRing: {
      position: 'absolute',
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 2,
      borderStyle: 'dashed',
      opacity: 0.4,
  },
  titleWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-start',
  },
  appTitle: {
      fontSize: 72,
      fontWeight: '900',
      letterSpacing: -4,
      lineHeight: 80,
  },
  dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#2563eb',
      marginTop: 50,
      marginHorizontal: 4,
  },
  appYear: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 12,
      letterSpacing: 2,
  },
  tagline: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      marginTop: 10,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
  },
  taglineText: {
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 4,
  },
  formContainer: {
      paddingHorizontal: 24,
      width: '100%',
  },
  loginCard: {
      padding: 32,
      gap: 32,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.8)',
  },
  welcomeText: {
      gap: 8,
      marginBottom: 32,
      alignItems: 'center',
  },
  headerText: {
      fontSize: 36,
      fontWeight: '900',
      letterSpacing: -1,
  },
  subHeaderText: {
      fontSize: 16,
      fontWeight: '600',
      opacity: 0.7,
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
  iconCircle: {
      width: 48,
      height: 48,
      borderRadius: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  btnText: {
      fontSize: 17,
      fontWeight: '800',
      flex: 1,
  },
  footerText: {
      fontSize: 11,
      textAlign: 'center',
      opacity: 0.5,
      fontWeight: '700',
      marginTop: 40,
  },
});