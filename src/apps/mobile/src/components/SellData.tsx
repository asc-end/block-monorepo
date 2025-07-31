import { Box, Button, Gradient, Pressable, Text, useTheme } from "@blockit/cross-ui-toolkit";
import { useFocusEffect, useNavigation } from "expo-router";
import { Platform, Animated } from "react-native";
import { useRef, useCallback, useEffect, useState, useMemo } from "react";
import { useSellerDashboard } from "../hooks/useSellerDashboard";
import dayjs from 'dayjs';
import { claimRevenueIx, createListingTx, removeListingTx, updateListingTx } from "@blockit/shared";
import { CheckIcon, CloseIcon, ExchangeIcon, StarIcon } from "@blockit/ui";
import { Transaction } from "@solana/web3.js";
import { useSolana } from "@/hooks/solana/useSolana";
import {
    DataCollectionDrawer,
    PriceSelectorDrawer,
    RemoveListingDrawer,
    UpdateDateDrawer,
    UpdatePriceDrawer,
    GenesisHolderDrawer
} from "./SellData/index";
import { searchAssets } from "@/utils/verifyGenesisOwnership";
import { useEmbeddedSolanaWallet } from "@privy-io/expo";
import { useAuthorization } from "@/hooks/solana/useMwaAuthorization";
import { SolanaAppConfig } from "@/constants/SolanaAppConfig";
import { GenesisToken } from "@/types/GenesisToken";

// Decryption animation hook
const useDecryptAnimation = (finalValue: string, isActive: boolean, duration: number = 500) => {
    const [displayValue, setDisplayValue] = useState('');
    const chars = '0123456789.';

    useEffect(() => {
        if (!isActive || !finalValue) {
            // Show placeholder immediately
            let placeholder = '';
            for (let i = 0; i < finalValue.length; i++) {
                placeholder += finalValue[i] === ' ' ? ' ' : '-';
            }
            setDisplayValue(placeholder);
            return;
        }

        let frame = 0;
        const totalFrames = 20;
        const interval = duration / totalFrames;

        const timer = setInterval(() => {
            frame++;

            if (frame > totalFrames) {
                clearInterval(timer);
                setDisplayValue(finalValue);
                return;
            }

            const progress = frame / totalFrames;
            let result = '';

            for (let i = 0; i < finalValue.length; i++) {
                // Keep spaces and special chars
                if (finalValue[i] === ' ' || finalValue[i] === '$') {
                    result += finalValue[i];
                } else if (i < finalValue.length * progress) {
                    // Reveal characters progressively from left to right
                    result += finalValue[i];
                } else {
                    // Use only numbers for scramble effect
                    result += chars[Math.floor(Math.random() * chars.length)];
                }
            }

            setDisplayValue(result);
        }, interval);

        return () => clearInterval(timer);
    }, [finalValue, isActive, duration]);

    return displayValue;
};

