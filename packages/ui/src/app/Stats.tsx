import React from "react";
import { useState, useEffect } from "react";
import { formatTime } from "../lib/time";
import { ChevronIcon } from "./icons/ChevronIcon";
import { useTheme, Box, Text, Pressable, ScrollView } from "@blockit/cross-ui-toolkit";

export type TimeRange = 'today' | 'week' | 'month';

// Mock data types
interface AppUsageData {
  [date: string]: {
    [appName: string]: {
      mobile: number;
      web: number;
    };
  };
}

interface HourlyData {
  hourlyBreakdown: {
    [hour: number]: {
      [appName: string]: {
        mobile: number;
        web: number;
      };
    };
  };
}

// Generate mock app usage data
const generateMockAppUsage = (): AppUsageData => {
  const appUsage: AppUsageData = {};
  const apps = ['Instagram', 'YouTube', 'Twitter', 'TikTok', 'Discord', 'Spotify', 'Chrome', 'Safari', 'WhatsApp', 'Telegram'];
  
  // Generate data for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    appUsage[dateStr] = {};
    
    // Randomly select 3-7 apps for each day
    const numApps = Math.floor(Math.random() * 5) + 3;
    const selectedApps = apps.sort(() => 0.5 - Math.random()).slice(0, numApps);
    
    selectedApps.forEach(app => {
      // Generate random usage times (in milliseconds)
      const mobileTime = Math.random() > 0.3 ? Math.floor(Math.random() * 4 * 60 * 60 * 1000) : 0; // 0-4 hours
      const webTime = Math.random() > 0.5 ? Math.floor(Math.random() * 3 * 60 * 60 * 1000) : 0; // 0-3 hours
      
      appUsage[dateStr][app] = {
        mobile: mobileTime,
        web: webTime
      };
    });
  }
  
  return appUsage;
};

// Generate mock hourly data for today
const generateMockHourlyData = (): HourlyData => {
  const apps = ['Instagram', 'YouTube', 'Twitter', 'TikTok', 'Discord'];
  const hourlyBreakdown: HourlyData['hourlyBreakdown'] = {};
  
  for (let hour = 0; hour < 24; hour++) {
    hourlyBreakdown[hour] = {};
    
    // More activity during typical waking hours (8am - 11pm)
    const isActiveHour = hour >= 8 && hour <= 23;
    const activityMultiplier = isActiveHour ? 1 : 0.2;
    
    if (Math.random() < 0.7 * activityMultiplier) { // 70% chance of activity during active hours
      const numApps = Math.floor(Math.random() * 3) + 1;
      const selectedApps = apps.sort(() => 0.5 - Math.random()).slice(0, numApps);
      
      selectedApps.forEach(app => {
        const mobileTime = Math.random() > 0.4 ? Math.floor(Math.random() * 30 * 60 * 1000) : 0; // 0-30 minutes
        const webTime = Math.random() > 0.6 ? Math.floor(Math.random() * 45 * 60 * 1000) : 0; // 0-45 minutes
        
        hourlyBreakdown[hour][app] = {
          mobile: mobileTime,
          web: webTime
        };
      });
    }
  }
  
  return { hourlyBreakdown };
};

