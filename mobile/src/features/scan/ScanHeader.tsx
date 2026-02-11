
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useScanState } from '@/features/scan/ScanState';
import { Animated, Dimensions, TouchableOpacity } from 'react-native';
import { ScanHero } from '@/features/scan/ScanHero';
import { Image } from 'expo-image';
import { ScanLoading } from '@/features/scan/ScanLoading';
import { GlassView } from '@/components/GlassView';
import { ChevronLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');

function ContentWrapper({ children }: PropsWithChildren) {
    const { currentImage, loading } = useScanState()
    const containerHeight = useRef(new Animated.Value(width)).current;
    useEffect(() => {
        Animated.spring(containerHeight, {
            toValue: (currentImage && !loading) ? 180 : 480, // Shrink more when result is ready
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
    const { currentImage, loading, resetAnalysis } = useScanState()
    if (!currentImage) return <ScanHero />
    return <>
        <Image source={{ uri: currentImage }} style={{ width: '100%', height: '100%' }} />
        {loading && (
            <ScanLoading />
        )}
        {!loading && (
            <TouchableOpacity onPress={resetAnalysis} style={{ position: 'absolute', top: 12, left: 12 }}>
                <GlassView intensity={40} borderRadius={20} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronLeft size={24} color="#fff" />
                </GlassView>
            </TouchableOpacity>
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