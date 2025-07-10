import { Box, Text, useTheme } from '@blockit/cross-ui-toolkit';

export function RoutineMoney() {
    const { currentColors } = useTheme();
    return (
        <Box className="flex-1 flex flex-col" style={{ backgroundColor: currentColors.surface.card }}>
            <Text variant="h1">Money</Text>
        </Box>
    );
}