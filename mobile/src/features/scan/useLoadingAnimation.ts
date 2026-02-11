import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import { useScanState } from "./ScanState";

export function useLoadingAnimation() {

    const { loading } = useScanState()

    // Animation Values
    const [scanMessage, setScanMessage] = useState("3maliyet el ta7lil...");
    const scanningProgress = useRef(new Animated.Value(0)).current;
    const beamAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    useEffect(() => {
        Animated.loop(
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.1, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) })
                ]),
                Animated.timing(rotateAnim, { toValue: 1, duration: 5000, easing: Easing.linear, useNativeDriver: true })
            ])
        ).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (loading) {
            scanningProgress.setValue(0);

            Animated.loop(
                Animated.timing(beamAnim, {
                    toValue: 1,
                    duration: 2500,
                    easing: Easing.bezier(0.4, 0, 0.2, 1),
                    useNativeDriver: true
                })
            ).start();

            // Smooth progress animation while waiting for API
            Animated.timing(scanningProgress, {
                toValue: 0.95,
                duration: 20000,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false
            }).start();

            const msg1 = setTimeout(() => setScanMessage("9a3ed nthabet f'moukawinet..."), 3000);
            const msg2 = setTimeout(() => setScanMessage("Na7seb f'calories w protein..."), 7000);
            const msg3 = setTimeout(() => setScanMessage("Tawa nchoufou el Verdict..."), 12000);

            return () => {
                clearTimeout(msg1);
                clearTimeout(msg2);
                clearTimeout(msg3);
            };
        } else {
            scanningProgress.setValue(1);
            beamAnim.setValue(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    const hintMessage = useMemo(() => {
        if (scanMessage.includes("3maliyet")) return "Sbar chwaya, 9a3din nfixiw fil tsawer...";
        if (scanMessage.includes("moukawinet")) return "Chwaya sabr, el AI mte3na dhahra fih ji3an...";
        if (scanMessage.includes("calories")) return "El mekla dhahra bnina! N7asbou fil calories...";
        if (scanMessage.includes("Verdict")) return "Sa7tek t'hemna, 7adhret el resultet...";
        return scanMessage;
    }, [scanMessage])

    return { scanMessage, scanningProgress, beamAnim, pulseAnim, spin, hintMessage }
}