import { useEffect, useRef, useState } from 'react';
import { Modal, Animated, Platform } from 'react-native';
import { Box, Text, useTheme } from '@blockit/cross-ui-toolkit';
import { CheckIcon } from '@blockit/ui';

interface SuccessModalProps {
    isVisible: boolean;
    onClose: () => void;
    pricePerDay?: number;
}

export function SuccessModal({ isVisible, onClose, pricePerDay = 0.00001 }: SuccessModalProps) {
    const { currentColors } = useTheme();

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(100)).current; // Start off-screen
    const contentOpacityAnim = useRef(new Animated.Value(0)).current;

    // Counter animation
    const [displayPrice, setDisplayPrice] = useState('0.00000');

    // Price counter animation
    useEffect(() => {
        if (isVisible && pricePerDay) {
            let frame = 0;
            const totalFrames = 20;
            const timer = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const currentValue = pricePerDay * progress;
                setDisplayPrice(currentValue.toFixed(5));

                if (frame >= totalFrames) {
                    clearInterval(timer);
                }
            }, 30);

            return () => clearInterval(timer);
        }
    }, [isVisible, pricePerDay]);

    useEffect(() => {
        if (isVisible) {
            // Start animations when modal becomes visible
            Animated.parallel([
                // Fade in
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                // Slide up from bottom
                Animated.spring(slideAnim, {
                    toValue: 0,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
                // Content fade in
                Animated.timing(contentOpacityAnim, {
                    toValue: 1,
                    duration: 300,
                    delay: 100,
                    useNativeDriver: true,
                }),
            ]).start();

            // Auto close after 4 seconds
            const timer = setTimeout(() => {
                handleClose();
            }, 4000);

            return () => clearTimeout(timer);
        } else {
            // Reset animations when modal is hidden
            fadeAnim.setValue(0);
            slideAnim.setValue(100);
            contentOpacityAnim.setValue(0);
            setDisplayPrice('0.00000');
        }
    }, [isVisible]);

    const handleClose = () => {
        // Fade out animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 100,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onClose();
        });
    };

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="none"
            onRequestClose={handleClose}
            statusBarTranslucent
        >
            <Animated.View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    opacity: fadeAnim,
                }}
                onTouchEnd={handleClose} // Allow tap to dismiss
            >
                <Animated.View
                    className="relative overflow-hidden mx-4 mb-4"
                    style={{
                        transform: [{ translateY: slideAnim }],
                        backgroundColor: currentColors.surface.elevated,
                        borderRadius: 12,
                        paddingVertical: 16,
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: -2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 8,
                    }}
                >

                    {/* Success icon */}
                    <Animated.View style={{ opacity: contentOpacityAnim }}>
                        <Box
                            className="rounded-full mr-3"
                            style={{
                                backgroundColor: currentColors.pop.violet + '20',
                                padding: 8,
                            }}
                        >
                            <CheckIcon size={20} color={currentColors.pop.violet} />
                        </Box>
                    </Animated.View>

                    {/* Success text */}
                    <Animated.View style={{ opacity: contentOpacityAnim, flex: 1 }}>
                        <Text
                            className="mb-0.5"
                            style={{
                                fontFamily: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay',
                                fontWeight: '600',
                                fontSize: 16,
                                lineHeight: 20,
                                color: currentColors.text.main,
                            }}
                        >
                            Listing Created Successfully
                        </Text>
                        <Text className="opacity-60" style={{ fontSize: 14 }}>
                            Your data is now for sale at {displayPrice} SOL/day
                        </Text>
                    </Animated.View>
                </Animated.View>

            </Animated.View>
        </Modal>
    );
}