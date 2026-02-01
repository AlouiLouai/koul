import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { Droplets, CheckCircle2, X } from 'lucide-react-native';
import { GlassView } from './GlassView';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

interface WaterSuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

export const WaterSuccessModal = ({ visible, onClose }: WaterSuccessModalProps) => {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => scaleAnim.setValue(0));
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
        <GlassView style={styles.modalContainer} intensity={95} borderRadius={32}>
            {/* Header Icon */}
            <View style={[styles.iconBg, { backgroundColor: colors.primary + '20', borderColor: colors.primary }]}>
               <Droplets size={48} color={colors.primary} fill={colors.primary} />
               <View style={styles.checkBadge}>
                  <CheckCircle2 size={24} color="#10b981" fill="#fff" />
               </View>
            </View>

            {/* Content */}
            <Text style={[styles.title, { color: colors.text }]}>Sa7a w Bechfé! 🌊</Text>
            <Text style={[styles.message, { color: colors.textSecondary }]}>
               Bravo! Kamelt 3 Litrat lyoum. Golltek m3abbia w badnek rwi!
            </Text>

            {/* Action */}
            <TouchableOpacity 
                style={[styles.primaryBtn, { backgroundColor: colors.primary }]} 
                onPress={onClose}
                activeOpacity={0.8}
            >
                <Text style={styles.primaryBtnText}>Tayara!</Text>
            </TouchableOpacity>

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
    zIndex: 2000,
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
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  iconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    fontWeight: '500',
  },
  primaryBtn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },
});