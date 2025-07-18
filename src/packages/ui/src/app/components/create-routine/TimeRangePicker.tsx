import React, { useState } from 'react';
import { Box, Text, Pressable, useTheme } from '@blockit/cross-ui-toolkit';

interface TimeRangePickerProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = ['00', '15', '30', '45'];

export function TimeRangePicker({ 
  startTime, 
  endTime, 
  onStartTimeChange, 
  onEndTimeChange 
}: TimeRangePickerProps) {
  const { currentColors } = useTheme();
  const [activeSelector, setActiveSelector] = useState<'start' | 'end' | null>(null);
  
  const parseTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return { hour, minute };
  };
  
  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };
  
  const formatDisplay = (time: string) => {
    const { hour, minute } = parseTime(time);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };
  
  const handleTimeSelect = (hour: number, minute: string) => {
    const newTime = formatTime(hour, parseInt(minute));
    
    if (activeSelector === 'start') {
      onStartTimeChange(newTime);
      // Auto-advance end time if it's before start time
      const startMinutes = hour * 60 + parseInt(minute);
      const { hour: endHour, minute: endMin } = parseTime(endTime);
      const endMinutes = endHour * 60 + endMin;
      
      if (endMinutes <= startMinutes) {
        // Set end time to 1 hour after start
        const newEndMinutes = startMinutes + 60;
        const newEndHour = Math.floor(newEndMinutes / 60) % 24;
        const newEndMin = newEndMinutes % 60;
        onEndTimeChange(formatTime(newEndHour, newEndMin));
      }
    } else if (activeSelector === 'end') {
      onEndTimeChange(newTime);
    }
    
    setActiveSelector(null);
  };
  
  const TimeDisplay = ({ 
    label, 
    time, 
    isActive, 
    onPress 
  }: { 
    label: string; 
    time: string; 
    isActive: boolean; 
    onPress: () => void;
  }) => (
    <Pressable onPress={onPress} className="flex-1">
      <Box 
        className="p-4 rounded-xl border-2 transition-all"
        style={{ 
          backgroundColor: isActive ? currentColors.primary[50] : currentColors.surface.elevated,
          borderColor: isActive ? currentColors.primary[500] : currentColors.neutral[200]
        }}
      >
        <Text 
          variant="caption" 
          style={{ color: currentColors.text.soft, marginBottom: 4 }}
        >
          {label}
        </Text>
        <Text 
          variant="h4" 
          style={{ 
            color: isActive ? currentColors.primary[500] : currentColors.text.main,
            fontWeight: '600'
          }}
        >
          {formatDisplay(time)}
        </Text>
      </Box>
    </Pressable>
  );
  
  return (
    <Box className="flex flex-col gap-4 mt-4">
      {/* Time displays */}
      <Box className="flex flex-row gap-3">
        <TimeDisplay
          label="Start time"
          time={startTime}
          isActive={activeSelector === 'start'}
          onPress={() => setActiveSelector(activeSelector === 'start' ? null : 'start')}
        />
        <TimeDisplay
          label="End time"
          time={endTime}
          isActive={activeSelector === 'end'}
          onPress={() => setActiveSelector(activeSelector === 'end' ? null : 'end')}
        />
      </Box>
      
      {/* Time selector */}
      {activeSelector && (
        <Box 
          className="rounded-xl p-4"
          style={{ backgroundColor: currentColors.surface.elevated }}
        >
          <Text 
            variant="caption" 
            className="mb-3"
            style={{ color: currentColors.text.soft }}
          >
            Select {activeSelector} time
          </Text>
          
          {/* Hours grid */}
          <Box className="flex flex-wrap" style={{ gap: 8, marginBottom: 16 }}>
            {hours.map(hour => {
              const currentTime = activeSelector === 'start' ? startTime : endTime;
              const { hour: selectedHour } = parseTime(currentTime);
              const isSelected = hour === selectedHour;
              
              return (
                <Pressable
                  key={hour}
                  onPress={() => {
                    const currentMinute = parseTime(currentTime).minute;
                    handleTimeSelect(hour, currentMinute.toString());
                  }}
                  className="flex-grow"
                  style={{ flexBasis: '13%' }}
                >
                  <Box
                    className="py-2 px-1 rounded-lg border"
                    style={{
                      backgroundColor: isSelected ? currentColors.primary[500] : currentColors.white,
                      borderColor: isSelected ? currentColors.primary[500] : currentColors.neutral[200]
                    }}
                  >
                    <Text
                      variant="caption"
                      style={{
                        color: isSelected ? 'white' : currentColors.text.main,
                        textAlign: 'center',
                        fontWeight: isSelected ? '600' : '400'
                      }}
                    >
                      {hour.toString().padStart(2, '0')}
                    </Text>
                  </Box>
                </Pressable>
              );
            })}
          </Box>
          
          {/* Minutes selector */}
          <Box>
            <Text 
              variant="caption" 
              className="mb-2"
              style={{ color: currentColors.text.soft }}
            >
              Minutes
            </Text>
            <Box className="flex flex-row gap-2">
              {minutes.map(minute => {
                const currentTime = activeSelector === 'start' ? startTime : endTime;
                const { hour: selectedHour, minute: selectedMinute } = parseTime(currentTime);
                const isSelected = minute === selectedMinute.toString().padStart(2, '0');
                
                return (
                  <Pressable
                    key={minute}
                    onPress={() => handleTimeSelect(selectedHour, minute)}
                    className="flex-1"
                  >
                    <Box
                      className="py-2 rounded-lg border"
                      style={{
                        backgroundColor: isSelected ? currentColors.primary[500] : currentColors.white,
                        borderColor: isSelected ? currentColors.primary[500] : currentColors.neutral[200]
                      }}
                    >
                      <Text
                        variant="body"
                        style={{
                          color: isSelected ? 'white' : currentColors.text.main,
                          textAlign: 'center',
                          fontWeight: isSelected ? '600' : '400'
                        }}
                      >
                        :{minute}
                      </Text>
                    </Box>
                  </Pressable>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}
      
      {/* Helper text */}
      <Text
        variant="caption"
        className="text-center px-4"
        style={{ color: currentColors.text.soft }}
      >
        Apps will be blocked between these times on selected days
      </Text>
    </Box>
  );
}