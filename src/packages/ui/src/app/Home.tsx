import { Fragment, useState } from 'react';
import { formatTime } from '../lib/time';
import { Image, Pressable, Box, Text, Button, useTheme } from '@blockit/cross-ui-toolkit';
import { FocusSession } from './components/focus-sesion/FocusSession';
import { AppUsageToday } from './components/usage/Today';
import { useAppUsage } from '../hooks/useAppUsage';

// Generate current date for demo data
const today = new Date().toISOString().split('T')[0];

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
}

type HomeProps = {
  onCreateRoutine: () => void;
  nativeAppBlocking?: NativeAppBlocking;
}

// Loading skeleton component for app usage
const AppUsageLoadingSkeleton = () => {
  const { currentColors } = useTheme();
  return (
    <Box 
      className="animate-pulse rounded w-full h-[64px]" 
      style={{ 
        backgroundColor: currentColors.surface.card + '50',
      }}
    />
  );
};

export function Home(props: HomeProps) {
  const { onCreateRoutine, nativeAppBlocking } = props;
  const { currentColors } = useTheme();
  const [showDetails, setShowDetails] = useState(false);
  const { appUsage, loading } = useAppUsage()

  const todaysApps = appUsage[today] || {};

  const totalTime = Object.entries(todaysApps)
    .reduce((sum, [appName, platforms]) => {
      const typedPlatforms = platforms as { web: number; mobile: number };
      return sum + typedPlatforms.web + typedPlatforms.mobile;
    }, 0);

  return (
    <Box className="flex flex-col flex-1 items-center p-4 w-full h-full" style={{ gap: 3 }}>
      <Text variant="caption">time spent today</Text>
      <Box className="flex flex-col items-center relative w-full">
        {loading ? (
          <AppUsageLoadingSkeleton />
        ) : (
          <Pressable onPress={() => setShowDetails(!showDetails)}>
            <Text variant='h1' className='tracking-widest'>{totalTime ? formatTime(totalTime) : "00:00"}</Text>
          </Pressable>
        )}
        {showDetails && !loading && (
          <Box
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            <Pressable
              onPress={() => setShowDetails(false)}
              style={{
                backgroundColor: currentColors.background + '80',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999,
              }}
            />
            <AppUsageToday todaysApps={todaysApps} />
          </Box>
        )}
      </Box>
      <Box className="w-full flex-1 p-4 flex bg-theme-card items-center justify-center rounded-xl h-36">
        <Image
          src="https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-c7dc-622f-8b2d-169637af1048/raw?se=2025-06-26T00%3A10%3A51Z&sp=r&sv=2024-08-04&sr=b&scid=1dc41f10-a759-552d-8740-092734f7c867&skoid=bbd22fc4-f881-4ea4-b2f3-c12033cf6a8b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-25T11%3A36%3A28Z&ske=2025-06-26T11%3A36%3A28Z&sks=b&skv=2024-08-04&sr=b&sig=oBUsBu%2BpPHuO3jqWxbM4ZYqhp7Xcq3IVjZiz%2B2xNwqY%3D" 
          alt="Wizard" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>
      <FocusSession nativeAppBlocking={nativeAppBlocking} />

      <Box className='flex flex-col w-full'>
        <Box className='w-full flex flex-row justify-between items-center'>
          <Text variant='h5'>Routines</Text>
          <Button title='Create Routine' size="sm" onPress={onCreateRoutine} variant="ghost" leftIcon={<Text>+</Text>} />
        </Box>
        <Box className='w-full p-4 flex bg-theme-card items-center justify-center rounded-xl h-36'>
          <Text variant='h6'>No routines yet</Text>
        </Box>
      </Box>
    </Box>
  );
}
