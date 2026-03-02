import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, Zap } from 'lucide-react-native';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';
import { useRouter } from 'expo-router';
import { useStatsStore } from '@/features/stats/useStatsStore';

export const HeroSection = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { todayStats } = useStatsStore();

  const GOAL = 2200;
  const remaining = Math.max(GOAL - todayStats.calories, 0);

  return (
    <View style={styles.heroContainer}>
      <GlassView style={styles.mainCard} intensity={60} borderRadius={40}>
        <View style={styles.content}>
          <View style={styles.textSection}>
            <View style={styles.liveBadge}>
              <View style={[styles.pulseDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.liveText, { color: colors.primary }]}>AI YESTANNA FIK</Text>
            </View>
            
            <Text style={[styles.mainTitle, { color: colors.text }]}>
              Ya M3allem,{"\n"}
              <Text style={{ color: colors.primary }}>Abda Scanni!</Text>
            </Text>
            
            <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
              Sawar sa7nik tawwa bech{"\n"}t3ich mrigel w labes.
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.scanButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/scan')}
            activeOpacity={0.9}
          >
            <Camera size={44} color="#fff" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <View style={styles.footerStats}>
          <View style={styles.statItem}>
            <Zap size={16} color="#f59e0b" fill="#f59e0b" />
            <Text style={styles.statText}>
              Mazélek <Text style={{ fontWeight: '900', color: colors.text, fontSize: 18 }}>{remaining}</Text> KCAL
            </Text>
          </View>
        </View>
      </GlassView>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: { width: '100%', marginBottom: 24 },
  mainCard: { padding: 32, paddingBottom: 24, borderBottomWidth: 3, borderColor: 'rgba(255,255,255,0.15)' },
  content: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  textSection: { flex: 1 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  pulseDot: { width: 8, height: 8, borderRadius: 4 },
  liveText: { fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  mainTitle: { fontSize: 40, fontWeight: '900', letterSpacing: -1.5, lineHeight: 44 },
  subTitle: { fontSize: 16, fontWeight: '700', marginTop: 12, opacity: 0.8, lineHeight: 22 },
  scanButton: { 
    width: 100, 
    height: 100, 
    borderRadius: 35, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 15,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  footerStats: { 
    paddingTop: 20, 
    borderTopWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16 },
  statText: { fontSize: 14, fontWeight: '800', color: 'rgba(255,255,255,0.6)' }
});