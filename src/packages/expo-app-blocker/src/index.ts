import { requireNativeModule } from 'expo-modules-core';

// Define the interface based on the methods available in your native module
// (Should match the methods defined in AppBlockerModule.kt/java)
interface AppBlockerNativeModule {
  // Use more specific types based on what your native functions actually return
  checkPermissions(): Promise<{ 
    granted: boolean; 
    usageStatsGranted?: boolean; 
    overlayGranted?: boolean; 
    notificationListenerGranted?: boolean;
    notificationBlockingEnabled?: boolean;
    prompted?: boolean; 
    error?: string 
  }>;
  requestPermissions(): Promise<{ 
    granted: boolean; 
    prompted?: boolean; 
    error?: string;
    message?: string;
  }>;
  setNotificationBlockingEnabled(enabled: boolean): Promise<{ success: boolean }>;
  getInstalledApps(): Promise<Array<{ appName: string; packageName: string; isBlocked: boolean; iconUri?: string }>>;
  startMonitoring(): Promise<{ success: boolean; error?: string }>;
  blockApps(packageNames: string[]): Promise<{ success: boolean; error?: string }>;
  getBlockingStats(): Promise<{ totalBlocks: number; appStats: Record<string, number> }>;
  getAppUsageTime(): Promise<{ appUsageTime: Record<string, number>; error?: string }>;
  getHourlyAppUsage(hours: number): Promise<{ hourlyStats: Record<string, Record<string, number>>; error?: string }>;
  getHistoricalAppUsage(days: number): Promise<{ historicalStats: Record<string, Record<string, number>>; error?: string }>;
  getUninstallationEvents(): Promise<Array<{ packageName: string; eventType: string }>>;
  getInstallationHistory(): Promise<{ 
    installEvents: string[]; 
    lastInstallTime: number;
  }>;
  getCheatingAttempts(): Promise<{ 
    attempts: number;
    timestamps: string[];
  }>;
  endFocusSession(): Promise<{ success: boolean }>;
  // Settings opening functions
  openUsageStatsSettings(): Promise<{ success: boolean; error?: string }>;
  openOverlaySettings(): Promise<{ success: boolean; error?: string }>;
  openNotificationListenerSettings(): Promise<{ success: boolean; error?: string }>;
  // Add any other functions your native module provides
}

// Make sure this name matches EXACTLY what's in the native code
const NativeAppBlocker = requireNativeModule('AppBlockerModule');

// Apply the interface for type safety and autocompletion
const AppBlockerModule = NativeAppBlocker as AppBlockerNativeModule;

export default AppBlockerModule;

// You could also export individual functions if preferred:
export const checkPermissions = AppBlockerModule.checkPermissions;
export const getInstalledApps = AppBlockerModule.getInstalledApps;
export const requestPermissions = AppBlockerModule.requestPermissions;
export const startMonitoring = AppBlockerModule.startMonitoring;
export const blockApps = AppBlockerModule.blockApps;
export const getBlockingStats = AppBlockerModule.getBlockingStats;
export const getAppUsageTime = AppBlockerModule.getAppUsageTime;
export const getHourlyAppUsage = AppBlockerModule.getHourlyAppUsage;
export const getHistoricalAppUsage = AppBlockerModule.getHistoricalAppUsage;
export const getUninstallationEvents = AppBlockerModule.getUninstallationEvents;
export const getInstallationHistory = AppBlockerModule.getInstallationHistory;
export const getCheatingAttempts = AppBlockerModule.getCheatingAttempts;
export const endFocusSession = AppBlockerModule.endFocusSession;
export const openUsageStatsSettings = AppBlockerModule.openUsageStatsSettings;
export const openOverlaySettings = AppBlockerModule.openOverlaySettings;
export const openNotificationListenerSettings = AppBlockerModule.openNotificationListenerSettings;
