import { Stats } from "@blockit/ui";
import { router } from "expo-router";
import { useAppUsageSync } from "../../../hooks/useAppUsageSync";
import { useCallback, useRef } from "react";
import { useQueryClient } from '@tanstack/react-query';

export default function StatsScreen () {
  const { syncMonthData, syncDayData } = useAppUsageSync();
  const queryClient = useQueryClient();
  const statsRefreshRef = useRef<(() => void) | null>(null);

  // Sync entire month data (called on mount and month changes)
  const handleMonthSync = useCallback(async (month: string) => {
    await syncMonthData(month, async () => {
      // Data collected from device, immediately invalidate queries to show new data
      await queryClient.invalidateQueries({ queryKey: ['app-usage-stats'] });
      await queryClient.invalidateQueries({ queryKey: ['app-usage-hourly'] });
    });
    // Additional refetch if needed
    if (statsRefreshRef.current) {
      statsRefreshRef.current();
    }
  }, [syncMonthData, queryClient]);

  // Sync when day changes or user requests refresh
  const handleDayChange = useCallback(async (date: string) => {
    await syncDayData(date, async () => {
      // Data collected from device, immediately invalidate queries to show new data
      await queryClient.invalidateQueries({ queryKey: ['app-usage-stats'] });
      await queryClient.invalidateQueries({ queryKey: ['app-usage-hourly'] });
    });
    // Additional refetch if needed
    if (statsRefreshRef.current) {
      statsRefreshRef.current();
    }
  }, [syncDayData, queryClient]);

  return <Stats 
    onNavigateToHistorical={() => router.push("/(tabs)/analytics/historical")}
    onDayChange={handleDayChange}
    onMonthSync={handleMonthSync}
    onRefreshReady={(refresh) => { statsRefreshRef.current = refresh; }}
  />
}