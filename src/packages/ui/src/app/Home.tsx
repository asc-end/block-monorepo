import { Fragment, useState, useEffect, useCallback, useRef } from 'react';
import { formatTime } from '../lib/time';
import { Image, Pressable, Box, Text, Button, useTheme, ScrollView, Drawer } from '@blockit/cross-ui-toolkit';
import { FocusSession } from './components/focus-sesion/FocusSession';
import { AppUsageToday } from './components/usage/Today';
import { RoutineItem } from './components/routine/RoutineItem';
import { useAppUsageQuery } from '../hooks/useAppUsageQuery';
import { api } from '../stores/authStore';
import type { Routine } from '@blockit/shared';
import { PlusIcon } from './icons';
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
  sendTransaction?: (tx: any) => Promise<{ signature: string } | null>;
  onNavigateToSuccess?: (sessionId: string) => void;
  onNavigateToLose?: (sessionId: string) => void;
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

// Loading skeleton component for routines
const RoutineLoadingSkeleton = () => {
  const { currentColors } = useTheme();
  return (
    <Box className="flex flex-col" style={{ gap: 8 }}>
      {[1, 2, 3].map((index) => (
        <Box
          key={index}
          className="w-full rounded-xl p-4 animate-pulse"
          style={{
            backgroundColor: currentColors.surface.card,
          }}
        >
          <Box className="flex flex-row justify-between items-start">
            <Box className="flex-1">
              {/* Title skeleton */}
              <Box
                className="h-5 w-32 rounded mb-2"
                style={{ backgroundColor: currentColors.neutral[200] + '50' }}
              />
              {/* Description skeleton */}
              <Box
                className="h-4 w-48 rounded mb-3"
                style={{ backgroundColor: currentColors.neutral[200] + '30' }}
              />
              {/* Apps skeleton */}
              <Box className="flex flex-row" style={{ gap: 4 }}>
                {[1, 2, 3].map((app) => (
                  <Box
                    key={app}
                    className="h-6 w-6 rounded"
                    style={{ backgroundColor: currentColors.neutral[200] + '40' }}
                  />
                ))}
              </Box>
            </Box>
            {/* Time skeleton */}
            <Box
              className="h-6 w-16 rounded"
              style={{ backgroundColor: currentColors.neutral[200] + '30' }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export function Home(props: HomeProps) {
  const { onCreateRoutine, onViewRoutine, nativeAppBlocking, sendTransaction, onNavigateToSuccess, onNavigateToLose } = props;
  const { currentColors } = useTheme();
  const [showDetails, setShowDetails] = useState(false);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [routinesLoading, setRoutinesLoading] = useState(true);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const { appUsage, loading } = useAppUsageQuery()
  const lastFetchTime = useRef<number>(0);

  // Detect if running in extension (smaller viewport)
  const isExtension = typeof window !== 'undefined' && window.innerHeight < 700;

  // Initial fetch
  useEffect(() => {
    fetchRoutines();
  }, []);

  // Refresh data on focus for mobile (Expo Router)
  useEffect(() => {
    // Check if we're in React Native with Expo Router
    if (typeof window !== 'undefined' && window.navigator?.product === 'ReactNative') {
      // For mobile, we'll use a longer interval to reduce re-renders
      const interval = setInterval(() => {
        fetchRoutines();
      }, 30000); // Changed from 2 seconds to 30 seconds

      return () => clearInterval(interval);
    }
  }, []);

  const fetchRoutines = useCallback(async () => {
    try {
      // Only set loading to true if this is the first fetch
      if (!hasFetchedOnce) {
        setRoutinesLoading(true);
      }
      lastFetchTime.current = Date.now();
      const response = await api().get<Routine[]>('/routines/current');
      setRoutines(response.data);
      setHasFetchedOnce(true);
      setRoutinesLoading(false);
    } catch (error) {
      console.error('Failed to fetch routines:', error);
      setHasFetchedOnce(true);
      setRoutinesLoading(false);
    }
  }, [hasFetchedOnce]);

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
  const minImageHeight = 0;
  const imageHeight = Math.max(minImageHeight, maxImageHeight - scrollOffset);

  const handleScroll = (event: any) => {
    const offset = event.nativeEvent.contentOffset.y;
    setScrollOffset(Math.max(0, Math.min(offset, maxImageHeight - minImageHeight)));
  };

  const isScrolled = scrollOffset > 20;
  const headerHeight = isScrolled ? 60 : 120;

  return (
    <Box className="flex flex-col flex-1 w-full h-full">
      {/* Sticky transforming header */}
      <Box
        className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center"
        style={{
          height: headerHeight,
          backgroundColor: currentColors.background,
          borderBottomWidth: isScrolled ? 1 : 0,
          borderBottomColor: currentColors.neutral[200] + '20',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: isScrolled ? 2 : 0 },
          shadowOpacity: isScrolled ? 0.05 : 0,
          shadowRadius: 3,
        }}
      >
        <Pressable onPress={() => setShowDetails(!showDetails)}
          className="flex flex-col items-center justify-center h-full px-4"
          style={{
            transform: `scale(${isScrolled ? 0.85 : 1})`,
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Text
            variant="caption"
            style={{
              fontSize: isScrolled ? 10 : 12,
              opacity: isScrolled ? 0.6 : 0.7,
              marginBottom: isScrolled ? 2 : 4
            }}
          >
            time spent today
          </Text>
          {loading ? (
            <AppUsageLoadingSkeleton />
          ) : (
            <Text
              variant={isScrolled ? 'h4' : 'h1'}
              style={{ transition: 'font-size 0.3s', fontWeight: '600', fontFamily: 'ClashDisplay' }}
            >
              {totalTime ? formatTime(totalTime) : "00:00"}
            </Text>
          )}
        </Pressable>
      </Box>

      {/* Scrollable content with padding for header */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 120 }}
      >
        <Box className="flex flex-col w-full">
          {/* Hero section with image and focus session */}
          <Box className="px-4 pb-4">
            <Box
              className={`w-full ${isExtension ? 'h-32' : 'h-72'} rounded-2xl mb-4 items-center justify-center overflow-hidden`}
              style={{
                // backgroundColor: currentColors.surface.card,
                opacity: Math.max(0, 1 - scrollOffset / 100),
                transform: `translateY(${scrollOffset * 0.5}px)`,
              }}
            >
              <Image
                className='opacity-0'
                src="https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                alt="Hero image"
              />
            </Box>

            <FocusSession
              nativeAppBlocking={nativeAppBlocking}
              sendTransaction={sendTransaction}
              onNavigateToSuccess={onNavigateToSuccess}
              onNavigateToLose={onNavigateToLose}
            />
          </Box>

          {/* Routines section */}
          <Box className="flex flex-col px-4 w-full">
            <Box className='flex flex-col w-full'>
              <Box className='w-full flex flex-row justify-between items-center mb-4'>
                <Text className='flex-1 text-left' style={{ fontWeight: '700' }}>Routines</Text>
                <Pressable onPress={onCreateRoutine} className='flex flex-row gap-3 items-center px-4 py-1 rounded-full' style={{backgroundColor: currentColors.surface.card }}>
                  <PlusIcon color={currentColors.text.soft} size={16}/>
                  <Text style={{color: currentColors.text.soft}} >New routine</Text>
                </Pressable>
              </Box>

              {routinesLoading && !hasFetchedOnce ? (
                <RoutineLoadingSkeleton />
              ) : routines.length === 0 ? (
                <Box
                  className='w-full p-8 flex bg-theme-card items-center justify-center rounded-2xl'
                  style={{
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderColor: currentColors.neutral[200] + '30'
                  }}
                >
                  <Text variant='body' style={{ opacity: 0.5 }}>Create your first routine to get started</Text>
                </Box>
              ) : (
                <Box className="flex flex-col" style={{ gap: 12, paddingBottom: 40 }}>
                  {routines.map((routine) => (
                    <RoutineItem
                      key={routine.id}
                      routine={routine}
                      onPress={onViewRoutine || (() => { })}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </ScrollView>

      <Drawer
        isOpen={showDetails && !loading}
        onClose={() => setShowDetails(false)}
        placement="bottom"
        closeOnOverlayClick={true}
        adjustToContentHeight={true}
      >
        <AppUsageToday todaysApps={todaysApps} />
      </Drawer>
    </Box>
  );
}
