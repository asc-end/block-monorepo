import React from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Platform, Alert, Appearance, Animated, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@blockit/cross-ui-toolkit';

export const SettingItem = ({
  title,
  description,
  icon,
  onPress,
  value,
  showToggle = false,
  showValue = false,
  valueText,
  isLast = false
}: {
  title: string;
  description?: string;
  icon: string;
  onPress?: () => void;
  value?: boolean;
  showToggle?: boolean;
  showValue?: boolean;
  valueText?: string;
  isLast?: boolean;
}) => {
  const { currentColors } = useTheme();
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const colorScheme = useColorScheme();

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.97,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={!onPress}
    >
      <Animated.View
        className="flex-row items-center mx-5 py-4"
        style={{
          backgroundColor: currentColors.background,
          transform: [{ scale: scaleValue }],
          borderBottomWidth: isLast ? 1 : 0,
          borderBottomColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        }}
      >
        <View
          className="w-12 h-12 rounded-xl justify-center items-center mr-4"
          style={{
            backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
          }}
        >
          <Ionicons name={icon as any} size={26} color={currentColors.primary[500]} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold mb-0.5" style={{ color: currentColors.text.main }}>
            {title}
          </Text>
          {description && (
            <Text className="text-sm opacity-70" style={{ color: currentColors.text.soft }}>
              {description}
            </Text>
          )}
        </View>
        {showToggle && (
          <Switch
            value={value}
            onValueChange={onPress}
            trackColor={{ false: currentColors.neutral[200], true: currentColors.primary[400] }}
            thumbColor={value ? currentColors.primary[600] : currentColors.neutral[400]}
            ios_backgroundColor={currentColors.neutral[200]}
          />
        )}
        {showValue && valueText && (
          <View className="flex-row items-center ml-2">
            <Text className="text-sm mr-2" style={{ color: currentColors.text.soft }}>
              {valueText}
            </Text>
            <Ionicons name="chevron-forward" size={18} color={currentColors.text.soft} />
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

export const SettingsSection = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { currentColors } = useTheme();
  const colorScheme = useColorScheme();

  return (
    <View className="mb-7">
      <Text
        className="text-xs font-bold mb-3 ml-5 uppercase tracking-wide"
        style={{ color: currentColors.text.soft }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
};