export function Stats() {
  const { currentColors } = useTheme();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  
  // Mock data and loading states
  const [appUsage] = useState<AppUsageData>(generateMockAppUsage());
  const [hourlyData] = useState<HourlyData>(generateMockHourlyData());
  const [loading] = useState<boolean>(false);
  const [hourlyLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  // Ensure we don't start with a future date selected
  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const selected = new Date(selectedDate);

    if (selected > today) {
      setSelectedDate(todayStr);
    }
  }, [selectedDate]);

  // Calculate the start and end dates for the current month view
  const { startDate, endDate } = React.useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    return { startDate, endDate };
  }, [currentMonth]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  };

  const getUsageColor = (totalTime: number) => {
    // Convert to hours for easier comparison
    const hours = totalTime / (1000 * 60 * 60);

    if (hours === 0) return 'transparent';
    if (hours < 0.5) return currentColors.primary[50] + '40';
    if (hours < 1) return currentColors.primary[100] + '60';
    if (hours < 2) return currentColors.primary[200] + '80';
    if (hours < 4) return currentColors.primary[300];
    if (hours < 6) return currentColors.primary[400];
    return currentColors.primary[500];
  };

  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: '', day: '', month: month, hasData: false, totalTime: 0, isFuture: false });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0); // Reset time for accurate comparison
      // Format date in YYYY-MM-DD format using local timezone
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      // Check if this date is in the future
      const isFuture = date > today;

      // Calculate total time spent for this day - show empty if data is still loading
      const totalTime = appUsage ? Object.entries(appUsage[dateStr] || {})
        .reduce((sum, [appName, platforms]) => {
          // Filter out usage less than 1 second
          const filteredPlatforms = Object.fromEntries(
            Object.entries(platforms).filter(([, time]) => time >= 1000)
          );
          return sum + Object.values(filteredPlatforms).reduce((appSum, time) => appSum + time, 0);
        }, 0) : 0;
      const hasData = totalTime > 0;

      days.push({
        date: dateStr,
        day: day.toString(),
        month: month,
        hasData: hasData,
        totalTime: totalTime,
        isFuture: isFuture
      });
    }

    return days;
  };

  const changeMonth = (delta: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + delta);

    // Don't allow navigation to future months
    const today = new Date();
    if (delta > 0 && newMonth.getFullYear() >= today.getFullYear() &&
      newMonth.getMonth() > today.getMonth()) {
      return; // Don't change to future month
    }

    setCurrentMonth(newMonth);
    // Reset selected date to the first day of the new month (or today if it's the current month)
    const year = newMonth.getFullYear();
    const month = newMonth.getMonth();

    // If we're in the current month, select today; otherwise select the first day
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
    const day = isCurrentMonth ? today.getDate() : 1;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };

  // Check if next month navigation should be disabled
  const isNextMonthDisabled = () => {
    const today = new Date();
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth.getFullYear() >= today.getFullYear() &&
      nextMonth.getMonth() > today.getMonth();
  };

  return (
    <Box className="flex-1" style={{ backgroundColor: currentColors.background }}>
      <ScrollView
        style={{ flex: 1 }}
      >
        <Box className="p-4">
          {/* Show error if there's one, but don't block the calendar */}
          {error && (
            <Box className="mb-4 p-3 rounded-lg" style={{
              backgroundColor: currentColors.error.light + '20'
            }}>
              <Text style={{ color: currentColors.error.main }}>{error}</Text>
            </Box>
          )}

          {/* Calendar Box - Elevated */}
          <Box className="mb-5 rounded-2xl" style={{ backgroundColor: currentColors.surface.elevated }}>
            <Box className="flex flex-row justify-between items-center mb-4 p-3 rounded-lg bg-surface-card">
              <Pressable
                onPress={() => changeMonth(-1)}
                className="p-2 rounded-lg bg-primary-100-30"
              >
                <ChevronIcon direction="left" size={16} color={currentColors.primary[500]} />
              </Pressable>
              <Box className="items-center">
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: currentColors.text.main
                }}>
                  {formatMonth(currentMonth)}
                </Text>
              </Box>
              <Pressable
                onPress={() => !isNextMonthDisabled() && changeMonth(1)}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: isNextMonthDisabled()
                    ? currentColors.neutral[100] + '30'
                    : currentColors.primary[100] + '30',
                  opacity: isNextMonthDisabled() ? 0.5 : 1
                }}
                disabled={isNextMonthDisabled()}
              >
                <ChevronIcon
                  direction="right"
                  size={16}
                  color={isNextMonthDisabled() ? currentColors.neutral[400] : currentColors.primary[500]}
                />
              </Pressable>
            </Box>

            {/* Week day headers */}
            <Box className="flex flex-row justify-between mb-2 w-full">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <Text
                  key={day}
                  className="flex-1 text-center"
                  style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color: currentColors.text.soft
                  }}
                >
                  {day}
                </Text>
              ))}
            </Box>

            <Box className="flex flex-row flex-wrap w-full">
              {getCalendarDays().map(({ date, day, hasData, totalTime, isFuture }, index) => {
                const isSelected = selectedDate === date;
                const bgColor = date ? getUsageColor(totalTime) : 'transparent';
                const isClickable = date && !isFuture;

                return (
                  <Pressable
                    key={index}
                    onPress={() => isClickable && setSelectedDate(date)}
                    style={{
                      height: 32,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isFuture
                        ? currentColors.neutral[50]
                        : hasData
                          ? bgColor
                          : currentColors.neutral[100],
                      borderWidth: isSelected ? 2 : 0,
                      borderColor: isSelected ? currentColors.primary[400] : 'transparent',
                      flexBasis: '14.28%',
                      margin: 1,
                      opacity: isFuture ? 0.4 : (date ? 1 : 0)
                    }}
                    disabled={!isClickable}
                  >
                    <Text style={{
                      fontSize: 12,
                      color: isFuture
                        ? currentColors.text.soft
                        : hasData && totalTime > (1000 * 60 * 60 * 2)
                          ? currentColors.text.inverted
                          : currentColors.text.main,
                      fontWeight: isSelected ? '600' : '500'
                    }}>
                      {day}
                    </Text>
                  </Pressable>
                );
              })}
            </Box>
          </Box>

          {/* Show loading indicator for data if still loading */}
          {loading && (
            <Box style={{
              marginBottom: 16,
              padding: 10,
              borderRadius: 12,
              backgroundColor: currentColors.surface.card
            }}>
              <Text style={{ color: currentColors.text.soft, fontSize: 14 }}>Loading usage data...</Text>
            </Box>
          )}

          {/* Selected Day Stats */}
          {!loading && appUsage && (
            <Box className="mb-5 rounded-2xl flex flex-col gap-4">
              <Box className="flex flex-row justify-between items-center">
                <Text variant="h1" className="text-2xl font-bold ">
                  {formatDate(selectedDate)}
                </Text>
                {(() => {
                  const totalDayTime = Object.entries(appUsage[selectedDate] || {})
                    .reduce((sum, [appName, platforms]) => {
                      // Filter out usage less than 1 second
                      const filteredPlatforms = Object.fromEntries(
                        Object.entries(platforms).filter(([, time]) => time >= 1000)
                      );
                      return sum + Object.values(filteredPlatforms).reduce((appSum, time) => appSum + time, 0);
                    }, 0);
                  return totalDayTime > 0 ? (
                    <Box className="px-4 py-2 rounded-lg" style={{
                      backgroundColor: currentColors.primary[100] + '40'
                    }}>
                      <Text className="text-2xl font-bold" style={{ color: currentColors.primary[700] }}>
                        {formatTime(totalDayTime)}
                      </Text>
                    </Box>
                  ) : null;
                })()}
              </Box>

              {/* Platform totals */}
              {appUsage[selectedDate] && (() => {
                const timesArr = Object.values(appUsage[selectedDate] || {});
                const totalMobile = timesArr.reduce((sum, t: any) => {
                  const mobileTime = t.mobile || 0;
                  return sum + (mobileTime >= 1000 ? mobileTime : 0);
                }, 0);
                const totalWeb = timesArr.reduce((sum, t: any) => {
                  const webTime = t.web || 0;
                  return sum + (webTime >= 1000 ? webTime : 0);
                }, 0);

                if (totalMobile > 0 || totalWeb > 0) {
                  return (
                    <Box className="flex flex-row gap-2">
                      {totalMobile > 0 && (
                        <Box className="flex-1 flex flex-row items-center p-2 rounded-xl" style={{
                          backgroundColor: currentColors.secondary[50] + '20',
                          borderWidth: 1,
                          borderColor: currentColors.secondary[200] + '30',
                          minWidth: 0
                        }}>
                          <Box className="w-6 h-6 rounded-lg items-center justify-center mr-2" style={{ backgroundColor: currentColors.secondary[100] }}>
                            <Text className="text-sm">📱</Text>
                          </Box>
                          <Box className="flex-1 min-w-0">
                            <Text className="text-xs font-medium" style={{ color: currentColors.text.soft }}>Mobile</Text>
                            <Text className="text-sm font-bold" style={{ color: currentColors.secondary[700] }}>
                              {formatTime(totalMobile)}
                            </Text>
                          </Box>
                        </Box>
                      )}
                      {totalWeb > 0 && (
                        <Box className="flex-1 flex flex-row items-center p-2 rounded-xl" style={{
                          backgroundColor: currentColors.success.light + '20',
                          borderWidth: 1,
                          borderColor: currentColors.success.main + '30',
                          minWidth: 0
                        }}>
                          <Box className="w-6 h-6 rounded-lg items-center justify-center mr-2" style={{ backgroundColor: currentColors.success.light }}>
                            <Text className="text-sm">💻</Text>
                          </Box>
                          <Box className="flex-1 min-w-0">
                            <Text className="text-xs font-medium" style={{ color: currentColors.text.soft }}>Web</Text>
                            <Text className="text-sm font-bold" style={{ color: currentColors.success.dark }}>
                              {formatTime(totalWeb)}
                            </Text>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  );
                }
                return null;
              })()}

              {/* Hourly Usage Chart */}
              {hourlyData && (() => {
                // Process real hourly data
                const hourlyBreakdown = hourlyData.hourlyBreakdown;

                // Create hourly data array with real data
                const hourlyChartData = Array.from({ length: 24 }, (_, hour) => {
                  // TODO: Implement proper timezone conversion
                  const localHour = hour;

                  const hourData = hourlyBreakdown[hour] || {};
                  const totalHourTime = Object.entries(hourData).reduce((sum, [, platforms]) => {
                    const mobileTime = platforms.mobile >= 1000 ? platforms.mobile : 0;
                    const webTime = platforms.web >= 1000 ? platforms.web : 0;
                    return sum + mobileTime + webTime;
                  }, 0);

                  return {
                    hour: localHour,
                    time: totalHourTime,
                    label: localHour === 0 ? '12 AM' : localHour < 12 ? `${localHour} AM` : localHour === 12 ? '12 PM' : `${localHour - 12} PM`,
                    apps: hourData
                  };
                });

                const maxHourTime = Math.max(...hourlyChartData.map(d => d.time));
                const peakHour = hourlyChartData.find(d => d.time === maxHourTime);
                const totalDayUsage = hourlyChartData.reduce((sum, d) => sum + d.time, 0);

                // Only show chart if there's actual usage data
                if (totalDayUsage > 0) {
                  return (
                    <Box className="p-4 rounded-2xl" style={{ backgroundColor: currentColors.surface.card }}>
                      <Text className="text-base font-semibold" style={{ color: currentColors.text.main }}>
                        Hourly Usage
                      </Text>

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
                          {/* Chart bars with background grid */}
                          <Box className="relative h-[120px] flex items-end">
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
                              {hourlyChartData.map(({ hour, time }, index) => {
                                const height = maxHourTime > 0 ? (time / maxHourTime) * 100 : 0;
                                const isCurrentHour = new Date().getHours() === hour;
                                const isPeakHour = time === maxHourTime && time > 0;

                                return (
                                  <Box
                                    className="rounded-t-sm"
                                    style={{
                                      height: `${Math.max(height, time > 0 ? 4 : 0)}%`,
                                      width: 3,
                                      backgroundColor: isPeakHour
                                        ? currentColors.primary[600]
                                        : isCurrentHour
                                          ? currentColors.primary[500]
                                          : currentColors.primary[400],
                                      opacity: time > 0 ? (height > 15 ? 1 : 0.7) : 0.1
                                    }}
                                  />
                                );
                              })}
                            </Box>
                          </Box>

                          {/* Hour labels */}
                          <Box className="flex flex-row justify-between px-0.5 mt-2">
                            {hourlyChartData.filter((_, index) => index % 6 === 0).map(({ hour }) => {
                              return (
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
                              );
                            })}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                }
              })()}

              {/* Show loading state for hourly data */}
              {!hourlyData && hourlyLoading && (
                <Box className="mb-5 p-4 rounded-2xl items-center justify-center" style={{ backgroundColor: currentColors.surface.card }}>
                  <Text style={{ color: currentColors.text.soft, fontSize: 14 }}>📈 Loading hourly data...</Text>
                </Box>
              )}

              {/* App usage list */}
              {appUsage[selectedDate] ? (
                <Box>
                  <Box className="flex flex-row justify-between items-center mb-3">
                    <Text className="text-base font-semibold" style={{ color: currentColors.text.main }}>
                      App Usage
                    </Text>
                    <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                      {Object.entries(appUsage[selectedDate]).filter(([, times]) => {
                        const totalTime = (times.mobile >= 1000 ? times.mobile : 0) + (times.web >= 1000 ? times.web : 0);
                        return totalTime > 0;
                      }).length} apps
                    </Text>
                  </Box>
                  <Box className="space-y-2 flex flex-col gap-2">
                    {Object.entries(appUsage[selectedDate])
                      .filter(([, times]) => {
                        const totalTime = (times.mobile >= 1000 ? times.mobile : 0) + (times.web >= 1000 ? times.web : 0);
                        return totalTime > 0;
                      })
                      .sort(([, a], [, b]) => {
                        const totalA = (a.mobile >= 1000 ? a.mobile : 0) + (a.web >= 1000 ? a.web : 0);
                        const totalB = (b.mobile >= 1000 ? b.mobile : 0) + (b.web >= 1000 ? b.web : 0);
                        return totalB - totalA;
                      })
                      .map(([appName, times], index) => {
                        const totalTime = (times.mobile >= 1000 ? times.mobile : 0) + (times.web >= 1000 ? times.web : 0);
                        const totalDayTime = Object.entries(appUsage[selectedDate])
                          .filter(([, t]) => {
                            const appTotal = (t.mobile >= 1000 ? t.mobile : 0) + (t.web >= 1000 ? t.web : 0);
                            return appTotal > 0;
                          })
                          .reduce((sum, [, t]) => sum + (t.mobile >= 1000 ? t.mobile : 0) + (t.web >= 1000 ? t.web : 0), 0);
                        const percentage = totalTime > 0 ? Math.round((totalTime / totalDayTime) * 100) : 0;

                        return (
                          <Pressable
                            key={appName}
                            className="p-3 rounded-xl w-full"
                            style={{
                              backgroundColor: currentColors.surface.card,
                              borderWidth: 1,
                              borderColor: currentColors.neutral[200] + '20'
                            }}
                            onPress={() => {
                              // Toggle expansion for this app
                              setExpandedApp(expandedApp === appName ? null : appName);
                            }}
                          >
                            <Box className="flex flex-row justify-between items-center mb-2">
                              <Box className="flex-1 flex flex-row items-center gap-3">
                                <Box className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: currentColors.primary[100] + '60' }}>
                                  <Text className="text-xs font-bold" style={{ color: currentColors.primary[700] }}>
                                    {index + 1}
                                  </Text>
                                </Box>
                                <Box className="flex-1 flex flex-col items-start gap-1">
                                  <Text className="font-semibold text-sm" style={{ color: currentColors.text.main }}>
                                    {appName}
                                  </Text>
                                  <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                                    {percentage}% · {formatTime(totalTime)}
                                  </Text>
                                </Box>
                              </Box>
                              <ChevronIcon
                                direction={expandedApp === appName ? "up" : "down"}
                                size={12}
                                color={currentColors.text.soft}
                              />
                            </Box>

                            {/* Compact progress bar */}
                            <Box>
                              <Box
                                className="h-1 rounded-full overflow-hidden"
                                style={{ backgroundColor: currentColors.neutral[200] + '60' }}
                              >
                                <Box
                                  className="h-full rounded-full"
                                  style={{
                                    backgroundColor: currentColors.primary[400],
                                    width: `${percentage}%`
                                  }}
                                />
                              </Box>
                            </Box>

                            {/* Expandable dropdown content */}
                            {expandedApp === appName && (
                              <Box className="mt-3 pt-3" style={{ borderTopWidth: 1, borderTopColor: currentColors.neutral[200] + '20' }}>
                                <Box className="flex flex-col gap-2">
                                  {times.mobile >= 1000 && (
                                    <Box className="flex flex-row justify-between items-center p-2 rounded-lg" style={{ backgroundColor: currentColors.secondary[50] + '40' }}>
                                      <Box className="flex flex-row items-center gap-2">
                                        <Box className="w-6 h-6 rounded-lg items-center justify-center" style={{ backgroundColor: currentColors.secondary[100] }}>
                                          <Text className="text-xs">📱</Text>
                                        </Box>
                                        <Text className="text-sm font-medium" style={{ color: currentColors.text.main }}>
                                          Mobile
                                        </Text>
                                      </Box>
                                      <Text className="text-sm font-bold" style={{ color: currentColors.secondary[700] }}>
                                        {formatTime(times.mobile)}
                                      </Text>
                                    </Box>
                                  )}
                                  {times.web >= 1000 && (
                                    <Box className="flex flex-row justify-between items-center p-2 rounded-lg" style={{ backgroundColor: currentColors.success.light + '20' }}>
                                      <Box className="flex flex-row items-center gap-2">
                                        <Box className="w-6 h-6 rounded-lg items-center justify-center" style={{ backgroundColor: currentColors.success.light }}>
                                          <Text className="text-xs">💻</Text>
                                        </Box>
                                        <Text className="text-sm font-medium" style={{ color: currentColors.text.main }}>
                                          Web/Desktop
                                        </Text>
                                      </Box>
                                      <Text className="text-sm font-bold" style={{ color: currentColors.success.dark }}>
                                        {formatTime(times.web)}
                                      </Text>
                                    </Box>
                                  )}
                                </Box>
                              </Box>
                            )}
                          </Pressable>
                        );
                      })}
                  </Box>
                </Box>
              ) : (
                <Box className="text-center py-6">
                  <Text className="text-3xl mb-2">🎮</Text>
                  <Text className="text-sm font-medium mb-1" style={{ color: currentColors.text.main }}>
                    No activity today
                  </Text>
                  <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                    Start your gaming session! 🚀
                  </Text>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </ScrollView >
    </Box >
  );
}