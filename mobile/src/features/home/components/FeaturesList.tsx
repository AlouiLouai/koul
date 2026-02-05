import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Camera, Zap, Shield, Heart } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

const FEATURES = [
  { id: '1', title: 'Sawar w 7alel', sub: 'Macros f\'thania', icon: Camera, color: '#2563eb' },
  { id: '2', title: 'AI 100% Tounsi', sub: 'Ya3ref l\'Kousksi', icon: Zap, color: '#f59e0b' },
  { id: '3', title: 'Khousousia Safia', sub: 'Data mkhabya', icon: Shield, color: '#10b981' },
  { id: '4', title: 'Sa7tek Labes', sub: 'Ahdef tounes', icon: Heart, color: '#e11d48' },
];

export const FeaturesList = () => {
  const { colors } = useTheme();

  return (
    <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
    >
      {FEATURES.map((item) => (
        <View key={item.id} style={styles.cardWrapper}>
            <GlassView intensity={20} borderRadius={24} style={styles.featureCard}>
                <View style={[styles.iconBg, { backgroundColor: item.color + '15' }]}>
                    <item.icon size={24} color={item.color} />
                </View>
                <View>
                    <Text style={[styles.featureTitle, { color: colors.text }]} numberOfLines={2}>{item.title}</Text>
                    <Text style={[styles.featureDesc, { color: colors.textSecondary }]} numberOfLines={1}>{item.sub}</Text>
                </View>
            </GlassView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: 4, gap: 12 },
  cardWrapper: { width: 140, height: 140 }, // Bigger Square
  featureCard: { padding: 16, width: '100%', height: '100%', justifyContent: 'space-between' },
  iconBg: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  featureTitle: { fontSize: 14, fontWeight: '900', marginBottom: 2, lineHeight: 18 },
  featureDesc: { fontSize: 11, fontWeight: '600', opacity: 0.7 },
});