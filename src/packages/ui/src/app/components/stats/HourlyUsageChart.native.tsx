import React, { useState, useRef } from 'react';
import { Box, Text, useTheme, Pressable } from '@blockit/cross-ui-toolkit';
import { formatTime } from '../../../lib/time';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Animated } from 'react-native';

interface HourlyData {
  hour: number;
  time: number;
  label: string;
  apps: {
    [appName: string]: {
      mobile?: number;
      web?: number;
    };
  };
}

interface HourlyUsageChartProps {
  hourlyData: HourlyData[];
  maxHourTime: number;
}

export function HourlyUsageChart({ hourlyData, maxHourTime }: HourlyUsageChartProps) {
  const { currentColors } = useTheme();
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [panHour, setPanHour] = useState<number | null>(null);
  const chartWidth = useRef<number>(0);
  const containerRef = useRef<any>(null);

  const handlePanGesture = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const { x } = event.nativeEvent;
      if (chartWidth.current > 0) {
        const hourIndex = Math.floor((x / chartWidth.current) * 24);
        if (hourIndex >= 0 && hourIndex < 24) {
          setPanHour(hourIndex);
          setSelectedHour(hourIndex);
        }
      }
    } else if (event.nativeEvent.state === State.END) {
      setPanHour(null);
    }
  };

  const handleLayout = (event: any) => {
    chartWidth.current = event.nativeEvent.layout.width;
  };

  const activeHour = panHour !== null ? panHour : selectedHour;

  return (
    <Box className="p-4 rounded-2xl" style={{ backgroundColor: currentColors.surface.card }}>
      <Box className="flex flex-row justify-between items-center mb-2">
        <Text className="text-base font-semibold" style={{ color: currentColors.text.main }}>
          Hourly Usage
        </Text>
        <Text className="text-xs" style={{ color: currentColors.text.soft }}>
          Tap or swipe for details
        </Text>
      </Box>

      {/* Chart area with Y-axis */}
      <Box className="flex flex-row gap-3">
        {/* Y-axis labels */}
        <Box className="flex flex-col justify-between h-[120px] py-1">
          {[100, 50, 0].map((percent) => {
            const value = (maxHourTime * percent) / 100;
            return (
              <Text
                key={percent}
                className="text-xs text-right leading-none"
                style={{
                  color: currentColors.text.soft,
                  minWidth: 20,
                  fontSize: 9
                }}
              >
                {value > 0 ? formatTime(value) : '0'}
              </Text>
            );
          })}
        </Box>

        {/* Chart container */}
        <Box className="flex-1">
          <PanGestureHandler onGestureEvent={handlePanGesture} onHandlerStateChange={handlePanGesture}>
            <Animated.View style={{ flex: 1 }}>
              {/* Chart bars with background grid */}
              <Box 
                ref={containerRef}
                className="relative h-[120px] flex items-end"
                onLayout={handleLayout}
              >
                {/* Subtle grid line */}
                <Box
                  className="absolute w-full"
                  style={{
                    bottom: '50%',
                    height: 1,
                    backgroundColor: currentColors.neutral[300],
                    opacity: 0.15
                  }}
                />

                {/* Chart bars */}
                <Box className="absolute inset-0 flex flex-row items-end justify-between px-0.5">
                  {hourlyData.map(({ hour, time }, index) => {
                    const height = maxHourTime > 0 ? (time / maxHourTime) * 100 : 0;
                    const isCurrentHour = new Date().getHours() === hour;
                    const isPeakHour = time === maxHourTime && time > 0;
                    const isSelected = activeHour === index;

                    return (
                      <Pressable
                        key={hour}
                        className="relative"
                        style={{ flex: 1, marginHorizontal: 0.5 }}
                        onPress={() => {
                          if (time > 0) {
                            setSelectedHour(isSelected && panHour === null ? null : index);
                          }
                        }}
                      >
                        <Box
                          className="rounded-t-sm transition-all"
                          style={{
                            height: `${Math.max(height, time > 0 ? 4 : 0)}%`,
                            width: '100%',
                            backgroundColor: isPeakHour
                              ? currentColors.primary[600]
                              : isCurrentHour
                                ? currentColors.primary[500]
                                : currentColors.primary[400],
                            opacity: time > 0 ? (isSelected ? 1 : height > 15 ? 1 : 0.7) : 0.1
                          }}
                        />
                      </Pressable>
                    );
                  })}
                </Box>

                {/* Tooltip for selected hour */}
                {activeHour !== null && hourlyData[activeHour].time > 0 && (
                  <Box
                    className="absolute p-3 rounded-lg shadow-lg"
                    style={{
                      backgroundColor: currentColors.surface.card,
                      borderWidth: 1,
                      borderColor: currentColors.neutral[200],
                      top: 10,
                      left: 10,
                      right: 10,
                      zIndex: 1000
                    }}
                  >
                    <Text className="text-sm font-semibold mb-1" style={{ color: currentColors.text.main }}>
                      {hourlyData[activeHour].hour === 0 ? '12:00 AM' : 
                       hourlyData[activeHour].hour < 12 ? `${hourlyData[activeHour].hour}:00 AM` : 
                       hourlyData[activeHour].hour === 12 ? '12:00 PM' : 
                       `${hourlyData[activeHour].hour - 12}:00 PM`}
                    </Text>
                    <Text className="text-sm font-bold mb-3" style={{ color: currentColors.primary[600] }}>
                      Total: {formatTime(hourlyData[activeHour].time)}
                    </Text>
                    
                    {/* App breakdown */}
                    <Box className="space-y-1.5">
                      {Object.entries(hourlyData[activeHour].apps)
                        .filter(([, platforms]) => {
                          const total = (platforms.mobile || 0) + (platforms.web || 0);
                          return total >= 1000;
                        })
                        .sort(([, a], [, b]) => {
                          const totalA = (a.mobile || 0) + (a.web || 0);
                          const totalB = (b.mobile || 0) + (b.web || 0);
                          return totalB - totalA;
                        })
                        .slice(0, 3)
                        .map(([appName, platforms]) => {
                          const appTotal = (platforms.mobile || 0) + (platforms.web || 0);
                          return (
                            <Box key={appName} className="flex flex-row justify-between items-center mb-1">
                              <Text className="text-xs flex-1 mr-2" style={{ color: currentColors.text.soft }}>
                                {appName}
                              </Text>
                              <Text className="text-xs font-medium" style={{ color: currentColors.text.main }}>
                                {formatTime(appTotal)}
                              </Text>
                            </Box>
                          );
                        })}
                    </Box>
                    
                    {Object.keys(hourlyData[activeHour].apps).filter(app => {
                      const platforms = hourlyData[activeHour].apps[app];
                      const total = (platforms.mobile || 0) + (platforms.web || 0);
                      return total >= 1000;
                    }).length > 3 && (
                      <Text className="text-xs mt-2" style={{ color: currentColors.text.soft, fontStyle: 'italic' }}>
                        +{Object.keys(hourlyData[activeHour].apps).filter(app => {
                          const platforms = hourlyData[activeHour].apps[app];
                          const total = (platforms.mobile || 0) + (platforms.web || 0);
                          return total >= 1000;
                        }).length - 3} more apps
                      </Text>
                    )}
                  </Box>
                )}
              </Box>
            </Animated.View>
          </PanGestureHandler>

          {/* Hour labels */}
          <Box className="flex flex-row justify-between px-0.5 mt-2">
            {hourlyData.filter((_, index) => index % 6 === 0).map(({ hour }) => (
              <Text
                key={hour}
                className="text-xs"
                style={{
                  color: currentColors.text.soft,
                  fontWeight: '400',
                  fontSize: 9
                }}
              >
                {hour === 0 ? '12A' : hour === 12 ? '12P' : hour > 12 ? `${hour - 12}P` : `${hour}A`}
              </Text>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}