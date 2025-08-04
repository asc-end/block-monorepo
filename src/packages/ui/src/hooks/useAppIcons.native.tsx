import { useState, useEffect, useRef } from 'react';
import { getInstalledApps } from 'expo-app-blocker';

interface AppWithIcon {
  appName: string;
  packageName: string;
  iconUri?: string;
}

// Cache app icons in memory
const appIconCache = new Map<string, string>();

export function useAppIcons() {
  const [appIcons, setAppIcons] = useState<Map<string, string>>(new Map());
  const isLoadingRef = useRef(false);

  const loadAppIcons = async () => {
    // Prevent multiple simultaneous loads
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;

    try {
      const installedApps: AppWithIcon[] = await getInstalledApps();
      
      const newIconMap = new Map<string, string>();
      
      installedApps.forEach(app => {
        if (app.iconUri) {
          // Store by app name (display name)
          newIconMap.set(app.appName, app.iconUri);
          appIconCache.set(app.appName, app.iconUri);
          
          // Also store by package name for matching
          newIconMap.set(app.packageName, app.iconUri);
          appIconCache.set(app.packageName, app.iconUri);
        }
      });
      
      setAppIcons(newIconMap);
    } catch (error) {
      console.log('Could not load app icons:', error);
    } finally {
      isLoadingRef.current = false;
    }
  };

  useEffect(() => {
    // Load icons from cache first if available
    if (appIconCache.size > 0) {
      setAppIcons(new Map(appIconCache));
    }
    
    // Then refresh from device
    loadAppIcons();
  }, []);

  const getAppIcon = (appName: string): string | null => {
    return appIcons.get(appName) || appIconCache.get(appName) || null;
  };

  return {
    appIcons,
    getAppIcon,
    refreshIcons: loadAppIcons
  };
}