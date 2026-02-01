import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Flame, CheckCircle2 } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

export const DailyChallenge = () => {
  const [completed, setCompleted] = useState(false);
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={() => setCompleted(!completed)}
    >
      <GlassView style={[styles.challengeCard, completed && { backgroundColor: colors.primary }]} intensity={completed ? 80 : 40} borderRadius={28}>
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.challengeIconBox, { backgroundColor: completed ? 'rgba(255,255,255,0.2)' : colors.warning + '20' }]}> 
            {completed ? <CheckCircle2 size={24} color="#fff" /> : <Flame size={24} color={colors.warning} fill={colors.warning} />}
          </View>
          <Text style={[styles.challengeLabel, completed ? styles.textWhite : { color: colors.textSecondary }]}>Tahadi l'Youm 🔥</Text>
          <Text style={[styles.challengeTitle, completed ? styles.textWhite : { color: colors.text }]}>
              {completed ? "M3allem!" : "Na9es khobz"}
          </Text>
          {completed && (
            <View style={styles.rewardBadge}> 
              <Text style={styles.challengeReward}>+50 XP</Text>
            </View>
          )}
        </View>
      </GlassView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  challengeCard: { width: '100%', padding: 16, justifyContent: 'center', height: 140 },
  challengeIconBox: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  challengeLabel: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  challengeTitle: { fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  textWhite: { color: '#fff' },
  rewardBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  challengeReward: { fontSize: 10, fontWeight: '900', color: '#fff' },
});
