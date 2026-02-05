import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { HeroSection } from './components/HeroSection';
import { WaterTracker } from './components/WaterTracker';
import { DailyChallenge } from './components/DailyChallenge';
import { TipCard } from './components/TipCard';
import { TrendingDishCard } from './components/TrendingDishCard';
import { FeaturesList } from './components/FeaturesList';

interface HomeUIProps {
  isGuest?: boolean;
  onTriggerAuth?: () => void;
}

export const HomeUI = ({ 
  isGuest = false, 
  onTriggerAuth
}: HomeUIProps) => { 
  
  const { colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.webContentContainer} showsVerticalScrollIndicator={false} bounces={false}> 
      <HeroSection />

      {/* --- BENTO GRID LAYOUT --- */}
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
      
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  webContentContainer: { paddingBottom: 20 },
  bentoGrid: { flexDirection: 'row', gap: 12, marginBottom: 24, width: '100%' },
  leftCol: { flex: 1 },
  rightCol: { flex: 1, gap: 12 },
  sectionSpacing: { width: '100%', marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '900' },
  featuresContainer: { width: '100%' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingHorizontal: 4 },
  bottomSpacer: { height: 140 },
});

export default HomeUI;