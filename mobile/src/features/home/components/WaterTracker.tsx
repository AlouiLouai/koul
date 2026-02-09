import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Droplets, Plus, Check } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { useStatsStore } from '../../../store/useStatsStore';

const CARD_HEIGHT = 340;

export const WaterTracker = () => {
  const { waterCups: cups, incrementWater } = useStatsStore();
  const { colors, mode } = useTheme();
  const target = 12; // 3L goal
  const isComplete = cups >= target;

  // Animation Values
  const fillAnim = useRef(new Animated.Value(0)).current;
  const bubble1 = useRef(new Animated.Value(0)).current;
  const bubble2 = useRef(new Animated.Value(0)).current;
  const bubble3 = useRef(new Animated.Value(0)).current;
  const cardFillAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const pulseLoopRef = useRef<Animated.CompositeAnimation | null>(null);
  const waveLoopRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (cups < target) {
      incrementWater();
    }
  };

  const getWaterMessage = () => {
    if (cups >= target) return "M3allem! 3L Safia! 🌊";
    if (cups >= target / 2) return "Chtar el thnia! Zidha gartou3. 🚰";
    return "Dabouza 0.5L 3asbeh? 💧";
  };

  const waterTranslateY = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [180, 0]
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
      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -180] }) },
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

      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={[styles.miniIcon, { backgroundColor: isComplete ? 'rgba(255,255,255,0.2)' : colors.primary + '20' }]}>
            <Droplets size={12} color={isComplete ? '#fff' : colors.primary} fill={isComplete ? '#fff' : colors.primary} />
          </View>
          <Text style={[styles.tagText, { color: isComplete ? '#fff' : colors.primary }]}>ERWI 3ROUGEK</Text>
        </View>
      </View>

      <View style={styles.waterContent}>
        <View style={styles.messageSection}>
          <Text style={[styles.waterDesc, { color: isComplete ? 'rgba(255,255,255,0.9)' : colors.textSecondary }]}>
            {getWaterMessage()}
          </Text>
        </View>

        <View style={styles.jugContainer}>
          {/* BIG 3L Bottle Shape */}
          <View style={[styles.jugBody, { borderColor: isComplete ? 'rgba(255,255,255,0.5)' : colors.glassBorder, height: 180, backgroundColor: mode === 'dark' || isComplete ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
            <View style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <Animated.View style={[
                styles.liquid,
                {
                  transform: [{ translateY: waterTranslateY }],
                  backgroundColor: isComplete ? '#fff' : '#3b82f6',
                  opacity: isComplete ? 0.9 : 0.8
                }
              ]}>
                <Animated.View style={[getBubbleStyle(bubble1, 20), { backgroundColor: isComplete ? colors.primary : 'rgba(255,255,255,0.4)' }]} />
                <Animated.View style={[getBubbleStyle(bubble2, 55), { backgroundColor: isComplete ? colors.primary : 'rgba(255,255,255,0.4)' }]} />
                <Animated.View style={[getBubbleStyle(bubble3, 85), { backgroundColor: isComplete ? colors.primary : 'rgba(255,255,255,0.4)' }]} />
              </Animated.View>
            </View>

            {/* Bottle Label */}
            <View style={[styles.bottleLabel, { backgroundColor: isComplete ? 'rgba(0,0,0,0.2)' : colors.background[0] }]}>
              <Text style={[styles.labelText, { color: isComplete ? '#fff' : colors.primary }]}>3L SAFIA</Text>
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
              <Check size={24} color={colors.primary} strokeWidth={3} />
            ) : (
              <Plus size={24} color="#fff" strokeWidth={3} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.waterFooter}>
        <Text style={[styles.waterCount, { color: isComplete ? '#fff' : colors.primary }]}>
          {(cups * 0.25).toFixed(1)}L
          <Text style={{ fontSize: 13, color: isComplete ? 'rgba(255,255,255,0.85)' : colors.textSecondary }}>
            {' '} / 3L Goal
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  waterCard: { width: '100%', height: CARD_HEIGHT, padding: 16, position: 'relative', justifyContent: 'space-between' },
  cardFill: { position: 'absolute', left: 0, right: 0, bottom: 0, height: CARD_HEIGHT, borderRadius: 32 },
  cardPulse: { position: 'absolute', left: -10, right: -10, top: -10, bottom: -10, borderRadius: 36 },
  cardWave: { position: 'absolute', left: 0, right: 0, height: 46, top: 70, borderRadius: 28, opacity: 0.6 },

  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  miniIcon: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tagText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },

  waterContent: { flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  messageSection: { height: 40, justifyContent: 'center', width: '100%' },
  waterDesc: { fontSize: 13, fontWeight: '700', textAlign: 'center', lineHeight: 18 },

  jugContainer: { width: 110, height: 210, position: 'relative', alignItems: 'center', marginTop: 10 },
  jugBody: { width: 105, height: 180, borderRadius: 18, borderWidth: 2.5, position: 'absolute', bottom: 0, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.1)' },
  jugNeck: { width: 45, height: 25, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderWidth: 2.5, borderBottomWidth: 0, position: 'absolute', top: 5 },
  jugCap: { width: 50, height: 10, borderRadius: 3, position: 'absolute', top: 0 },

  liquid: { width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 },
  measureLine: { width: 14, height: 1.5, position: 'absolute', right: 4 },

  bottleLabel: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9
  },
  labelText: { fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },

  addWaterFab: { position: 'absolute', bottom: -5, right: -30, width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  waterFooter: { alignItems: 'center', paddingBottom: 4 },
  waterCount: { fontSize: 24, fontWeight: '900' },
});