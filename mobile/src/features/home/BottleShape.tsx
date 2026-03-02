import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import Svg, { Path } from 'react-native-svg';

export interface BottleRef {
  triggerWave: () => void;
}

interface BottleShapeProps {
    fillLevel: number; // 0 to 1
    height?: number;
    color?: string;
}

export const BottleShape = forwardRef<BottleRef, BottleShapeProps>(({ fillLevel, height = 200, color = "#3b82f6" }, ref) => {
    const { colors, mode } = useTheme();
    const waveAnim = useRef(new Animated.Value(0)).current;
    const waveIntensity = useRef(new Animated.Value(0)).current;

    const bodyHeight = height * 0.85;
    const neckHeight = height * 0.1;
    const capHeight = height * 0.05;
    const bottleWidth = height * 0.55;

    useImperativeHandle(ref, () => ({
        triggerWave: () => {
            Animated.sequence([
                Animated.timing(waveIntensity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(waveIntensity, {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                })
            ]).start();
        }
    }));

    useEffect(() => {
        Animated.loop(
            Animated.timing(waveAnim, {
                toValue: 1,
                duration: 2500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [waveAnim]);

    const translateX = waveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-40, 0],
    });

    const translateY = (1 - fillLevel) * bodyHeight;

    return (
        <View style={[styles.container, { height, width: bottleWidth + 10 }]}>
            {/* Bottle Cap */}
            <View style={[styles.cap, { backgroundColor: '#2563eb', height: capHeight, width: bottleWidth * 0.35 }]} />
            
            {/* Bottle Neck */}
            <View style={[styles.neck, { borderColor: colors.glassBorder, height: neckHeight, width: bottleWidth * 0.3 }]} />

            {/* Bottle Body */}
            <View style={[styles.body, { 
                borderColor: colors.glassBorder,
                height: bodyHeight,
                width: bottleWidth,
                borderRadius: bottleWidth * 0.25,
                backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.2)'
            }]}>
                <View style={styles.waterWrapper}>
                    <Animated.View style={[
                        styles.waterContent, 
                        { 
                            transform: [{ translateY }],
                        }
                    ]}>
                        <Animated.View style={{ transform: [{ translateX }] }}>
                            <Svg height="40" width="200" viewBox="0 0 200 40" style={styles.waveSvg}>
                                <Path
                                    d="M0 20 Q 25 5, 50 20 T 100 20 T 150 20 T 200 20 V 40 H 0 Z"
                                    fill={color}
                                />
                            </Svg>
                        </Animated.View>
                        <View style={[styles.deepWater, { backgroundColor: color }]} />
                    </Animated.View>
                </View>

                {/* 3L Label (Eticket Style) */}
                <View style={styles.labelContainer}>
                    <View style={styles.hayetBlueStrip}>
                        <Text style={[styles.volumeText, { fontSize: bottleWidth * 0.22 }]}>3L</Text>
                    </View>
                    <View style={styles.hayetRedStrip} />
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cap: {
        borderRadius: 4,
        zIndex: 2,
    },
    neck: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        backgroundColor: 'transparent',
        zIndex: 1,
    },
    body: {
        borderWidth: 2,
        overflow: 'hidden',
        position: 'relative',
    },
    waterWrapper: {
        flex: 1,
        overflow: 'hidden',
    },
    waterContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    waveSvg: {
        position: 'absolute',
        top: -20,
        left: 0,
    },
    deepWater: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#3b82f6',
    },
    labelContainer: {
        position: 'absolute',
        top: '35%',
        left: 0,
        right: 0,
        zIndex: 3,
    },
    hayetBlueStrip: {
        backgroundColor: '#1e40af',
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hayetRedStrip: {
        backgroundColor: '#e11d48',
        height: 6,
    },
    volumeText: {
        color: 'white',
        fontWeight: '900',
        letterSpacing: 2,
    }
});
