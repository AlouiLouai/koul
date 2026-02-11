import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { HeroSection } from '@/features/home/HeroSection';
import { WaterTracker } from '@/features/home/WaterTracker';
import { DailyChallenge } from '@/features/home/DailyChallenge';
import { TipCard } from '@/features/home/TipCard';
import { TrendingDishCard } from '@/features/home/TrendingDishCard';
import { FeaturesList } from '@/features/home/FeaturesList';

export default function HomeScreen() {


  const { colors } = useTheme();


  return (
    <>
      <HeroSection />
      <View style={styles.bentoGrid}>
        <View style={styles.leftCol}>
          <WaterTracker />
        </View>

        <View style={styles.rightCol}>
          <DailyChallenge />
          <TipCard />
        </View>
      </View>

      <View style={styles.sectionSpacing}>
        <TrendingDishCard />
      </View>

      <View style={styles.featuresContainer}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>3lech KOUL?</Text>
        </View>
        <FeaturesList />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  bentoGrid: { flexDirection: 'row', gap: 12, marginBottom: 24, width: '100%' },
  leftCol: { flex: 1 },
  rightCol: { flex: 1, gap: 12 },
  sectionSpacing: { width: '100%', marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '900' },
  featuresContainer: { width: '100%' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingHorizontal: 4 },
});