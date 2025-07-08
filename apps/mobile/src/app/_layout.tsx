import 'react-native-svg'
import '../global.css'
import { router, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme, ThemeProvider, Pressable, Text } from '@blockit/cross-ui-toolkit';
import { PrivyProvider, usePrivy } from "@privy-io/expo";
import Connect from './connect';
import { PrivyElements } from "@privy-io/expo/ui";
import { colors, darkColors } from '@blockit/ui';
import { useColorScheme, View } from 'react-native';

function AppContent() {
  const { currentColors, isDarkMode } = useTheme();
  const { isReady, user } = usePrivy();

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
      appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID}
      clientId='client-WY5bqDh4x6Vb9rATJs8qc3MofR9LA2x1QWW7Moj6J3roS'
    >
      <PrivyElements />
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider value={{ currentColors, isDarkMode }}>
            <AppContent />
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PrivyProvider>
  );
}