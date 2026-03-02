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
            <Text style={[styles.title, { color: isComplete ? '#fff' : colors.text }]}>3L</Text>
            <Text style={[styles.statsValue, { color: isComplete ? 'rgba(255,255,255,0.8)' : colors.textSecondary }]}>
               {(cups * 0.25).toFixed(1)}L l'Youm
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottleSection}>
          <BottleShape 
            ref={bottleRef} 
            fillLevel={fillLevel} 
            height={200} 
            color={isComplete ? '#fff' : undefined}
          />
          
          {!isComplete && (
            <TouchableOpacity
              style={[styles.smallAddButton, { backgroundColor: colors.primary }]}
              onPress={addWater}
              activeOpacity={0.8}
            >
              <Text style={styles.addBtnIcon}>+</Text>
            </TouchableOpacity>
          )}
      </View>

      <View style={styles.bottomSection}>
        {isComplete && (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>
              Badnik mrigel 100%! ✨
            </Text>
          </View>
        )}
      </View>
    </GlassView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 352,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
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
    position: 'relative',
    width: '100%',
  },
  smallAddButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  addBtnIcon: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '400',
    marginTop: -2,
  },
  bottomSection: {
    width: '100%',
    minHeight: 20,
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