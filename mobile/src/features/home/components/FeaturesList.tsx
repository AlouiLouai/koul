import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ScanLine, TrendingUp, ArrowRight, Utensils } from 'lucide-react-native';
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
  const features = [
    {
      title: 'Makla Tounsiya 🇹🇳',
      desc: 'Min Lablebi l\'Mloukhia, na3rfouhom lkol! 🥘',
      icon: Utensils,
      color: colors.primary,
    },
    {
      title: 'Calcul Exact 🎯',
      desc: 'Bla mizan, sawar w a3raf chnoua klit. 📸',
      icon: ScanLine,
      color: colors.warning,
    },
    {
      title: 'Suivi S7i7 📈',
      desc: "Chouf rou7ek win wselt, w win mechi. 🚀",
      icon: TrendingUp,
      color: colors.success,
    },
  ];

  return (
    <FlashList
      horizontal
      data={features}
      renderItem={({ item }) => (
        <FeatureCard
          title={item.title}
          desc={item.desc}
          icon={item.icon}
          color={item.color}
        />
      )}
      keyExtractor={(item) => item.title}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.featuresScroll}
      estimatedItemSize={170}
      ItemSeparatorComponent={() => <View style={styles.featureSeparator} />}
    />
  );
});

const styles = StyleSheet.create({
  featuresScroll: { paddingBottom: 24, paddingRight: 24 },
  featureSeparator: { width: 12 },
  featureCard: { width: 160, height: 170, padding: 16, justifyContent: 'space-between', borderWidth: 1 },
  featureCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  featureIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  arrowCircle: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  featureTitle: { fontSize: 16, fontWeight: '900', marginBottom: 6 },
  featureDesc: { fontSize: 12, lineHeight: 18, fontWeight: '600', opacity: 0.8 },
});
