import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Lightbulb, Share2 } from 'lucide-react-native';
import { GlassView } from '../../components/GlassView';
import { useTheme } from '../../theme/ThemeContext';

export const TipCard = () => {
  const { colors, mode } = useTheme();
  
  const tipContent = "El zit zitouna dhheb, ama mgharfa barka tekfi! Ma tgharraghach. 🫒";

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Klem Kibar men KOUL: "${tipContent}"`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Parchment color logic
  const parchmentBg = mode === 'dark' ? 'rgba(253, 246, 227, 0.15)' : 'rgba(253, 246, 227, 0.8)';
  const parchmentBorder = mode === 'dark' ? 'rgba(253, 246, 227, 0.2)' : '#e6d5b8';

  return (
    <GlassView 
      style={[styles.tipCard, { backgroundColor: parchmentBg, borderColor: parchmentBorder }]} 
      intensity={50} 
      borderRadius={32}
    >
      <View style={[styles.glowBlob, { backgroundColor: '#b8860b' }]} />
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={[styles.miniIcon, { backgroundColor: '#b8860b20' }]}>
            <Lightbulb size={12} color="#b8860b" fill="#b8860b" />
          </View>
          <Text style={[styles.tagText, { color: '#b8860b' }]}>KLEM KBAR</Text>
        </View>
        
        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Share2 size={16} color="#b8860b" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={[styles.tipText, { color: mode === 'dark' ? colors.textSecondary : '#5d4037' }]} numberOfLines={4}>
          "{tipContent}"
        </Text>
      </View>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  tipCard: { padding: 20, height: 148, justifyContent: 'space-between', borderWidth: 1 },
  glowBlob: { position: 'absolute', right: -26, top: -18, width: 110, height: 110, borderRadius: 55, opacity: 0.1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  miniIcon: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tagText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  shareBtn: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.05)' },
  content: { flex: 1, justifyContent: 'center' },
  tipText: { fontSize: 14, fontWeight: '800', lineHeight: 20, fontStyle: 'italic', textAlign: 'center' },
});