import { useState } from 'react';

export const useStats = () => {
  // Mock Data - In a real app, this comes from a database/storage
  const [todayStats, setTodayStats] = useState({
      calories: 1250,
      protein: 85,
      carbs: 140,
      fat: 45
  });

  const [dailyScans, setDailyScans] = useState(0);
  const [isPro, setIsPro] = useState(false); // Default to FREE tier

  const logMeal = (mealTotals: { calories: number; protein: number; carbs: number; fat: number }) => {
    setTodayStats(prev => ({
      calories: prev.calories + mealTotals.calories,
      protein: prev.protein + mealTotals.protein,
      carbs: prev.carbs + mealTotals.carbs,
      fat: prev.fat + mealTotals.fat
    }));
  };

  const incrementScans = () => {
    setDailyScans(prev => prev + 1);
  };

  const upgradeToPro = () => {
    setIsPro(true);
  };

  return {
    todayStats,
    dailyScans,
    isPro,
    logMeal,
    incrementScans,
    upgradeToPro
  };
};