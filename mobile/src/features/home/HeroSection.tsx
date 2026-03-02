import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Zap } from 'lucide-react-native';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';

export const HeroSection = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.heroContainer}>
      <View style={styles.headerRow}>
        <Text style={[styles.greeting, { color: colors.text }]}>Saba7 el Khir! 👋</Text>
        <GlassView style={styles.streakBadge} intensity={40} borderRadius={16}>
          <Zap size={14} color="#f59e0b" fill="#f59e0b" />
          <Text style={[styles.streakText, { color: "#f59e0b" }]}>3 Ayam</Text>
        </GlassView>
      </View>

      <GlassView style={styles.heroCard} intensity={30} borderRadius={32}>
        <View style={styles.content}>
          <Text style={[styles.heroTitle, { color: colors.text }]}>
            Scanni sa7nek,
            <Text style={[styles.heroHighlight, { color: colors.primary }]}>
              {"\n"}Ebni badnek.
            </Text>
          </Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
            Ma3ach t7ir fi makeltik. AI y7asiblik kol chay !
          </Text>
        </View>
      </GlassView>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: { width: '100%', marginBottom: 24 },
  greeting: { fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 4 },
  heroCard: { width: '100%', padding: 24, borderBottomWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)' },
  streakBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, gap: 6, backgroundColor: 'rgba(245, 158, 11, 0.1)' },
  streakText: { fontWeight: '900', fontSize: 13 },
  content: { width: '100%' },
  heroTitle: { fontSize: 32, lineHeight: 38, fontWeight: '900', letterSpacing: -1 },
  heroHighlight: { fontSize: 36, lineHeight: 44 },
  heroSubtitle: { fontSize: 16, fontWeight: '600', marginTop: 12, maxWidth: '95%', lineHeight: 22, opacity: 0.8 },
});