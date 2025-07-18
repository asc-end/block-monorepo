import { Fragment, useState, useEffect, useCallback, useRef } from 'react';
import { formatTime } from '../lib/time';
import { Image, Pressable, Box, Text, Button, useTheme } from '@blockit/cross-ui-toolkit';
import { FocusSession } from './components/focus-sesion/FocusSession';
import { AppUsageToday } from './components/usage/Today';
import { RoutineItem } from './components/routine/RoutineItem';
import { useAppUsage } from '../hooks/useAppUsage';
import { api } from '../stores/authStore';
import type { Routine } from '@blockit/shared';
// import { useFocusEffect } from '../hooks/useFocusEffect';

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
  onViewRoutine?: (routineId: string) => void;
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
  const { onCreateRoutine, onViewRoutine, nativeAppBlocking } = props;
  const { currentColors } = useTheme();
  const [showDetails, setShowDetails] = useState(false);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [routinesLoading, setRoutinesLoading] = useState(true);
  const [scrollOffset, setScrollOffset] = useState(0);
  const { appUsage, loading } = useAppUsage()
  const lastFetchTime = useRef<number>(0);

  // Initial fetch
  useEffect(() => {
    fetchRoutines();
  }, []);

  // Refresh data on focus for mobile (Expo Router)
  useEffect(() => {
    // Check if we're in React Native with Expo Router
    if (typeof window !== 'undefined' && window.navigator?.product === 'ReactNative') {
      // For mobile, we'll use a simple interval to check for updates
      const interval = setInterval(() => {
        fetchRoutines();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, []);

  const fetchRoutines = useCallback(async () => {
    try {
      lastFetchTime.current = Date.now();
      const response = await api().get<Routine[]>('/routines/current');
      setRoutines(response.data);
    } catch (error) {
      console.error('Failed to fetch routines:', error);
    } finally {
      setRoutinesLoading(false);
    }
  }, []);

  const todaysApps = appUsage[today] || {};

  const totalTime = Object.entries(todaysApps)
    .reduce((sum, [, platforms]) => {
      const typedPlatforms = platforms as { web: number; mobile: number };
      // Filter out usage less than 1 second (same as Stats.tsx)
      const mobileTime = typedPlatforms.mobile >= 1000 ? typedPlatforms.mobile : 0;
      const webTime = typedPlatforms.web >= 1000 ? typedPlatforms.web : 0;
      return sum + mobileTime + webTime;
    }, 0);

  // Calculate dynamic heights based on scroll
  const maxImageHeight = 200;
  const minImageHeight = 40;
  const imageHeight = Math.max(minImageHeight, maxImageHeight - scrollOffset);
  
  const handleScroll = (event: any) => {
    const offset = event.nativeEvent.contentOffset.y;
    setScrollOffset(Math.max(0, Math.min(offset, maxImageHeight - minImageHeight)));
  };

  return (
    <Box className="flex flex-col flex-1 w-full h-full">
      {/* Fixed header section */}
      <Box className="flex flex-col items-center p-4 w-full" style={{ gap: 3 }}>
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
        <Box 
            className="w-full p-4 bg-theme-card items-center justify-center rounded-xl overflow-hidden mb-3"
            style={{ height: imageHeight }}
          >
            {/* <Image
              src="https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-c7dc-622f-8b2d-169637af1048/raw?se=2025-06-26T00%3A10%3A51Z&sp=r&sv=2024-08-04&sr=b&scid=1dc41f10-a759-552d-8740-092734f7c867&skoid=bbd22fc4-f881-4ea4-b2f3-c12033cf6a8b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-25T11%3A36%3A28Z&ske=2025-06-26T11%3A36%3A28Z&sks=b&skv=2024-08-04&sr=b&sig=oBUsBu%2BpPHuO3jqWxbM4ZYqhp7Xcq3IVjZiz%2B2xNwqY%3D" 
              alt="Wizard" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain'
              }}
            /> */}
          </Box>
        <FocusSession nativeAppBlocking={nativeAppBlocking} />
      </Box>

      {/* Scrollable section with collapsible image */}
      <Box 
        className="flex-1" 
        // onScroll={handleScroll}
        // showsVerticalScrollIndicator={false}
      >
        <Box className="flex flex-col px-4 w-full">
          {/* Collapsible wizard image */}


          {/* Routines section */}
          <Box className='flex flex-col w-full'>
            <Box className='w-full flex flex-row justify-between items-center mb-2'>
              <Text variant='h5'>Routines</Text>
              <Button title='Create Routine' size="sm" onPress={onCreateRoutine} variant="ghost" leftIcon={<Text>+</Text>} />
            </Box>
            
            {routinesLoading ? (
              <Box className='w-full p-4 flex bg-theme-card items-center justify-center rounded-xl'>
                <Text variant='h6'>Loading...</Text>
              </Box>
            ) : routines.length === 0 ? (
              <Box className='w-full p-4 flex bg-theme-card items-center justify-center rounded-xl'>
                <Text variant='h6'>No routines yet</Text>
              </Box>
            ) : (
              <>
                {routines.map((routine) => (
                  <RoutineItem 
                    key={routine.id}
                    routine={routine}
                    onPress={onViewRoutine || (() => {})}
                  />
                ))}
              </>
            )}
          </Box>
          
          {/* Add some bottom padding for better scrolling */}
          <Box style={{ height: 100 }} />
        </Box>
      </Box>
    </Box>
  );
}
