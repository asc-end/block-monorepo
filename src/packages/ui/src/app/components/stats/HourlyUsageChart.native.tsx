import React, { useState, useRef, useEffect } from 'react';
import { Box, Text, useTheme, Pressable } from '@blockit/cross-ui-toolkit';
import { formatTime } from '../../../lib/time';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withSpring,
  interpolate,
  Easing
} from 'react-native-reanimated';

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
  
  // Animation values
  const tooltipAnimation = useSharedValue(0);
  const overlayAnimation = useSharedValue(0);

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
    } else if (event.nativeEvent.state === State.END || event.nativeEvent.state === State.CANCELLED) {
      setPanHour(null);
      setSelectedHour(null); // Clear selection when pan ends
    }
  };

  const handleLayout = (event: any) => {
    chartWidth.current = event.nativeEvent.layout.width;
  };

  const activeHour = panHour !== null ? panHour : selectedHour;

  // Trigger animations when activeHour changes
  useEffect(() => {
    const shouldShow = activeHour !== null && hourlyData[activeHour]?.time > 0;
    tooltipAnimation.value = withSpring(shouldShow ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
    overlayAnimation.value = withTiming(shouldShow ? 1 : 0, {
      duration: 200,
      easing: Easing.ease,
    });
  }, [activeHour, hourlyData]);

  // Animated styles
  const tooltipAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: tooltipAnimation.value,
      transform: [
        {
          translateY: interpolate(
            tooltipAnimation.value,
            [0, 1],
            [20, 0]
          ),
        },
        {
          scale: interpolate(
            tooltipAnimation.value,
            [0, 1],
            [0.95, 1]
          ),
        },
      ],
    };
  });

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayAnimation.value,
    };
  });

  const handleBarPress = (index: number) => {
    setSelectedHour(selectedHour === index ? null : index);
  };

  const handleBarPressIn = (index: number) => {
    setSelectedHour(index);
  };

  const handleBarPressOut = () => {
    // Keep the selection visible after press out for tap behavior
    // Only clear on pan gesture end
  };

  return (
    <Box className="relative z-50">

      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: -500,
            left: -500,
            right: -500,
            bottom: -500,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 0,
          },
          overlayAnimatedStyle
        ]}
      />
      {/* Tooltip section - absolute positioned above chart */}
      {activeHour !== null && hourlyData[activeHour] && hourlyData[activeHour].time > 0 && (
        <Animated.View
          style={[
            {
            position: 'absolute',
            bottom: '90%',
            left: 0,
            right: 0,
            marginBottom: 8,
            paddingBottom: 6,
            backgroundColor: currentColors.surface.elevated || currentColors.surface.card,
            zIndex: 0,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          },
          tooltipAnimatedStyle
        ]}
        >
          {/* Header with time */}
          <Box
            className="px-3 py-2 rounded-t-xl"
            style={{
              backgroundColor: currentColors.secondary[500] + '12',
              borderBottomWidth: 1,
              borderBottomColor: currentColors.secondary[500] + '20'
            }}
          >
            <Box className="flex flex-row justify-between items-center">
              <Text className="text-xs font-medium" style={{ color: currentColors.text.soft }}>
                {hourlyData[activeHour].hour === 0 ? '12:00 AM' :
                  hourlyData[activeHour].hour < 12 ? `${hourlyData[activeHour].hour}:00 AM` :
                    hourlyData[activeHour].hour === 12 ? '12:00 PM' :
                      `${hourlyData[activeHour].hour - 12}:00 PM`}
              </Text>
              <Box className="px-2 py-0.5 rounded-full" style={{ backgroundColor: currentColors.secondary[500] }}>
                <Text className="text-xs font-bold" style={{ color: '#FFFFFF' }}>
                  {formatTime(hourlyData[activeHour].time)}
                </Text>
              </Box>
            </Box>
          </Box>

          {/* App breakdown with progress bars */}
          <Box className="p-3">
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
              .slice(0, 4)
              .map(([appName, platforms], index) => {
                const appTotal = (platforms.mobile || 0) + (platforms.web || 0);
                const percentage = (appTotal / hourlyData[activeHour].time) * 100;
                const colors = [
                  currentColors.secondary[500],
                  currentColors.secondary[400],
                  currentColors.secondary[300],
                  currentColors.secondary[200]
                ];

                return (
                  <Box key={appName} className="mb-2">
                    <Box className="flex flex-row justify-between items-center mb-1">
                      <Text className="text-xs font-medium" style={{ color: currentColors.text.main }}>
                        {appName}
                      </Text>
                      <Box className="flex flex-row items-center gap-2">
                        <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                          {Math.round(percentage)}%
                        </Text>
                        <Text className="text-xs font-medium" style={{ color: currentColors.text.main }}>
                          {formatTime(appTotal)}
                        </Text>
                      </Box>
                    </Box>
                    {/* Progress bar */}
                    <Box
                      className="rounded-full overflow-hidden"
                      style={{
                        height: 4,
                        backgroundColor: `${currentColors.neutral[200]}30`
                      }}
                    >
                      <Box
                        className="rounded-full"
                        style={{
                          height: 4,
                          width: `${percentage}%`,
                          backgroundColor: colors[index]
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}

            {/* Platform breakdown if both exist */}
            {(() => {
              const hasMobile = Object.values(hourlyData[activeHour].apps).some(p => (p.mobile || 0) >= 1000);
              const hasWeb = Object.values(hourlyData[activeHour].apps).some(p => (p.web || 0) >= 1000);

              if (hasMobile && hasWeb) {
                const totalMobile = Object.values(hourlyData[activeHour].apps).reduce((sum, p) => sum + (p.mobile || 0), 0);
                const totalWeb = Object.values(hourlyData[activeHour].apps).reduce((sum, p) => sum + (p.web || 0), 0);

                return (
                  <Box className="flex flex-row gap-2 mt-3 pt-2" style={{ borderTopWidth: 1, borderTopColor: `${currentColors.neutral[200]}30` }}>
                    <Box className="flex-1 flex flex-row items-center gap-1">
                      <Box className="w-2 h-2 rounded-full" style={{ backgroundColor: currentColors.secondary[500] + '80' }} />
                      <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                        Mobile: {formatTime(totalMobile)}
                      </Text>
                    </Box>
                    <Box className="flex-1 flex flex-row items-center gap-1">
                      <Box className="w-2 h-2 rounded-full" style={{ backgroundColor: currentColors.secondary[300] + '80' }} />
                      <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                        Web: {formatTime(totalWeb)}
                      </Text>
                    </Box>
                  </Box>
                );
              }
              return null;
            })()}

            {Object.keys(hourlyData[activeHour].apps).filter(app => {
              const platforms = hourlyData[activeHour].apps[app];
              const total = (platforms.mobile || 0) + (platforms.web || 0);
              return total >= 1000;
            }).length > 4 && (
                <Text className="text-xs mt-2 text-center" style={{ color: currentColors.text.soft, opacity: 0.7 }}>
                  +{Object.keys(hourlyData[activeHour].apps).filter(app => {
                    const platforms = hourlyData[activeHour].apps[app];
                    const total = (platforms.mobile || 0) + (platforms.web || 0);
                    return total >= 1000;
                  }).length - 4} more
                </Text>
              )}
          </Box>
        </Animated.View>
      )}
      <Box className="p-4 rounded-2xl" style={{ backgroundColor: currentColors.surface.card, position: 'relative' }}>
        <Box className="flex flex-row justify-between items-center mb-2" >
          <Text className="text-base font-semibold" style={{ color: currentColors.text.main }}>
            Hourly Usage
          </Text>
          <Text className="text-xs" style={{ color: currentColors.text.soft }}>
            Tap or swipe for details
          </Text>
        </Box>




        {/* Chart area with Y-axis */}
        <Box className="flex flex-row gap-3" style={{ position: 'relative', overflow: 'visible' }}>
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
          <Box className="flex-1" style={{ overflow: 'visible', position: 'relative' }}>
            <PanGestureHandler onGestureEvent={handlePanGesture} onHandlerStateChange={handlePanGesture}>
              <Animated.View style={{ flex: 1 }}>
                {/* Chart bars with background grid */}
                <Box
                  ref={containerRef}
                  className="relative h-[120px] flex items-end"
                  onLayout={handleLayout}
                  style={{ overflow: 'visible', zIndex: activeHour !== null && hourlyData[activeHour]?.time > 0 ? 200 : 1 }}
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
                  <Box className="absolute inset-0 flex flex-row items-end justify-between">
                    {hourlyData.map(({ hour, time, apps }, index) => {
                      const height = maxHourTime > 0 ? (time / maxHourTime) * 100 : 0;
                      const isCurrentHour = new Date().getHours() === hour;
                      const isPeakHour = time === maxHourTime && time > 0;
                      const isSelected = activeHour === index;

                      return (
                        <Pressable
                          key={hour}
                          className="relative"
                          style={{ flex: 1, marginHorizontal: 0.5 }}
                          onPress={() => handleBarPress(index)}
                          onPressIn={() => handleBarPressIn(index)}
                          onPressOut={handleBarPressOut}
                        >
                          <Box
                            className="rounded-t-sm"
                            style={{
                              height: `${Math.max(height, time > 0 ? 4 : 0)}%`,
                              width: '100%',
                              backgroundColor: isPeakHour
                                ? currentColors.secondary[600] + 'B0'
                                : isCurrentHour
                                  ? currentColors.secondary[500] + '99'
                                  : currentColors.secondary[400] + '66',
                              opacity: time > 0
                                ? (isSelected
                                  ? 1
                                  : activeHour !== null && hourlyData[activeHour]?.time > 0
                                    ? 0.4  // Dim non-selected bars when tooltip is shown
                                    : 1)
                                : 0.15
                            }}
                          />
                        </Pressable>
                      );
                    })}
                  </Box>
                </Box>
              </Animated.View>
            </PanGestureHandler>


            {/* Hour labels - positioned under specific bars */}
            <Box className="flex flex-row mt-2">
              <Text
                className="text-xs"
                style={{
                  position: 'absolute',
                  left: 0,
                  color: currentColors.text.soft,
                  fontWeight: '400',
                  fontSize: 9
                }}
              >
                12A
              </Text>
              <Text
                className="text-xs"
                style={{
                  position: 'absolute',
                  left: '25%',
                  transform: [{ translateX: -8 }],
                  color: currentColors.text.soft,
                  fontWeight: '400',
                  fontSize: 9
                }}
              >
                6A
              </Text>
              <Text
                className="text-xs"
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: [{ translateX: -8 }],
                  color: currentColors.text.soft,
                  fontWeight: '400',
                  fontSize: 9
                }}
              >
                12P
              </Text>
              <Text
                className="text-xs"
                style={{
                  position: 'absolute',
                  left: '75%',
                  transform: [{ translateX: -8 }],
                  color: currentColors.text.soft,
                  fontWeight: '400',
                  fontSize: 9
                }}
              >
                6P
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}