import React, { useState } from 'react';
import { Box, Text, useTheme } from '@blockit/cross-ui-toolkit';
import { formatTime } from '../../../lib/time';

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
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  return (
    <Box className="p-4 rounded-2xl" style={{ backgroundColor: currentColors.surface.card }}>
      <Box className="flex flex-row justify-between items-center mb-2">
        <Text className="text-base font-semibold" style={{ color: currentColors.text.main }}>
          Hourly Usage
        </Text>
        <Text className="text-xs" style={{ color: currentColors.text.soft }}>
          Hover over bars for details
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
              {hourlyData.map(({ hour, time, apps }, index) => {
                const height = maxHourTime > 0 ? (time / maxHourTime) * 100 : 0;
                const isCurrentHour = new Date().getHours() === hour;
                const isPeakHour = time === maxHourTime && time > 0;
                const isHovered = hoveredHour === index;

                return (
                  <Box
                    key={hour}
                    className="relative"
                    style={{ width: 3 }}
                    onMouseEnter={() => setHoveredHour(index)}
                    onMouseLeave={() => setHoveredHour(null)}
                  >
                    <Box
                      className="rounded-t-sm cursor-pointer transition-all duration-200"
                      style={{
                        height: `${Math.max(height, time > 0 ? 4 : 0)}%`,
                        width: 3,
                        backgroundColor: isPeakHour
                          ? currentColors.primary[600]
                          : isCurrentHour
                            ? currentColors.primary[500]
                            : currentColors.primary[400],
                        opacity: time > 0 ? (isHovered ? 1 : height > 15 ? 1 : 0.7) : 0.1,
                        transform: isHovered ? 'scaleX(1.5) scaleY(1.05)' : 'scale(1)',
                        transformOrigin: 'bottom center'
                      }}
                    />
                    
                    {/* Tooltip */}
                    {isHovered && time > 0 && (
                      <Box
                        className="absolute bottom-full mb-2 p-3 rounded-lg shadow-lg"
                        style={{
                          backgroundColor: currentColors.surface.card,
                          border: `1px solid ${currentColors.neutral[200]}`,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          minWidth: 180,
                          zIndex: 1000,
                          pointerEvents: 'none'
                        }}
                      >
                        <Text className="text-sm font-semibold mb-1" style={{ color: currentColors.text.main }}>
                          {hour === 0 ? '12:00 AM' : hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`}
                        </Text>
                        <Text className="text-sm font-bold mb-3" style={{ color: currentColors.primary[600] }}>
                          Total: {formatTime(time)}
                        </Text>
                        
                        {/* App breakdown */}
                        <Box className="space-y-1.5">
                          {Object.entries(apps)
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
                            .map(([appName, platforms]) => {
                              const appTotal = (platforms.mobile || 0) + (platforms.web || 0);
                              return (
                                <Box key={appName} className="flex flex-row justify-between items-center">
                                  <Text className="text-xs" style={{ color: currentColors.text.soft, maxWidth: 120 }} title={appName}>
                                    {appName.length > 20 ? `${appName.substring(0, 20)}...` : appName}
                                  </Text>
                                  <Text className="text-xs font-medium" style={{ color: currentColors.text.main }}>
                                    {formatTime(appTotal)}
                                  </Text>
                                </Box>
                              );
                            })}
                        </Box>
                        
                        {Object.keys(apps).filter(app => {
                          const platforms = apps[app];
                          const total = (platforms.mobile || 0) + (platforms.web || 0);
                          return total >= 1000;
                        }).length > 4 && (
                          <Text className="text-xs mt-2" style={{ color: currentColors.text.soft, fontStyle: 'italic' }}>
                            +{Object.keys(apps).filter(app => {
                              const platforms = apps[app];
                              const total = (platforms.mobile || 0) + (platforms.web || 0);
                              return total >= 1000;
                            }).length - 4} more apps
                          </Text>
                        )}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>

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