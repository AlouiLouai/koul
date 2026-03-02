import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { HeroSection } from '@/features/home/HeroSection';
import { WaterTracker } from '@/features/home/WaterTracker';
import { DailyChallenge } from '@/features/home/DailyChallenge';
import { AIVerdict } from '@/features/home/AIVerdict';
import { TrendingDishCard } from '@/features/home/TrendingDishCard';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <>
      <HeroSection />

      <View style={styles.sectionHeader}>
        <View style={styles.liveBadge}>
          <View style={[styles.pulseDot, { backgroundColor: colors.primary }]} />
          <Text style={[styles.liveText, { color: colors.primary }]}>DIMA JIDID</Text>
        </View>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Taw w l'Youm</Text>
      </View>

      <View style={styles.gridRow}>
        <View style={styles.leftCol}>
          <WaterTracker />
        </View>

        <View style={styles.rightCol}>
          <DailyChallenge />
          <AIVerdict />
        </View>
      </View>

      <View style={styles.sectionSpacing}>
        <TrendingDishCard />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  gridRow: { flexDirection: 'row', gap: 12, marginBottom: 24, paddingHorizontal: 4, width: '100%', alignItems: 'flex-start' },
  leftCol: { flex: 4.5 },
  rightCol: { flex: 5.5, gap: 12 },
  sectionSpacing: { width: '100%', marginBottom: 110, paddingHorizontal: 4 }, // Space for TabBar
  sectionTitle: { fontSize: 24, fontWeight: '900', letterSpacing: -1 },
  sectionHeader: { marginBottom: 16, paddingHorizontal: 8 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  pulseDot: { width: 6, height: 6, borderRadius: 3 },
  liveText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
});