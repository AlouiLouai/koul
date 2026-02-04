import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import { Platform } from 'react-native';

// Senior Engineering Note: Reverted to MMKV v2.11.0 to remove NitroModules dependency.
// This version uses 'new MMKV()' and 'delete()' instead of 'createMMKV()' and 'remove()'.
let storageInstance: any = null;
try {
  if (Platform.OS !== 'web') {
    storageInstance = new MMKV();
  }
} catch (e) {
  console.warn('MMKV native module not found. Falling back to non-persistent shim (Expo Go).');
}

const mmkvStorage = {
  setItem: (name: string, value: string) => {
    if (storageInstance) {
      storageInstance.set(name, value);
    } else if (typeof localStorage !== 'undefined') {
      localStorage.setItem(name, value);
    }
  },
  getItem: (name: string) => {
    if (storageInstance) {
      const value = storageInstance.getString(name);
      return value ?? null;
    } else if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(name);
    }
    return null;
  },
  removeItem: (name: string) => {
    if (storageInstance) {
      storageInstance.delete(name);
    } else if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(name);
    }
  },
};

interface StatsState {
  todayStats: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  dailyScans: number;
  isPro: boolean;
  logMeal: (mealTotals: { calories: number; protein: number; carbs: number; fat: number }) => void;
  incrementScans: () => void;
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

      upgradeToPro: () => set({ isPro: true }),

      resetDaily: () => set({
        todayStats: { calories: 0, protein: 0, carbs: 0, fat: 0 },
        dailyScans: 0
      }),
    }),
    {
      name: 'stats-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
