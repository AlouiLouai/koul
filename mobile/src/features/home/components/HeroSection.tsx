import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Zap } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

import { AppLogo } from '../../../components/AppLogo';

export const HeroSection = memo(() => {
  const { colors } = useTheme();
  return (
    <GlassView style={styles.heroCard} intensity={20} borderRadius={32}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <AppLogo size={24} borderRadius={8} intensity={0} />
          <Text style={[styles.tagText, { color: colors.primary }]}>KOUL</Text>
        </View>
        <GlassView style={styles.streakBadge} intensity={40} borderRadius={12}>
           <Zap size={14} color={colors.warning} fill={colors.warning} />
           <Text style={[styles.streakText, { color: colors.warning }]}>3 Jours</Text>
        </GlassView>
      </View>

      <View style={styles.content}>
        <Text style={[styles.heroTitle, { color: colors.text }]}> 
          Koul Tounsi,
          <Text style={[styles.heroHighlight, { color: colors.primary }]}> 
            {"\n"}T3ich Tounsi.
          </Text>
        </Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}> 
          AI ychouf sa7nek, y9ollek chnoua fi kerchek. 🇹🇳
        </Text>
      </View>
    </GlassView>
  );
});

const styles = StyleSheet.create({
  heroCard: { width: '100%', padding: 20, marginBottom: 24 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tagText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  streakBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, gap: 6 },
  streakText: { fontWeight: '800', fontSize: 11 },
  content: { width: '100%' },
  heroTitle: { fontSize: 28, lineHeight: 34, fontWeight: '900', letterSpacing: -0.5 },
  heroHighlight: { fontSize: 32, lineHeight: 38 },
  heroSubtitle: { fontSize: 14, fontWeight: '600', marginTop: 8, maxWidth: '90%', lineHeight: 20 },
});