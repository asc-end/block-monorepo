import { useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { getHourlyAppUsage } from 'expo-app-blocker';
import { useAuthStore } from '@blockit/ui';

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
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/app-usage/hourly`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...usage,
            platform: 'mobile',
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to sync usage for ${usage.appName}`);
        }

        return response.json();
      });

      await Promise.all(promises);
      
      // Clear pending usage after successful sync
      await removeSecureItem(PENDING_USAGE_KEY);
      
      // Update last sync time
      const now = new Date();
      await setSecureItem(LAST_SYNC_KEY, now.toISOString());
      lastSyncRef.current = now;
      
      console.log(`Successfully synced ${usageData.length} usage records`);
    } catch (error) {
      console.error('Error syncing usage data:', error);
      // Keep pending data for retry
      await setSecureItem(PENDING_USAGE_KEY, JSON.stringify(usageData));
    }
  }, [token]);

  const collectAndSyncUsage = useCallback(async () => {
    try {
      // Get the last sync time
      const lastSyncStr = await getSecureItem(LAST_SYNC_KEY);
      const lastSync = lastSyncStr ? new Date(lastSyncStr) : new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      // Calculate hours since last sync
      const hoursSinceLastSync = Math.ceil((Date.now() - lastSync.getTime()) / (60 * 60 * 1000));
      
      // Get hourly usage data from native module
      const result = await getHourlyAppUsage(Math.min(hoursSinceLastSync, 24)); // Max 24 hours
      
      if (result.error) {
        console.error('Error getting hourly usage:', result.error);
        return;
      }

      const { hourlyStats } = result;
      if (!hourlyStats) return;

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

      await syncUsageToBackend(uniqueUsage);
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
  }, [token, collectAndSyncUsage]);

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

  return {
    syncNow: collectAndSyncUsage,
  };
};