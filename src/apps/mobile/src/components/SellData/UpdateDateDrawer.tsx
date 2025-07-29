import { Box, Button, Drawer, Text, useTheme } from "@blockit/cross-ui-toolkit";
import dayjs from 'dayjs';

interface UpdateDateDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
    isLoading: boolean;
    currentEndDate?: string;
}

export function UpdateDateDrawer({ isOpen, onClose, onUpdate, isLoading, currentEndDate }: UpdateDateDrawerProps) {
    const { currentColors } = useTheme();
    const daysToAdd = currentEndDate ? dayjs().diff(dayjs(currentEndDate), 'days') : 0;

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement="bottom"
            adjustToContentHeight
        >
            <Box className="p-6">
                <Text className="font-bold text-xl mb-4">Extend Your Listing</Text>
                <Text className="opacity-70 mb-4">
                    Extend your listing to include data from {currentEndDate ? dayjs(currentEndDate).format("MMM D, YYYY") : "N/A"} to today ({dayjs().format("MMM D, YYYY")}).
                </Text>
                <Box className="p-4 rounded-lg mb-6" style={{ backgroundColor: currentColors.surface.card }}>
                    <Text className="font-semibold mb-2">Extension Details:</Text>
                    <Box className="flex flex-col gap-1">
                        <Text className="opacity-70">• Current end date: {currentEndDate ? dayjs(currentEndDate).format("MMM D, YYYY") : "N/A"}</Text>
                        <Text className="opacity-70">• New end date: {dayjs().format("MMM D, YYYY")}</Text>
                        <Text className="opacity-70">• Days to be added: {daysToAdd} days</Text>
                    </Box>
                </Box>
                <Button
                    title="Update End Date"
                    onPress={onUpdate}
                    className="w-full"
                    loading={isLoading}
                />
            </Box>
        </Drawer>
    );
}