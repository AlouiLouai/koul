import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Camera, Sparkles, Zap, ShieldCheck, History } from 'lucide-react-native';
import { useTheme } from '@/theme/ThemeContext';
import { GlassView } from '@/components/GlassView';
import { GalleryButton } from './GalleryButton';
import { CameraButton } from './CameraButton';



export const ScanHero = () => {
    const { colors } = useTheme();

    // Brand Colors
    const blue = colors.primary;
    const pink = colors.accent;
    const green = colors.success;
    const yellow = colors.warning;

    // Animations
    const pulseAnim = React.useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {/* Dynamic Background Gradients - Multicolored */}
            <View style={[styles.gradientOverlay, { backgroundColor: blue + '03' }]} />
            <Animated.View style={[styles.decorCircle, { backgroundColor: pink + '05', top: -100, left: -100, transform: [{ scale: pulseAnim }] }]} />
            <Animated.View style={[styles.decorCircle, { backgroundColor: yellow + '05', bottom: -50, right: -50, width: 200, height: 200, transform: [{ rotate: spin }] }]} />

            <Animated.View style={[styles.contentWrapper, { opacity, transform: [{ scale }] }]}>
                {/* Main Content Area */}
                <View style={styles.headerSection}>
                    <View style={styles.badgeContainer}>
                        <GlassView intensity={40} borderRadius={20} style={[styles.scanBadge, { borderColor: blue + '30' }]}>
                            <Sparkles size={12} color={blue} fill={blue} />
                            <Text style={[styles.scanBadgeText, { color: colors.text }]}>2026 AI ENGINE</Text>
                        </GlassView>
                    </View>

                    <Animated.View
                        style={[
                            styles.iconCircleWrapper,
                            { transform: [{ translateY }] }
                        ]}
                    >
                        <View style={[styles.iconGlow, { backgroundColor: blue + '15' }]} />
                        <GlassView intensity={50} borderRadius={60} style={[styles.iconCircle, { borderColor: blue + '20' }]}>
                            <Camera size={44} color={blue} strokeWidth={2} />
                            <Animated.View style={[styles.sparkleFloating, { transform: [{ rotate: spin }] }]}>
                                <Sparkles size={20} color={yellow} fill={yellow} />
                            </Animated.View>
                        </GlassView>
                        {/* Floating decorative elements */}
                        <View style={[styles.miniDecor, { top: 0, left: -20, backgroundColor: pink }]} />
                        <View style={[styles.miniDecor, { bottom: 10, right: -20, backgroundColor: green }]} />
                    </Animated.View>

                    <Text style={[styles.title, { color: colors.text }]}>Sawar <Text style={{ color: blue }}>Sa7nek</Text></Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Iktachef chnoua mkhabbi f&apos;makeltek b&apos;dhka l&apos;istina3i 🇹🇳
                    </Text>
                </View>

                {/* Feature Highlights - Multi-colored per-item */}
                <View style={styles.featureGrid}>
                    <GlassView intensity={10} borderRadius={20} style={styles.featureItem}>
                        <View style={[styles.featureIcon, { backgroundColor: yellow + '15' }]}>
                            <Zap size={18} color={yellow} fill={yellow} />
                        </View>
                        <Text style={[styles.featureText, { color: colors.text }]}>Sari3</Text>
                    </GlassView>
                    <GlassView intensity={10} borderRadius={20} style={styles.featureItem}>
                        <View style={[styles.featureIcon, { backgroundColor: green + '15' }]}>
                            <ShieldCheck size={18} color={green} />
                        </View>
                        <Text style={[styles.featureText, { color: colors.text }]}>Di9a</Text>
                    </GlassView>
                    <GlassView intensity={10} borderRadius={20} style={styles.featureItem}>
                        <View style={[styles.featureIcon, { backgroundColor: pink + '15' }]}>
                            <History size={18} color={pink} />
                        </View>
                        <Text style={[styles.featureText, { color: colors.text }]}>Sijel</Text>
                    </GlassView>
                </View>

                {/* Action Buttons */}
                <View style={styles.actions}>
                    <CameraButton />
                    <GalleryButton />
                </View>

                {/* Pro Tip */}
                <View style={styles.tipSection}>
                    <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                        Nasi7a: Sawar f&apos;blasa feha dhaw behi bch tkon l&apos;analyse perfect! ✨
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
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.1,
    },
    contentWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
    },
    badgeContainer: {
        marginBottom: 16,
    },
    scanBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
    },
    scanBadgeText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    iconCircleWrapper: {
        position: 'relative',
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconGlow: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    iconCircle: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },
    sparkleFloating: {
        position: 'absolute',
        top: -6,
        right: -6,
    },
    miniDecor: {
        position: 'absolute',
        width: 6,
        height: 6,
        borderRadius: 3,
        opacity: 0.6,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 4,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 18,
        paddingHorizontal: 10,
    },
    featureGrid: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 24,
        width: '100%',
    },
    featureItem: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        gap: 6,
    },
    featureIcon: {
        width: 32,
        height: 32,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureText: {
        fontSize: 9,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    actions: {
        width: '100%',
        gap: 10,
        marginBottom: 16,
    },

    tipSection: {
        paddingHorizontal: 15,
    },
    tipText: {
        fontSize: 11,
        fontWeight: '500',
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 16,
    }
});