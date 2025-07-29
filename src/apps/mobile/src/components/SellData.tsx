import { Box, Button, Gradient, Text, useTheme } from "@blockit/cross-ui-toolkit";
import { useFocusEffect } from "expo-router";
import { Platform, Animated } from "react-native";
import { useRef, useCallback } from "react";

export function SellData() {
    const { currentColors } = useTheme();
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    
    // Circle animation values
    const circle1Scale = useRef(new Animated.Value(0.8)).current;
    const circle2Scale = useRef(new Animated.Value(0.8)).current;
    const circle3Scale = useRef(new Animated.Value(0.8)).current;
    const circle4Scale = useRef(new Animated.Value(0.8)).current;
    
    // Rest of page animations
    const contentOpacity = useRef(new Animated.Value(0)).current;

    useFocusEffect(
        useCallback(() => {
            // Reset animation values
            scaleAnim.setValue(0.8);
            opacityAnim.setValue(0);
            circle1Scale.setValue(0.8);
            circle2Scale.setValue(0.8);
            circle3Scale.setValue(0.8);
            circle4Scale.setValue(0.8);
            contentOpacity.setValue(0);

            // Create circle wave animation
            const createCircleAnimation = (animValue: Animated.Value, delay: number) => {
                return Animated.sequence([
                    Animated.delay(delay),
                    Animated.spring(animValue, {
                        toValue: 1,
                        friction: 6,
                        tension: 40,
                        useNativeDriver: true,
                    })
                ]);
            };

            // Start all animations
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 5,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                createCircleAnimation(circle1Scale, 300),
                createCircleAnimation(circle2Scale, 400),
                createCircleAnimation(circle3Scale, 500),
                createCircleAnimation(circle4Scale, 600),
                // Fade in rest of content
                Animated.timing(contentOpacity, {
                    toValue: 1,
                    duration: 600,
                    delay: 400,
                    useNativeDriver: true,
                })
            ]).start();
        }, [])
    );

    return (
        <Box className="flex-1 items-center justify-center p-6" style={{ gap: 12 }}>
            <Animated.View style={{
                width: '100%',
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim
            }}>
                <Box className="relative h-[189px] overflow-hidden flex items-center justify-center rounded-lg w-full" style={{ backgroundColor: '#1B0092' }}>
                <Text className="text-lg" variant="caption">Total earnings</Text>
                <Text className="" style={{ fontFamily: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay', fontWeight: '600', fontSize: 56, lineHeight: 64 }}>$12.4</Text>
                {/* <Text className="" style={{ fontWeight: 700, fontSize: 56, lineHeight: 64 }}>$12.4</Text> */}

                <Box className="left-circles absolute flex items-center justify-center left-0 w-56 h-56" style={{ transform: 'translateX(-112%)' }}>
                    <Animated.View className="h-56 w-56 rounded-full absolute" style={{ backgroundColor: currentColors.pop.indigo, opacity: 0.2, transform: [{ scale: circle1Scale }] }} />
                    <Animated.View className="h-44 w-44 rounded-full absolute" style={{ backgroundColor: currentColors.pop.indigo, opacity: 0.2, transform: [{ scale: circle2Scale }] }} />
                    <Animated.View className="h-32 w-32 rounded-full absolute" style={{ backgroundColor: currentColors.pop.indigo, opacity: 0.2, transform: [{ scale: circle3Scale }] }} />
                    <Animated.View className="h-20 w-20 rounded-full absolute" style={{ backgroundColor: currentColors.pop.indigo, transform: [{ scale: circle4Scale }] }} />
                </Box>
                <Box className="right-circles absolute flex items-center justify-center right-0 w-56 h-56" style={{ transform: 'translateX(112%)' }}>
                    <Animated.View className="h-56 w-56 rounded-full absolute" style={{ backgroundColor: currentColors.pop.indigo, opacity: 0.2, transform: [{ scale: circle1Scale }] }} />
                    <Animated.View className="h-44 w-44 rounded-full absolute" style={{ backgroundColor: currentColors.pop.indigo, opacity: 0.2, transform: [{ scale: circle2Scale }] }} />
                    <Animated.View className="h-32 w-32 rounded-full absolute" style={{ backgroundColor: currentColors.pop.indigo, opacity: 0.2, transform: [{ scale: circle3Scale }] }} />
                    <Animated.View className="h-20 w-20 rounded-full absolute" style={{ backgroundColor: currentColors.pop.indigo, transform: [{ scale: circle4Scale }] }} />
                </Box>
                <Gradient className="h-3 w-full absolute top-0 right-0 left-0" colors={[currentColors.pop.indigo, currentColors.pop.violet, currentColors.pop.purple, currentColors.pop.magenta, currentColors.pop.red, currentColors.pop.yellow]} />
            </Box>
            </Animated.View>
            <Animated.View style={{ opacity: contentOpacity, width: '100%', flex: 1, gap: 12 }}>
                <Text className="italic opacity-80 text-lg" variant="caption">This feature is Only Possible On Solana Mobile, enjoy</Text>
                <Box 
                    className="flex-1 flex flex-col w-full rounded-2xl p-5" 
                    style={{ 
                        backgroundColor: currentColors.surface.card, 
                        gap: 24
                    }}>
                <Box>
                    <Box className="flex flex-col items-start justify-center">
                        <Text className=" font-extralight">Total data sold</Text>
                        <Text style={{ fontFamily: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay', fontWeight: '600', fontSize: 36, lineHeight: 36 }} >12 days</Text>
                    </Box>
                    <Button title="Remove" onPress={() => { }} variant="outline" className="w-full mt-6" />
                </Box>
                <Box>
                    <Box className="flex flex-col items-start justify-center">
                        <Text className="font-extralight">Waiting for your approval</Text>
                        <Text style={{ fontFamily: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay', fontWeight: '600', fontSize: 36, lineHeight: 36 }} >5 days</Text>
                    </Box>
                    <Button title="Sell" onPress={() => { }} className="w-full mt-6" />
                </Box>
            </Box>
            </Animated.View>


            {/* <Text>Sell your data</Text> */}
        </Box>
    )
}