import { useQuery } from '@tanstack/react-query';
import { api } from '../stores/authStore';

export interface UserStats {
  routinesCompleted: number;
  routinesCanceled: number;
  focusSessionsCompleted: number;
  focusSessionsCanceled: number;
  totalStaked: number;
  totalLost: number;
}

export function useUserStats() {
  return useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      const response = await api().get<UserStats>('/users/stats');
      return response.data;
    },
    staleTime: 30 * 60 * 1000, // Consider stats fresh for 30 minutes
  });
}