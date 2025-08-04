import 'react-native-svg'
import '../global.css'
import { router, SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme, ThemeProvider, Pressable, Text, Box, AlertProvider, AlertManager } from '@blockit/cross-ui-toolkit';
import { PrivyProvider, useEmbeddedSolanaWallet, usePrivy, usePrivyClient } from "@privy-io/expo";
import Connect from './connect';
import { PrivyElements } from "@privy-io/expo/ui";
import { colors, darkColors, useUserCreation, initializeConfig, QueryProvider, AuthProvider, useAuthStore } from '@blockit/ui';
import { useColorScheme, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { AppBlockerProvider } from '../context/AppBlockerContext';
import { useAppUsageSync } from '@/hooks/useAppUsageSync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { useSolana } from '@/hooks/solana/useSolana';

// Configure Reanimated to disable strict mode warnings
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Disable strict mode to remove the warnings
});

type EnvVar = {
  key: string;
  displayName: string;
  defaultValue?: string;
}

const requiredEnvVars: EnvVar[] = [
  { key: 'EXPO_PUBLIC_API_URL', displayName: 'API URL', defaultValue: 'http://localhost:3001' },
  { key: 'EXPO_PUBLIC_WS_URL', displayName: 'WebSocket URL', defaultValue: 'ws://localhost:3001' },
  { key: 'EXPO_PUBLIC_PRIVY_APP_ID', displayName: 'Privy App ID' },
  { key: 'EXPO_PUBLIC_PRIVY_CLIENT_ID', displayName: 'Privy Client ID', defaultValue: 'client-WY5bqDh4x6Vb9rATJs8qc3MofR9LA2x1QWW7Moj6J3roS' }
];

function validateEnvironment(): void {
  const missingVars = requiredEnvVars.filter(
    v => !process.env[v.key] && !v.defaultValue
  );

  if (missingVars.length > 0) {
    const errorDetails = missingVars.map(v => `• ${v.displayName} (${v.key})`).join('\n');
    const errorMsg = `Missing required environment variables:\n${errorDetails}`;

    console.error(errorMsg);
    throw new Error('Environment validation failed. Please ensure all required environment variables are set in your .env file.');
  }
}

validateEnvironment();
SplashScreen.preventAutoHideAsync();

// Initialize config store with environment variables
const config = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001',
  wsUrl: process.env.EXPO_PUBLIC_WS_URL || 'ws://localhost:3001',
  privyAppId: process.env.EXPO_PUBLIC_PRIVY_APP_ID,
  privyClientId: process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID || 'client-WY5bqDh4x6Vb9rATJs8qc3MofR9LA2x1QWW7Moj6J3roS',
  environment: 'development' as const
};

initializeConfig(config);

function AppContent() {
  const { currentColors, isDarkMode } = useTheme();
  const { isReady, user } = usePrivy();
  const privyClient = usePrivyClient();
  const { syncNow } = useAppUsageSync();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const { setToken, token } = useAuthStore();
  const { walletAddress } = useSolana()

  const getAccessToken = async () => {
    if (!privyClient) return null;
    return privyClient.getAccessToken();
  };

  const { createUser, isCreated, isCreating, error } = useUserCreation({
    user,
    isReady,
    getAccessToken,
    walletAddress
  });

  useEffect(() => {
    if (user && walletAddress) {
      console.log('User authenticated with wallet, triggering createUser');
      console.log('Wallet address:', walletAddress);
      createUser();
    } else if (user) {
      console.log('User authenticated but no wallet address yet');
    }
  }, [user, walletAddress, createUser]);

  // Only sync app usage after user is successfully created
  const hasSyncedRef = useRef(false);
  useEffect(() => {
    // Only sync if:
    // 1. User is authenticated
    // 2. Token is set in auth store
    // 3. User has been successfully created (isCreated is true)
    // 4. We haven't already started syncing
    if (user && token && isCreated && !hasSyncedRef.current) {
      hasSyncedRef.current = true;

      // Give a small delay to ensure database writes have completed
      const timer = setTimeout(() => {
        console.log('Starting app usage sync after user creation confirmed');
        syncNow();
      }, 2000); // 2 second delay to ensure user is in database

      return () => clearTimeout(timer);
    }
  }, [user, token, isCreated, syncNow]);

  // Ensure token is set whenever user is authenticated
  useEffect(() => {
    const setAuthToken = async () => {
      if (user && privyClient) {
        try {
          const token = await getAccessToken();
          if (token) {
            setToken(token);
            console.log('Token set in auth store');
          }
        } catch (error) {
          console.error('Failed to set auth token:', error);
        }
      }
    };

    setAuthToken();
  }, [user, privyClient, setToken]);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const completed = await AsyncStorage.getItem('@hasCompletedOnboarding');
        setHasCompletedOnboarding(completed === 'true');
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setHasCompletedOnboarding(false);
      }
    };

    if (user) {
      checkOnboarding();
    }
  }, [user]);


  useEffect(() => {
    if (hasCompletedOnboarding == null || !isReady) {
      return;
    }

    SplashScreen.hideAsync();
  }, [hasCompletedOnboarding, isReady]);
  if (!isReady) {
    // if (!isReady || hasCompletedOnboarding === null) {
    return null;
  }


  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      {!user ? (
        <Connect />
      ) : (
        <Box className="flex-1" style={{ backgroundColor: currentColors.background }}>

          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            {!hasCompletedOnboarding ? (
              <Stack.Screen
                name="onboarding"
                options={{
                  headerShown: false,
                }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="settings"
                  options={{
                    headerShown: false,
                    animation: "ios_from_left",
                  }}
                />
                <Stack.Screen
                  name="sell-data"
                  options={{
                    headerShown: false,
                    animation: "ios_from_right",
                  }}
                />
                <Stack.Screen
                  name="success"
                  options={{
                    headerShown: false,
                    animation: "ios_from_right",
                  }}
                />
                <Stack.Screen
                  name="lose"
                  options={{
                    headerShown: false,
                    animation: "ios_from_right",
                  }}
                />
              </>
            )}
          </Stack>
        </Box>

      )}
    </>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? darkColors : colors;

  return (
    <PrivyProvider
      appId={config.privyAppId}
      clientId={config.privyClientId}
    >
      <PrivyElements />
      <SafeAreaProvider style={{ backgroundColor: currentColors.background }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider value={{ currentColors, isDarkMode }}>
            <AlertProvider>
              <AlertManager />
              <QueryProvider>
                <AppBlockerProvider>
                  <AuthProvider>
                    <AppContent />
                  </AuthProvider>
                </AppBlockerProvider>
              </QueryProvider>
            </AlertProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PrivyProvider>
  );
}