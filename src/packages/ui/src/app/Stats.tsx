import React from "react";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { formatTime } from "../lib/time";
import { ChevronIcon, MobileIcon, WebIcon } from "./icons";
import { useTheme, Box, Text, Pressable, ScrollView, Image } from "@blockit/cross-ui-toolkit";
import { useAppUsageQuery } from "../hooks/useAppUsageQuery";
import { useAppIcons } from "../hooks/useAppIcons";
import { CalendarWithUsageData } from "./components/calendar";
import { HourlyUsageChart } from "./components/stats";

export type TimeRange = 'today' | 'week' | 'month';

interface StatsProps {
  onDayChange?: (date: string) => Promise<void>;
  onMonthSync?: (month: string) => Promise<void>;
  onRefreshReady?: (refresh: () => void) => void;
}

export function Stats({ onDayChange, onMonthSync, onRefreshReady }: StatsProps = {}) {
  const { currentColors } = useTheme();
  const { getAppIcon } = useAppIcons();
  // Initialize with today's date
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`);
  const hasSyncedInitialMonth = useRef(false);

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
  }, [selectedDate]);

  // Calculate the start and end dates for the current month view
  const { startDate, endDate } = React.useMemo(() => {
    const [year, month] = currentMonth.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    return { startDate, endDate };
  }, [currentMonth]);

  const {
    loading: appUsageLoading,
    appUsage: appUsageData,
    error: appUsageError,
    hourlyData,
    hourlyLoading,
    hourlyError,
    refetch,
    refetchHourly,
    refetchAll,
    queryClient
  } = useAppUsageQuery({
    beginDate: startDate,
    endDate: endDate,
    hourlyDate: selectedDate
  });


  // Check if we need to sync based on missing data
  const checkAndSyncIfNeeded = useCallback(async () => {
    if (!onMonthSync) return;

    // Check if we have data for recent days
    const today = new Date();
    const daysToCheck = 7; // Check last 7 days
    let hasMissingData = false;

    for (let i = 0; i < daysToCheck; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;

      // If we don't have data for a recent day, we should sync
      if (!appUsageData || !appUsageData[dateStr]) {
        hasMissingData = true;
        break;
      }
    }

    if (hasMissingData) {
      console.log('Missing usage data detected, syncing...');
      await onMonthSync(currentMonth);
    }
  }, [appUsageData, onMonthSync, currentMonth]);

  // Check for missing data on mount and when data loads
  useEffect(() => {
    if (!appUsageLoading && !hasSyncedInitialMonth.current) {
      hasSyncedInitialMonth.current = true;
      checkAndSyncIfNeeded();
    }
  }, [appUsageLoading, checkAndSyncIfNeeded]);

  // Helper function to change date with sync
  const handleDateChange = useCallback(async (newDate: string) => {
    if (newDate !== selectedDate) {
      // Immediately change the date
      setSelectedDate(newDate);

      // Check if we need to sync data for this specific day
      if (onDayChange && (!appUsageData || !appUsageData[newDate])) {
        console.log(`Missing data for ${newDate}, syncing...`);
        try {
          await onDayChange(newDate);
          // Invalidate queries to refresh the data
          await queryClient.invalidateQueries({ queryKey: ['app-usage-stats'] });
          await queryClient.invalidateQueries({ queryKey: ['app-usage-hourly'] });
        } catch (error) {
          console.error('Error syncing usage data:', error);
        }
      }
    }
  }, [selectedDate, appUsageData, onDayChange, queryClient]);

  // Handle calendar month navigation
  const handleCalendarMonthChange = useCallback(async (year: number, month: number) => {
    const newMonth = `${year}-${String(month + 1).padStart(2, '0')}`;

    // Only sync if month actually changed
    if (newMonth !== currentMonth) {
      setCurrentMonth(newMonth);

      // Check if we need to sync this month's data
      if (onMonthSync) {
        // Check if we have any data for this month
        const monthEnd = new Date(year, month + 1, 0);
        let hasMissingData = false;

        // Check a few sample days in the month to see if we have data
        const samplesToCheck = [1, 8, 15, 22, monthEnd.getDate()];
        for (const day of samplesToCheck) {
          if (day <= monthEnd.getDate()) {
            const checkDate = new Date(year, month, day);
            // Only check dates that are not in the future
            if (checkDate <= new Date()) {
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              if (!appUsageData || !appUsageData[dateStr]) {
                hasMissingData = true;
                break;
              }
            }
          }
        }

        if (hasMissingData) {
          console.log(`Missing data for month ${newMonth}, syncing...`);
          try {
            await onMonthSync(newMonth);
            // Invalidate queries to refresh the data
            await queryClient.invalidateQueries({ queryKey: ['app-usage-stats'] });
            await queryClient.invalidateQueries({ queryKey: ['app-usage-hourly'] });
          } catch (error) {
            console.error('Error syncing month data:', error);
          }
        }
      }
    }
  }, [currentMonth, appUsageData, onMonthSync, queryClient]);

  // Provide refresh function to parent
  useEffect(() => {
    if (onRefreshReady) {
      onRefreshReady(refetchAll);
    }
  }, [onRefreshReady, refetchAll]);

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
        // Filter out usage less than 1 second and sum the values
        return sum + Object.entries(platforms).reduce((appSum, [, time]) => {
          if (time != null && Number(time) >= 1000) {
            return appSum + Number(time);
          }
          return appSum;
        }, 0);
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

  // Calculate total day time for selected date
  const totalDayTime = useMemo(() => {
    if (!appUsageData || !appUsageData[selectedDate]) return 0;

    return Object.entries(appUsageData[selectedDate])
      .reduce((sum, [appName, platforms]) => {
        // Filter out usage less than 1 second and sum the values
        return sum + Object.entries(platforms).reduce((appSum, [, time]) => {
          if (time != null && Number(time) >= 1000) {
            return appSum + Number(time);
          }
          return appSum;
        }, 0);
      }, 0);
  }, [appUsageData, selectedDate]);

  // Calculate total mobile time for selected date
  const totalMobile = useMemo(() => {
    if (!appUsageData || !appUsageData[selectedDate]) return 0;

    const timesArr = Object.values(appUsageData[selectedDate]);
    return timesArr.reduce((sum, t: any) => {
      const mobileTime = t.mobile || 0;
      return sum + (mobileTime >= 1000 ? mobileTime : 0);
    }, 0);
  }, [appUsageData, selectedDate]);

  // Calculate total web time for selected date  
  const totalWeb = useMemo(() => {
    if (!appUsageData || !appUsageData[selectedDate]) return 0;

    const timesArr = Object.values(appUsageData[selectedDate]);
    return timesArr.reduce((sum, t: any) => {
      const webTime = t.web || 0;
      return sum + (webTime >= 1000 ? webTime : 0);
    }, 0);
  }, [appUsageData, selectedDate]);

  // Prepare app usage list items
  const appUsageListItems = useMemo(() => {
    if (!appUsageData || !appUsageData[selectedDate]) return [];
    
    return Object.entries(appUsageData[selectedDate])
      .filter(([, times]) => {
        const totalTime = ((times.mobile || 0) >= 1000 ? (times.mobile || 0) : 0) + ((times.web || 0) >= 1000 ? (times.web || 0) : 0);
        return totalTime > 0;
      })
      .sort(([, a], [, b]) => {
        const totalA = ((a.mobile || 0) >= 1000 ? (a.mobile || 0) : 0) + ((a.web || 0) >= 1000 ? (a.web || 0) : 0);
        const totalB = ((b.mobile || 0) >= 1000 ? (b.mobile || 0) : 0) + ((b.web || 0) >= 1000 ? (b.web || 0) : 0);
        return totalB - totalA;
      })
      .map(([appName, times]) => {
        const totalTime = ((times.mobile || 0) >= 1000 ? (times.mobile || 0) : 0) + ((times.web || 0) >= 1000 ? (times.web || 0) : 0);
        const percentage = totalTime > 0 && totalDayTime > 0 ? Math.round((totalTime / totalDayTime) * 100) : 0;
        
        return {
          appName,
          times,
          totalTime,
          percentage
        };
      });
  }, [appUsageData, selectedDate, totalDayTime]);

  return (
    <Box className="flex-1" style={{ backgroundColor: currentColors.background }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Box className="p-4">
          {/* Show error if there's one, but don't block the calendar */}
          {appUsageError && (
            <Box className="mb-4 p-3 rounded-lg" style={{
              backgroundColor: currentColors.error.light + '20'
            }}>
              <Text style={{ color: currentColors.error.main }}>{appUsageError}</Text>
            </Box>
          )}

          {/* Calendar with Usage Data */}
          <Box className="mb-3">
            <CalendarWithUsageData
              usageData={calendarUsageData}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              onMonthChange={handleCalendarMonthChange}
              disableFutureDates={true}
            />
          </Box>

          {/* Show loading indicator for data if still loading */}
          {appUsageLoading && !selectedDate && (
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
          {!appUsageLoading && (
            <Box className="mb-5 rounded-2xl flex flex-col gap-4">
              <Box className="flex flex-row justify-between items-center">
                <Text className="text-2xl font-bold" style={{ fontFamily: 'ClashDisplay', fontWeight: 600, fontSize: 24 }}>
                  {formatDate(selectedDate)}
                </Text>
                {totalDayTime > 0 ? (
                  <Box className="px-4 py-2 rounded-lg" style={{
                    backgroundColor: currentColors.neutral[300] + '40'
                  }}>
                    <Text className="text-2xl font-bold" style={{ color: currentColors.text.soft }}>
                      {formatTime(totalDayTime)}
                    </Text>
                  </Box>
                ) : null}
              </Box>

              {/* Show loading state while fetching day data */}
              {hourlyLoading && !hourlyData ? (
                <Box className="items-center justify-center py-8">
                  <Text className="text-sm" style={{ color: currentColors.text.soft }}>
                    Loading usage data...
                  </Text>
                </Box>
              ) : appUsageData ? (
                <>


                  {/* Platform totals */}
                  {(totalMobile > 0 && totalWeb > 0) && (
                    <Box className="flex flex-row gap-2">
                      {totalMobile > 0 && (
                        <Box className="flex-1 flex flex-row items-center p-2 rounded-xl" style={{
                          backgroundColor: currentColors.secondary[400] + '12',
                          borderWidth: 1,
                          borderColor: currentColors.secondary[400] + '20',
                          minWidth: 0
                        }}>
                          <Box className="w-6 h-6 rounded-lg items-center justify-center mr-2" style={{ backgroundColor: currentColors.secondary[400] + '25' }}>
                            <MobileIcon size={14} color={currentColors.secondary[500]} />
                          </Box>
                          <Box className="flex-1 min-w-0">
                            <Text className="text-xs font-medium" style={{ color: currentColors.text.soft }}>Mobile</Text>
                            <Text className="text-sm font-bold" style={{ color: currentColors.secondary[600] }}>
                              {formatTime(totalMobile)}
                            </Text>
                          </Box>
                        </Box>
                      )}
                      {totalWeb > 0 && (
                        <Box className="flex-1 flex flex-row items-center p-2 rounded-xl" style={{
                          backgroundColor: currentColors.secondary[300] + '12',
                          borderWidth: 1,
                          borderColor: currentColors.secondary[300] + '20',
                          minWidth: 0
                        }}>
                          <Box className="w-6 h-6 rounded-lg items-center justify-center mr-2" style={{ backgroundColor: currentColors.secondary[300] + '25' }}>
                            <WebIcon size={14} color={currentColors.secondary[400]} />
                          </Box>
                          <Box className="flex-1 min-w-0">
                            <Text className="text-xs font-medium" style={{ color: currentColors.text.soft }}>Web</Text>
                            <Text className="text-sm font-bold" style={{ color: currentColors.secondary[500] }}>
                              {formatTime(totalWeb)}
                            </Text>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )}

                  {/* Hourly Usage Chart */}
                  {hourlyData && hourlyData.date === selectedDate && appUsageData && appUsageData[selectedDate] && (() => {
                    // Process real hourly data
                    const hourlyBreakdown = hourlyData.hourlyBreakdown;

                    // Create hourly data array with real data
                    const currentHour = new Date().getHours();
                    const isToday = selectedDate === new Date().toISOString().split('T')[0];
                    
                    const hourlyChartData = Array.from({ length: 24 }, (_, hour) => {
                      // Backend now returns hours in local timezone, no conversion needed
                      const hourData = hourlyBreakdown[hour] || {};
                      
                      // If it's today and the hour hasn't occurred yet, clear the data
                      const shouldClearFutureData = isToday && hour > currentHour;
                      
                      const totalHourTime = shouldClearFutureData ? 0 : Object.entries(hourData).reduce((sum, [, platforms]) => {
                        const mobileTime = (platforms.mobile || 0) >= 1000 ? (platforms.mobile || 0) : 0;
                        const webTime = (platforms.web || 0) >= 1000 ? (platforms.web || 0) : 0;
                        return sum + mobileTime + webTime;
                      }, 0);

                      return {
                        hour: hour,
                        time: totalHourTime,
                        label: hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`,
                        apps: shouldClearFutureData ? {} : hourData
                      };
                    });

                    // Sort by local hour to display in correct order
                    const sortedHourlyData = hourlyChartData.sort((a, b) => a.hour - b.hour);

                    const maxHourTime = Math.max(...sortedHourlyData.map(d => d.time));
                    const peakHour = sortedHourlyData.find(d => d.time === maxHourTime);
                    const totalDayUsage = sortedHourlyData.reduce((sum, d) => sum + d.time, 0);

                    // Only show chart if there's actual usage data
                    if (totalDayUsage > 0) {
                      return <HourlyUsageChart hourlyData={sortedHourlyData} maxHourTime={maxHourTime} />;
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
                          {appUsageListItems.length} apps
                        </Text>
                      </Box>
                      <Box className="space-y-2 flex flex-col gap-2">
                        {appUsageListItems.map((item, index) => {
                            const { appName, times, totalTime, percentage } = item;

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
                                    {(() => {
                                      // Priority: Device icon > Database icon > Fallback letter
                                      const deviceIcon = getAppIcon(appName);
                                      const iconUri = deviceIcon || times.icon;

                                      if (iconUri) {
                                        return (
                                          <Box className="w-8 h-8 rounded-md overflow-hidden flex items-center justify-center" style={{ backgroundColor: currentColors.neutral[100] }}>
                                            <Image
                                              src={iconUri}
                                              className="w-6 h-6"
                                              style={{ width: 24, height: 24, resizeMode: 'contain' }}
                                            />
                                          </Box>
                                        );
                                      }

                                      return (
                                        <Box className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: currentColors.secondary[200] + '30' }}>
                                          <Text className="text-xs font-bold" style={{ color: currentColors.secondary[600] }}>
                                            {appName.charAt(0).toUpperCase()}
                                          </Text>
                                        </Box>
                                      );
                                    })()}
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
                                        backgroundColor: currentColors.secondary[400] + '80',
                                        width: `${percentage}%`
                                      }}
                                    />
                                  </Box>
                                </Box>

                                {/* Expandable dropdown content */}
                                {expandedApp === appName && (
                                  <Box className="mt-3 pt-3" style={{ borderTopWidth: 1, borderTopColor: currentColors.neutral[300] + '40' }}>
                                    <Box className="flex flex-col gap-2">
                                      {(times.mobile || 0) >= 1000 && (
                                        <Box className="flex flex-row justify-between items-center p-2 rounded-lg" style={{ backgroundColor: currentColors.secondary[400] + '10' }}>
                                          <Box className="flex flex-row items-center gap-2">
                                            <Box className="w-6 h-6 rounded-lg items-center justify-center" style={{ backgroundColor: currentColors.secondary[400] + '20' }}>
                                              <MobileIcon size={14} color={currentColors.secondary[500]} />
                                            </Box>
                                            <Text className="text-sm font-medium" style={{ color: currentColors.text.soft }}>
                                              Mobile
                                            </Text>
                                          </Box>
                                          <Text className="text-sm font-bold" style={{ color: currentColors.secondary[600] }}>
                                            {formatTime(times.mobile || 0)}
                                          </Text>
                                        </Box>
                                      )}
                                      {(times.web || 0) >= 1000 && (
                                        <Box className="flex flex-row justify-between items-center p-2 rounded-lg" style={{ backgroundColor: currentColors.secondary[300] + '10' }}>
                                          <Box className="flex flex-row items-center gap-2">
                                            <Box className="w-6 h-6 rounded-lg items-center justify-center" style={{ backgroundColor: currentColors.secondary[300] + '20'}}>
                                              <WebIcon size={14} color={currentColors.secondary[400]} />
                                            </Box>
                                            <Text className="text-sm font-medium" style={{ color: currentColors.text.soft }}>
                                              Web
                                            </Text>
                                          </Box>
                                          <Text className="text-sm font-bold" style={{ color: currentColors.secondary[500] }}>
                                            {formatTime(times.web || 0)}
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
                </>
              ) : null}
            </Box>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}