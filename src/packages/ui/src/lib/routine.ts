import type { Routine } from '@blockit/shared';

/**
 * Check if a routine is currently within its active time window
 */
export function isRoutineInActiveTimeWindow(routine: Routine): boolean {
  if (routine.status !== 'active') return false;
  if (routine.timeMode === 'limit') return true;

  // For blocking mode, check if current time is within start and end time
  if (routine.timeMode === 'blocking' && routine.startTime && routine.endTime) {
    const now = new Date();
    // Map to match the format used in routine.selectedDays
    const dayMap = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const currentDay = dayMap[now.getDay()];
    
    // Check if today is in selected days
    if (!routine.selectedDays.includes(currentDay)) {
      return false;
    }

    // Parse time strings (format: "HH:MM")
    const [startHour, startMin] = routine.startTime.split(':').map(Number);
    const [endHour, endMin] = routine.endTime.split(':').map(Number);
    
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMin;
    const startTimeInMinutes = startHour * 60 + startMin;
    const endTimeInMinutes = endHour * 60 + endMin;

    // Handle cases where end time is before start time (spans midnight)
    if (endTimeInMinutes < startTimeInMinutes) {
      // Time window spans midnight
      return currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes < endTimeInMinutes;
    } else {
      // Normal time window within same day
      return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes;
    }
  }

  return false;
}

/**
 * Get a display label for routine status
 */
export function getRoutineStatusDisplay(routine: Routine): { label: string; color: string } {
  if (routine.status === "completed") {
    return { label: 'completed', color: 'neutral' };
  }
  
  if (routine.status === 'canceled') {
    return { label: 'canceled', color: 'error' };
  }

  // For active status, check if it's currently in time window
  if (routine.status === 'active') {
    const inTimeWindow = isRoutineInActiveTimeWindow(routine);
    if (inTimeWindow) {
      return { label: 'active', color: 'success' };
    } else {
      return { label: 'scheduled', color: 'primary' };
    }
  }

  return { label: routine.status, color: 'neutral' };
}