import React, { useState } from 'react';
import { useStats } from '@/hooks/useStats';
import { StatsUI } from '@/features/stats/StatsUI';


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
type TimeFrame = 'Week' | 'Month' | '3M' | '6M' | 'Year';

export default function StatsScreen() {
  const [timeframe, setTimeframe] = useState<TimeFrame>('Week');
  const [selectedDay] = useState(6);
  const { todayStats } = useStats();
  return (
    <StatsUI
      timeframe={timeframe}
      onTimeframeChange={setTimeframe}
      selectedDayIndex={selectedDay}
      weeklyData={WEEKLY_DATA}
      daysLabels={DAYS.map(d => d[0])}
      historyItems={HISTORY_ITEMS}
      todayStats={todayStats}
    />
  )
}
