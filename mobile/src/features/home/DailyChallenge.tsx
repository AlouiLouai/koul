import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Flame, CheckCircle2, Trophy } from 'lucide-react-native';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';

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

  const currentProtein = completed ? 90 : 60;
  const goalProtein = 90;
  const progressPercent = (currentProtein / goalProtein) * 100;
  
  // Logic for "behind goal": After 2 PM (14h) and progress < 80%
  const currentHour = new Date().getHours();
  const isBehind = !completed && currentHour >= 14 && progressPercent < 80;
  const progressBarColor = completed ? colors.success : (isBehind ? colors.accent : colors.primary);

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
          intensity={50}
          borderRadius={32}
        >
          <View style={[styles.glowBlob, { backgroundColor: progressBarColor }]} />
          {/* Header Row: Icon + Label in one line */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={[styles.miniIcon, { backgroundColor: completed ? colors.success : progressBarColor + '20' }]}>
                {completed ? (
                  <CheckCircle2 size={12} color="#fff" strokeWidth={3} />
                ) : (
                  <Flame size={12} color={progressBarColor} fill={progressBarColor} />
                )}
              </View>
              <Text style={[styles.tagText, { color: completed ? colors.success : progressBarColor }]}>
                {completed ? 'MISSION TAYBA' : 'EL TAHADI (MISSION)'}
              </Text>
              </View>
              </View>

              {/* Main Content: Larger and more prominent */}
              <View style={styles.content}>
              <View style={styles.textContainer}>
              <Text style={[styles.challengeTitle, { color: colors.text }]}>
                {completed ? "W7ach Safi! 🦁" : "Guedded Rouhik l'Youm"}
              </Text>
              <Text style={[styles.challengeSub, { color: colors.textSecondary }]}>
                {completed ? "Zidt 50 XP f'jibeek" : "Zid 30g Protéine f'foutour l'youm bech t9awi badnek"}
              </Text>
              </View>
              </View>

              {/* Footer Progress/Action */}
              <View style={styles.footer}>
              <View style={styles.progressHeader}>
               <Text style={[styles.progressText, { color: colors.text }]}>{currentProtein}g / {goalProtein}g Protein</Text>
               {completed && <Trophy size={14} color={colors.warning} />}
              </View>
            <View style={[styles.progressBarBg, { backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%`, backgroundColor: progressBarColor }]} />
            </View>
          </View>
        </GlassView>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  challengeCard: { width: '100%', padding: 16, minHeight: 180, justifyContent: 'space-between' },
  glowBlob: { position: 'absolute', right: -30, top: -20, width: 120, height: 120, borderRadius: 60, opacity: 0.16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  miniIcon: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  tagText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  content: { flex: 1, justifyContent: 'flex-start', paddingBottom: 12 },
  textContainer: { width: '100%' },
  challengeTitle: { fontSize: 16, fontWeight: '900', marginBottom: 4 },
  challengeSub: { fontSize: 12, fontWeight: '700', lineHeight: 16, opacity: 0.8 },
  footer: { gap: 6, marginTop: 'auto' },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  progressText: { fontSize: 10, fontWeight: '900' },
  progressBarBg: { width: '100%', height: 6, borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 3 },
});