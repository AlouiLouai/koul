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
    if (todayStats.calories === 0) return "AI yestanna fik bech tscanni awwil wajba l'youm! 🧠";
    
    const quotes = [
      "Mekeltik mrigla, kamel haka w matensech techrob el maa! 🌟",
      "Zid chwaya protein bech badnik yitbna kima t7eb. 💪",
      "Rod belek mil khobz w el 3jin barcha l'youm, khalliha light! 🥗",
      "Sa7fa lik! Jawik mrigel 100% tounsi m3a KOUL. ✨",
      "Mekla healthy w makhdouma mli7, ya m3allem! 🔥"
    ];

    if (todayStats.protein < 30 && todayStats.calories > 0) return quotes[1];
    if (todayStats.calories > 1800) return quotes[2];
    
    // Deterministic quote based on calories
    return quotes[Math.floor((todayStats.calories / 200) % quotes.length)];
  };

  return (
    <GlassView style={styles.container} intensity={40} borderRadius={24}>
      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
           <Sparkles size={14} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Ray l'Expert</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.text, { color: colors.textSecondary }]}>
          "{getVerdict()}"
        </Text>
      </View>

      <View style={styles.footer}>
         <Text style={[styles.footerText, { color: colors.textSecondary }]}>Powered by Gemini CLI</Text>
      </View>
    </GlassView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, height: 160, justifyContent: 'space-between' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBox: { padding: 6, borderRadius: 10 },
  title: { fontSize: 13, fontWeight: '900', letterSpacing: 0.5 },
  content: { flex: 1, justifyContent: 'center', paddingVertical: 10 },
  text: { fontSize: 13, fontWeight: '700', lineHeight: 18, fontStyle: 'italic' },
  footer: { borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.05)', paddingTop: 8 },
  footerText: { fontSize: 9, fontWeight: '800', opacity: 0.4, letterSpacing: 0.5 }
});