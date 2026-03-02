import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Droplets, Crown } from 'lucide-react-native';
import { useTheme } from '@/theme/ThemeContext';
import { useStatsStore } from '@/features/stats/useStatsStore';
import { BottleShape, BottleRef } from './BottleShape';
import { GlassView } from '@/components/GlassView';

export const WaterTracker = () => {
  const { waterCups: cups, incrementWater } = useStatsStore();
  const { colors } = useTheme();
  const bottleRef = useRef<BottleRef>(null);
  
  const fillLevel = Math.min(cups / 12, 1);
  const isComplete = cups >= 12;

  const addWater = () => {
    if (cups < 12) {
      incrementWater();
      incrementWater();
      bottleRef.current?.triggerWave();
    }
  };

  return (
    <GlassView 
      style={[
        styles.container, 
        isComplete && { backgroundColor: '#2563eb', borderColor: '#3b82f6' }
      ]} 
      intensity={isComplete ? 100 : 50} 
      borderRadius={32}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconBox, { backgroundColor: isComplete ? 'rgba(255,255,255,0.2)' : colors.primary + '20' }]}>
            {isComplete ? (
              <Crown size={16} color="#fff" fill="#fff" />
            ) : (
              <Droplets size={16} color={colors.primary} fill={colors.primary} />
            )}
          </View>
          <View>
            <Text style={[styles.title, { color: isComplete ? '#fff' : colors.text }]}>Hayet</Text>
            <Text style={[styles.statsValue, { color: isComplete ? 'rgba(255,255,255,0.8)' : colors.textSecondary }]}>
               {(cups * 0.25).toFixed(1)}L / 3L
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottleSection}>
          <BottleShape 
            ref={bottleRef} 
            fillLevel={fillLevel} 
            height={160} 
            color={isComplete ? '#fff' : undefined}
          />
      </View>

      <View style={styles.bottomSection}>
        {isComplete ? (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>
              Badnik mrigel 100%! ✨
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={addWater}
            activeOpacity={0.8}
          >
            <Text style={styles.addBtnText}>+0.5L</Text>
          </TouchableOpacity>
        )}
      </View>
    </GlassView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 330,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
  },
  statsValue: {
    fontSize: 12,
    fontWeight: '800',
    marginTop: -2,
  },
  bottleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  bottomSection: {
    width: '100%',
  },
  addButton: {
    width: '100%',
    height: 48,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
  },
  successBanner: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  successText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
  },
});