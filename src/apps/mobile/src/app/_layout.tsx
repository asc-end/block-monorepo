import 'react-native-svg'
import '../global.css'
import { router, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme, ThemeProvider, Pressable, Text } from '@blockit/cross-ui-toolkit';
import { PrivyProvider, useEmbeddedSolanaWallet, usePrivy, usePrivyClient } from "@privy-io/expo";
import Connect from './connect';
import { PrivyElements } from "@privy-io/expo/ui";
import { colors, darkColors, useUserCreation, initializeConfig } from '@blockit/ui';
import { useColorScheme, View } from 'react-native';
import { useEffect } from 'react';
import { AppBlockerProvider } from '../context/AppBlockerContext';
import { useAppUsageSync } from '@/hooks/useAppUsageSync';

type EnvVar = {
  key: string;
  displayName: string;
  defaultValue?: string;
}

const requiredEnvVars: EnvVar[] = [
  { key: 'EXPO_PUBLIC_API_URL', displayName: 'API URL', defaultValue: 'http://192.168.1.29:3001' },
  { key: 'EXPO_PUBLIC_WS_URL', displayName: 'WebSocket URL', defaultValue: 'ws://192.168.1.29:3001' },
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

// Initialize config store with environment variables
const config = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.29:3001',
  wsUrl: process.env.EXPO_PUBLIC_WS_URL || 'ws://192.168.1.29:3001',
  privyAppId: process.env.EXPO_PUBLIC_PRIVY_APP_ID,
  privyClientId: process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID || 'client-WY5bqDh4x6Vb9rATJs8qc3MofR9LA2x1QWW7Moj6J3roS',
  environment: 'development' as const
};

initializeConfig(config);

function AppContent() {
  const { currentColors, isDarkMode } = useTheme();
  const { isReady, user } = usePrivy();
  const privyClient = usePrivyClient();
  const { wallets } = useEmbeddedSolanaWallet();
  const { syncNow } = useAppUsageSync();
  
  const getAccessToken = async () => {
    if (!privyClient) return null;
    return privyClient.getAccessToken();
  };

  useEffect(() => {
    if (user) {
      createUser();
      syncNow();
    }
  }, [user]);

  const { createUser } = useUserCreation({
    user,
    isReady,
    getAccessToken,
    walletAddress: wallets?.[0]?.address
  });
  if (isReady && !user) return <Connect />

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerTintColor: currentColors?.text.main,
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: currentColors?.background,
          },
          contentStyle: {
            backgroundColor: currentColors?.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: "Blokit",
            headerRight: () => (
              <View className="flex flex-row">
                <Pressable
                  onPress={() => router.push("/settings")}
                  className="mr-4"
                >
                  <Text style={{ color: currentColors?.primary[500] }}>Settings</Text>
                </Pressable>
                <Pressable
                  onPress={() => router.push("/stats")}
                  className="mr-4"
                >
                  <Text style={{ color: currentColors?.primary[500] }}>Stats</Text>
                </Pressable>
              </View>
            )
          }}
        />
        {/* Create Routine */}
        <Stack.Screen
          name="create-routine"
          options={{
            headerShown: true,
            headerTitle: "Create Routine",
          }}
        />
        <Stack.Screen
          name="create-routine/apps"
          options={{
            headerShown: true,
            headerTitle: "Apps",
          }}
        />
        <Stack.Screen
          name="create-routine/calendar"
          options={{
            headerShown: true,
            headerTitle: "Calendar",
          }}
        />
        <Stack.Screen
          name="create-routine/money"
          options={{
            headerShown: true,
            headerTitle: "Money",
          }}
        />
        <Stack.Screen
          name="create-routine/time"
          options={{
            headerShown: true,
            headerTitle: "Routine Time",
          }}
        />
      </Stack>
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
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider value={{ currentColors, isDarkMode }}>
            <AppBlockerProvider>
              <AppContent />
            </AppBlockerProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PrivyProvider>
  );
}