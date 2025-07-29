import { Box, Drawer, Pressable, Text, useTheme } from "@blockit/cross-ui-toolkit";

interface PriceSelectorDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPrice: number;
    onSelectPrice: (price: number) => void;
}

export function PriceSelectorDrawer({ isOpen, onClose, selectedPrice, onSelectPrice }: PriceSelectorDrawerProps) {
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
                <Text className="font-bold text-xl mb-4">Select Your Price Per Day</Text>
                <Box className="flex flex-col gap-2">
                    {priceOptions.map((price) => (
                        <Pressable
                            key={price}
                            onPress={() => {
                                onSelectPrice(price);
                                onClose();
                            }}
                            className="p-4 rounded-lg flex flex-row justify-between items-center border"
                            style={{
                                backgroundColor: selectedPrice === price ? currentColors.primary[500] + "20" : currentColors.surface.card,
                                borderColor: selectedPrice === price ? currentColors.primary[500] : "transparent"
                            }}
                        >
                            <Text style={{
                                color: selectedPrice === price ? currentColors.primary[500] : currentColors.text.main,
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
            </Box>
        </Drawer>
    );
}