import { useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { getHourlyAppUsage } from 'expo-app-blocker';
import { api, useAuthStore } from '@blockit/ui';
import dayjs from 'dayjs';

const SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutes
const LAST_SYNC_KEY = 'lastAppUsageSync';
const PENDING_USAGE_KEY = 'pendingAppUsage';

interface PendingUsage {
  appName: string;
  timeSpent: number;
  hourStart: string;
}

// Helper functions for SecureStore with JSON
const getSecureItem = async (key: string) => {
  const value = await SecureStore.getItemAsync(key);
  return value;
};

const setSecureItem = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

const removeSecureItem = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

export const useAppUsageSync = () => {
  const { token } = useAuthStore();
  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSyncRef = useRef<Date>(new Date());

  const syncUsageToBackend = useCallback(async (usageData: PendingUsage[]) => {
    if (!token || usageData.length === 0) return;

    try {
      // Send each hourly usage record to the backend
      const promises = usageData.map(async (usage) => {
        const { data } = await api().post('/app-usage/hourly-set', {
          ...usage,
          platform: 'mobile',
        });
        if (!data) throw new Error(`Failed to sync usage for ${usage.appName}`);
        return data;
      });

      await Promise.all(promises);

      // Clear pending usage after successful sync
      await removeSecureItem(PENDING_USAGE_KEY);

      // Update last sync time

    } catch (error) {
      console.error('Error syncing usage data:', error);
      // Keep pending data for retry
      await setSecureItem(PENDING_USAGE_KEY, JSON.stringify(usageData));
    }
  }, [token]);

  const collectAndSyncUsage = useCallback(async (startTimestamp?: number, endTimestamp?: number, onDataCollected?: () => void) => {
    try {
      let hours: number;

      if (startTimestamp !== undefined && endTimestamp !== undefined) {
        // Calculate hours between timestamps
        const hoursDiff = Math.ceil((endTimestamp - startTimestamp) / (60 * 60 * 1000));
        hours = Math.min(hoursDiff, 24 * 31); // Max ~1 month
      } else if (startTimestamp !== undefined) {
        // If only start provided, sync from start to now
        const hoursDiff = Math.ceil((Date.now() - startTimestamp) / (60 * 60 * 1000));
        hours = Math.min(hoursDiff, 24 * 31);
      } else {
        // Default behavior: sync since last sync
        const lastSyncStr = await getSecureItem(LAST_SYNC_KEY);
        const lastSync = lastSyncStr ? new Date(lastSyncStr) : new Date(Date.now() - 24 * 60 * 60 * 1000);

        // Calculate hours since last sync
        const hoursSinceLastSync = Math.ceil((Date.now() - lastSync.getTime()) / (60 * 60 * 1000));
        hours = Math.min(hoursSinceLastSync, 24); // Max 24 hours for automatic sync
      }

      // Get hourly usage data from native module
      const result = await getHourlyAppUsage(hours);

      if (result.error) {
        console.error('Error getting hourly usage:', result.error);
        if (onDataCollected) onDataCollected();
        return;
      }

      const { hourlyStats } = result;
      if (!hourlyStats) {
        if (onDataCollected) onDataCollected();
        return;
      }

      // Convert to array format for backend
      const usageData: PendingUsage[] = [];

      Object.entries(hourlyStats).forEach(([hourStart, apps]) => {
        Object.entries(apps).forEach(([appName, timeSpent]) => {
          if (timeSpent > 0) {
            usageData.push({
              appName,
              timeSpent: timeSpent as number,
              hourStart,
            });
          }
        });
      });

      // Get any pending usage from previous failed syncs
      const pendingStr = await getSecureItem(PENDING_USAGE_KEY);
      const pendingUsage = pendingStr ? JSON.parse(pendingStr) : [];

      // Combine with new usage (avoiding duplicates)
      const allUsage = [...pendingUsage, ...usageData];
      const uniqueUsage = Array.from(
        new Map(allUsage.map(item => [`${item.appName}-${item.hourStart}`, item])).values()
      );

      // Call the callback to clear loading state BEFORE syncing to backend
      if (onDataCollected) onDataCollected();

      // Now sync to backend (this happens in the background)
      await syncUsageToBackend(uniqueUsage);

      if (!startTimestamp && !endTimestamp) {
        const now = new Date();
        await setSecureItem(LAST_SYNC_KEY, now.toISOString());
        lastSyncRef.current = now;

      }
    } catch (error) {
      console.error('Error in collectAndSyncUsage:', error);
    }
  }, [syncUsageToBackend]);

  // Set up periodic sync
  useEffect(() => {
    if (!token) return;

    // Initial sync
    collectAndSyncUsage();

    // Set up interval
    syncIntervalRef.current = setInterval(collectAndSyncUsage, SYNC_INTERVAL);

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [token]);

  // Sync when app comes to foreground
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        collectAndSyncUsage();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [collectAndSyncUsage]);

  // Sync entire month of data
  const syncMonthData = useCallback(async (month: string, onDataCollected?: () => void) => {
    // Parse month string (format: "YYYY-MM")
    console.log("syncMonthData")
    console.log(month)
    const monthDate = dayjs(month + '-01');
    const startOfMonth = monthDate.startOf('month');
    const endOfMonth = monthDate.endOf('month');

    // Get timestamps for the month range
    const startTimestamp = startOfMonth.valueOf();
    const endTimestamp = Math.min(endOfMonth.valueOf(), Date.now()); // Don't sync future dates
    console.log(startOfMonth.toISOString(), endOfMonth.toISOString())
    await collectAndSyncUsage(startTimestamp, endTimestamp, onDataCollected);
  }, [collectAndSyncUsage]);

  // Sync a single day of data
  const syncDayData = useCallback(async (date: string, onDataCollected?: () => void) => {
    // Parse date string (format: "YYYY-MM-DD")
    const dayDate = dayjs(date);
    const startOfDay = dayDate.startOf('day');
    const endOfDay = dayDate.endOf('day');

    // Get timestamps for the day range
    const startTimestamp = startOfDay.valueOf();
    const endTimestamp = Math.min(endOfDay.valueOf(), Date.now()); // Don't sync future dates

    await collectAndSyncUsage(startTimestamp, endTimestamp, onDataCollected);
  }, [collectAndSyncUsage]);

  return {
    syncNow: collectAndSyncUsage,
    syncMonthData,
    syncDayData,
  };
};