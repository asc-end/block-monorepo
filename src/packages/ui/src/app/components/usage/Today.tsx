import { Box, Text, useTheme } from "@blockit/cross-ui-toolkit";
import { formatTime } from "../../../lib/time";

type AppUsageTodayProps = {
    todaysApps: Record<string, { web: number; mobile: number }>;
}

export function AppUsageToday(props: AppUsageTodayProps) {
    const { todaysApps } = props;
    const { currentColors } = useTheme();
    
    return (
        <Box className='rounded-2xl p-6 w-full min-w-96 border absolute shadow-lg'
        style={{
          backgroundColor: currentColors.surface.card,
          borderColor: currentColors.neutral[400],
          zIndex: 1000,
          top: '110%',
          shadowColor: '#000',
          shadowOpacity: 0.15,
          elevation: 8,
        }}
      >
        <Text variant="h6" className="mb-4" style={{ color: currentColors.text.main }}>
          Top Apps Today
        </Text>
        {Object.entries(todaysApps)
          .map(([appName, platforms]) => {
            // Filter out usage less than 1 second (same as Stats.tsx)
            const mobileTime = platforms.mobile >= 1000 ? platforms.mobile : 0;
            const webTime = platforms.web >= 1000 ? platforms.web : 0;
            const totalTime = mobileTime + webTime;
            return [appName, totalTime] as [string, number];
          })
          .filter(([, totalTime]) => totalTime > 0) // Only show apps with actual usage
          .sort(([, a], [, b]) => Number(b) - Number(a))
          .slice(0, 5)
          .map(([appName, totalTime], index) => {
            return (
              <Box key={appName} className="flex flex-row justify-between items-center py-3">
                <Box className="flex flex-row items-center" style={{ gap: 12 }}>
                  <Box
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: currentColors.primary[100] }}
                  >
                    <Text variant="caption" style={{ color: currentColors.primary[500], fontWeight: 'bold' }}>
                      {index + 1}
                    </Text>
                  </Box>
                  <Text style={{ color: currentColors.text.main, fontWeight: '500' }}>
                    {appName}
                  </Text>
                </Box>
                <Text
                  variant="body"
                  style={{
                    color: currentColors.primary[400],
                    fontWeight: '600',
                    fontFamily: 'monospace'
                  }}
                >
                  {formatTime(totalTime)}
                </Text>
              </Box>
            );
          })}
        {Object.entries(todaysApps).filter(([, platforms]) => {
          const mobileTime = platforms.mobile >= 1000 ? platforms.mobile : 0;
          const webTime = platforms.web >= 1000 ? platforms.web : 0;
          return (mobileTime + webTime) > 0;
        }).length === 0 && (
          <Text style={{ color: currentColors.text.soft, textAlign: 'center', paddingVertical: 16 }}>
            No app usage data available
          </Text>
        )}
      </Box>
    )
}