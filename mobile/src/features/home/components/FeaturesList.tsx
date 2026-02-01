import React, { memo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ChefHat, Leaf, History, ArrowRight } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

const FeatureCard = memo(({ title, desc, icon: Icon, bg, iconColor }: any) => {
  const { colors } = useTheme();
  return (
    <GlassView style={styles.featureCard} intensity={40} borderRadius={28}> 
      <View style={[styles.featureCardHeader]}> 
        <View style={[styles.featureIcon, { backgroundColor: bg + '80' }]}> 
          <Icon size={22} color={iconColor} /> 
        </View>
        <ArrowRight size={16} color={colors.textSecondary} /> 
      </View>
      <View> 
        <Text style={[styles.featureTitle, { color: colors.text }]}>{title}</Text> 
        <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>{desc}</Text> 
      </View>
    </GlassView>
  );
});

export const FeaturesList = memo(() => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuresScroll}> 
    <FeatureCard 
      title="T7lil Chef" 
      desc="Details mté3ek."
      icon={ChefHat}
      bg="#fff7ed"
      iconColor="#f97316"
    />
    <FeatureCard 
      title="Dké Istina3i" 
      desc="Quantity bel taswira."
      icon={Leaf}
      bg="#ecfdf5"
      iconColor="#10b981"
    />
    <FeatureCard 
      title="Historique" 
      desc="Taba3 progress."
      icon={History}
      bg="#eff6ff"
      iconColor="#3b82f6"
    />
  </ScrollView>
));

const styles = StyleSheet.create({
  featuresScroll: { gap: 16, paddingBottom: 24, paddingRight: 24 },
  featureCard: { width: 170, height: 160, padding: 20, justifyContent: 'space-between' },
  featureCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  featureIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  featureTitle: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
  featureDesc: { fontSize: 12, lineHeight: 18, fontWeight: '500' },
});
