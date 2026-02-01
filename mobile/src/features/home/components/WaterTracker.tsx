import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Droplets, Plus } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

export const WaterTracker = ({ onGoalReached }: { onGoalReached: () => void }) => {
  const [cups, setCups] = useState(2);
  const { colors } = useTheme();
  const target = 12; // ~3L goal
  
  // Animation Values
  const fillAnim = useRef(new Animated.Value(0.16)).current; 
  const bubble1 = useRef(new Animated.Value(0)).current;
  const bubble2 = useRef(new Animated.Value(0)).current;
  const bubble3 = useRef(new Animated.Value(0)).current;

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
  }, []);

  useEffect(() => {
     const progress = cups / target;
     Animated.spring(fillAnim, {
         toValue: progress,
         useNativeDriver: true,
         friction: 8,
         tension: 30
     }).start();

     // Smart Notification when Goal Reached
     if (cups === target) {
         onGoalReached();
     }
  }, [cups]);

  const addWater = () => {
    if (cups < target) {
      setCups(prev => prev + 1);
    }
  };

  const getWaterMessage = () => {
      if (cups >= target) return "Bravo! Golltek m3abbia. 🌟";
      if (cups >= target / 2) return "Zid kwayes ekhour!";
      return "3rougek chay7a, ochrob!";
  };

  const waterTranslateY = fillAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [120, 0] 
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
          { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -120] }) },
          { scale: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.5, 1, 0] }) }
      ]
  });

  return (
    <GlassView style={styles.waterCard} intensity={30} borderRadius={32}>
      <View style={styles.waterContent}>
        <View style={styles.waterTextSection}>
           <View style={[styles.waterIconBg, { backgroundColor: colors.primary + '20' }]}>
             <Droplets size={18} color={colors.primary} fill={colors.primary} />
           </View>
           <Text style={[styles.waterTitle, { color: colors.text }]}>Erwi 3rougek</Text>
           <Text style={[styles.waterDesc, { color: colors.textSecondary }]}>
             {getWaterMessage()}
           </Text>
        </View>

        <View style={styles.jugContainer}>
            <View style={[styles.jugBody, { borderColor: colors.glassBorder, height: 120, backgroundColor: colors.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                <View style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                    <Animated.View style={[
                        styles.liquid, 
                        { 
                            transform: [{ translateY: waterTranslateY }],
                            backgroundColor: colors.primary,
                        }
                    ]}> 
                       <Animated.View style={getBubbleStyle(bubble1, 10)} />
                       <Animated.View style={getBubbleStyle(bubble2, 25)} />
                       <Animated.View style={getBubbleStyle(bubble3, 35)} />
                    </Animated.View>
                </View>
                <View style={[styles.measureLine, { bottom: '25%', backgroundColor: 'rgba(255,255,255,0.3)' }]} />
                <View style={[styles.measureLine, { bottom: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }]} />
                <View style={[styles.measureLine, { bottom: '75%', backgroundColor: 'rgba(255,255,255,0.3)' }]} />
            </View>
            <View style={[styles.jugNeck, { borderColor: colors.glassBorder, backgroundColor: colors.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} />
            <View style={[styles.jugHandle, { borderColor: colors.glassBorder }]} />
            
            <TouchableOpacity 
                style={[styles.addWaterFab, { backgroundColor: colors.primary }]} 
                onPress={addWater}
                activeOpacity={0.8}
            >
                <Plus size={20} color="#fff" strokeWidth={3} />
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.waterFooter}>
          <Text style={[styles.waterCount, { color: colors.primary }]}>{(cups * 0.25).toFixed(1)}L<Text style={{fontSize: 12, color: colors.textSecondary}}> / 3L Goal</Text></Text>
      </View>
    </GlassView>
  );
};

const styles = StyleSheet.create({
  waterCard: { width: '100%', height: 300, padding: 20, position: 'relative', justifyContent: 'space-between' },
  waterContent: { flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 },
  waterTextSection: { alignItems: 'center', gap: 8 },
  waterIconBg: { padding: 8, borderRadius: 12 },
  waterTitle: { fontSize: 18, fontWeight: '900', textAlign: 'center' },
  waterDesc: { fontSize: 12, fontWeight: '600', textAlign: 'center', lineHeight: 16 },
  jugContainer: { width: 60, height: 100, position: 'relative', alignItems: 'center' },
  jugBody: { width: 50, height: 80, borderRadius: 16, borderWidth: 2, position: 'absolute', bottom: 0, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.1)' },
  jugNeck: { width: 30, height: 15, borderTopLeftRadius: 6, borderTopRightRadius: 6, borderWidth: 2, borderBottomWidth: 0, position: 'absolute', top: 5 },
  jugHandle: { position: 'absolute', right: 0, top: 25, width: 15, height: 30, borderWidth: 2, borderLeftWidth: 0, borderTopRightRadius: 10, borderBottomRightRadius: 10 },
  liquid: { width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 },
  measureLine: { width: 10, height: 1, position: 'absolute', right: 4 },
  addWaterFab: { position: 'absolute', bottom: -10, right: -10, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  waterFooter: { alignItems: 'center', marginTop: 8 },
  waterCount: { fontSize: 20, fontWeight: '900' },
});
