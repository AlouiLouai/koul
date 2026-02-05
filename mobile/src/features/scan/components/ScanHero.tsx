import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { Camera, Image as ImageIcon, Sparkles, Zap, ShieldCheck, History } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { GlassView } from '../../../components/GlassView';

const { width } = Dimensions.get('window');

interface ScanHeroProps {
  onCapture: () => void;
  onGallery: () => void;
}

export const ScanHero = ({ onCapture, onGallery }: ScanHeroProps) => {
  const { colors } = useTheme();
  const yellowColor = '#f59e0b'; // Amber from Home
  
  // Animations
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const floatAnim = React.useRef(new Animated.Value(0)).current;
  const entranceAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
        Animated.timing(entranceAnim, { toValue: 1, duration: 800, useNativeDriver: true, easing: Easing.out(Easing.back(1.5)) }),
        Animated.loop(
          Animated.parallel([
            Animated.sequence([
              Animated.timing(pulseAnim, { toValue: 1.05, duration: 2000, useNativeDriver: true }),
              Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true })
            ]),
            Animated.sequence([
                Animated.timing(floatAnim, { toValue: 1, duration: 3000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
                Animated.timing(floatAnim, { toValue: 0, duration: 3000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) })
            ]),
            Animated.timing(rotateAnim, { toValue: 1, duration: 8000, easing: Easing.linear, useNativeDriver: true })
          ])
        )
    ]).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10]
  });

  const opacity = entranceAnim;
  const scale = entranceAnim;

  return (
    <View style={styles.container}>
      {/* Dynamic Background Gradients */}
      <View style={[styles.gradientOverlay, { backgroundColor: yellowColor + '08' }]} />
      <Animated.View style={[styles.decorCircle, { backgroundColor: yellowColor + '15', transform: [{ scale: pulseAnim }, { rotate: spin }] }]} />

      <Animated.View style={[styles.contentWrapper, { opacity, transform: [{ scale }] }]}>
        {/* Main Content Area */}
        <View style={styles.headerSection}>
            <View style={styles.badgeContainer}>
                <GlassView intensity={40} borderRadius={20} style={[styles.scanBadge, { borderColor: yellowColor + '40' }]}>
                    <Sparkles size={12} color={yellowColor} fill={yellowColor} />
                    <Text style={[styles.scanBadgeText, { color: yellowColor }]}>2026 AI ENGINE</Text>
                </GlassView>
            </View>

            <Animated.View 
                style={[
                    styles.iconCircleWrapper, 
                    { transform: [{ translateY }] }
                ]}
            >
                <View style={[styles.iconGlow, { backgroundColor: yellowColor + '20' }]} />
                <GlassView intensity={50} borderRadius={60} style={[styles.iconCircle, { borderColor: yellowColor + '30' }]}>
                    <Camera size={44} color={yellowColor} strokeWidth={2} />
                    <Animated.View style={[styles.sparkleFloating, { transform: [{ rotate: spin }] }]}>
                        <Sparkles size={20} color={yellowColor} fill={yellowColor} />
                    </Animated.View>
                </GlassView>
            </Animated.View>

            <Text style={[styles.title, { color: colors.text }]}>Sawar <Text style={{ color: yellowColor }}>Sa7nek</Text></Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Iktachef chnoua mkhabbi f'makeltek b'dhka l'istina3i 🇹🇳
            </Text>
        </View>

        {/* Feature Highlights - The "Content Rich" part */}
        <View style={styles.featureGrid}>
            <GlassView intensity={10} borderRadius={20} style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: yellowColor + '15' }]}>
                    <Zap size={18} color={yellowColor} fill={yellowColor} />
                </View>
                <Text style={[styles.featureText, { color: colors.text }]}>Analiz Sari3</Text>
            </GlassView>
            <GlassView intensity={10} borderRadius={20} style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: '#10b98115' }]}>
                    <ShieldCheck size={18} color="#10b981" />
                </View>
                <Text style={[styles.featureText, { color: colors.text }]}>Di9a fil 7seb</Text>
            </GlassView>
            <GlassView intensity={10} borderRadius={20} style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: '#3b82f615' }]}>
                    <History size={18} color="#3b82f6" />
                </View>
                <Text style={[styles.featureText, { color: colors.text }]}>Sijel Kamil</Text>
            </GlassView>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
            <TouchableOpacity 
                onPress={onCapture}
                activeOpacity={0.8}
                style={[styles.primaryBtn, { backgroundColor: yellowColor }]}
            >
                <Camera size={22} color="#fff" strokeWidth={2.5} />
                <Text style={styles.primaryBtnText}>Sawar Tawa</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={onGallery}
                activeOpacity={0.7}
                style={styles.secondaryBtnWrapper}
            >
                <GlassView intensity={20} borderRadius={28} style={[styles.secondaryBtn, { borderColor: yellowColor + '30' }]}>
                    <ImageIcon size={20} color={yellowColor} />
                    <Text style={[styles.secondaryBtnText, { color: yellowColor }]}>Gallerie</Text>
                </GlassView>
            </TouchableOpacity>
        </View>

        {/* Pro Tip */}
        <View style={styles.tipSection}>
            <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                Nasi7a: Sawar f'blasa feha dhaw behi bch tkon l'analyse asda9! ✨
            </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 'transparent', 
        borderRadius: 36, 
        overflow: 'hidden', 
        position: 'relative',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    decorCircle: {
        position: 'absolute',
        top: -width * 0.2,
        right: -width * 0.2,
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        borderWidth: 1,
        borderColor: 'rgba(245, 158, 11, 0.05)',
        borderStyle: 'dashed',
    },
    contentWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingTop: 30,
        paddingBottom: 20,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 32,
        width: '100%',
    },
    badgeContainer: {
        marginBottom: 24,
    },
    scanBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderWidth: 1,
    },
    scanBadgeText: {
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1,
    },
    iconCircleWrapper: {
        position: 'relative',
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconGlow: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
    },
    iconCircle: {
        width: 110,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },
    sparkleFloating: {
        position: 'absolute',
        top: -10,
        right: -10,
    },
    title: {
        fontSize: 34,
        fontWeight: '900',
        marginBottom: 10,
        textAlign: 'center',
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    featureGrid: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 40,
        width: '100%',
    },
    featureItem: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        gap: 8,
    },
    featureIcon: {
        width: 36,
        height: 36,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureText: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    actions: {
        width: '100%',
        gap: 14,
        marginBottom: 24,
    },
    primaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 28,
        gap: 12,
        elevation: 8,
        shadowColor: '#f59e0b',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    primaryBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
    },
    secondaryBtnWrapper: {
        width: '100%',
    },
    secondaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 10,
        borderWidth: 1.5,
    },
    secondaryBtnText: {
        fontSize: 17,
        fontWeight: '800',
    },
    tipSection: {
        paddingHorizontal: 20,
    },
    tipText: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 18,
    }
});