import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'lucide-react-native';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';
import { useRouter } from 'expo-router';

export const HeroSection = () => {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.heroContainer}>
      <GlassView style={styles.mainCard} intensity={60} borderRadius={40}>
        <View style={styles.content}>
          <View style={styles.textSection}>
            <Text style={[styles.mainTitle, { color: colors.text }]}>
              Scanni sa7nek,{"\n"}
              <Text style={{ color: colors.primary }}>Ebni badnek.</Text>
            </Text>
            
            <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
              AI ychouf sa7nek,{"\n"}ygollek chnoua fi kerchek.
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
      </GlassView>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: { width: '100%', marginBottom: 24 },
  mainCard: { padding: 32, paddingBottom: 24, borderBottomWidth: 3, borderColor: 'rgba(255,255,255,0.15)' },
  content: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  textSection: { flex: 1 },
  mainTitle: { fontSize: 28, fontWeight: '900', letterSpacing: -1, lineHeight: 32 },
  subTitle: { fontSize: 13, fontWeight: '700', marginTop: 10, opacity: 0.7, lineHeight: 18 },
  scanButton: { 
    width: 80, 
    height: 80, 
    borderRadius: 28, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
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