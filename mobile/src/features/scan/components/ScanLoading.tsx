import React from 'react';
import { View, Text, Animated, StyleSheet, Platform, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { BrainCircuit, Loader2, Sparkles } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeContext';

interface ScanLoadingProps {
  scanMessage: string;
  scanningProgress: Animated.Value;
  beamAnim: Animated.Value;
  backgroundImage?: string | null;
}

export const ScanLoading = ({ scanMessage, scanningProgress, beamAnim, backgroundImage }: ScanLoadingProps) => {
  const { colors, mode } = useTheme();

  return (
    <View style={styles.container}>
        {backgroundImage && (
            <Image 
                source={{ uri: backgroundImage }} 
                style={StyleSheet.absoluteFill} 
                resizeMode="cover"
            />
        )}
        
        <BlurView 
            intensity={Platform.OS === 'ios' ? 85 : 100} 
            tint={mode === 'dark' ? 'dark' : 'light'} 
            style={StyleSheet.absoluteFill} 
        />
        
        {/* Animated Scanning Beam */}
        <Animated.View 
            style={[
                styles.beam,
                { 
                    backgroundColor: colors.primary, 
                    transform: [{ translateY: beamAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 800] }) }],
                    shadowColor: colors.primary,
                }
            ]} 
        />
        
        <View style={styles.content}>
            <View style={styles.logoStack}>
                <Animated.View style={[styles.glowCircle, { backgroundColor: colors.primary + '20', transform: [{ scale: beamAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.3, 1] }) }] }]} />
                <View style={[styles.iconContainer, { backgroundColor: colors.primary + '10' }]}>
                   <BrainCircuit size={64} color={colors.primary} strokeWidth={1.5} />
                </View>
                <Animated.View style={[styles.sparkleFloating, { transform: [{ rotate: beamAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }]}>
                    <Sparkles size={24} color={colors.warning} fill={colors.warning} />
                </Animated.View>
            </View>

            <View style={styles.textStack}>
                <Text style={[styles.title, { color: colors.text }]}>Mokh el AI yekhdem...</Text>
                <View style={styles.messageRow}>
                   <Loader2 size={18} color={colors.primary} />
                   <Text style={[styles.message, { color: colors.textSecondary }]}>{scanMessage}</Text>
                </View>
            </View>
            
            <View style={styles.progressSection}>
                <View style={[styles.progressBg, { backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                    <Animated.View 
                        style={[
                            styles.progressFill,
                            { 
                                backgroundColor: colors.primary,
                                width: scanningProgress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) 
                            }
                        ]} 
                    />
                </View>
                <View style={styles.percentageRow}>
                    <Text style={[styles.percentageText, { color: colors.textSecondary }]}>Analyse multi-couches</Text>
                    <Text style={[styles.percentageVal, { color: colors.primary }]}>2026 Engine</Text>
                </View>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { ...StyleSheet.absoluteFillObject, zIndex: 999 },
    beam: { position: 'absolute', left: 0, right: 0, height: 4, zIndex: 1000, opacity: 0.8, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 30, elevation: 20 },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    logoStack: { position: 'relative', width: 140, height: 140, alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
    glowCircle: { position: 'absolute', width: 120, height: 120, borderRadius: 60 },
    iconContainer: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
    sparkleFloating: { position: 'absolute', top: 0, right: 0 },
    textStack: { alignItems: 'center', gap: 12, marginBottom: 60 },
    title: { fontSize: 32, fontWeight: '900', textAlign: 'center', letterSpacing: -1 },
    messageRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    message: { fontSize: 18, fontWeight: '700', textAlign: 'center', opacity: 0.9 },
    progressSection: { width: '100%', gap: 16 },
    progressBg: { width: '100%', height: 12, borderRadius: 6, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 6 },
    percentageRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    percentageText: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.5 },
    percentageVal: { fontSize: 12, fontWeight: '900', textTransform: 'uppercase' }
});