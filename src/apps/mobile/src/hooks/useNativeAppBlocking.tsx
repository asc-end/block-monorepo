import { useEffect, useState } from 'react';
import AppBlockerModule from 'expo-app-blocker';
import { getInstalledApps } from 'expo-app-blocker';
import { useAppBlocker } from '../context/AppBlockerContext';

const blockedApps = [
    'com.zhiliaoapp.musically',
    'com.google.android.youtube',
    'com.twitter.android',
    'com.x.android',
    'com.instagram.android',
];

interface PermissionStatus {
    usageStatsGranted: boolean;
    overlayGranted: boolean;
    notificationListenerGranted?: boolean;
    notificationBlockingEnabled?: boolean;
}

interface NativeAppBlocking {
    hasPermissions: boolean;
    permissionsStatus: PermissionStatus;
    requestPermissions: () => Promise<boolean>;
    startBlocking: () => Promise<void>;
    stopBlocking: () => Promise<void>;
    refreshPermissions: () => Promise<void>;
}

export function useNativeAppBlocking(): NativeAppBlocking {
    const { hasPermissions, requestPermissions, permissionsStatus, checkPermissions } = useAppBlocker();
    const [installedApps, setInstalledApps] = useState<string[]>([]);

    useEffect(() => {
        const loadInstalledApps = async () => {
            try {
                const apps = await getInstalledApps();
                setInstalledApps(apps.map(app => app.packageName));
            } catch (error) {
                console.error('Error loading installed apps:', error);
            }
        };

        loadInstalledApps();
    }, []);

    const startBlocking = async () => {
        try {
            // Check permissions first
            if (!hasPermissions) {
                const granted = await requestPermissions();
                if (!granted) {
                    return;
                }
            }
            
            // Start monitoring and block apps
            const monitorResult = await AppBlockerModule.startMonitoring();
            if (!monitorResult.success) {
                return;
            }
            
            const blockResult = await AppBlockerModule.blockApps(blockedApps);
            if (!blockResult.success) {
                return;
            }
        } catch (error) {
            console.error('Error starting app blocking:', error);
        }
    };

    const stopBlocking = async () => {
        try {
            await AppBlockerModule.endFocusSession();
        } catch (error) {
            console.error('Error ending app blocking:', error);
        }
    };

    const refreshPermissions = async () => {
        try {
            await checkPermissions();
        } catch (error) {
            console.error('Error refreshing permissions:', error);
        }
    };

    return {
        hasPermissions,
        permissionsStatus,
        requestPermissions,
        startBlocking,
        stopBlocking,
        refreshPermissions,
    };
}