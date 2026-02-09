import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Crown, X } from 'lucide-react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { StatsUI } from './StatsUI';
import { useTheme } from '../../theme/ThemeContext';
import { useStats } from '../../hooks/useStats';
import { BottomSheetModal } from '../../components/BottomSheetModal';
import { ActionButton } from '../../components/ActionButton';
import { GlassView } from '../../components/GlassView';

// --- Logic / Mock Data ---
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEKLY_DATA = [2100, 2300, 1950, 2400, 2200, 1800, 2500]; // kcals

const HISTORY_ITEMS = [
  { date: 'Today', cals: 2100, p: 180, score: 9.2, status: 'On Track' },
  { date: 'Yesterday', cals: 2300, p: 160, score: 8.5, status: 'High Carb' },
  { date: 'Mon, 26 Jan', cals: 1950, p: 190, score: 9.5, status: 'Perfect' },
  { date: 'Sun, 25 Jan', cals: 2400, p: 140, score: 7.8, status: 'Cheat Meal' },
  { date: 'Sat, 24 Jan', cals: 2200, p: 175, score: 8.9, status: 'On Track' },
];

export type TimeFrame = 'Week' | 'Month' | '3M' | '6M' | 'Year';

interface StatsContainerProps {
  isPro: boolean;
  onShowUpgrade: () => void;
  isUpgradeVisible?: boolean;
}

export const StatsContainer = ({ isPro, onShowUpgrade, isUpgradeVisible }: StatsContainerProps) => {
  const { colors } = useTheme();
  const { todayStats } = useStats();
  const router = useRouter();
  const [timeframe, setTimeframe] = useState<TimeFrame>('Week');
  const [selectedDay] = useState(6);
  const [isDismissed, setIsDismissed] = useState(false);

  // Reset dismissal when user enters the screen
  useFocusEffect(
    useCallback(() => {
      setIsDismissed(false);
    }, [])
  );

  const handleClose = () => {
    setIsDismissed(true);
    // Use a small delay to allow modal animation to start before navigation if possible
    // but redirect immediately to feel snappy
    router.replace('/');
  };

  return (
    <>
      <StatsUI 
         timeframe={timeframe}
         onTimeframeChange={setTimeframe}
         selectedDayIndex={selectedDay}
         weeklyData={WEEKLY_DATA}
         daysLabels={DAYS.map(d => d[0])}
         historyItems={HISTORY_ITEMS}
         todayStats={todayStats}
      />

      <BottomSheetModal visible={!isPro && !isUpgradeVisible && !isDismissed} onClose={handleClose}>
          <View style={styles.content}>
              <View style={styles.header}>
                  <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
                      <GlassView intensity={20} borderRadius={20} style={styles.closeIcon}>
                          <X size={20} color={colors.textSecondary} />
                      </GlassView>
                  </TouchableOpacity>
              </View>

              <View style={[styles.iconBg, { backgroundColor: colors.accent + '15', borderColor: colors.accent + '30' }]}>
                  <Crown size={40} color={colors.accent} fill={colors.accent} />
              </View>
              
              <Text style={[styles.title, { color: colors.text }]}>Statistiques Msekra</Text>
              <Text style={[styles.message, { color: colors.textSecondary }]}>
                  Habit tchouf el progress mta3ek? Walli Premium bach t7allel makletek bel detay w taba3 el forma.
              </Text>

              <View style={styles.actions}>
                  <ActionButton 
                      text="Walli Premium" 
                      variant="primary" 
                      onPress={onShowUpgrade} 
                      flex={1}
                      style={{ backgroundColor: colors.accent }}
                  />
              </View>

              <TouchableOpacity onPress={handleClose} style={styles.secondaryAction}>
                  <Text style={[styles.secondaryText, { color: colors.accent }]}>Rja3 lel Home</Text>
              </TouchableOpacity>
          </View>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
      alignItems: 'center',
      paddingBottom: 10,
  },
  header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: -10,
  },
  closeBtn: {
      zIndex: 10,
  },
  closeIcon: {
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
  },
  iconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
    maxWidth: '85%',
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  secondaryAction: {
      paddingVertical: 8,
  },
  secondaryText: {
      fontSize: 13,
      fontWeight: '700',
      textDecorationLine: 'underline',
  }
});