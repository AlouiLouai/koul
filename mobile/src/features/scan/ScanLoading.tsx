import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';
import { BlurView } from 'expo-blur';
import { Salad } from 'lucide-react-native';
import { useTheme } from '@/theme/ThemeContext';
import { GlassView } from '@/components/GlassView';
import { useLoadingAnimation } from './useLoadingAnimation';

export const ScanLoading = () => {
    const { colors, mode } = useTheme();
    const { hintMessage } = useLoadingAnimation();
    const spinAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [spinAnim]);

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <BlurView
                intensity={80}
                tint={mode === 'dark' ? 'dark' : 'light'}
                style={StyleSheet.absoluteFill}
            />
            
            <View style={styles.content}>
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <GlassView intensity={40} borderRadius={50} style={styles.loaderCircle}>
                        <Salad size={50} color={colors.primary} />
                    </GlassView>
                </Animated.View>

                <View style={styles.textContainer}>
                    <Text style={[styles.title, { color: colors.text, fontSize: 24 }]}>9a3ed n'thabet...</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: 16 }]}>{hintMessage}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { ...StyleSheet.absoluteFillObject, zIndex: 999, justifyContent: 'center', alignItems: 'center' },
    content: { alignItems: 'center', gap: 32 },
    loaderCircle: { width: 100, height: 100, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)' },
    textContainer: { alignItems: 'center', gap: 12 },
    title: { fontWeight: '900' },
    subtitle: { fontWeight: '600', opacity: 0.8, textAlign: 'center', paddingHorizontal: 40 },
});
