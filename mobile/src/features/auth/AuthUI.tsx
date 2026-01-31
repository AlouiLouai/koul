import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Animated, 
  Easing,
  ActivityIndicator
} from 'react-native';
import { Utensils, ArrowRight } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface AuthUIProps {
  onGoogleLogin: () => void;
  isLoading: boolean;
}

export const AuthUI = ({ onGoogleLogin, isLoading }: AuthUIProps) => {
  const [phase, setPhase] = useState<'splash' | 'login'>('splash');
  
  // Animations
  const animScale = useRef(new Animated.Value(1)).current;
  const animHeight = useRef(new Animated.Value(height * 0.4)).current; 
  const animFormOpacity = useRef(new Animated.Value(0)).current;
  const animFormY = useRef(new Animated.Value(50)).current;

  // Initial Splash Sequence
  useEffect(() => {
    if (phase === 'splash') {
      const timerId = setTimeout(() => {
        setPhase('login');
        
        Animated.parallel([
          Animated.timing(animHeight, {
            toValue: height * 0.35,
            duration: 800,
            useNativeDriver: false,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
          Animated.timing(animScale, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: false,
          }),
          Animated.timing(animFormOpacity, {
            toValue: 1,
            duration: 600,
            delay: 300,
            useNativeDriver: false,
          }),
          Animated.timing(animFormY, {
            toValue: 0,
            duration: 600,
            delay: 300,
            useNativeDriver: false,
            easing: Easing.out(Easing.back(1.5)),
          }),
        ]).start();
      }, 2000);
      return () => clearTimeout(timerId);
    }
  }, [phase]);

  return (
    <View style={styles.container}>
      <View style={styles.bgDecoration} />
      
      <View style={styles.innerContainer}>
        <Animated.View style={[
          styles.logoContainer, 
          { 
            height: animHeight,
            transform: [{ scale: animScale }]
          }
        ]}>
          <View style={styles.logoBox}>
            <Utensils size={phase === 'splash' ? 48 : 32} color="#fff" />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.logoText}>KOUL</Text>
            <View style={styles.underline} />
          </View>
          {phase === 'splash' && (
            <Text style={styles.splashTagline}>TBIBAK EL DHKI FI TOUNES</Text>
          )}
        </Animated.View>

        {phase === 'login' && (
          <Animated.View style={[
            styles.formWrapper,
            {
              opacity: animFormOpacity,
              transform: [{ translateY: animFormY }]
            }
          ]}>
            <View style={styles.card}>
              <View>
                <Text style={styles.cardTitle}>Mar7ba Bik</Text>
                <Text style={styles.cardSubtitle}>
                  Sajel bach taba3 makletek, t7alel sa7nek, w tousel l'ahdafek.
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.googleBtn, isLoading && styles.googleBtnDisabled]}
                onPress={onGoogleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <>
                    <View style={styles.gIcon}>
                      <Text style={{fontSize: 18, fontWeight: 'bold', color: '#10b981'}}>G</Text>
                    </View>
                    <Text style={styles.googleBtnText}>Kamel b'Google</Text>
                    <ArrowRight size={20} color="#fff" style={{ marginLeft: 'auto' }} />
                  </>
                )}
              </TouchableOpacity>
              
              <Text style={styles.termsText}>
                Ki tkamel, ya3ni mouafre9 3ala chourout l'isti3mél mté3na.
              </Text>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF7',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bgDecoration: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFBF7',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: '#10b981',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#18181b',
    letterSpacing: -1,
  },
  underline: {
    height: 4,
    width: 40,
    backgroundColor: '#10b981',
    borderRadius: 2,
    marginTop: 4,
    opacity: 0.5,
  },
  splashTagline: {
    marginTop: 24,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#a1a1aa',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  formWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 48,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 32,
    padding: 32,
    width: '100%',
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    gap: 32,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#18181b',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#71717a',
    textAlign: 'center',
    lineHeight: 22,
  },
  googleBtn: {
    backgroundColor: '#18181b',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderRadius: 16,
    paddingHorizontal: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  googleBtnDisabled: {
    opacity: 0.7,
  },
  gIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#a1a1aa',
    textAlign: 'center',
    lineHeight: 18,
  },
});