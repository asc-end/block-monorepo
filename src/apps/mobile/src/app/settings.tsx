import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@blockit/cross-ui-toolkit';
import { useAppBlocker } from '../context/AppBlockerContext';
import AppBlockerModule from 'expo-app-blocker';

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
      style={[styles.settingItem, { backgroundColor: currentColors.background }]} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIcon}>
        <Ionicons name={icon as any} size={24} color={currentColors.primary[500]} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: currentColors.text.main }]}>
          {title}
        </Text>
        {description && (
          <Text style={[styles.settingDescription, { color: currentColors.text.soft }]}>
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
        <Text style={[styles.settingValue, { color: currentColors.text.soft }]}>
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
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: currentColors.text.soft }]}>
        {title}
      </Text>
      <View style={[styles.sectionContent, { backgroundColor: currentColors.background }]}>
        {children}
      </View>
    </View>
  );
};

const SettingsScreen = () => {
  const { currentColors } = useTheme();
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
    isUsageTrackingEnabled,
    toggleUsageTracking
  } = useAppBlocker();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: currentColors.background }]}
      contentContainerStyle={styles.contentContainer}
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
          title="Enable Usage Tracking"
          description="Monitor app usage and screen time"
          icon="analytics-outline"
          value={isUsageTrackingEnabled}
          showToggle
          onPress={async () => {
            const success = await toggleUsageTracking();
            if (!success) {
              Alert.alert(
                "Error",
                "Unable to open settings. Please navigate to Settings > Privacy & Security > Analytics & Improvements manually.",
                [{ text: "OK" }]
              );
            }
          }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionContent: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  settingValue: {
    fontSize: 14,
    marginLeft: 8,
  },
}); 

export default SettingsScreen;