import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../stores/authStore';
import type { FocusSessionType } from '@blockit/shared';
import type { Routine } from '@blockit/shared';

// Unified session type for display
export interface HistoricalSession {
  id: string;
  type: 'focus' | 'routine';
  name: string;
  status: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes for focus sessions
  emoji?: string; // for routines
  stakeAmount?: number; // for routines
  createdAt: Date;
}

interface UseHistoricalSessionsReturn {
  sessions: HistoricalSession[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useHistoricalSessions(): UseHistoricalSessionsReturn {
  const queryClient = useQueryClient();

  // Fetch focus sessions
  const {
    data: focusSessions,
    isLoading: focusLoading,
    error: focusError,
  } = useQuery({
    queryKey: ['focusSessions'],
    queryFn: async () => {
      const response = await api().get<FocusSessionType[]>('/focus-session');
      return response.data;
    },
  });

  // Fetch all routines (including completed/canceled)
  const {
    data: routines,
    isLoading: routinesLoading,
    error: routinesError,
  } = useQuery({
    queryKey: ['routines'],
    queryFn: async () => {
      const response = await api().get<Routine[]>('/routines');
      return response.data;
    },
  });

  // Combine and transform the data
  const sessions: HistoricalSession[] = [];

  // Add focus sessions
  if (focusSessions) {
    focusSessions.forEach(session => {
      // Only include finished or canceled sessions
      if (session.status === 'finished' || session.status === 'canceled') {
        sessions.push({
          id: session.id,
          type: 'focus',
          name: `Focus Session`,
          status: session.status,
          startTime: new Date(session.startTime),
          duration: session.duration,
          createdAt: new Date(session.startTime),
        });
      }
    });
  }

  // Add routines
  if (routines) {
    routines.forEach(routine => {
      // Only include completed or canceled routines
      if (routine.status === 'completed' || routine.status === 'canceled') {
        sessions.push({
          id: routine.id,
          type: 'routine',
          name: routine.name,
          status: routine.status,
          startTime: new Date(routine.createdAt),
          endTime: routine.endDate ? new Date(routine.endDate) : undefined,
          emoji: routine.emoji,
          stakeAmount: routine.stakeAmount,
          createdAt: new Date(routine.createdAt),
        });
      }
    });
  }

  // Sort by start time (most recent first)
  sessions.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());

  const refetch = () => {
    // Manually refetch both queries
    void queryClient.refetchQueries({ queryKey: ['focusSessions'] });
    void queryClient.refetchQueries({ queryKey: ['routines'] });
  };

  return {
    sessions,
    isLoading: focusLoading || routinesLoading,
    error: focusError || routinesError,
    refetch,
  };
}