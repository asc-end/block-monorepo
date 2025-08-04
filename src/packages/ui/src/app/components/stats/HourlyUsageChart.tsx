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
    <Box className="relative">
      {/* Dark overlay when tooltip is shown */}
      {hoveredHour !== null && hourlyData[hoveredHour] && hourlyData[hoveredHour].time > 0 && (
        <Box
          className="fixed inset-0 transition-opacity duration-200"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 9998,
            pointerEvents: 'none',
            opacity: hoveredHour !== null ? 1 : 0
          }}
        />
      )}
      
      {/* Tooltip - positioned absolutely */}
      {hoveredHour !== null && hourlyData[hoveredHour] && (
        <Box
          className="absolute p-3 rounded-lg shadow-lg"
          style={{
            backgroundColor: currentColors.surface.card,
            border: `1px solid ${currentColors.neutral[200]}`,
            top: -110,
            left: `${((hoveredHour + 0.5) / hourlyData.length) * 100}%`,
            transform: 'translateX(-50%)',
            minWidth: 180,
            zIndex: 9999,
            pointerEvents: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
          }}
        >
          <Text className="text-sm font-semibold mb-1" style={{ color: currentColors.text.main }}>
            {hourlyData[hoveredHour].hour === 0 ? '12:00 AM' : 
             hourlyData[hoveredHour].hour < 12 ? `${hourlyData[hoveredHour].hour}:00 AM` : 
             hourlyData[hoveredHour].hour === 12 ? '12:00 PM' : 
             `${hourlyData[hoveredHour].hour - 12}:00 PM`}
          </Text>
          <Text className="text-sm font-bold mb-3" style={{ color: hourlyData[hoveredHour].time > 0 ? currentColors.secondary[600] : currentColors.text.soft }}>
            {hourlyData[hoveredHour].time > 0 ? `Total: ${formatTime(hourlyData[hoveredHour].time)}` : 'No usage'}
          </Text>
          
          {/* App breakdown */}
          {hourlyData[hoveredHour].time > 0 ? (
            <Box className="space-y-1.5">
              {Object.entries(hourlyData[hoveredHour].apps)
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
                    <Text className="text-xs" style={{ color: currentColors.text.soft, maxWidth: 120 }}>
                      {appName.length > 20 ? `${appName.substring(0, 20)}...` : appName}
                    </Text>
                    <Text className="text-xs font-medium" style={{ color: currentColors.text.main }}>
                      {formatTime(appTotal)}
                    </Text>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Text className="text-xs" style={{ color: currentColors.text.soft, fontStyle: 'italic' }}>
              No activity during this hour
            </Text>
          )}
          
          {hourlyData[hoveredHour].time > 0 && Object.keys(hourlyData[hoveredHour].apps).filter(app => {
            const platforms = hourlyData[hoveredHour].apps[app];
            const total = (platforms.mobile || 0) + (platforms.web || 0);
            return total >= 1000;
          }).length > 4 && (
            <Text className="text-xs mt-2" style={{ color: currentColors.text.soft, fontStyle: 'italic' }}>
              +{Object.keys(hourlyData[hoveredHour].apps).filter(app => {
                const platforms = hourlyData[hoveredHour].apps[app];
                const total = (platforms.mobile || 0) + (platforms.web || 0);
                return total >= 1000;
              }).length - 4} more apps
            </Text>
          )}
        </Box>
      )}
      
      <Box className="p-4 rounded-2xl" style={{ backgroundColor: currentColors.surface.card, position: 'relative', zIndex: hoveredHour !== null && hourlyData[hoveredHour]?.time > 0 ? 9998 : 1 }}>
      <Box className="flex flex-row justify-between items-center mb-2">
        <Text className="text-base font-semibold" style={{ color: currentColors.text.main }}>
          Hourly Usage
        </Text>
        <Text className="text-xs" style={{ color: currentColors.text.soft }}>
          Hover over bars for details
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
          {/* Chart bars with background grid */}
          <Box className="relative h-[120px] flex items-end" style={{ overflow: 'visible', zIndex: hoveredHour !== null && hourlyData[hoveredHour]?.time > 0 ? 10000 : 1 }}>
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
                const isHovered = hoveredHour === index;
                const barWidth = `${100 / hourlyData.length}%`;

                return (
                  <Box
                    key={hour}
                    className="relative flex items-end justify-center"
                    style={{ width: barWidth, height: '100%' }}
                    onMouseEnter={() => setHoveredHour(index)}
                    onMouseLeave={() => setHoveredHour(null)}
                  >
                    {/* Hover background highlight */}
                    {isHovered && (
                      <Box
                        className="absolute inset-0"
                        style={{
                          backgroundColor: currentColors.secondary[200] + '20',
                          pointerEvents: 'none'
                        }}
                      />
                    )}
                    
                    {/* The actual bar */}
                    <Box
                      className="rounded-t-sm cursor-pointer transition-all duration-200"
                      style={{
                        height: `${Math.max(height, time > 0 ? 2 : 0)}%`,
                        width: 3,
                        backgroundColor: isPeakHour
                          ? currentColors.secondary[600] + 'B0'
                          : isCurrentHour
                            ? currentColors.secondary[500] + '99'
                            : currentColors.secondary[400] + '66',
                        opacity: time > 0 ? (isHovered ? 1 : 1) : 0.15,
                        transform: isHovered ? 'scaleX(2) scaleY(1.05)' : 'scale(1)',
                        transformOrigin: 'bottom center',
                        zIndex: isHovered ? 10 : 1
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Hour labels */}
          <Box className="flex flex-row justify-between mt-2">
            {hourlyData.filter((_, index) => index % 6 === 0).map(({ hour }, i) => (
              <Text
                key={hour}
                className="text-xs"
                style={{
                  color: currentColors.text.soft,
                  fontWeight: '400',
                  fontSize: 9,
                  width: `${100 / (hourlyData.filter((_, idx) => idx % 6 === 0).length)}%`,
                  textAlign: i === 0 ? 'left' : i === hourlyData.filter((_, idx) => idx % 6 === 0).length - 1 ? 'right' : 'center'
                }}
              >
                {hour === 0 ? '12A' : hour === 12 ? '12P' : hour > 12 ? `${hour - 12}P` : `${hour}A`}
              </Text>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
    </Box>
  );
}