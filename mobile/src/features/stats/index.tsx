import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Crown } from 'lucide-react-native';
import { StatsUI } from './StatsUI';
import { useTheme } from '../../theme/ThemeContext';
import { useStats } from '../../hooks/useStats';
import { BottomSheetModal } from '../../components/BottomSheetModal';
import { ActionButton } from '../../components/ActionButton';

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
  const [timeframe, setTimeframe] = useState<TimeFrame>('Week');
  const [selectedDay] = useState(6);

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

      <BottomSheetModal visible={!isPro && !isUpgradeVisible} onClose={() => {}}>
          <View style={styles.content}>
              <View style={[styles.iconBg, { backgroundColor: colors.warning + '20', borderColor: colors.warning }]}>
                  <Crown size={40} color={colors.warning} fill={colors.warning} />
              </View>
              
              <Text style={[styles.title, { color: colors.text }]}>Statistiques Msekra</Text>
              <Text style={[styles.message, { color: colors.textSecondary }]}>
                  Habit tchouf el progress mta3ek? Walli Premium bach t7allel makletek bel detay.
              </Text>

              <View style={styles.actions}>
                  <ActionButton 
                      text="Walli Premium" 
                      variant="primary" 
                      onPress={onShowUpgrade} 
                      flex={1}
                  />
              </View>
          </View>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
      alignItems: 'center',
  },
  iconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 8,
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
  },
});