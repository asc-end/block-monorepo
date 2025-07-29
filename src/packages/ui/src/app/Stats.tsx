import React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { formatTime } from "../lib/time";
import { ChevronIcon } from "./icons/ChevronIcon";
import { useTheme, Box, Text, Pressable, ScrollView } from "@blockit/cross-ui-toolkit";
import { useAppUsage } from "../hooks/useAppUsage";
import { StatsSummary } from "./components/stats/StatsSummary";
import { Historical } from "./components/stats/Historical";
import { CloseIcon } from "./icons";
import { CalendarWithUsageData } from "./components/calendar";

export type TimeRange = 'today' | 'week' | 'month';

interface StatsProps {
  onDayChange?: () => Promise<void>;
  onNavigateToHistorical?: () => void;
}

export function Stats({ onDayChange, onNavigateToHistorical }: StatsProps = {}) {
  const { currentColors } = useTheme();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  // Helper function to change date with sync
  const handleDateChange = async (newDate: string) => {
    if (onDayChange && newDate !== selectedDate) {
      try {
        await onDayChange();
      } catch (error) {
        console.error('Error syncing usage data:', error);
      }
    }
    setSelectedDate(newDate);
  };

  // Ensure we don't start with a future date selected
  useEffect(() => {
    if (!selectedDate) return;
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // Parse selectedDate parts to create a local date
    const [year, month, day] = selectedDate.split('-').map(Number);
    const selected = new Date(year, month - 1, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (selected > todayStart) {
      handleDateChange(todayStr);
    }
  }, [selectedDate, handleDateChange]);

  // Calculate the start and end dates for the current month view
  const { startDate, endDate } = React.useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    return { startDate, endDate };
  }, []);

  const {
    loading: appUsageLoading,
    appUsage: appUsageData,
    error: appUsageError,
    hourlyData,
    hourlyLoading,
    hourlyError
  } = useAppUsage({
    beginDate: startDate,
    endDate: endDate,
    hourlyDate: selectedDate
  });

  const formatDate = (dateStr: string) => {
    // Parse the date string parts to avoid timezone issues
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  // Transform appUsageData to the format expected by CalendarWithUsageData
  const calendarUsageData = useMemo(() => {
    if (!appUsageData) return {};
    
    const transformed: { [date: string]: number } = {};
    
    Object.entries(appUsageData).forEach(([date, apps]) => {
      const totalTime = Object.entries(apps).reduce((sum, [appName, platforms]) => {
        // Filter out usage less than 1 second
        const filteredPlatforms = Object.fromEntries(
          Object.entries(platforms).filter(([, time]) => time >= 1000)
        );
        return sum + Object.values(filteredPlatforms).reduce((appSum, time) => appSum + time, 0);
      }, 0);
      
      if (totalTime > 0) {
        transformed[date] = totalTime;
      }
    });
    
    return transformed;
  }, [appUsageData]);

  const handleSelectDate = useCallback(async (date: string) => {
    await handleDateChange(date);
  }, [handleDateChange]);

  return (
    <Box className="flex-1 flex flex-col p-4" style={{ backgroundColor: currentColors.background }}>
      {/* Show error if there's one, but don't block the calendar */}
      {appUsageError && (
        <Box className="mb-4 p-3 rounded-lg" style={{
          backgroundColor: currentColors.error.light + '20'
        }}>
          <Text style={{ color: currentColors.error.main }}>{appUsageError}</Text>
        </Box>
      )}

      {/* Calendar with Usage Data */}
      <Box className="mb-5">
        <CalendarWithUsageData
          usageData={calendarUsageData}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          disableFutureDates={true}
        />
      </Box>

      {/* Show loading indicator for data if still loading */}
      {appUsageLoading && !!selectedDate && (
        <Box style={{
          marginBottom: 16,
          padding: 10,
          borderRadius: 12,
          backgroundColor: currentColors.surface.card
        }}>
          <Text style={{ color: currentColors.text.soft, fontSize: 14 }}>Loading usage data...</Text>
        </Box>
      )}

      {/* Stats Summary and historical */}
      {!selectedDate && (
        <Box className="rounded-2xl flex flex-col gap-4 flex-1">
          <StatsSummary />
          <Historical onSeeAll={onNavigateToHistorical} />
        </Box>
      )}
      {/* Selected Day Stats */}
      {!appUsageLoading && appUsageData && selectedDate && (
        <Box className="mb-5 rounded-2xl flex flex-col gap-4">
          <Box className="flex flex-row justify-between items-center">
            <Text className="text-2xl font-bold" style={{ fontFamily: 'ClashDisplay', fontWeight: 600, fontSize: 24 }}>
              {formatDate(selectedDate)}
            </Text>
            <Pressable className="px-4 py-2 rounded-lg flex flex-row items-center gap-2 " style={{ backgroundColor: currentColors.surface.card }} onPress={() => setSelectedDate(undefined)}>
              <CloseIcon size={16} color={currentColors.text.main} />
              <Text style={{ color: currentColors.text.main }}>Clear selection</Text>
            </Pressable>
          </Box>
          {(() => {
            const totalDayTime = Object.entries(appUsageData[selectedDate] || {})
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

          {/* Platform totals */}
          {appUsageData[selectedDate] && (() => {
            const timesArr = Object.values(appUsageData[selectedDate] || {});
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
              // Get the user's timezone offset in hours
              const timezoneOffset = new Date().getTimezoneOffset() / -60;

              // Convert UTC hour to local hour
              let localHour = (hour + Math.round(timezoneOffset)) % 24;
              if (localHour < 0) localHour += 24;

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

            // Sort by local hour to display in correct order
            const sortedHourlyData = hourlyChartData.sort((a, b) => a.hour - b.hour);

            const maxHourTime = Math.max(...sortedHourlyData.map(d => d.time));
            const peakHour = sortedHourlyData.find(d => d.time === maxHourTime);
            const totalDayUsage = sortedHourlyData.reduce((sum, d) => sum + d.time, 0);

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
                          {sortedHourlyData.map(({ hour, time }, index) => {
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
                        {sortedHourlyData.filter((_, index) => index % 6 === 0).map(({ hour }) => {
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
          {appUsageData[selectedDate] ? (
            <Box>
              <Box className="flex flex-row justify-between items-center mb-3">
                <Text className="text-base font-semibold" style={{ color: currentColors.text.main }}>
                  App Usage
                </Text>
                <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                  {Object.entries(appUsageData[selectedDate]).filter(([, times]) => {
                    const totalTime = (times.mobile >= 1000 ? times.mobile : 0) + (times.web >= 1000 ? times.web : 0);
                    return totalTime > 0;
                  }).length} apps
                </Text>
              </Box>
              <Box className="space-y-2 flex flex-col gap-2">
                {Object.entries(appUsageData[selectedDate])
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
                    const totalDayTime = Object.entries(appUsageData[selectedDate])
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
                Start your session!
              </Text>
            </Box>
          )}
        </Box>
      )}
    </Box >
  );
}