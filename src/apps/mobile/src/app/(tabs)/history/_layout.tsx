import { router, Stack } from 'expo-router';
import { Box, Pressable, Text, useTheme } from '@blockit/cross-ui-toolkit';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryLayout() {
  const { currentColors } = useTheme();

  return (
    <Box className="flex-1" style={{ backgroundColor: currentColors.background }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: currentColors.background,
          },
          headerTintColor: currentColors.text.main,
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: currentColors.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'History',
            headerLeft: () => (
              <Pressable
                onPress={() => router.push("/settings")}
                className="ml-4 mr-3"
              >
                <Ionicons name="menu" size={20} color={currentColors.text.soft} />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable
                onPress={() => router.push("/sell-data")}
                className="mr-4"
              >
                <Text style={{ color: currentColors.primary[500], fontSize: 14 }}>Sell my data ✨</Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="routine"
          options={{
            headerTitle: "Routine",
          }}
        />
        <Stack.Screen
          name="focus-session"
          options={{
            headerTitle: "Focus Session",
          }}
        />
      </Stack>
    </Box>

  );
}