import { Stack, router } from 'expo-router';
import { Box, useTheme, Pressable, Text } from '@blockit/cross-ui-toolkit';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';

export default function HomeLayout() {
  const { currentColors } = useTheme();

  return (
    <Box className="flex-1" style={{ backgroundColor: currentColors.background }}>
      <Stack
        screenOptions={{
          headerTintColor: currentColors.text.main,
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: currentColors.background,
          },
          contentStyle: {
            backgroundColor: currentColors.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Blockit",
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
                onPress={() => {
                  // Open Discord link in external browser
                  Linking.openURL('https://discord.gg/mMv7rCqA');
                }}
                className="mr-4"
              >
                <Text style={{ color: currentColors.primary[500], fontSize: 14 }}>Join the Community</Text>
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
      </Stack>
    </Box>

  );
}
