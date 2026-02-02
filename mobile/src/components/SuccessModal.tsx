import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { Trophy, Sparkles, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassView } from './GlassView';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

export interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: React.ReactNode;
  icon?: React.ReactNode;
  btnText?: string;
  onButtonPress?: () => void;
  secondaryBtnText?: string;
  onSecondaryPress?: () => void;
  badges?: { text: string; color: string; bg: string }[];
}

export const SuccessModal = ({ 
  visible, 
  onClose, 
  title, 
  message, 
  icon, 
  btnText = "Aywah!", 
  onButtonPress,
  secondaryBtnText,
  onSecondaryPress,
  badges = []
}: SuccessModalProps) => {
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
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(floatAnim, { toValue: -10, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
            Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) })
          ])
        )
      ]).start();
    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
          scaleAnim.setValue(0);
          floatAnim.setValue(0);
      });
    }
  }, [visible]);

  const handlePress = () => {
      if (onButtonPress) {
          onButtonPress();
      } else {
          onClose();
      }
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View 
        style={[
          styles.containerWrapper, 
          { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }
        ]}
      >
        <GlassView style={styles.modalContainer} intensity={95} borderRadius={32} noBorder>
            
            {/* Header Icon */}
            <Animated.View style={[styles.headerWrapper, { transform: [{ translateY: floatAnim }] }]}>
                <LinearGradient
                    colors={[colors.primary, '#60a5fa']}
                    style={styles.mainCircle}
                >
                    {icon || <Trophy size={40} color="#fff" fill="#fff" />}
                    <View style={styles.sparkleOverlay}>
                        <Sparkles size={70} color="rgba(255,255,255,0.2)" />
                    </View>
                </LinearGradient>
            </Animated.View>

            {/* Content Section */}
            <View style={styles.textSection}>
                <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                <Text style={[styles.message, { color: colors.textSecondary }]}>
                   {message}
                </Text>
            </View>

            {/* Badges */}
            {badges.length > 0 && (
                <View style={styles.badgeRow}>
                    {badges.map((badge, idx) => (
                        <View key={idx} style={[styles.miniBadge, { backgroundColor: badge.bg }]}>
                            <Text style={[styles.miniBadgeText, { color: badge.color }]}>{badge.text}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Action Buttons */}
            <View style={{ width: '100%', gap: 12 }}>
                <TouchableOpacity 
                    style={styles.primaryBtnWrapper} 
                    onPress={handlePress}
                    activeOpacity={0.9}
                >
                    <LinearGradient
                        colors={[colors.primary, '#2563eb']}
                        style={styles.primaryBtn}
                    >
                        <Text style={styles.primaryBtnText}>{btnText}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {secondaryBtnText && (
                    <TouchableOpacity 
                        style={[styles.secondaryBtn, { borderColor: colors.primary + '40' }]} 
                        onPress={onSecondaryPress}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.secondaryBtnText, { color: colors.primary }]}>{secondaryBtnText}</Text>
                    </TouchableOpacity>
                )}
            </View>

        </GlassView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3000,
    padding: 32, // More breathing room outside
  },
  containerWrapper: {
    width: '100%',
    alignItems: 'center',
    maxWidth: 320, // Constrain width for "less bigger" look
  },
  modalContainer: {
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerWrapper: {
      marginBottom: 20,
      marginTop: -40, // Pull up to overlap top edge slightly for dynamic look
      zIndex: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 10,
  },
  mainCircle: {
      width: 88, // Smaller
      height: 88,
      borderRadius: 44,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 4,
      borderColor: '#fff', // White border to separate from glass
  },
  sparkleOverlay: {
      position: 'absolute',
  },
  textSection: {
      alignItems: 'center',
      marginBottom: 20,
      zIndex: 10,
  },
  title: {
    fontSize: 22, // Smaller font
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  badgeRow: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 24,
      zIndex: 10,
      flexWrap: 'wrap',
      justifyContent: 'center',
  },
  miniBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
  },
  miniBadgeText: {
      fontSize: 11,
      fontWeight: '800',
      textTransform: 'uppercase',
  },
  primaryBtnWrapper: {
      width: '100%',
      zIndex: 10,
  },
  primaryBtn: {
    width: '100%',
    paddingVertical: 14, // Slimmer button
    borderRadius: 18,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  secondaryBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryBtnText: {
    fontWeight: '700',
    fontSize: 14,
  },
});
