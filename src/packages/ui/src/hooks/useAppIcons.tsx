import { useState } from 'react';

// Web version - no app icons available
export function useAppIcons() {
  const [appIcons] = useState<Map<string, string>>(new Map());

  const loadAppIcons = async () => {
    // No-op on web
  };

  const getAppIcon = (appName: string): string | null => {
    // Return null on web - icons will be handled differently
    return null;
  };

  return {
    appIcons,
    getAppIcon,
    refreshIcons: loadAppIcons
  };
}