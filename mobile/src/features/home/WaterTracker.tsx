import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Droplets, Plus, Check } from 'lucide-react-native';
import { useTheme } from '@/theme/ThemeContext';
import { useStatsStore } from '@/features/stats/useStatsStore';
import { BottleShape, BottleRef } from './BottleShape';
import { GlassView } from '@/components/GlassView';

export const WaterTracker = () => {
  const { waterCups: cups, incrementWater } = useStatsStore();
  const { colors } = useTheme();
  const bottleRef = useRef<BottleRef>(null);
  
  // 12 cups = 3L total.
  const fillLevel = Math.min(cups / 12, 1);
  const isComplete = cups >= 12;

  const addWater = () => {
    if (cups < 12) {
      incrementWater();
      bottleRef.current?.triggerWave();
    }
  };

  const getWaterMessage = () => {
    if (cups >= 12) return "M3allem! 3L mcheou!";
    if (cups >= 6) return "Zid ochrob!";
    return "Abda erwi!";
  };

  return (
    <GlassView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={[styles.iconBox, { backgroundColor: colors.primary + '20' }]}>
            <Droplets size={16} color={colors.primary} fill={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Erwi</Text>
        </View>
        <Text style={[styles.percentageText, { color: colors.primary }]}>{Math.round(fillLevel * 100)}%</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.bottleSection}>
            <BottleShape ref={bottleRef} fillLevel={fillLevel} height={150} />
        </View>

        <View style={styles.bottomSection}>
            <Text style={[styles.message, { color: colors.textSecondary }]}>{getWaterMessage()}</Text>
            
            <View style={styles.actionRow}>
                <View>
                    <Text style={[styles.statsValue, { color: colors.text }]}>{(cups * 0.25).toFixed(1)}L</Text>
                    <Text style={[styles.statsLabel, { color: colors.textSecondary }]}>{cups}/12</Text>
                </View>
                
                <TouchableOpacity
                    style={[styles.addButton, { backgroundColor: isComplete ? colors.success : colors.primary }]}
                    onPress={addWater}
                    disabled={isComplete}
                    activeOpacity={0.8}
                >
                    {isComplete ? (
                        <Check size={20} color="#fff" strokeWidth={3} />
                    ) : (
                        <Plus size={20} color="#fff" strokeWidth={3} />
                    )}
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </GlassView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 330, // Perfectly matches DailyChallenge (170) + TipCard (148) + Gap (12)
    justifyContent: 'space-between',
    borderRadius: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '900',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  bottleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    width: '100%',
    gap: 12,
  },
  message: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statsValue: {
    fontSize: 18,
    fontWeight: '900',
  },
  statsLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
