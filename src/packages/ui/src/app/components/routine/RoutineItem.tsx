import { Pressable, Box, Text, useTheme } from '@blockit/cross-ui-toolkit';
import type { Routine } from '@blockit/shared';
import { getRoutineStatusDisplay } from '../../../lib/routine';
import { formatTimeDescription } from '../../../lib/timeFormatting';

interface RoutineItemProps {
  routine: Routine;
  onPress: (routineId: string) => void;
}

function getRoutineTimeDescription(routine: Routine): string {
  return formatTimeDescription(
    routine.timeMode as 'blocking' | 'limit',
    routine.startTime,
    routine.endTime,
    routine.dailyLimit
  );
}

export function RoutineItem({ routine, onPress }: RoutineItemProps) {
  const { currentColors } = useTheme();
  const statusDisplay = getRoutineStatusDisplay(routine);
  const timeDescription = getRoutineTimeDescription(routine);
  
  const statusColor = statusDisplay.color === 'success' ? currentColors.success.main :
                     statusDisplay.color === 'warning' ? currentColors.warning.main :
                     statusDisplay.color === 'error' ? currentColors.error.main :
                     statusDisplay.color === 'primary' ? currentColors.primary[500] :
                     currentColors.neutral[200];
  
  const textColor = ['success', 'warning', 'error', 'primary'].includes(statusDisplay.color) 
    ? 'white' 
    : currentColors.text.soft;

  return (
    <Pressable 
      onPress={() => onPress(routine.id)}
    >
      <Box className='w-full p-3 rounded-lg' style={{ backgroundColor: currentColors.surface.card }}>
        <Box className='flex flex-row items-center'>
          <Text style={{ fontSize: 24, lineHeight: 32, marginRight: 8 }}>{routine.emoji}</Text>
          <Box className='flex-1 flex flex-col items-start'>
            <Text variant='body'>{routine.name}</Text>
            <Box className='flex flex-row items-center gap-2'>
              <Text variant='caption' style={{ color: currentColors.text.soft }}>
                {`${routine.blockedApps?.length || 0} apps`}
              </Text>
              {timeDescription && (
                <>
                  <Text variant='caption' style={{ color: currentColors.text.soft }}>•</Text>
                  <Text variant='caption' style={{ color: currentColors.text.soft }}>
                    {timeDescription}
                  </Text>
                </>
              )}
            </Box>
          </Box>
          <Box 
            className='px-2 py-1 rounded'
            style={{ backgroundColor: statusColor }}
          >
            <Text 
              variant='caption' 
              style={{ 
                fontSize: 11,
                color: textColor
              }}
            >
              {statusDisplay.label}
            </Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
}