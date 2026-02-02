import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Lock } from 'lucide-react-native';
import { StatsUI } from './StatsUI';
import { useTheme } from '../../theme/ThemeContext';

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
}

export const StatsContainer = ({ isPro, onShowUpgrade }: StatsContainerProps) => {
  const { colors } = useTheme();
  const [timeframe, setTimeframe] = useState<TimeFrame>('Week');
  const [selectedDay, setSelectedDay] = useState(6);

  // Locked State
  if (!isPro) {
    return (
      <View style={styles.container}>
        <View style={styles.blurContainer}>
           <StatsUI 
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
              selectedDayIndex={selectedDay}
              weeklyData={WEEKLY_DATA} 
              daysLabels={DAYS.map(d => d[0])}
              historyItems={HISTORY_ITEMS}
           />
           <View style={[styles.overlay, { backgroundColor: colors.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)' }]} />
        </View>
        
        <View style={[styles.lockCard, { backgroundColor: colors.background[1] }]}>
           <View style={[styles.iconBg, { backgroundColor: colors.warning + '20', borderColor: colors.warning }]}>
              <Lock size={32} color={colors.warning} fill={colors.warning} />
           </View>
           <Text style={[styles.lockTitle, { color: colors.text }]}>Statistiques Msekra</Text>
           <Text style={[styles.lockDesc, { color: colors.textSecondary }]}>Habit tchouf el progress mta3ek? Walli Premium bach t7allel makletek bel detay.</Text>
           <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: colors.text }]} onPress={onShowUpgrade}>
              <Text style={[styles.upgradeBtnText, { color: colors.background[0] }]}>Walli Premium (5 TND)</Text>
           </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <StatsUI 
       timeframe={timeframe}
       onTimeframeChange={setTimeframe}
       selectedDayIndex={selectedDay}
       weeklyData={WEEKLY_DATA}
       daysLabels={DAYS.map(d => d[0])}
       historyItems={HISTORY_ITEMS}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  blurContainer: {
    flex: 1,
    opacity: 0.3, // "Blurred" look
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.1)',
    zIndex: 10,
  },
  lockCard: {
    position: 'absolute',
    top: '30%',
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 20,
  },
  iconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fffbeb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fcd34d',
  },
  lockTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#18181b',
    marginBottom: 8,
  },
  lockDesc: {
    fontSize: 14,
    color: '#71717a',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  upgradeBtn: {
    backgroundColor: '#18181b',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  upgradeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});