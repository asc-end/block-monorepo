import { Box, Button, Drawer, Text, useTheme } from "@blockit/cross-ui-toolkit";
import { StarIcon } from "@blockit/ui";
import { Platform, Image } from "react-native";
import { GenesisToken } from "@/types/GenesisToken";

interface GenesisHolderDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    genesisToken: GenesisToken | null;
}

export function GenesisHolderDrawer({ isOpen, onClose, genesisToken }: GenesisHolderDrawerProps) {
    const { currentColors } = useTheme();
    const GENESIS_COLLECTION = "46pcSL5gmjBrPqGKFaLbbCmR6iVuLJbnQy13hAe7s6CC";

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement="bottom"
            adjustToContentHeight
        >
            <Box className="p-5">
                <Box className="flex flex-row items-center gap-2.5 mb-4">
                    <Box className="p-2 rounded-full" style={{ backgroundColor: 'rgba(255, 182, 0, 0.2)' }}>
                        <StarIcon size={24} color="#FFB600" />
                    </Box>
                    <Box>
                        <Text className="font-bold text-xl" style={{ fontFamily: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay' }}>Genesis Holder</Text>
                        <Text className="text-xs" style={{ color: '#FFB600' }}>Verified Saga Owner</Text>
                    </Box>
                </Box>
                
                <Box className="flex flex-col gap-3">
                    <Text className="text-sm leading-5">
                        Genesis tokens verify that each wallet belongs to a single Saga device, ensuring <Text className="font-semibold" style={{ color: '#FFB600' }}>higher quality data</Text> and preventing fake accounts.
                    </Text>
                    
                    <Box className="flex flex-col">
                        {[
                            { title: "One Device, One User", desc: "Prevents duplicate accounts" },
                            { title: "Verified Authentic", desc: "Real Saga users only" },
                            { title: "Higher data prices", desc: "Buyers pay more for good data" }
                        ].map((item, index) => (
                            <Box key={index} className="flex flex-row gap-3 items-center py-2.5" style={{ 
                                borderBottomWidth: index < 2 ? 1 : 0, 
                                borderBottomColor: currentColors.transparent
                            }}>
                                <Box className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFB600' + '15' }}>
                                    <Text className="text-xs font-bold" style={{ color: '#FFB600' }}>{index + 1}</Text>
                                </Box>
                                <Box className="flex-1">
                                    <Text className="font-medium text-sm">{item.title}</Text>
                                    <Text className="text-xs" style={{ color: currentColors.text.soft }}>{item.desc}</Text>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Text className="text-xs font-semibold opacity-60 -mb-4">YOUR TOKEN</Text>
                    
                    {genesisToken && (
                        <Box className="mt-3 p-3 rounded-xl flex flex-row gap-3" style={{ 
                            backgroundColor: currentColors.surface.elevated,
                        }}>
                            {/* Token Image */}
                            {genesisToken.content?.files?.[0]?.uri && (
                                <Image 
                                    source={{ uri: genesisToken.content.files[0].uri }} 
                                    style={{ width: 60, height: 60, borderRadius: 8 }}
                                    resizeMode="cover"
                                />
                            )}
                            
                            {/* Token Details */}
                            <Box className="flex-1 justify-center">
                                <Box className="flex flex-row items-center gap-2 mb-1">
                                    <Text className="font-semibold text-sm">
                                        {genesisToken.content?.metadata?.name || "Saga Genesis Token"}
                                    </Text>
                                    {genesisToken.supply?.edition_nonce && (
                                        <Text className="text-xs font-bold" style={{ color: '#FFB600' }}>
                                            #{genesisToken.supply.edition_nonce}
                                        </Text>
                                    )}
                                </Box>
                                
                                <Box className="flex flex-row items-center gap-2">
                                    <Box className="flex flex-row items-center gap-1">
                                        <Box className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4CAF50' }} />
                                        <Text className="text-xs" style={{ color: currentColors.text.soft }}>Verified</Text>
                                    </Box>
                                    <Text className="text-xs" style={{ color: currentColors.text.soft }}>•</Text>
                                    <Text className="text-xs" style={{ color: currentColors.text.soft }}>Soulbound</Text>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
                
                <Button
                    title="Got it"
                    onPress={onClose}
                    className="mt-4 w-full"
                />
            </Box>
        </Drawer>
    );
}