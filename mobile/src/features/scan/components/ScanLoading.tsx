import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Platform, Image, Easing } from 'react-native';
import { BlurView } from 'expo-blur';
import { Sparkles, Search, Info } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { GlassView } from '../../../components/GlassView';
import { AppLogo } from '../../../components/AppLogo';

interface ScanLoadingProps {
  scanMessage: string;
  scanningProgress: Animated.Value;
  beamAnim: Animated.Value;
  backgroundImage?: string | null;
  containerHeight?: number;
}

export const ScanLoading = ({ scanMessage, scanningProgress, beamAnim, backgroundImage, containerHeight = 540 }: ScanLoadingProps) => {
  const { colors, mode } = useTheme();
  const yellowColor = '#f59e0b'; // Signature Tunisian Amber
  
  // Animation Values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

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
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  // Tunisian friendly messages in Derja - Improved and "Soulful"
  const getDerjaMessage = (msg: string) => {
      if (msg.includes("3maliyet")) return "Sbar chwaya, 9a3din nfixiw fil tsawer...";
      if (msg.includes("moukawinet")) return "Chwaya sabr, el AI mte3na dhahra fih ji3an...";
      if (msg.includes("calories")) return "El mekla dhahra bnina! N7asbou fil calories...";
      if (msg.includes("Verdict")) return "Sa7tek t'hemna, 7adhret el resultet...";
      return msg;
  };

  return (
    <View style={styles.container}>
        {/* Background Layer: Blurred Original Image */}
        {backgroundImage && (
            <Image 
                source={{ uri: backgroundImage }} 
                style={StyleSheet.absoluteFill} 
                resizeMode="cover"
            />
        )}
        
        <BlurView 
            intensity={Platform.OS === 'ios' ? 90 : 100} 
            tint={mode === 'dark' ? 'dark' : 'light'} 
            style={StyleSheet.absoluteFill} 
        />
        
        {/* Dynamic Scanning Beam - NOW CONSTRAINED */}
        <Animated.View 
            style={[
                styles.beam,
                { 
                    backgroundColor: yellowColor, 
                    transform: [{ translateY: beamAnim.interpolate({ inputRange: [0, 1], outputRange: [0, containerHeight] }) }],
                    shadowColor: yellowColor,
                }
            ]} 
        >
            <View style={[styles.beamLine, { backgroundColor: yellowColor }]} />
            <View style={[styles.beamGlow, { backgroundColor: yellowColor }]} />
        </Animated.View>
        
        <View style={styles.content}>
            <View style={styles.scannerWrapper}>
                <Animated.View style={[styles.scannerRing, { borderColor: yellowColor + '30', transform: [{ rotate: spin }] }]} />
                
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <AppLogo size={120} intensity={30} borderRadius={60} />
                </Animated.View>

                <Animated.View style={[styles.sparkleFloating, { transform: [{ rotate: spin }] }]}>
                    <Sparkles size={24} color={yellowColor} fill={yellowColor} />
                </Animated.View>
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.mainTitle, { color: colors.text }]}>
                    Thaka el <Text style={{ color: yellowColor }}>Istina3i</Text>
                </Text>
                
                <GlassView intensity={15} borderRadius={24} style={[styles.messageCard, { borderColor: yellowColor + '20' }]}>
                    <Search size={18} color={yellowColor} />
                    <Text style={[styles.derjaMessage, { color: colors.text }]}>
                        {getDerjaMessage(scanMessage)}
                    </Text>
                </GlassView>
            </View>

            <View style={styles.progressSection}>
                <View style={[styles.progressBarBg, { backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                    <Animated.View 
                        style={[
                            styles.progressBarFill,
                            { 
                                backgroundColor: yellowColor,
                                width: scanningProgress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) 
                            }
                        ]} 
                    />
                </View>
                
                <View style={styles.footerRow}>
                    <View style={styles.engineInfo}>
                        <Info size={12} color={yellowColor} />
                        <Text style={[styles.engineText, { color: colors.textSecondary }]}>ANALYZER V2.6</Text>
                    </View>
                    <Text style={[styles.percentageText, { color: yellowColor }]}>
                        KOUL 🇹🇳
                    </Text>
                </View>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({

    container: { ...StyleSheet.absoluteFillObject, zIndex: 999, overflow: 'hidden' },

    beam: { position: 'absolute', left: 0, right: 0, height: 3, zIndex: 1000, opacity: 0.8 },

    beamLine: { height: '100%', width: '100%' },

    beamGlow: { position: 'absolute', top: -10, left: 0, right: 0, height: 20, opacity: 0.2, borderRadius: 10 },

    

    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, gap: 50 },

    

    scannerWrapper: { width: 180, height: 180, alignItems: 'center', justifyContent: 'center', position: 'relative' },

    scannerRing: { position: 'absolute', width: 180, height: 180, borderRadius: 90, borderWidth: 1, borderStyle: 'dashed' },

    sparkleFloating: { position: 'absolute', top: 0, right: 0 },

    

    textContainer: { alignItems: 'center', gap: 16, width: '100%' },

    mainTitle: { fontSize: 28, fontWeight: '900', letterSpacing: -0.5 },

    messageCard: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 14, borderWidth: 1, width: '100%' },

    derjaMessage: { fontSize: 15, fontWeight: '700', textAlign: 'center', flex: 1 },

    

    progressSection: { width: '100%', gap: 12 },

    progressBarBg: { width: '100%', height: 8, borderRadius: 4, overflow: 'hidden' },

    progressBarFill: { height: '100%', borderRadius: 4 },

    

    footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

    engineInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },

    engineText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },

    percentageText: { fontSize: 9, fontWeight: '900' }

});
