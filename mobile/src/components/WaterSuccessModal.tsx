import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { Droplets, Waves, Trophy, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassView } from './GlassView';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

interface WaterSuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

export const WaterSuccessModal = ({ visible, onClose }: WaterSuccessModalProps) => {
  const { colors } = useTheme();
  
  // Animations
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(floatAnim, { toValue: -15, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
            Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) })
          ])
        )
      ]).start();
    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
          scaleAnim.setValue(0);
          floatAnim.setValue(0);
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View 
        style={[
          styles.containerWrapper, 
          { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }
        ]}
      >
        <GlassView style={styles.modalContainer} intensity={100} borderRadius={40} noBorder>
            
            {/* Celebration Background (Abstract Waves) */}
            <View style={styles.waveContainer}>
                <Waves size={width * 0.8} color={colors.primary + '10'} style={styles.waves} />
            </View>

            {/* Premium Icon Header */}
            <Animated.View style={[styles.headerWrapper, { transform: [{ translateY: floatAnim }] }]}>
                <LinearGradient
                    colors={[colors.primary, '#60a5fa']}
                    style={styles.mainCircle}
                >
                    <Droplets size={54} color="#fff" fill="#fff" />
                    <View style={styles.sparkleOverlay}>
                        <Sparkles size={100} color="rgba(255,255,255,0.2)" />
                    </View>
                </LinearGradient>
                <View style={[styles.trophyBadge, { backgroundColor: colors.warning }]}>
                    <Trophy size={16} color="#fff" fill="#fff" />
                </View>
            </Animated.View>

            {/* Content Section */}
            <View style={styles.textSection}>
                <Text style={[styles.title, { color: colors.text }]}>Sa7a w Bechfé! 🌊</Text>
                <Text style={[styles.message, { color: colors.textSecondary }]}>
                   M3allem! Kamelt <Text style={{color: colors.primary, fontWeight: '900'}}>3 Litrat</Text> kamla lyoum. Golltek m3abbia w badnek rwi!
                </Text>
            </View>

            {/* Interactive Stats/Badges */}
            <View style={styles.badgeRow}>
                <View style={[styles.miniBadge, { backgroundColor: colors.primary + '10' }]}>
                    <Text style={[styles.miniBadgeText, { color: colors.primary }]}>+50 XP</Text>
                </View>
                <View style={[styles.miniBadge, { backgroundColor: colors.success + '10' }]}>
                    <Text style={[styles.miniBadgeText, { color: colors.success }]}>Goal Reached</Text>
                </View>
            </View>

            {/* Action Button */}
            <TouchableOpacity 
                style={styles.primaryBtnWrapper} 
                onPress={onClose}
                activeOpacity={0.9}
            >
                <LinearGradient
                    colors={[colors.primary, '#2563eb']}
                    style={styles.primaryBtn}
                >
                    <Text style={styles.primaryBtnText}>Tayara, Yar7em Weldik!</Text>
                </LinearGradient>
            </TouchableOpacity>

        </GlassView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3000,
    padding: 24,
  },
  containerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    padding: 32,
    alignItems: 'center',
    overflow: 'hidden',
  },
  waveContainer: {
      position: 'absolute',
      top: -100,
      zIndex: 0,
  },
  waves: {
      opacity: 0.5,
  },
  headerWrapper: {
      position: 'relative',
      marginBottom: 32,
      zIndex: 10,
  },
  mainCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
      shadowColor: '#3b82f6',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.4,
      shadowRadius: 20,
  },
  sparkleOverlay: {
      position: 'absolute',
  },
  trophyBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: '#fff',
      elevation: 5,
  },
  textSection: {
      alignItems: 'center',
      marginBottom: 24,
      zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -1,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  badgeRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 32,
      zIndex: 10,
  },
  miniBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
  },
  miniBadgeText: {
      fontSize: 12,
      fontWeight: '900',
      textTransform: 'uppercase',
  },
  primaryBtnWrapper: {
      width: '100%',
      zIndex: 10,
  },
  primaryBtn: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },
});
