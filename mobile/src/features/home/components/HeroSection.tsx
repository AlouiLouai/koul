import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';
import { GlassView } from '../../../components/GlassView';
import { useTheme } from '../../../theme/ThemeContext';

export const HeroSection = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.heroSection}> 
      <View style={styles.heroTopRow}>
         <Text style={[styles.heroTitle, { color: colors.text }]}> 
           Koul Mli7,
           <Text style={[styles.heroHighlight, { color: colors.primary }]}> 
             T3ich Mli7.
           </Text>
         </Text>
         <GlassView style={styles.streakBadge} intensity={40} borderRadius={16}>
            <Flame size={18} color="#f97316" fill="#f97316" /><Text style={styles.streakText}>3 Jours</Text>
         </GlassView>
      </View>
      <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}> 
        Sawar sahnek, na3tiwek el s7i7 bel AI fi thawéni.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: { width: '100%', marginBottom: 24, marginTop: 8 },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  heroTitle: { fontSize: 32, lineHeight: 40, fontWeight: '900', letterSpacing: -0.5 },
  heroHighlight: { fontSize: 38, lineHeight: 46 },
  streakBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, gap: 6 },
  streakText: { color: '#c2410c', fontWeight: '800', fontSize: 12 },
  heroSubtitle: { fontSize: 15, fontWeight: '500', marginTop: 12, maxWidth: 280, lineHeight: 24 },
});
