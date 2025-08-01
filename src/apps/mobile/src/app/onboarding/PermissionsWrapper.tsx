import React from 'react';
import { View, ScrollView, Platform, Alert, Pressable } from 'react-native';
import { Box, Button, Text, useTheme } from '@blockit/cross-ui-toolkit';
import { useAppBlocker } from '@/context/AppBlockerContext';
import AppBlockerModule from 'expo-app-blocker';
import { SettingItem, SettingsSection } from '../../components/Settings';

interface PermissionsWrapperProps {
  onComplete: () => void;
}

export function PermissionsWrapper({ onComplete }: PermissionsWrapperProps) {
  const { currentColors } = useTheme();
  const { permissionsStatus, requestPermissions } = useAppBlocker();

  const handleEnableAll = async () => {
    const granted = await requestPermissions();
    if (granted) {
      onComplete();
    }
  };

  if (Platform.OS === 'ios') {
    return (
      <View className="flex-1 justify-center items-center p-6" style={{ backgroundColor: currentColors.background }}>
        <Text className='text-center mb-4' style={{ fontSize: 64 }}>📱</Text>
        <Text className='text-center mb-8' style={{
          fontSize: 36,
          lineHeight: 44,
          fontFamily: "ClashDisplay",
        }}>
          iOS Limitations
        </Text>
        <Text className='text-center mb-12' style={{
          fontSize: 20,
          color: currentColors.text.soft,
          fontFamily: "ClashDisplay"
        }}>
          App blocking isn't available on iOS, but you can still track your focus sessions
        </Text>
        <Pressable
          onPress={onComplete}
          className='px-8 py-4 rounded-xl'
          style={{ backgroundColor: currentColors.secondary[500] }}
        >
          <Text style={{
            color: currentColors.background,
            fontSize: 18,
            fontWeight: '600',
            fontFamily: "ClashDisplay"
          }}>
            Continue
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Box
      className="flex-1 pb-6"
      style={{ backgroundColor: currentColors.background }}
    >
      <View className=" px-5 flex-1 flex flex-col justify-center">
        <Text
          className='mb-8 text-center'
          style={{
            fontSize: 36,
            lineHeight: 52,
            fontFamily: "ClashDisplay",
          }}>
          Grant permissions
        </Text>

        <SettingsSection title="Required Permissions">
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
      </View>


      <View className="px-5 mt-8">
        <Button onPress={onComplete} title="Let's go" />
      </View>
    </Box>
  );
}