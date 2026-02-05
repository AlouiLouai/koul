import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Flame, CheckCircle2, Trophy, ArrowRight } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

export const DailyChallenge = () => {
  const [completed, setCompleted] = useState(false);
  const { colors, mode } = useTheme();
  
  // Interaction scale animation
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => setCompleted(!completed));
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={handlePress}
      >
        <GlassView 
          style={[
            styles.challengeCard, 
            completed && { borderColor: colors.success + '80' }
          ]} 
          intensity={mode === 'dark' ? 60 : 80} 
          borderRadius={28}
        >
          {/* Header Row: Icon + Label in one line */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={[styles.miniIcon, { backgroundColor: completed ? colors.success : colors.accent + '20' }]}>
                {completed ? (
                  <CheckCircle2 size={12} color="#fff" strokeWidth={3} />
                ) : (
                  <Flame size={12} color={colors.accent} fill={colors.accent} />
                )}
              </View>
              <Text style={[styles.tagText, { color: completed ? colors.success : colors.accent }]}>
                {completed ? 'MOUHEMA TEMET' : 'TAHADI L\'YOUM'}
              </Text>
            </View>
            {completed && <Trophy size={14} color={colors.warning} />}
          </View>

          {/* Main Content: Larger and more prominent */}
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={[styles.challengeTitle, { color: colors.text }]}>
                {completed ? "W7ach Safi! 🦁" : "Na9es Khobz l'youm"}
              </Text>
              <Text style={[styles.challengeSub, { color: colors.textSecondary }]}>
                {completed ? "Khidhet 50 XP jdid" : "Zid 30g Protéine f'foutour l'youm bech t9awi badnek"}
              </Text>
            </View>
          </View>

          {/* Footer Progress/Action */}
          <View style={styles.footer}>
            <View style={[styles.progressBarBg, { backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
              <View style={[styles.progressBarFill, { width: completed ? '100%' : '30%', backgroundColor: completed ? colors.success : colors.accent }]} />
            </View>
            {!completed && <ArrowRight size={14} color={colors.textSecondary} />}
          </View>
        </GlassView>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  challengeCard: { width: '100%', padding: 16, height: 160, justifyContent: 'space-between' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  miniIcon: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tagText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  content: { flex: 1, justifyContent: 'center' },
  textContainer: { width: '100%' },
  challengeTitle: { fontSize: 17, fontWeight: '900', marginBottom: 4 },
  challengeSub: { fontSize: 13, fontWeight: '600', lineHeight: 18 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  progressBarBg: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 3 },
});
