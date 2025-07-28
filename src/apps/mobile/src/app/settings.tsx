import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Platform, Alert, Appearance } from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@blockit/cross-ui-toolkit';
import { useAppBlocker } from '../context/AppBlockerContext';
import AppBlockerModule from 'expo-app-blocker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingItem = ({ 
  title, 
  description, 
  icon, 
  onPress, 
  value, 
  showToggle = false,
  showValue = false,
  valueText
}: { 
  title: string; 
  description?: string; 
  icon: string; 
  onPress?: () => void;
  value?: boolean;
  showToggle?: boolean;
  showValue?: boolean;
  valueText?: string;
}) => {
  const { currentColors } = useTheme();
  
  return (
    <TouchableOpacity 
      className="flex-row items-center p-4 border-b border-black/10"
      style={{ backgroundColor: currentColors.background }}
      onPress={onPress}
      disabled={!onPress}
    >
      <View className="w-10 h-10 rounded-full bg-black/5 justify-center items-center mr-3">
        <Ionicons name={icon as any} size={24} color={currentColors.primary[500]} />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold mb-1" style={{ color: currentColors.text.main }}>
          {title}
        </Text>
        {description && (
          <Text className="text-sm" style={{ color: currentColors.text.soft }}>
            {description}
          </Text>
        )}
      </View>
      {showToggle && (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: currentColors.neutral[200], true: currentColors.primary[300] }}
          thumbColor={value ? currentColors.primary[500] : currentColors.neutral[400]}
        />
      )}
      {showValue && valueText && (
        <Text className="text-sm ml-2" style={{ color: currentColors.text.soft }}>
          {valueText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const SettingsSection = ({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) => {
  const { currentColors } = useTheme();
  
  return (
    <View className="mb-6">
      <Text className="text-sm font-semibold mb-2 uppercase" style={{ color: currentColors.text.soft }}>
        {title}
      </Text>
      <View className="rounded-xl overflow-hidden" style={{ backgroundColor: currentColors.background }}>
        {children}
      </View>
    </View>
  );
};

const SettingsScreen = () => {
  const { currentColors } = useTheme();
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<'auto' | 'light' | 'dark'>('auto');
  const [isBlockingNotifications, setIsBlockingNotifications] = useState(false);
  const { 
    hasPermissions, 
    permissionsStatus, 
    requestPermissions, 
    checkPermissions,
    installedApps,
    refreshApps,
    uninstallEvents,
    installationHistory,
    loading,
    isUsageTrackingEnabled
  } = useAppBlocker();

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
    <ScrollView 
      className="flex-1"
      style={{ backgroundColor: currentColors.background }}
      contentContainerClassName="p-4"
    >
      <SettingsSection title="App Blocking Permissions">
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

      <SettingsSection title="App Usage Settings">
        <SettingItem
          title="Usage Tracking"
          description="Monitor app usage and screen time"
          icon="analytics-outline"
          valueText={isUsageTrackingEnabled ? "Enabled" : "Disabled"}
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
      </SettingsSection>

      <SettingsSection title="Appearance">
        <SettingItem
          title="Theme"
          description="Choose your preferred color theme"
          icon="color-palette-outline"
          valueText={getThemeDisplayText()}
          showValue
          onPress={cycleTheme}
        />
      </SettingsSection>

      <SettingsSection title="About">
        <SettingItem
          title="Version"
          description="Current app version"
          icon="information-circle-outline"
          valueText="1.0.0"
          showValue
        />
      </SettingsSection>
    </ScrollView>
  );
};

export default SettingsScreen;