export function SellData() {
    const { currentColors } = useTheme();
    const { wallets } = useEmbeddedSolanaWallet();
    const { selectedAccount } = useAuthorization();

    const walletAddress = selectedAccount?.publicKey.toBase58() || wallets[0].address

    const { signAndSendTransaction } = useSolana();
    const { data, isLoading } = useSellerDashboard();
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    // Circle animation values
    const circle1Scale = useRef(new Animated.Value(0.8)).current;
    const circle2Scale = useRef(new Animated.Value(0.8)).current;
    const circle3Scale = useRef(new Animated.Value(0.8)).current;
    const circle4Scale = useRef(new Animated.Value(0.8)).current;

    // Rest of page animations
    const contentOpacity = useRef(new Animated.Value(0)).current;

    // Number animations
    const numberOpacity = useRef(new Animated.Value(0)).current;
    const [showNumbers, setShowNumbers] = useState(false);

    // Transition animations
    const slideAnim = useRef(new Animated.Value(30)).current;
    const cardScaleAnim = useRef(new Animated.Value(0.95)).current;
    const noListingOpacity = useRef(new Animated.Value(1)).current;
    const listingOpacity = useRef(new Animated.Value(0)).current;

    // Drawer states
    const [showDataCollection, setShowDataCollection] = useState(false);
    const [showPriceSelector, setShowPriceSelector] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState(0.00001);
    const [showWelcome] = useState(false);
    const [showGenesisDrawer, setShowGenesisDrawer] = useState(false);
    const hasActiveListing = !!data?.listing;

    // Active listing drawer states
    const [showRemoveDrawer, setShowRemoveDrawer] = useState(false);
    const [showUpdateDateDrawer, setShowUpdateDateDrawer] = useState(false);
    const [showUpdatePriceDrawer, setShowUpdatePriceDrawer] = useState(false);
    const [selectedNewPrice, setSelectedNewPrice] = useState(0.00001);

    // Loading states
    const [isRemovingListing, setIsRemovingListing] = useState(false);
    const [isUpdatingDate, setIsUpdatingDate] = useState(false);
    const [isUpdatingPrice, setIsUpdatingPrice] = useState(false);
    const [isCreatingListing, setIsCreatingListing] = useState(false);
    const [isClaimingEarnings, setIsClaimingEarnings] = useState(false);

    // Main animation that runs once when screen is focused
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

    // Start showing placeholder immediately, then decrypt when data arrives
    useEffect(() => {
        // Show immediately
        Animated.timing(numberOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        if (data && !isLoading) {
            setShowNumbers(true);
        }
    }, [data, isLoading]);

    // Animate transition when listing state changes
    useEffect(() => {
        if (hasActiveListing) {
            // Animate to active listing state
            Animated.parallel([
                Animated.timing(listingOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(noListingOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.spring(cardScaleAnim, {
                    toValue: 1,
                    friction: 6,
                    tension: 40,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            // Reset for no listing state
            listingOpacity.setValue(0);
            noListingOpacity.setValue(1);
            slideAnim.setValue(30);
            cardScaleAnim.setValue(0.95);
        }
    }, [hasActiveListing]);

    const totalEarnings = data?.earnings.total || '0';

    // Use decryption animation for display values
    const displayEarnings = useDecryptAnimation(`$${totalEarnings}`, showNumbers, 600);

    // Calculate days waiting for approval (days between listing end date and today)
    const daysWaitingForApproval = data?.listing?.endDate
        ? Math.max(0, dayjs().diff(dayjs(data.listing.endDate), 'days'))
        : 0;


    const [genesisToken, setGenesisToken] = useState<GenesisToken | null>(null);

    useEffect(() => {
        let isMounted = true;
        async function checkGenesisToken() {
            if (!walletAddress) {
                console.log("No wallet address")
                setGenesisToken(null);
                return;
            }
            try {
                const result = await searchAssets( SolanaAppConfig.clusters["mainnet-beta"].endpoint, walletAddress);
                setGenesisToken(result.items[0]);
            } catch (e) {
                setGenesisToken(null);
            }
        }
        checkGenesisToken();
        return () => { isMounted = false; };
    }, [walletAddress]);

    async function handleClaimEarnings() {
        try {
            setIsClaimingEarnings(true);
            let tx = new Transaction();
            for (const [index, proof] of (data?.proofs ?? []).entries()) {
                console.log(proof)

                const ix = await claimRevenueIx(walletAddress, proof.periodId, proof.amount, proof.proof)
                if (index % 7 && data?.proofs.length > 7) {
                    const signature = await signAndSendTransaction(tx);

                    if (!signature) throw new Error("Failed to create commitment");
                    tx = new Transaction();
                }
                tx.add(ix);
            }
            const signature = await signAndSendTransaction(tx);

            if (!signature) throw new Error("Failed to create commitment");
            console.log('Claiming earnings');
        } finally {
            setIsClaimingEarnings(false);
        }
    }

    async function handleRemoveListing() {
        try {
            setIsRemovingListing(true);
            const tx = await removeListingTx(walletAddress, data?.listing.listingId)
            const signature = await signAndSendTransaction(tx);
            if (!signature) throw new Error("Failed to remove listing");
            console.log('Removed listing');
        } finally {
            setIsRemovingListing(false);
        }
    }

    async function handleUpdateListing() {
        try {
            setIsUpdatingDate(true);
            const endDate = dayjs().toDate() // Always use today's date
            const tx = await updateListingTx(walletAddress, data?.listing.listingId, endDate, null)
            const signature = await signAndSendTransaction(tx);
            if (!signature) throw new Error("Failed to update listing");
            console.log('Updated listing');
        } finally {
            setIsUpdatingDate(false);
        }
    }

    async function handleUpdateListingPrice() {
        try {
            setIsUpdatingPrice(true);

            const newPricePerDay = selectedNewPrice * 1_000_000_000 // Convert SOL to lamports
            const tx = await updateListingTx(walletAddress, data?.listing.listingId, null, newPricePerDay)
            const signature = await signAndSendTransaction(tx);
            if (!signature) throw new Error("Failed to update listing price");
        } finally {
            setIsUpdatingPrice(false);
            setShowUpdatePriceDrawer(false);
        }
    }

    async function handleCreateListing() {
        try {
            const startDate = dayjs("2025-07-20").toDate()
            const endDate = dayjs("2025-08-01").toDate()
            const pricePerDay = selectedPrice * 1000000000 // Convert SOL to lamports
            console.log("Creating listing", walletAddress, startDate, endDate, pricePerDay)
            const tx = await createListingTx(walletAddress, startDate, endDate, pricePerDay).catch((e) => {
                console.log("Error creating listing", e)
                throw e
            })
            console.log("Tx", tx)
            const signature = await signAndSendTransaction(tx);
            console.log("Signature", signature)
            if (!signature) throw new Error("Failed to create listing");
        } catch (error) {
            setIsCreatingListing(false);
            throw error;
        }
    }
    const navigation = useNavigation();

    useEffect(() => {
        if (!!genesisToken) {
            navigation.setOptions({
                headerRight: () => (
                    <Pressable 
                        onPress={() => setShowGenesisDrawer(true)}
                        className="flex flex-row items-center gap-2 px-3 py-1.5 rounded-full" 
                        style={{ backgroundColor: 'rgba(255, 182, 0, 0.2)', zIndex: 10 }}
                    >
                        <StarIcon size={16} />
                        <Text className="font-semibold text-sm" style={{ color: '#FFB600' }}>Genesis Holder</Text>
                    </Pressable>
                )
            })
        }
    }, [genesisToken]);


    return (
        <Box className="flex-1 items-center justify-center py-6 px-3" style={{ gap: 12 }}>
            <Animated.View style={{
                width: '100%',
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim
            }}>
                <Box className="relative h-[189px] overflow-hidden flex items-center justify-center rounded-lg w-full" style={{ backgroundColor: '#1B0092' }}>
                    {/* Genesis Token Badge */}

                    {
                        (hasActiveListing || showWelcome) ?
                            <Animated.View style={{
                                opacity: listingOpacity,
                                transform: [{ translateY: slideAnim }]
                            }}>
                                <Text className="text-lg" variant="caption">Total earnings</Text>
                                <Animated.View style={{ opacity: numberOpacity, minHeight: 64 }}>
                                    <Text className="" style={{ fontFamily: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay', fontWeight: '600', fontSize: 56, lineHeight: 64 }}>{displayEarnings}</Text>
                                </Animated.View>
                            </Animated.View>
                            :
                            <Animated.View style={{
                                opacity: noListingOpacity,
                                transform: [{ scale: 1 }]
                            }}>
                                <Text className="text-center w-80" style={{ fontFamily: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay', fontWeight: '600', fontSize: 42, lineHeight: 38 }}>{showWelcome ? 'Welcome' : 'Your data, your money'}</Text>
                            </Animated.View>
                    }
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
            <Animated.View style={{ opacity: contentOpacity }}>
                <Text className="italic opacity-80 text-lg w-full text-center" variant="caption">This feature is Only Possible On Solana Mobile, enjoy</Text>
            </Animated.View>
            {(hasActiveListing || showWelcome) ? (
                <Animated.View className="rounded-2xl p-6 flex flex-col flex-1 w-full" style={{
                    opacity: Animated.multiply(contentOpacity, listingOpacity),
                    backgroundColor: currentColors.surface.card,
                    transform: [{ scale: cardScaleAnim }]
                }}>
                    <Box className="flex flex-col gap-3 flex-1">

                        <Box className="flex flex-row w-full justify-between">
                            <Text className="opacity-60">Total days sold</Text>
                            <Box className="flex flex-row gap-4 items-center">
                                <Text style={{ fontFamily: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay', fontWeight: '600', fontSize: 20, lineHeight: 20 }}>{12} days</Text>
                                <Pressable
                                    onPress={() => setShowRemoveDrawer(true)}
                                    className="p-1 rounded-lg flex items-center justify-center "
                                    style={{ backgroundColor: currentColors.primary[500] + "20" }}
                                >
                                    <CloseIcon size={24} color={currentColors.primary[500]} />
                                </Pressable>
                            </Box>
                        </Box>
                        <Box className="flex flex-row w-full justify-between">
                            <Text className="opacity-60">Days waiting for approval</Text>
                            <Box className="flex flex-row gap-4 items-center">
                                <Text style={{ fontFamily: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay', fontWeight: '600', fontSize: 20, lineHeight: 20 }}>{daysWaitingForApproval} days</Text>
                                <Pressable
                                    onPress={() => daysWaitingForApproval > 0 && setShowUpdateDateDrawer(true)}
                                    className="p-1 rounded-lg flex items-center justify-center "
                                    style={{
                                        backgroundColor: currentColors.primary[500] + "20",
                                        opacity: daysWaitingForApproval > 0 ? 1 : 0.5
                                    }}
                                    disabled={daysWaitingForApproval === 0}
                                >
                                    <CheckIcon size={24} color={currentColors.primary[500]} />
                                </Pressable>
                            </Box>
                        </Box>
                        <Box className="flex flex-row w-full justify-between">
                            <Text className="opacity-60">Your price per day</Text>
                            <Box className="flex flex-row gap-4 items-center">
                                <Text style={{ fontFamily: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay', fontWeight: '600', fontSize: 20, lineHeight: 20 }}>
                                    {data?.listing?.pricePerDay ? (Number(data.listing.pricePerDay) / 1_000_000_000) : 0} SOL
                                </Text>
                                <Pressable
                                    onPress={() => {
                                        setSelectedNewPrice(data?.listing?.pricePerDay ? (Number(data.listing.pricePerDay) / 1_000_000_000) : 0.00001);
                                        setShowUpdatePriceDrawer(true);
                                    }}
                                    className="p-1 rounded-lg flex items-center justify-center "
                                    style={{ backgroundColor: currentColors.primary[500] + "20" }}
                                >
                                    <ExchangeIcon size={24} color={currentColors.primary[500]} />
                                </Pressable>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="flex flex-col gap-2">

                        <Pressable className="flex flex-row gap-4 items-center w-full justify-between rounded-lg">
                            <Text className="font-medium">Claimable Rewards</Text>
                            <Box className="flex flex-row gap-2 items-center px-4 py-2 rounded-lg" >
                                <Text style={{ fontFamily: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay', fontWeight: '600', fontSize: 20, lineHeight: 20 }}>{data?.earnings.pending || 0} SOL</Text>
                            </Box>
                        </Pressable>
                        <Button title="Claim Revenue" onPress={handleClaimEarnings} className="w-full" disabled={!data?.earnings.pending} loading={isClaimingEarnings} />
                    </Box>
                </Animated.View>
            ) : (
                <Animated.View className="rounded-2xl p-6 flex flex-col gap-6 flex-1 w-full" style={{
                    opacity: Animated.multiply(contentOpacity, noListingOpacity),
                    backgroundColor: currentColors.surface.card
                }}>
                    {/* <Text variant="h2" className="text-center">Start Selling Your Data</Text> */}

                    <Box className="flex flex-col gap-4 flex-1">


                        <Text className="font-semibold">Terms & Conditions</Text>
                        <Box className="flex flex-col opacity-70">
                            <Box className="flex flex-row gap-2">
                                <Text>•</Text>
                                <Text>You're selling data from {dayjs("2025-07-20").format("MMM D, YYYY")} to {dayjs().format("MMM D, YYYY")}</Text>
                            </Box>
                            <Box className="flex flex-row gap-2">
                                <Text>•</Text>
                                <Text>Only anonymous data will be shared</Text>
                            </Box>


                            <Box className="flex flex-row gap-2">
                                <Text>•</Text>
                                <Text>You can remove your listing at any time (already sold data cannot be erased)</Text>
                            </Box>
                            <Box className="flex flex-row gap-2">
                                <Text>•</Text>
                                <Text>Price changes only affect future sales</Text>
                            </Box>
                            <Box className="flex flex-row gap-2">
                                <Text>•</Text>
                                <Text>Claim your earnings anytime</Text>
                            </Box>
                            <Box className="flex flex-row gap-2">
                                <Text>•</Text>
                                <Text>Earnings vary with demand and aren't guaranteed</Text>
                            </Box>
                            <Pressable
                                onPress={() => setShowDataCollection(true)}
                                className="py-3 px-4 mt-6 rounded-lg flex flex-row items-center justify-center"
                                style={{ backgroundColor: currentColors.primary[500] + "10", borderWidth: 1, borderColor: currentColors.primary[500] + "30" }}
                            >
                                <Text style={{ color: currentColors.primary[500], fontWeight: '600' }}>See what data we collect</Text>
                            </Pressable>
                        </Box>
                    </Box>

                    <Box className="flex flex-col gap-2">

                        <Pressable
                            onPress={() => setShowPriceSelector(true)}
                            className="flex flex-row gap-4 items-center w-full justify-between rounded-lg"
                        >
                            <Text className="font-medium">Price per day</Text>
                            <Box className="flex flex-row gap-2 items-center px-4 py-2 rounded-lg border " style={{ backgroundColor: currentColors.primary[500] + "20", borderColor: currentColors.primary[500] + "50" }}>
                                <Text style={{ fontFamily: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay', fontWeight: '600' }}>{selectedPrice} SOL</Text>
                            </Box>
                        </Pressable>
                        <Button title="Sell" onPress={handleCreateListing} className="w-full" loading={isCreatingListing} />
                    </Box>
                </Animated.View>
            )
            }


            {/* Drawers */}
            <DataCollectionDrawer
                isOpen={showDataCollection}
                onClose={() => setShowDataCollection(false)}
            />

            <PriceSelectorDrawer
                isOpen={showPriceSelector}
                onClose={() => setShowPriceSelector(false)}
                selectedPrice={selectedPrice}
                onSelectPrice={setSelectedPrice}
            />

            <RemoveListingDrawer
                isOpen={showRemoveDrawer}
                onClose={() => setShowRemoveDrawer(false)}
                onRemove={handleRemoveListing}
                isLoading={isRemovingListing}
            />

            <UpdateDateDrawer
                isOpen={showUpdateDateDrawer}
                onClose={() => setShowUpdateDateDrawer(false)}
                onUpdate={handleUpdateListing}
                isLoading={isUpdatingDate}
                currentEndDate={data?.listing?.endDate?.toString()}
            />

            <UpdatePriceDrawer
                isOpen={showUpdatePriceDrawer}
                onClose={() => setShowUpdatePriceDrawer(false)}
                onUpdate={handleUpdateListingPrice}
                isLoading={isUpdatingPrice}
                currentPrice={data?.listing?.pricePerDay ? (Number(data.listing.pricePerDay) / 1_000_000_000) : 0}
                selectedPrice={selectedNewPrice}
                onSelectPrice={setSelectedNewPrice}
            />
            
            <GenesisHolderDrawer
                genesisToken={genesisToken}
                isOpen={showGenesisDrawer}
                onClose={() => setShowGenesisDrawer(false)}
            />
        </Box >
    )
}