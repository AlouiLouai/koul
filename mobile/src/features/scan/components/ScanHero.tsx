import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

interface ScanHeroProps {
  onCapture: () => void;
  onGallery: () => void;
}

export const ScanHero = ({ onCapture, onGallery }: ScanHeroProps) => {
  const { colors, mode } = useTheme();
  
  // Attractive Pulse Animation for the Icon Circle
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.1, duration: 1500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true })
        ]),
        Animated.sequence([
          Animated.timing(rotateAnim, { toValue: 1, duration: 6000, easing: Easing.linear, useNativeDriver: true }),
          Animated.timing(rotateAnim, { toValue: 0, duration: 0, useNativeDriver: true })
        ])
      ])
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      {/* Decorative Top Right Circle */}
      <View style={[styles.decorCircle, { backgroundColor: '#dbeafe' }]} />

      <View style={styles.contentWrapper}>
        {/* Top Header Section */}
        <View style={styles.headerSection}>
            <View style={styles.scanBadgeWrapper}>
                <View style={[styles.scanBadge, { backgroundColor: '#fecdd3', borderColor: '#fda4af' }]}>
                    <Text style={styles.scanBadgeText}>SCAN AI</Text>
                </View>
            </View>

            <Animated.View 
                style={[
                    styles.iconCircle, 
                    { 
                        backgroundColor: '#eff6ff',
                        transform: [{ scale: pulseAnim }]
                    }
                ]}
            >
                <Camera size={48} color="#3b82f6" strokeWidth={2} />
                
                {/* Orbiting Sparkle Animation */}
                <Animated.View style={[styles.sparkleContainer, { transform: [{ rotate: spin }] }]}>
                    <View style={styles.sparkleIcon}>
                        <Sparkles size={16} color="#ef4444" fill="#ef4444" />
                    </View>
                </Animated.View>
            </Animated.View>

            <Text style={[styles.title, { color: colors.accent }]}>Sawar Sa7nek</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Iktachef chnoua mkhabbi f'makeltek 🇹🇳
            </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
            <TouchableOpacity 
                onPress={onCapture}
                activeOpacity={0.8}
                style={[styles.primaryBtn, { backgroundColor: '#2563eb', shadowColor: '#2563eb' }]}
            >
                <Camera size={20} color="#fff" strokeWidth={2.5} />
                <Text style={styles.primaryBtnText}>Sawar Tawa</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={onGallery}
                activeOpacity={0.7}
                style={[styles.secondaryBtn, { backgroundColor: '#fff', borderColor: '#e2e8f0' }]}
            >
                <ImageIcon size={20} color="#2563eb" />
                <Text style={[styles.secondaryBtnText, { color: '#2563eb' }]}>Gallerie</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#fff', 
        borderRadius: 36, 
        overflow: 'hidden', 
        position: 'relative',
        borderWidth: 1,
        borderColor: '#f1f5f9'
    },
    decorCircle: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 180,
        height: 180,
        borderRadius: 90,
        opacity: 0.8,
    },
    contentWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 40,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 40,
        width: '100%',
    },
    scanBadgeWrapper: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    scanBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
    },
    scanBadgeText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#be123c',
        letterSpacing: 0.5,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        borderWidth: 2,
        borderColor: '#fff',
        borderStyle: 'dashed',
    },
    sparkleContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sparkleIcon: {
        position: 'absolute',
        top: 0,
        right: 15, // Adjusted to sit on the ring
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 8,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        opacity: 0.7,
    },
    actions: {
        width: '100%',
        gap: 16,
    },
    primaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 28,
        gap: 10,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    primaryBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
    },
    secondaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 28,
        gap: 10,
        borderWidth: 1.5,
    },
    secondaryBtnText: {
        fontSize: 18,
        fontWeight: '800',
    }
});