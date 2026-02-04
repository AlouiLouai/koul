import { useStatsStore } from '../store/useStatsStore';

export const useStats = () => {
  return useStatsStore();
};