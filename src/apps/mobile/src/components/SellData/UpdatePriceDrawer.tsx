import { Box, Button, Drawer, Pressable, Text, useTheme } from "@blockit/cross-ui-toolkit";

interface UpdatePriceDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
    isLoading: boolean;
    currentPrice: number;
    selectedPrice: number;
    onSelectPrice: (price: number) => void;
}

export function UpdatePriceDrawer({ 
    isOpen, 
    onClose, 
    onUpdate, 
    isLoading, 
    currentPrice, 
    selectedPrice, 
    onSelectPrice 
}: UpdatePriceDrawerProps) {
    const { currentColors } = useTheme();
    const priceOptions = [0.00001, 0.00005, 0.0001, 0.0005, 0.001];

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement="bottom"
            adjustToContentHeight
        >
            <Box className="p-6">
                <Text className="font-bold text-xl mb-4">Update Your Price</Text>
                <Text className="opacity-70 mb-6">
                    Select a new price per day for your data. Current price: {currentPrice} SOL
                </Text>
                <Box className="flex flex-col gap-2 mb-6">
                    {priceOptions.map((price) => (
                        <Pressable
                            key={price}
                            onPress={() => onSelectPrice(price)}
                            className="p-4 rounded-lg flex flex-row justify-between items-center"
                            style={{
                                backgroundColor: selectedPrice === price ? currentColors.primary[500] + "20" : currentColors.surface.card,
                                borderWidth: selectedPrice === price ? 1 : 0,
                                borderColor: currentColors.primary[500]
                            }}
                        >
                            <Text style={{
                                color: selectedPrice === price ? currentColors.primary[500] : currentColors.text.main,
                                fontWeight: selectedPrice === price ? '600' : '400',
                                fontSize: 16
                            }}>
                                {price} SOL
                            </Text>
                            <Text className="opacity-60" style={{ fontSize: 14 }}>
                                ~${(price * 230).toFixed(4)} USD
                            </Text>
                        </Pressable>
                    ))}
                </Box>
                <Button
                    title="Update Price"
                    onPress={onUpdate}
                    className="w-full"
                    loading={isLoading}
                />
            </Box>
        </Drawer>
    );
}