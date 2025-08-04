/**
 * Utility functions for consistent time formatting across the app
 */

/**
 * Formats a time string (HH:MM) to 12-hour format with AM/PM
 * Handles times >= 24:00 for next day display
 */
export function formatTimeDisplay(time: string): string {
  const [hour, minute] = time.split(':').map(Number);
  const isNextDay = hour >= 24;
  const displayHourValue = isNextDay ? hour - 24 : hour;
  const period = displayHourValue >= 12 ? 'PM' : 'AM';
  const displayHour = displayHourValue % 12 || 12;
  const minuteStr = minute.toString().padStart(2, '0');
  
  return `${displayHour}:${minuteStr} ${period}`;
}

/**
 * Formats a duration in minutes to a human-readable string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

/**
 * Formats a time range for display
 */
export function formatTimeRange(startTime: string, endTime: string): string {
  return `${formatTimeDisplay(startTime)} - ${formatTimeDisplay(endTime)}`;
}

/**
 * Formats time information based on mode
 */
export function formatTimeDescription(
  mode: 'blocking' | 'limit',
  startTime?: string,
  endTime?: string,
  duration?: number
): string {
  if (mode === 'blocking' && startTime && endTime) {
    return formatTimeRange(startTime, endTime);
  }
  
  if (mode === 'limit' && duration) {
    return `${formatDuration(duration)} daily`;
  }
  
  return '';
}