import { Box, Button, Drawer, Text } from "@blockit/cross-ui-toolkit";

interface DataCollectionDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DataCollectionDrawer({ isOpen, onClose }: DataCollectionDrawerProps) {
    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement="bottom"
            adjustToContentHeight
        >
            <Box className="p-6">
                <Text className="font-bold text-xl mb-4">What We Collect</Text>
                <Box className="flex flex-col gap-3">
                    <Text className="text-base">We collect anonymous data about:</Text>
                    <Box className="flex flex-col gap-2 ml-4">
                        <Text className="opacity-70">• App usage duration and frequency</Text>
                        <Text className="opacity-70">• App categories (social, productivity, etc.)</Text>
                        <Text className="opacity-70">• Time of day patterns</Text>
                        <Text className="opacity-70">• Device type and OS version</Text>
                        <Text className="opacity-70">• Proof of singular identity (Genesis token)</Text>
                    </Box>
                    <Text className="font-semibold mt-2">We never collect:</Text>
                    <Box className="flex flex-col gap-2 ml-4">
                        <Text className="opacity-70">• Personal information or identifiers</Text>
                        <Text className="opacity-70">• App content or messages</Text>
                        <Text className="opacity-70">• Location data</Text>
                        <Text className="opacity-70">• Contacts or private data</Text>
                    </Box>
                    <Text className="text-sm opacity-60 mt-3">
                        Genesis token verification ensures one person = one data seller, preventing fraud while maintaining anonymity.
                    </Text>
                </Box>
                <Button
                    title="Got it"
                    onPress={onClose}
                    className="mt-6 w-full"
                />
            </Box>
        </Drawer>
    );
}