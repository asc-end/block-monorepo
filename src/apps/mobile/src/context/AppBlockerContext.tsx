import AppBlockerModule from 'expo-app-blocker';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform, Alert, AppState } from 'react-native';

interface InstalledApp {
    packageName: string; // or bundleId for iOS
    appName: string;
    isBlocked: boolean;
    iconUri?: string;
}

interface AppBlockerContextType {
    installedApps: InstalledApp[];
    loading: boolean;
    hasPermissions: boolean;
    permissionsStatus: {
        usageStatsGranted: boolean;
        overlayGranted: boolean;
        notificationListenerGranted: boolean;
        notificationBlockingEnabled: boolean;
    };
    requestPermissions: () => Promise<boolean>;
    toggleAppBlock: (app: InstalledApp) => Promise<void>;
    refreshApps: () => Promise<void>;
    checkPermissions: () => Promise<void>;
    uninstallEvents: string[];
    installationHistory: {
        installEvents: string[];
        lastInstallTime: number;
    };
}

const AppBlockerContext = createContext<AppBlockerContextType | null>(null);

export const AppBlockerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [installedApps, setInstalledApps] = useState<InstalledApp[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasPermissions, setHasPermissions] = useState(false);
    const [permissionsStatus, setPermissionsStatus] = useState({
        usageStatsGranted: false,
        overlayGranted: false,
        notificationListenerGranted: false,
        notificationBlockingEnabled: false,
    });
    const [isMonitoringStarted, setIsMonitoringStarted] = useState(false);
    const [uninstallEvents, setUninstallEvents] = useState<string[]>([]);
    const [installationHistory, setInstallationHistory] = useState<{
        installEvents: string[];
        lastInstallTime: number;
    }>({
        installEvents: [],
        lastInstallTime: 0
    });

    useEffect(() => {
        checkPermissionsAndLoadApps();
        
        // Listen for app state changes to re-check permissions when returning from settings
        const handleAppStateChange = (nextAppState: string) => {
            if (nextAppState === 'active') {
                checkPermissionsAndLoadApps();
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        
        return () => {
            subscription?.remove();
        };
    }, []);

    // Start monitoring when permissions are granted
    useEffect(() => {
        if (hasPermissions && !isMonitoringStarted) {
            startAppBlockingService();
        }
    }, [hasPermissions]);

    const checkPermissionsOnly = async () => {
        try {
            const permissionsResult = await AppBlockerModule.checkPermissions();
            setHasPermissions(permissionsResult.granted);
            setPermissionsStatus({
                usageStatsGranted: permissionsResult.usageStatsGranted || false,
                overlayGranted: permissionsResult.overlayGranted || false,
                notificationListenerGranted: permissionsResult.notificationListenerGranted || false,
                notificationBlockingEnabled: permissionsResult.notificationBlockingEnabled || false,
            });
            return permissionsResult;
        } catch (error) {
            console.error('Failed to check permissions:', error);
            throw error;
        }
    };

    const checkPermissionsAndLoadApps = async () => {
        try {
            setLoading(true);
            const permissionsResult = await checkPermissionsOnly();

            if (permissionsResult.granted) {
                await refreshApps();
            }
        } catch (error) {
            console.error('Failed to check permissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const requestPermissions = async () => {
        try {
            const result = await AppBlockerModule.requestPermissions();

            // Check permissions again after user interaction
            const updatedPermissions = await AppBlockerModule.checkPermissions();
            setHasPermissions(updatedPermissions.granted);
            setPermissionsStatus({
                usageStatsGranted: updatedPermissions.usageStatsGranted || false,
                overlayGranted: updatedPermissions.overlayGranted || false,
                notificationListenerGranted: updatedPermissions.notificationListenerGranted || false,
                notificationBlockingEnabled: updatedPermissions.notificationBlockingEnabled || false,
            });

            if (result.message) {
                Alert.alert(
                    "Permission Required",
                    result.message,
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                // Check permissions again after user dismisses the alert
                                checkPermissionsAndLoadApps();
                            }
                        }
                    ]
                );
            }

            return updatedPermissions.granted;
        } catch (error) {
            console.error('Failed to request permissions:', error);
            return false;
        }
    };

    const refreshApps = async () => {
        try {
            setLoading(true);
            const apps = await AppBlockerModule.getInstalledApps();
            setInstalledApps(apps);
        } catch (error) {
            console.error('Failed to load apps:', error);
        } finally {
            setLoading(false);
        }
    };

    const startAppBlockingService = async () => {
        try {
            const result = await AppBlockerModule.startMonitoring();
            if (result.success) {
                setIsMonitoringStarted(true);
            }
        } catch (error) {
            console.error("Error starting app blocking service:", error);
        }
    };

    const toggleAppBlock = async (app: InstalledApp) => {
        try {
            // Update local state first for immediate UI feedback
            const updatedApp = { ...app, isBlocked: !app.isBlocked };

            // Update the state with the new app status
            setInstalledApps(
                installedApps.map(a =>
                    a.packageName === app.packageName ? updatedApp : a
                )
            );

            // Platform-specific implementation
            if (Platform.OS === 'android') {
                // Get all currently blocked apps
                const blockedApps = installedApps
                    .filter(a => a.isBlocked || a.packageName === updatedApp.packageName && updatedApp.isBlocked)
                    .map(a => a.packageName);

                // Send the updated list to the native module
                await AppBlockerModule.blockApps(blockedApps);
            } else {
                // iOS implementation would go here
            }
        } catch (error) {
            console.error('Failed to toggle app block:', error);
            // Revert the change in case of error
            setInstalledApps(
                installedApps.map(a =>
                    a.packageName === app.packageName ? app : a
                )
            );
        }
    };

    return (
        <AppBlockerContext.Provider
            value={{
                installedApps,
                loading,
                hasPermissions,
                permissionsStatus,
                requestPermissions,
                toggleAppBlock,
                refreshApps,
                checkPermissions: async () => { await checkPermissionsOnly(); },
                uninstallEvents,
                installationHistory,
            }}
        >
            {children}
        </AppBlockerContext.Provider>
    );
};

export const useAppBlocker = () => {
    const context = useContext(AppBlockerContext);
    if (!context) {
        throw new Error('useAppBlocker must be used within an AppBlockerProvider');
    }
    return context;
}; 