import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useScanState } from "./ScanState";

export function useResultAnimation() {
    const { result, loading } = useScanState();
    const logBtnScale = useRef(new Animated.Value(1)).current;
    const resetBtnScale = useRef(new Animated.Value(1)).current;

    const buttonsOpacity = useRef(new Animated.Value(0)).current;
    const buttonsTranslateY = useRef(new Animated.Value(30)).current;
    const handlePressIn = (scaleVar: Animated.Value) => {
        Animated.spring(scaleVar, { toValue: 0.92, useNativeDriver: true, friction: 4, tension: 100 }).start();
    };

    const handlePressOut = (scaleVar: Animated.Value) => {
        Animated.spring(scaleVar, { toValue: 1, useNativeDriver: true, friction: 4, tension: 100 }).start();
    };

    useEffect(() => {
        if (result && !loading) {
            Animated.parallel([
                Animated.timing(buttonsOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.spring(buttonsTranslateY, { toValue: 0, friction: 8, tension: 40, useNativeDriver: true })
            ]).start();
        } else {
            buttonsOpacity.setValue(0);
            buttonsTranslateY.setValue(30);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result, loading]);

    return {
        handlePressIn,
        handlePressOut,
        logBtnScale,
        resetBtnScale,
        buttonsOpacity,
        buttonsTranslateY
    }
}