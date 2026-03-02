import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sparkles, Brain } from 'lucide-react-native';
import { GlassView } from '@/components/GlassView';
import { useTheme } from '@/theme/ThemeContext';
import { useStatsStore } from '@/features/stats/useStatsStore';

export const AIVerdict = () => {
  const { colors } = useTheme();
  const { todayStats } = useStatsStore();

  const getVerdict = () => {
    if (todayStats.calories === 0) return "AI Dietician: Haya, scanni awwil wajba bech na3tik rayi! 🧠";
    if (todayStats.protein < 30) return "Rayi: Mekeltik na9sa protein barcha! Zid chwaya l'7am wala 7out bech badnik yitbna. 💪";
    if (todayStats.calories > 1800) return "Rayi: Rod belek, l'mizén yitla3! Na9es l'khobz w el 3jin l'youm. 🥖";
    return "Rayi: Jawwik mrigel l'youm! Kamel haka w matansech techrob el maa. 🌟";
  };

  return (
    <GlassView style={styles.container} intensity={50} borderRadius={32}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
           <Brain size={16} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Ray l'Expert</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.text, { color: colors.textSecondary }]}>
          {getVerdict()}
        </Text>
      </View>

      <View style={styles.footer}>
         <Sparkles size={12} color={colors.primary} />
         <Text style={[styles.footerText, { color: colors.primary }]}>AI 100% TOUNSI</Text>
      </View>
    </GlassView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, height: 148, justifyContent: 'space-between' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBox: { backgroundColor: 'rgba(37, 99, 235, 0.1)', padding: 6, borderRadius: 10 },
  title: { fontSize: 14, fontWeight: '900' },
  content: { flex: 1, justifyContent: 'center' },
  text: { fontSize: 13, fontWeight: '700', lineHeight: 18, fontStyle: 'italic' },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 6, opacity: 0.6 },
  footerText: { fontSize: 9, fontWeight: '900', letterSpacing: 1 }
});