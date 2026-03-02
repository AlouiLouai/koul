
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useScanState } from '@/features/scan/ScanState';
import { Animated, Dimensions, TouchableOpacity, Text, View } from 'react-native';
import { ScanHero } from '@/features/scan/ScanHero';
import { Image } from 'expo-image';
import { ScanLoading } from '@/features/scan/ScanLoading';
import { GlassView } from '@/components/GlassView';
import { RefreshCcw, Flame } from 'lucide-react-native';
import { CalorieCircle } from '@/components/AnalysisResult';

const { width } = Dimensions.get('window');

function ContentWrapper({ children }: PropsWithChildren) {
    const { currentImage, loading } = useScanState()
    const containerHeight = useRef(new Animated.Value(width)).current;
    useEffect(() => {
        let toValue = 480; // Default for Hero
        if (loading) {
            toValue = 580; // Taller for loading
        } else if (currentImage) {
            toValue = 380; // Shorter for result
        }

        Animated.spring(containerHeight, {
            toValue, 
            useNativeDriver: false,
            friction: 8,
            tension: 30
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentImage, loading])
    return <Animated.View style={{
        borderRadius: 36,
        overflow: 'hidden',
        marginBottom: 16,
        height: containerHeight
    }}>
        {children}
    </Animated.View>
}

function Content() {
    const { currentImage, loading, result, resetAnalysis } = useScanState()
    
    const getDerjaVerdict = (cals: number, fat: number, s: number) => {
        if (s >= 9) return "W7ach protein! 💪 Hédhi mekla thez biha l'coupe 🏆";
        if (s >= 7) return "Sa7a! Mekla ndhifa, w mouch mcharwtra b'zit.";
        if (fat > 30) return "Rod belek mel zit! T9oul mekel 'Brik' 3la sbe7 🛢️";
        if (cals > 1000) return "Ouh! Hédhi 'Bomb' calorique... Barcha 3jin (Mlewi/Chapati?) 🥖";
        return "Mouch khayeb, ama rod belek 3la sa7tek. Na9es khobz!";
    };

    if (!currentImage) return <ScanHero />
    return <>
        <Image source={{ uri: currentImage }} style={{ width: '100%', height: '100%' }} />
        {loading && (
            <ScanLoading />
        )}
        {!loading && (
            <>
                <TouchableOpacity onPress={resetAnalysis} style={{ position: 'absolute', top: 12, left: 12 }}>
                    <GlassView intensity={40} borderRadius={20} style={{ paddingHorizontal: 12, height: 40, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <RefreshCcw size={18} color="#fff" />
                        <Text style={{ color: '#fff', fontWeight: '900', fontSize: 13 }}>Sawar jdid</Text>
                    </GlassView>
                </TouchableOpacity>

                {result && (
                    <View style={styles.overlayContainer}>
                        <View style={styles.gaugeBox}>
                            <CalorieCircle calories={result.totals.calories} />
                        </View>
                        <View style={styles.verdictBox}>
                            <GlassView intensity={60} borderRadius={24} style={styles.verdictGlass}>
                                <Text style={styles.verdictText}>
                                    {getDerjaVerdict(result.totals.calories, result.totals.fat, result.health_score ?? 0)}
                                </Text>
                            </GlassView>
                        </View>
                    </View>
                )}
            </>
        )}
    </>

}


export function ScanHeader() {
    return (
        <ContentWrapper>
            <Content />
        </ContentWrapper>
    )
}

const styles = {
    overlayContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    gaugeBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    verdictBox: {
        flex: 1,
        paddingLeft: 10,
        paddingBottom: 20,
    },
    verdictGlass: {
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    verdictText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '800',
        lineHeight: 18,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    }
} as any;