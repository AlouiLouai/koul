import React, { useCallback, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';


import { useTheme } from '@/theme/ThemeContext';

export const TabButton = ({ icon: Icon, isActive, onPress }: any) => {
    const { colors, mode } = useTheme();
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(0.6)).current;
    const highlightScale = useRef(new Animated.Value(0)).current;


    const startAnimation = useCallback((isActive: boolean) => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: isActive ? 1.1 : 1,
                useNativeDriver: true,
                friction: 8,
                tension: 40,
            }),
            Animated.timing(opacity, {
                toValue: isActive ? 1 : 0.6,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.spring(highlightScale, {
                toValue: isActive ? 1 : 0,
                useNativeDriver: true,
                friction: 7,
                tension: 35,
            })
        ]).start();
    }, [highlightScale, opacity, scale]);

    useEffect(() => {
        startAnimation(isActive)
    }, [isActive, startAnimation]);

    // Premium Blue Light tint for active state
    const activeBgColor = mode === 'dark' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)';
    const inactiveColor = mode === 'dark' ? 'rgba(148, 163, 184, 0.5)' : '#94a3b8';

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={tabStyles.tabButtonWrapper}
        >
            <View style={tabStyles.iconWrapper}>
                <Animated.View
                    style={[
                        tabStyles.highlightCircle,
                        {
                            backgroundColor: activeBgColor,
                            transform: [{ scale: highlightScale }]
                        }
                    ]}
                />
                <Animated.View style={{ opacity, transform: [{ scale }] }}>
                    <Icon
                        size={24}
                        color={isActive ? colors.primary : inactiveColor}
                        strokeWidth={isActive ? 2.5 : 2}
                    />
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
};
const tabStyles = StyleSheet.create({
    tabButtonWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
    },
    highlightCircle: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 24,
    }
});