import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Platform, Alert, Appearance, Animated, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@blockit/cross-ui-toolkit';
import { useAppBlocker } from '@/context/AppBlockerContext';
import AppBlockerModule from 'expo-app-blocker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { SettingItem, SettingsSection } from '../../components/Settings';
import { usePrivy } from '@privy-io/expo';

const SettingsScreen = () => {
  const { currentColors } = useTheme();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { logout } = usePrivy();
  const [themeMode, setThemeMode] = useState<'auto' | 'light' | 'dark'>('auto');
  const { permissionsStatus } = useAppBlocker();

  // Load theme preference on mount
  React.useEffect(() => {
    AsyncStorage.getItem('themeMode').then((mode) => {
      if (mode === 'light' || mode === 'dark') {
        setThemeMode(mode);
        Appearance.setColorScheme(mode);
      }
    });
  }, []);

  const handleThemeChange = async (mode: 'auto' | 'light' | 'dark') => {
    setThemeMode(mode);
    await AsyncStorage.setItem('themeMode', mode);

    if (mode === 'auto') {
      Appearance.setColorScheme(null);
    } else {
      Appearance.setColorScheme(mode);
    }
  };

  const cycleTheme = () => {
    const modes: ('auto' | 'light' | 'dark')[] = ['auto', 'light', 'dark'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    handleThemeChange(modes[nextIndex]);
  };

  const getThemeDisplayText = () => {
    if (themeMode === 'auto') {
      return `Auto (${colorScheme === 'dark' ? 'Dark' : 'Light'})`;
    }
    return themeMode === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <View className="flex-1" style={{ backgroundColor: currentColors.background }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="py-6"
        showsVerticalScrollIndicator={false}
      >
      <SettingsSection title="Permissions">
        <SettingItem
          title="Usage Stats Access"
          description="Required to monitor app usage"
          icon="analytics-outline"
          valueText={permissionsStatus.usageStatsGranted ? "Granted" : "Not Granted"}
          showValue
          onPress={async () => {
            try {
              await AppBlockerModule.openUsageStatsSettings();
            } catch (error) {
              console.error('Error opening usage stats settings:', error);
              Alert.alert(
                "Error",
                "Unable to open settings. Please navigate to Settings > Privacy & Security > Analytics & Improvements manually.",
                [{ text: "OK" }]
              );
            }
          }}
        />
        <SettingItem
          title="Display Over Apps"
          description="Required to show blocking overlay"
          icon="layers-outline"
          valueText={permissionsStatus.overlayGranted ? "Granted" : "Not Granted"}
          showValue
          onPress={async () => {
            try {
              await AppBlockerModule.openOverlaySettings();
            } catch (error) {
              console.error('Error opening overlay settings:', error);
              Alert.alert(
                "Error",
                "Unable to open settings. Please navigate to Settings > Apps > Special app access > Display over other apps manually.",
                [{ text: "OK" }]
              );
            }
          }}
        />
      </SettingsSection>

      <SettingsSection title="Appearance">
        <SettingItem
          title="Theme"
          description="Choose your preferred color theme"
          icon="color-palette-outline"
          valueText={getThemeDisplayText()}
          showValue
          isLast
          onPress={cycleTheme}
        />
      </SettingsSection>

      <SettingsSection title="Onboarding">
        <SettingItem
          title="Replay Onboarding"
          description="View the onboarding tutorial again"
          icon="refresh-outline"
          isLast
          onPress={async () => {
            try {
              await AsyncStorage.removeItem('@hasCompletedOnboarding');
              router.replace('/onboarding');
            } catch (error) {
              console.error('Error resetting onboarding:', error);
              Alert.alert('Error', 'Failed to reset onboarding');
            }
          }}
        />
      </SettingsSection>
      </ScrollView>

      <TouchableOpacity
        className="mx-5 mb-8 py-4 rounded-xl"
        style={{
          backgroundColor: currentColors.secondary?.[500] || currentColors.primary[500],
        }}
        onPress={async () => {
          Alert.alert(
            'Disconnect Account',
            'Are you sure you want to sign out?',
            [
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text: 'Disconnect',
                style: 'destructive',
                onPress: async () => {
                  try {
                    await logout();
                    router.replace('/');
                  } catch (error) {
                    console.error('Error logging out:', error);
                    Alert.alert('Error', 'Failed to disconnect. Please try again.');
                  }
                }
              }
            ]
          );
        }}
      >
        <View className="flex-row items-center justify-center">
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="text-white text-base font-semibold ml-2">
            Disconnect
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;