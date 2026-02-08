import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createStorage } from '@/lib/mmkv';

const STORAGE_ID = 'stats-storage';
const STORAGE = createStorage(STORAGE_ID);

const storage = createJSONStorage(() => {
  return {
    getItem: (name: string) => {
      const value = STORAGE.getString(name);
      return value ?? null;
    },
    setItem: (name: string, value: string) => {
      STORAGE.set(name, value);
    },
    removeItem: (name: string) => {
      STORAGE.remove(name);
    },
  }
});



interface StatsState {
  todayStats: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  dailyScans: number;
  waterCups: number;
  lastResetDate: string | null;
  isPro: boolean;
  logMeal: (mealTotals: { calories: number; protein: number; carbs: number; fat: number }) => void;
  incrementScans: () => void;
  incrementWater: () => void;
  upgradeToPro: () => void;
  resetDaily: () => void;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set) => ({
      todayStats: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      },
      dailyScans: 0,
      waterCups: 0,
      lastResetDate: new Date().toDateString(),
      isPro: false,

      logMeal: (mealTotals) => set((state) => ({
        todayStats: {
          calories: state.todayStats.calories + mealTotals.calories,
          protein: state.todayStats.protein + mealTotals.protein,
          carbs: state.todayStats.carbs + mealTotals.carbs,
          fat: state.todayStats.fat + mealTotals.fat
        }
      })),

      incrementScans: () => set((state) => ({
        dailyScans: state.dailyScans + 1
      })),

      incrementWater: () => set((state) => ({
        waterCups: Math.min(state.waterCups + 1, 12) // Max 3L (12 * 0.25)
      })),

      upgradeToPro: () => set({ isPro: true }),

      resetDaily: () => set({
        todayStats: { calories: 0, protein: 0, carbs: 0, fat: 0 },
        dailyScans: 0,
        waterCups: 0,
        lastResetDate: new Date().toDateString()
      }),
    }),
    {
      name: STORAGE_ID,
      storage
    }
  )
);
