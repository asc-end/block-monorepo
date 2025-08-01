import { Box, Button, Drawer, Text, useTheme } from "@blockit/cross-ui-toolkit";

interface RemoveListingDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onRemove: () => void;
    isLoading: boolean;
}

export function RemoveListingDrawer({ isOpen, onClose, onRemove, isLoading }: RemoveListingDrawerProps) {
    const { currentColors } = useTheme()
    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement="bottom"
            adjustToContentHeight
        >
            <Box className="p-6">
                <Text className="font-bold text-xl mb-4">Remove Your Listing?</Text>
                <Text className="opacity-70 mb-6">
                    Are you sure you want to remove your data listing? You can always create a new one later.
                </Text>
                <Text className="text-sm opacity-60 mb-6">
                    Note: Already sold data cannot be erased, but no new data will be collected.
                </Text>
                <Box className="flex flex-col gap-3">
                    <Button
                        title="Remove Listing"
                        onPress={onRemove}
                        className="w-full"
                        variant="secondary"
                        loading={isLoading}
                    />
                    <Button
                        title="Cancel"
                        onPress={onClose}
                        className="w-full"
                        variant="secondary"
                        style={{ backgroundColor: currentColors.secondary[800] + "70", border: 1, borderColor: currentColors.secondary[800], color: currentColors.secondary[400] }}
                    />
                </Box>
            </Box>
        </Drawer>
    );
}