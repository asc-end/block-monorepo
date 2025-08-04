import { useState, useEffect } from 'react';
import { Box, Text, Pressable, useTheme, Drawer } from '@blockit/cross-ui-toolkit';
import { formatTimeDisplay } from '../../../lib/timeFormatting';

interface TimeRangePickerProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  onBothTimesChange?: (startTime: string, endTime: string) => void;
}

interface TimePreset {
  label: string;
  start: string;
  end: string;
  icon: string;
}

const timePresets: TimePreset[] = [
  { label: 'Work Hours', start: '09:00', end: '17:00', icon: '💼' },
  { label: 'Evening', start: '18:00', end: '22:00', icon: '🌆' },
  { label: 'Night Owl', start: '22:00', end: '26:00', icon: '🦉' },
  { label: 'Sleep Time', start: '23:00', end: '31:00', icon: '😴' },
  { label: 'Study Time', start: '19:00', end: '23:00', icon: '📚' },
  { label: 'All Day', start: '00:00', end: '23:59', icon: '🌞' },
];

export function TimeRangePicker({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  onBothTimesChange
}: TimeRangePickerProps) {
  const { currentColors } = useTheme();
  const [activeEditor, setActiveEditor] = useState<'start' | 'end' | null>(null);

  const parseTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return { hour, minute };
  };

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  // Use shared formatting function, add +1 for next day if needed
  const formatDisplay = (time: string) => {
    const [hour] = time.split(':').map(Number);
    const isNextDay = hour >= 24;
    const baseFormat = formatTimeDisplay(time);
    return isNextDay ? `${baseFormat} +1` : baseFormat;
  };

  const applyPreset = (preset: TimePreset) => {
    // Use the combined handler if available, otherwise fall back to individual calls
    if (onBothTimesChange) {
      onBothTimesChange(preset.start, preset.end);
    } else {
      onStartTimeChange(preset.start);
      onEndTimeChange(preset.end);
    }
    setActiveEditor(null);
  };

  // Removed unused getDuration function

  const TimeVisualizer = () => {
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    const startMinutes = start.hour * 60 + start.minute;
    let endMinutes = end.hour * 60 + end.minute;
    if (endMinutes <= startMinutes) endMinutes += 24 * 60;

    const startPercent = (startMinutes / (24 * 60)) * 100;
    const duration = endMinutes - startMinutes;
    const durationPercent = (duration / (24 * 60)) * 100;

    return (
      <Box className='my-4 relative'>

        <Box
          className="relative h-1 rounded-full overflow-hidden "
          style={{ backgroundColor: currentColors.background }}
        >

          {/* Selected range */}
          <Box
            className="absolute h-full"
            style={{
              left: `${startPercent}%`,
              width: `${Math.min(durationPercent, 100 - startPercent)}%`,
              backgroundColor: currentColors.primary[500],
              opacity: 0.3
            }}
          />

          {/* Start marker */}
          <Box
            className="absolute h-full w-0.5"
            style={{
              left: `${startPercent}%`,
              backgroundColor: currentColors.primary[600]
            }}
          />

          {/* End marker */}
          <Box
            className="absolute h-full w-0.5"
            style={{
              left: `${Math.min((endMinutes / (24 * 60)) * 100, 100)}%`,
              backgroundColor: currentColors.primary[600]
            }}
          />
        </Box>
        {/* Time labels */}
        <Box className="flex flex-row justify-between items-center opacity-30 pt-2">
          <Text variant="caption" className='text-xs' style={{ color: currentColors.text.soft }}>12 AM</Text>
          <Text variant="caption" className='text-xs' style={{ color: currentColors.text.soft }}>6 AM</Text>
          <Text variant="caption" className='text-xs' style={{ color: currentColors.text.soft }}>12 PM</Text>
          <Text variant="caption" className='text-xs' style={{ color: currentColors.text.soft }}>6 PM</Text>
          <Text variant="caption" className='text-xs' style={{ color: currentColors.text.soft }}>12 AM</Text>
        </Box>
      </Box>

    );
  };

  const TimeEditor = ({ type }: { type: 'start' | 'end' }) => {
    const time = type === 'start' ? startTime : endTime;
    const { hour, minute } = parseTime(time);
    const isNextDay = hour >= 24;
    const displayHour = isNextDay ? hour - 24 : hour;
    const isPM = displayHour >= 12;
    const hour12 = displayHour % 12 || 12;

    const [selectedHour, setSelectedHour] = useState(hour12);
    const [selectedMinute, setSelectedMinute] = useState(minute);
    const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>(isPM ? 'PM' : 'AM');
    
    // Update local state when props change
    useEffect(() => {
      const { hour: newHour, minute: newMinute } = parseTime(type === 'start' ? startTime : endTime);
      const isNextDay = newHour >= 24;
      const displayHour = isNextDay ? newHour - 24 : newHour;
      const isPM = displayHour >= 12;
      const hour12 = displayHour % 12 || 12;
      
      setSelectedHour(hour12);
      setSelectedMinute(newMinute);
      setSelectedPeriod(isPM ? 'PM' : 'AM');
    }, [startTime, endTime, type]);

    const updateTime = (newHour: number, newMinute: number, newPeriod: 'AM' | 'PM') => {
      let finalHour = newHour;

      // Convert to 24-hour format
      if (newPeriod === 'PM' && newHour !== 12) {
        finalHour = newHour + 12;
      } else if (newPeriod === 'AM' && newHour === 12) {
        finalHour = 0;
      }

      // If this is the end time and it would be before start time, add 24 hours
      if (type === 'end') {
        const startHour = parseTime(startTime).hour;
        const startMinute = parseTime(startTime).minute;
        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = finalHour * 60 + newMinute;

        if (endTotalMinutes <= startTotalMinutes) {
          finalHour += 24;
        }
      }

      const newTime = formatTime(finalHour, newMinute);

      if (type === 'start') {
        onStartTimeChange(newTime);
      } else {
        onEndTimeChange(newTime);
      }
    };

    const handleHourChange = (h: number) => {
      setSelectedHour(h);
      updateTime(h, selectedMinute, selectedPeriod);
    };

    const handleMinuteChange = (m: number) => {
      setSelectedMinute(m);
      updateTime(selectedHour, m, selectedPeriod);
    };

    const handlePeriodChange = (period: 'AM' | 'PM') => {
      setSelectedPeriod(period);
      updateTime(selectedHour, selectedMinute, period);
    };

    return (
      <Box className="flex flex-col">
        {/* Header */}
        <Box
          className="px-4 py-3"
          style={{
            // backgroundColor: currentColors.background,
            // borderBottomWidth: 1,
            // borderBottomColor: currentColors.border
          }}
        >
          <Box className="flex flex-row justify-between items-center">
            <Text
              variant="h4"
              style={{ color: currentColors.text.main, fontWeight: '600' }}
            >
              {type === 'start' ? 'Start' : 'End'} Time
            </Text>
            <Pressable
              onPress={() => setActiveEditor(null)}
              className="px-4 py-1.5 rounded-full"
              style={{
                backgroundColor: currentColors.primary[500]
              }}
            >
              <Text
                variant="body"
                style={{
                  color: currentColors.white,
                  fontWeight: '600',
                  fontSize: 14
                }}
              >
                Done
              </Text>
            </Pressable>
          </Box>
        </Box>

        <Box className="p-4">
          {/* Digital Clock Display */}
          <Box
            className="rounded-xl p-4 mb-4"
            style={{
              backgroundColor: currentColors.surface.elevated
            }}
          >
            <Box className="items-center">
              <Box className="flex flex-row items-baseline">
                <Text
                  style={{
                    fontSize: 48,
                    fontWeight: '700',
                    color: currentColors.text.main,
                    letterSpacing: -1
                  }}
                >
                  {selectedHour.toString().padStart(2, '0')}
                </Text>
                <Text
                  style={{
                    fontSize: 48,
                    fontWeight: '300',
                    color: currentColors.text.soft,
                    marginLeft: 2,
                    marginRight: 2
                  }}
                >
                  :
                </Text>
                <Text
                  style={{
                    fontSize: 48,
                    fontWeight: '700',
                    color: currentColors.text.main,
                    letterSpacing: -1
                  }}
                >
                  {selectedMinute.toString().padStart(2, '0')}
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '600',
                    color: currentColors.primary[500],
                    marginLeft: 8
                  }}
                >
                  {selectedPeriod}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box>
            <Text
              variant="caption"
              className="mb-2"
              style={{
                color: currentColors.text.soft,
                fontWeight: '600',
                fontSize: 12
              }}
            >
              Hour
            </Text>
            {/* Time Controls */}
            <Box className="flex flex-col rounded-xl gap-1 p-1">
              {/* Hour Selector */}
              <Box className="flex flex-row h-12 w-full gap-1">
                {[12, 1, 2, 3, 4, 5].map(h => (
                  <Pressable
                    className='flex-1 h-full'
                    key={h}
                    onPress={() => handleHourChange(h)}
                  >
                    <Box
                      className="rounded-xl h-full"
                      style={{
                        backgroundColor: h === selectedHour ? currentColors.primary[500] + "50" : currentColors.surface.elevated,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        variant="body"
                        style={{
                          color: h === selectedHour ? currentColors.primary[300] : currentColors.text.main,
                          fontWeight: h === selectedHour ? '700' : '500'
                        }}
                      >
                        {h}
                      </Text>
                    </Box>
                  </Pressable>
                ))}
              </Box>
              <Box className="flex flex-row h-12 w-full gap-1">
                {[6, 7, 8, 9, 10, 11].map(h => (
                  <Pressable
                    className='flex-1'
                    key={h}
                    onPress={() => handleHourChange(h)}
                  >
                    <Box
                      className="rounded-xl h-full"
                      style={{
                        backgroundColor: h === selectedHour ? currentColors.primary[500] + '50' : currentColors.surface.elevated,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        variant="body"
                        style={{
                          color: h === selectedHour ? currentColors.primary[300] : currentColors.text.main,
                          fontWeight: h === selectedHour ? '700' : '500'
                        }}
                      >
                        {h}
                      </Text>
                    </Box>
                  </Pressable>
                ))}
              </Box>
            </Box>


            {/* Minute Selector */}
            <Box>
              <Text
                variant="caption"
                className="mb-2"
                style={{
                  color: currentColors.text.soft,
                  fontWeight: '600',
                  fontSize: 12
                }}
              >
                Minute
              </Text>
              <Box className="flex flex-row justify-between gap-1">
                {[0, 15, 30, 45].map(m => (
                  <Pressable
                    key={m}
                    onPress={() => handleMinuteChange(m)}
                    className="flex-1"
                  >
                    <Box
                      className="py-3 rounded-xl"
                      style={{
                        backgroundColor: m === selectedMinute ? currentColors.primary[500] + '50' : currentColors.surface.elevated,
                      }}
                    >
                      <Text
                        variant="body"
                        style={{
                          color: m === selectedMinute ? currentColors.primary[300] : currentColors.text.main,
                          textAlign: 'center',
                          fontWeight: m === selectedMinute ? '700' : '500'
                        }}
                      >
                        {m.toString().padStart(2, '0')}
                      </Text>
                    </Box>
                  </Pressable>
                ))}
              </Box>
            </Box>

            {/* Period Selector */}
            <Box>
              <Text
                variant="caption"
                className="mb-2"
                style={{
                  color: currentColors.text.soft,
                  fontWeight: '600',
                  fontSize: 12
                }}
              >
                Period
              </Text>
              <Box className="flex flex-row gap-1">
                <Pressable
                  onPress={() => handlePeriodChange('AM')}
                  className="flex-1"
                >
                  <Box
                    className="py-4 rounded-xl"
                    style={{
                      backgroundColor: selectedPeriod === 'AM' ? currentColors.primary[500] + "50" : currentColors.surface.elevated,
                    }}
                  >
                    <Text
                      variant="h4"
                      style={{
                        color: selectedPeriod === 'AM' ? currentColors.primary[300] : currentColors.text.main,
                        textAlign: 'center',
                        fontWeight: selectedPeriod === 'AM' ? '700' : '500'
                      }}
                    >
                      AM
                    </Text>
                  </Box>
                </Pressable>
                <Pressable
                  onPress={() => handlePeriodChange('PM')}
                  className="flex-1"
                >
                  <Box
                    className="py-4 rounded-xl"
                    style={{
                      backgroundColor: selectedPeriod === 'PM' ? currentColors.primary[500] + "50" : currentColors.surface.elevated,
                    }}
                  >
                    <Text
                      variant="h4"
                      style={{
                        color: selectedPeriod === 'PM' ? currentColors.primary[300] : currentColors.text.main,
                        textAlign: 'center',
                        fontWeight: selectedPeriod === 'PM' ? '700' : '500'
                      }}
                    >
                      PM
                    </Text>
                  </Box>
                </Pressable>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box className="flex flex-col gap-4 mt-4">
      {/* Time Range Selection */}
      <Box className='flex flex-col' >
        {/* Visual timeline */}

        {/* Time displays */}
        <Box className="flex flex-row gap-1">
          <Pressable onPress={() => setActiveEditor('start')} className="flex-1">
            <Box className="p-4 rounded-xl flex flex-col items-center" style={{ backgroundColor: currentColors.surface.elevated, }}
            >
              <Text variant="caption">Start</Text>
              <Text variant="h4">{formatDisplay(startTime)}</Text>
            </Box>
          </Pressable>

          <Box className="justify-center px-2">
            <Text variant="body" style={{ color: currentColors.text.soft }}>-</Text>
          </Box>

          <Pressable onPress={() => setActiveEditor('end')} className="flex-1">
            <Box className="p-4 rounded-xl flex flex-col items-center" style={{ backgroundColor: currentColors.surface.elevated, }}>
              <Text variant="caption">End</Text>
              <Text variant="h4">{formatDisplay(endTime)}</Text>
            </Box>
          </Pressable>
        </Box>
        <TimeVisualizer />

      </Box>

      {/* Preset buttons - Compact 3x2 grid */}
      <Box className="">
        <Text
          variant="caption"
          className="mb-2"
          style={{ color: currentColors.text.soft, fontSize: 12 }}
        >
          Pressets
        </Text>
        <Box className="flex flex-row flex-wrap" style={{ gap: 6 }}>
          {timePresets.map(preset => {
            // Removed unused time calculations

            // Check if this preset is currently selected
            const isSelected = startTime === preset.start && endTime === preset.end;

            return (
              <Pressable
                key={preset.label}
                onPress={() => applyPreset(preset)}
                style={{ width: '32%' }}
              >
                <Box
                  className="flex flex-col px-3 py-2 rounded-lg"
                  style={{
                    backgroundColor: isSelected ? currentColors.primary[500] + '20' : currentColors.surface.elevated,
                  }}
                >
                  <Text
                    className="font-medium"
                    style={{
                      color: isSelected ? currentColors.primary[400] : currentColors.text.soft,
                      fontSize: 12
                    }}
                  >
                    {preset.label}
                  </Text>
                  <Text
                    style={{
                      color: isSelected ? currentColors.primary[400] + "99" : currentColors.text.verySoft,
                      fontSize: 10
                    }}
                  >
                    {formatDisplay(preset.start).split(' ')[0]} - {formatDisplay(preset.end).split(' ')[0]}
                  </Text>
                </Box>
              </Pressable>
            );
          })}
        </Box>
      </Box>

      {/* Time editor drawer */}
      <Drawer
        isOpen={activeEditor !== null}
        onClose={() => setActiveEditor(null)}
        placement="bottom"
        closeOnOverlayClick={true}
        adjustToContentHeight={true}
      >
        {activeEditor && <TimeEditor type={activeEditor} />}
      </Drawer>
    </Box>
  );
}