import React, { memo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ChefHat, ScanLine, TrendingUp, ArrowRight, Utensils } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

const FeatureCard = memo(({ title, desc, icon: Icon, color }: any) => {
  const { colors } = useTheme();
  return (
    <GlassView style={[styles.featureCard, { borderColor: color + '40' }]} intensity={30} borderRadius={24}> 
      <View style={[styles.featureCardHeader]}> 
        <View style={[styles.featureIcon, { backgroundColor: color + '20' }]}> 
          <Icon size={24} color={color} strokeWidth={2.5} /> 
        </View>
        <View style={[styles.arrowCircle, { backgroundColor: color + '10' }]}>
           <ArrowRight size={14} color={color} /> 
        </View>
      </View>
      <View> 
        <Text style={[styles.featureTitle, { color: colors.text }]}>{title}</Text> 
        <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>{desc}</Text> 
      </View>
    </GlassView>
  );
});

export const FeaturesList = memo(() => {
  const { colors } = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuresScroll}> 
      <FeatureCard 
        title="Makla Tounsiya 🇹🇳" 
        desc="Na3rfou el Lablebi, el Couscous, w 7atta el Fricassé!"
        icon={Utensils}
        color={colors.primary}
      />
      <FeatureCard 
        title="Calcul Exact 🎯" 
        desc="Sawar sa7nek, na3tiwek el calories bel dhoft."
        icon={ScanLine}
        color={colors.warning}
      />
      <FeatureCard 
        title="Suivi S7i7 📈" 
        desc="Taba3 el progress mta3ek nhar b'nhar."
        icon={TrendingUp}
        color={colors.success}
      />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  featuresScroll: { gap: 12, paddingBottom: 24, paddingRight: 24 },
  featureCard: { width: 160, height: 170, padding: 16, justifyContent: 'space-between', borderWidth: 1 },
  featureCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  featureIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  arrowCircle: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  featureTitle: { fontSize: 16, fontWeight: '900', marginBottom: 6 },
  featureDesc: { fontSize: 12, lineHeight: 18, fontWeight: '600', opacity: 0.8 },
});
