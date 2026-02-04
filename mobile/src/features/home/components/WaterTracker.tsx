import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Droplets, Plus, Check } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

const CARD_HEIGHT = 340;

export const WaterTracker = ({ 
    isGuest = false, 
    onTriggerAuth 
}: { 
    isGuest?: boolean; 
    onTriggerAuth?: () => void;
}) => {
  const [cups, setCups] = useState(0); // Start at 0L
  const { colors, mode } = useTheme();
  const target = 12; // 3L goal
  const isComplete = cups >= target;
  
  // Animation Values
  const fillAnim = useRef(new Animated.Value(0)).current; 
  const bubble1 = useRef(new Animated.Value(0)).current;
  const bubble2 = useRef(new Animated.Value(0)).current;
  const bubble3 = useRef(new Animated.Value(0)).current;
  const cardFillAnim = useRef(new Animated.Value(0)).current; // Now used for background fade
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const pulseLoopRef = useRef<Animated.CompositeAnimation | null>(null);
  const waveLoopRef = useRef<Animated.CompositeAnimation | null>(null);

  // ... (Keep existing effects)

  useEffect(() => {
    // ... (Keep existing animation logic)
    const createBubbleAnim = (value: Animated.Value, duration: number, delay: number) => {
        return Animated.loop(
            Animated.sequence([
                Animated.timing(value, { toValue: 1, duration: duration, delay: delay, useNativeDriver: true, easing: Easing.linear }),
                Animated.timing(value, { toValue: 0, duration: 0, useNativeDriver: true })
            ])
        );
    };
    Animated.parallel([
        createBubbleAnim(bubble1, 4000, 0),
        createBubbleAnim(bubble2, 6000, 2000),
        createBubbleAnim(bubble3, 5000, 1000),
    ]).start();
  }, []);

  useEffect(() => {
     const progress = Math.min(cups / target, 1);
     Animated.spring(fillAnim, {
         toValue: progress,
         useNativeDriver: true,
         friction: 8,
         tension: 30
     }).start();

     // Animate card background ONLY when complete
     Animated.timing(cardFillAnim, {
         toValue: isComplete ? 1 : 0,
         duration: 600,
         easing: Easing.out(Easing.quad),
         useNativeDriver: true,
     }).start();
  }, [cups, isComplete]);

  useEffect(() => {
    pulseLoopRef.current?.stop();
    waveLoopRef.current?.stop();

    if (isComplete) {
      pulseAnim.setValue(0);
      waveAnim.setValue(0);

      pulseLoopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 0, duration: 1200, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        ])
      );
      pulseLoopRef.current.start();

      waveLoopRef.current = Animated.loop(
        Animated.timing(waveAnim, { toValue: 1, duration: 2200, easing: Easing.inOut(Easing.quad), useNativeDriver: true })
      );
      waveLoopRef.current.start();
    } else {
      pulseAnim.setValue(0);
      waveAnim.setValue(0);
    }
  }, [isComplete, pulseAnim, waveAnim]);

  const addWater = () => {
    // GUEST GUARD
    if (isGuest) {
        if (onTriggerAuth) onTriggerAuth();
        return;
    }

    if (cups < target) {
      setCups(prev => prev + 1);
    }
  };

  const getWaterMessage = () => {
      if (cups >= target) return "M3allem! 3L Safia! 🌊";
      if (cups >= target / 2) return "Chtar el thneya! Zidha gorgan. 🚰";
      return "Dabouza 0.5L 3asbeh? 💧";
  };

  const waterTranslateY = fillAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [140, 0] // Adjusted for taller bottle
  });

  const pulseOpacity = pulseAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.25, 0.6],
  });

  const waveTranslateX = waveAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-40, 40],
  });

  const getBubbleStyle = (anim: Animated.Value, left: number) => ({
      position: 'absolute' as 'absolute',
      bottom: 0,
      left: left,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255,255,255,0.4)',
      transform: [
          { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -140] }) },
          { scale: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.5, 1, 0] }) }
      ]
  });

  return (
    <View style={[styles.waterCard, { borderRadius: 32, overflow: 'hidden' }]}>
      
      {/* Background Fill (Blue when complete) */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.cardFill,
          {
            backgroundColor: colors.primary,
            opacity: cardFillAnim, // Fades in when complete
          },
        ]}
      />

      {isComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.cardPulse,
            {
              backgroundColor: colors.primary,
              opacity: pulseOpacity,
            },
          ]}
        />
      )}
      {isComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.cardWave,
            {
              backgroundColor: colors.primary + '60',
              transform: [{ translateX: waveTranslateX }],
            },
          ]}
        />
      )}
      
      <View style={styles.waterContent}>
        <View style={styles.waterTextSection}>
           <View style={[styles.waterIconBg, { backgroundColor: isComplete ? 'rgba(255,255,255,0.2)' : colors.primary + '20' }]}>
             <Droplets size={18} color={isComplete ? '#fff' : colors.primary} fill={isComplete ? '#fff' : colors.primary} />
           </View>
           <Text style={[styles.waterTitle, { color: isComplete ? '#fff' : colors.text }]}>Erwi 3rougek</Text>
           <Text style={[styles.waterDesc, { color: isComplete ? 'rgba(255,255,255,0.85)' : colors.textSecondary }]}>
             {getWaterMessage()}
           </Text>
        </View>

        <View style={styles.jugContainer}>
            {/* Taller 3L Bottle Shape */}
            <View style={[styles.jugBody, { borderColor: isComplete ? 'rgba(255,255,255,0.5)' : colors.glassBorder, height: 140, backgroundColor: mode === 'dark' || isComplete ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                <View style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                    <Animated.View style={[
                        styles.liquid, 
                        { 
                            transform: [{ translateY: waterTranslateY }],
                            backgroundColor: isComplete ? '#fff' : '#3b82f6', // White liquid when bg is blue, else blue
                            opacity: isComplete ? 0.9 : 0.8
                        }
                    ]}> 
                       <Animated.View style={[getBubbleStyle(bubble1, 15), { backgroundColor: isComplete ? colors.primary : 'rgba(255,255,255,0.4)' }]} />
                       <Animated.View style={[getBubbleStyle(bubble2, 30), { backgroundColor: isComplete ? colors.primary : 'rgba(255,255,255,0.4)' }]} />
                       <Animated.View style={[getBubbleStyle(bubble3, 45), { backgroundColor: isComplete ? colors.primary : 'rgba(255,255,255,0.4)' }]} />
                    </Animated.View>
                </View>
                
                {/* Bottle Label */}
                <View style={[styles.bottleLabel, { backgroundColor: isComplete ? 'rgba(0,0,0,0.2)' : colors.background[0] }]}>
                   <Text style={[styles.labelText, { color: isComplete ? '#fff' : colors.primary }]}>3L</Text>
                </View>

                {/* Measure Lines */}
                <View style={[styles.measureLine, { bottom: '25%', backgroundColor: isComplete ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }]} />
                <View style={[styles.measureLine, { bottom: '50%', backgroundColor: isComplete ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }]} />
                <View style={[styles.measureLine, { bottom: '75%', backgroundColor: isComplete ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }]} />
            </View>

            {/* Bottle Neck & Cap */}
            <View style={[styles.jugNeck, { borderColor: isComplete ? 'rgba(255,255,255,0.5)' : colors.glassBorder, backgroundColor: isComplete ? 'rgba(255,255,255,0.2)' : (mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)') }]} />
            <View style={[styles.jugCap, { backgroundColor: isComplete ? '#fff' : colors.primary }]} />
            
            <TouchableOpacity 
                style={[styles.addWaterFab, { backgroundColor: isComplete ? '#fff' : colors.accent }]} 
                onPress={addWater}
                activeOpacity={0.8}
                disabled={isComplete}
            >
                {isComplete ? (
                    <Check size={20} color={colors.primary} strokeWidth={3} />
                ) : (
                    <Plus size={20} color="#fff" strokeWidth={3} />
                )}
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.waterFooter}>
          <Text style={[styles.waterCount, { color: isComplete ? '#fff' : colors.primary }]}>
            {(cups * 0.25).toFixed(1)}L
            <Text style={{ fontSize: 12, color: isComplete ? 'rgba(255,255,255,0.85)' : colors.textSecondary }}>
              {' '} / 3L Goal
            </Text>
          </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  waterCard: { width: '100%', height: CARD_HEIGHT, padding: 20, position: 'relative', justifyContent: 'space-between' },
  cardFill: { position: 'absolute', left: 0, right: 0, bottom: 0, height: CARD_HEIGHT, borderRadius: 32 },
  cardFillLabel: {
    position: 'absolute',
    top: 14,
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  cardFillLabelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  cardPulse: { position: 'absolute', left: -10, right: -10, top: -10, bottom: -10, borderRadius: 36 },
  cardWave: { position: 'absolute', left: 0, right: 0, height: 46, top: 70, borderRadius: 28, opacity: 0.6 },
  waterContent: { flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 },
  waterTextSection: { alignItems: 'center', gap: 8 },
  waterIconBg: { padding: 8, borderRadius: 12 },
  waterTitle: { fontSize: 18, fontWeight: '900', textAlign: 'center' },
  waterDesc: { fontSize: 12, fontWeight: '600', textAlign: 'center', lineHeight: 16 },
  
  jugContainer: { width: 70, height: 160, position: 'relative', alignItems: 'center', marginTop: 10 },
  jugBody: { width: 60, height: 140, borderRadius: 12, borderWidth: 2, position: 'absolute', bottom: 0, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.1)' },
  jugNeck: { width: 30, height: 20, borderTopLeftRadius: 4, borderTopRightRadius: 4, borderWidth: 2, borderBottomWidth: 0, position: 'absolute', top: 5 },
  jugCap: { width: 34, height: 8, borderRadius: 2, position: 'absolute', top: 0 },
  
  liquid: { width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 },
  measureLine: { width: 10, height: 1, position: 'absolute', right: 4 },
  
  bottleLabel: { 
      position: 'absolute', 
      top: '40%', 
      left: 0, 
      right: 0, 
      height: 24, 
      alignItems: 'center', 
      justifyContent: 'center', 
      opacity: 0.8 
  },
  labelText: { fontSize: 10, fontWeight: '900' },

  addWaterFab: { position: 'absolute', bottom: -10, right: -16, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  waterFooter: { alignItems: 'center', marginTop: 8 },
  waterCount: { fontSize: 20, fontWeight: '900' },
});
