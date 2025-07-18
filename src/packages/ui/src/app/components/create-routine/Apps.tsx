import { useState, useEffect, useMemo } from "react";
import { useRoutineStore } from '../../../stores/routineStore';
import { useTheme, Box, Text, Button, Pressable, TextInput, ScrollView, Image } from '@blockit/cross-ui-toolkit';
import { APP_CATEGORIES } from "../../../constants/apps";

interface AppItem {
    packageName: string;
    appName: string;
    iconUri?: string;
    isBlocked: boolean;
    category?: string;
    selected?: boolean;
    usageTime?: number;
}

interface HistoricalStats {
    historicalStats: Record<string, Record<string, number>>;
}

function categorizeApp(app: AppItem): string {
    const appNameLower = app.appName.toLowerCase();
    const packageNameLower = app.packageName.toLowerCase();

    for (const [category, keywords] of Object.entries(APP_CATEGORIES)) {
        if (category === 'Other') continue;

        for (const keyword of keywords) {
            if (appNameLower === keyword.toLowerCase() || packageNameLower === keyword.toLowerCase()) {
                return category;
            }
        }
    }
    return 'Other';
}

// Mock installed apps data
const mockInstalledApps: AppItem[] = [
    { packageName: 'com.facebook.katana', appName: 'Facebook', iconUri: undefined, isBlocked: false },
    { packageName: 'com.instagram.android', appName: 'Instagram', iconUri: undefined, isBlocked: false },
    { packageName: 'com.twitter.android', appName: 'Twitter', iconUri: undefined, isBlocked: false },
    { packageName: 'com.tiktok', appName: 'TikTok', iconUri: undefined, isBlocked: false },
    { packageName: 'com.snapchat.android', appName: 'Snapchat', iconUri: undefined, isBlocked: false },
    { packageName: 'com.google.android.youtube', appName: 'YouTube', iconUri: undefined, isBlocked: false },
    { packageName: 'com.netflix.mediaclient', appName: 'Netflix', iconUri: undefined, isBlocked: false },
    { packageName: 'com.whatsapp', appName: 'WhatsApp', iconUri: undefined, isBlocked: false },
    { packageName: 'com.discord', appName: 'Discord', iconUri: undefined, isBlocked: false },
    { packageName: 'com.spotify.music', appName: 'Spotify', iconUri: undefined, isBlocked: false },
    { packageName: 'com.google.android.apps.maps', appName: 'Google Maps', iconUri: undefined, isBlocked: false },
    { packageName: 'com.google.android.gm', appName: 'Gmail', iconUri: undefined, isBlocked: false },
    { packageName: 'com.android.chrome', appName: 'Chrome', iconUri: undefined, isBlocked: false },
    { packageName: 'com.reddit.frontpage', appName: 'Reddit', iconUri: undefined, isBlocked: false },
    { packageName: 'com.zhiliaoapp.musically', appName: 'TikTok', iconUri: undefined, isBlocked: false },
    { packageName: 'com.mojang.minecraftpe', appName: 'Minecraft', iconUri: undefined, isBlocked: false },
    { packageName: 'com.supercell.clashofclans', appName: 'Clash of Clans', iconUri: undefined, isBlocked: false },
    { packageName: 'com.android.calendar', appName: 'Calendar', iconUri: undefined, isBlocked: false },
    { packageName: 'com.android.calculator2', appName: 'Calculator', iconUri: undefined, isBlocked: false },
    { packageName: 'com.android.settings', appName: 'Settings', iconUri: undefined, isBlocked: false },
];

interface RoutineAppsProps {
    onBack: () => void;
}

export function RoutineApps({ onBack }: RoutineAppsProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [apps, setApps] = useState<AppItem[]>()
    const { blockedApps } = useRoutineStore();
    const [usageStats, setUsageStats] = useState<Record<string, number>>({});
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingApps, setLoadingApps] = useState(true);
    const { currentColors } = useTheme();
    const [installedApps, setInstalledApps] = useState<AppItem[]>(mockInstalledApps);
    const { setBlockedApps } = useRoutineStore();

    // Fetch installed apps with icons
    useEffect(() => {
        const loadInstalledApps = async () => {
            try {
                setLoadingApps(true);
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 500));

                // If no apps from props, use the mock data
                if (!installedApps || installedApps.length === 0) {
                    const appsWithSelection = mockInstalledApps.map(app => ({
                        ...app,
                        selected: blockedApps.some(blockedApp => blockedApp.packageName === app.packageName),
                    }));
                    setApps(appsWithSelection);
                }
            } catch (error) {
                console.error("Error loading installed apps:", error);
            } finally {
                setLoadingApps(false);
            }
        };

        loadInstalledApps();
    }, [blockedApps]);

    // Mock usage stats data
    const mockUsageData: HistoricalStats = {
        historicalStats: {
            '2024-01-01': {
                'Facebook': 3600000, // 1 hour
                'Instagram': 2700000, // 45 minutes
                'YouTube': 5400000, // 1.5 hours
                'TikTok': 4500000, // 1.25 hours
                'WhatsApp': 1800000, // 30 minutes
                'Discord': 2100000, // 35 minutes
                'Netflix': 7200000, // 2 hours
                'Spotify': 3000000, // 50 minutes
            },
            '2024-01-02': {
                'Facebook': 2400000, // 40 minutes
                'Instagram': 3300000, // 55 minutes
                'YouTube': 4800000, // 1.33 hours
                'TikTok': 3900000, // 1.08 hours
                'Twitter': 1500000, // 25 minutes
                'Reddit': 2700000, // 45 minutes
                'Chrome': 1200000, // 20 minutes
            },
            '2024-01-03': {
                'Facebook': 1800000, // 30 minutes
                'Instagram': 2100000, // 35 minutes
                'YouTube': 6000000, // 1.67 hours
                'TikTok': 5100000, // 1.42 hours
                'Snapchat': 1800000, // 30 minutes
                'Minecraft': 3600000, // 1 hour
                'Clash of Clans': 2400000, // 40 minutes
            }
        }
    };

    // Fetch usage stats
    useEffect(() => {
        const loadUsageStats = async () => {
            try {
                setLoadingStats(true);
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 300));

                const totalUsage: Record<string, number> = {};

                Object.values(mockUsageData.historicalStats || {}).forEach((dayStats) => {
                    Object.entries(dayStats).forEach(([appName, time]) => {
                        totalUsage[appName] = (totalUsage[appName] || 0) + time;
                    });
                });

                setUsageStats(totalUsage);
            } catch (error) {
                console.error("Error loading usage stats:", error);
            } finally {
                setLoadingStats(false);
            }
        };

        loadUsageStats();

        // Refresh stats every 5 minutes
        const interval = setInterval(loadUsageStats, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // Set selected state based on blockedApps from store and add usage time
    useEffect(() => {
        if (installedApps && installedApps.length > 0) {
            const appsWithSelection = installedApps.map(app => ({
                ...app,
                selected: blockedApps.some(blockedApp => blockedApp.packageName === app.packageName),
                usageTime: usageStats[app.appName] || 0
            }));
            setApps(appsWithSelection);
        }
    }, [installedApps, blockedApps, usageStats]);

    // Update apps with usage stats when they change
    useEffect(() => {
        if (apps && Object.keys(usageStats).length > 0) {
            const updatedApps = apps.map(app => ({
                ...app,
                usageTime: usageStats[app.appName] || 0
            }));
            setApps(updatedApps);
        }
    }, [usageStats]);

    // Memoize filtered apps based on search query
    const filteredApps = useMemo(() => {
        if (!apps) return [];

        if (!searchQuery.trim()) return apps;

        const query = searchQuery.toLowerCase();
        return apps.filter(app =>
            app.appName.toLowerCase().includes(query) ||
            app.packageName.toLowerCase().includes(query)
        );
    }, [apps, searchQuery]);

    // Memoize grouped apps calculation
    const groupedApps = useMemo(() => {
        if (!filteredApps) return {};

        return filteredApps.reduce((groups, app) => {
            const category = categorizeApp(app);
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(app);
            return groups;
        }, {} as Record<string, AppItem[]>);
    }, [filteredApps]);

    // Memoize categories list
    const categories = useMemo(() =>
        Object.keys(groupedApps || {})
            .filter(category => category !== 'Other')
            .sort((a, b) => a.localeCompare(b)),
        [groupedApps]
    );

    const selectAllInCategory = (category: string) => {
        const appsInCategory = groupedApps?.[category] || [];
        const allSelected = appsInCategory.every(app => app.selected);

        setApps(prevApps => {
            return prevApps?.map(app => {
                const isInCategory = appsInCategory.some(categoryApp => categoryApp.packageName === app.packageName);
                if (isInCategory) {
                    return { ...app, selected: !allSelected };
                }
                return app;
            });
        });
    };

    // Get most used apps (top 6) from filtered apps
    const mostUsedApps = filteredApps?.sort((a, b) => (b.usageTime || 0) - (a.usageTime || 0)).slice(0, 6);

    const handleSave = () => {
        setBlockedApps(apps?.filter(app => app.selected) || []);
        onBack();
    };

    // Show skeleton while loading
    if (loadingApps || loadingStats) {
        return (
            <Box className="flex-1 flex flex-col p-3" style={{ gap: 5 }}>
                {/* Search Bar Skeleton */}
                <Box
                    className="mb-2 w-full h-10 rounded-lg"
                    style={{ backgroundColor: currentColors.neutral[200] }}
                />

                {/* Most Used Apps Section Skeleton */}
                <Box className="flex flex-col mb-4">
                    <Box className="flex-row justify-between items-center mb-2">
                        <Box className="h-6 w-24 rounded" style={{ backgroundColor: currentColors.neutral[300] }} />
                        <Box className="h-4 w-20 rounded" style={{ backgroundColor: currentColors.neutral[200] }} />
                    </Box>
                    <ScrollView
                        className='flex flex-row'
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerClassName='flex flex-row gap-2 pr-4'
                    >
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <Box
                                key={index}
                                className="p-2 rounded-lg shadow-sm w-24"
                                style={{
                                    backgroundColor: currentColors.surface.card,
                                    shadowColor: currentColors.neutral[900],
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 2,
                                }}
                            >
                                <Box className="flex-col" style={{ gap: 1 }}>
                                    <Box
                                        className="w-full rounded-lg overflow-hidden"
                                        style={{
                                            aspectRatio: 1,
                                            backgroundColor: currentColors.neutral[200]
                                        }}
                                    />
                                    <Box className="h-3 w-full rounded mt-1" style={{ backgroundColor: currentColors.neutral[200] }} />
                                    <Box className="h-2 w-12 rounded" style={{ backgroundColor: currentColors.neutral[200] }} />
                                </Box>
                            </Box>
                        ))}
                    </ScrollView>
                </Box>

                {/* Categories Section Skeleton */}
                <Box className="mb-4">
                    <Box className="h-6 w-24 rounded mb-2" style={{ backgroundColor: currentColors.neutral[300] }} />
                    <Box className="flex-row flex-wrap" style={{ gap: 8 }}>
                        {[1, 2, 3, 4].map((index) => (
                            <Box
                                key={index}
                                className="w-[48%] px-4 py-2 rounded-full"
                                style={{
                                    backgroundColor: currentColors.surface.card,
                                    borderWidth: 1,
                                    borderColor: currentColors.neutral[200],
                                    height: 36
                                }}
                            >
                                <Box className="h-4 w-20 rounded" style={{ backgroundColor: currentColors.neutral[200] }} />
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Apps Grid Skeleton */}
                <Box className="mb-4 flex-1 flex flex-col">
                    <Box className="h-6 w-20 rounded mb-2" style={{ backgroundColor: currentColors.neutral[300] }} />
                    <Box className='flex flex-row gap-2 w-full'>
                        {[1, 2, 3, 4].map((index) => (
                            <Box
                                key={index}
                                className="p-2 rounded-lg shadow-sm w-[24.2%]"
                                style={{
                                    backgroundColor: currentColors.surface.card,
                                    shadowColor: currentColors.neutral[900],
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 2,
                                }}
                            >
                                <Box className="flex-col" style={{ gap: 1 }}>
                                    <Box
                                        className="w-full rounded-lg overflow-hidden"
                                        style={{
                                            aspectRatio: 1,
                                            backgroundColor: currentColors.neutral[200]
                                        }}
                                    />
                                    <Box className="h-3 w-full rounded mt-1" style={{ backgroundColor: currentColors.neutral[200] }} />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Save Button Skeleton */}
                <Box className="p-4 pt-0">
                    <Box className="h-12 w-full rounded-lg" style={{ backgroundColor: currentColors.neutral[300] }} />
                </Box>
            </Box>
        );
    }

    return (
        <Box className="flex-1 flex flex-col p-3" style={{ gap: 5 }}>
            {/* Search Bar */}
            <TextInput
                placeholder="Search apps..."
                value={searchQuery}
                onChangeText={setSearchQuery}

                className='mb-2 w-full'
            />

            {/* Most Used Apps Section */}
            <Box className="flex flex-colmb-4">
                <Box className="flex-row justify-between items-center mb-2">
                    <Text variant="h4" className="font-bold" style={{ color: currentColors.text.main }}>
                        Most Used
                    </Text>
                    <Text variant="caption" style={{ color: currentColors.text.soft }}>
                        Last 30 days
                    </Text>
                </Box>
                <ScrollView
                    className='flex flex-row'
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    // contentContainerStyle={{ gap: 8, paddingRight: 16 }}
                    contentContainerClassName='flex flex-row gap-2 pr-4'
                >
                    {mostUsedApps?.map((item) => (
                        <Pressable
                            key={item.packageName}
                            onPress={() => {
                                setApps(prevApps =>
                                    prevApps?.map(app =>
                                        app.packageName === item.packageName
                                            ? { ...app, selected: !app.selected }
                                            : app
                                    )
                                );
                            }}
                        >
                            <Box
                                className="p-2 rounded-lg shadow-sm w-24"
                                style={{
                                    backgroundColor: item.selected ? currentColors.primary[500] : currentColors.surface.card,
                                    shadowColor: currentColors.neutral[900],
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 2,
                                }}
                            >
                                <Box className="flex-col" style={{ gap: 1 }}>
                                    {item.iconUri ? (
                                        <Image
                                            src={item.iconUri}
                                            style={{
                                                aspectRatio: 1,
                                                width: '100%',
                                                borderRadius: 6
                                            }}
                                        // resizeMode="contain"
                                        />
                                    ) : (
                                        <Box
                                            className="w-full justify-center items-center rounded-lg overflow-hidden"
                                            style={{
                                                aspectRatio: 1,
                                                backgroundColor: currentColors.neutral[200]
                                            }}
                                        >
                                            <Text variant="h5" className="font-bold" style={{ color: currentColors.text.soft }}>
                                                {item.appName.charAt(0)}
                                            </Text>
                                        </Box>
                                    )}
                                    <Text
                                        variant="caption"
                                        className="font-semibold mt-1 truncate"
                                        style={{ color: item.selected ? currentColors.white : currentColors.text.main }}
                                    >
                                        {item.appName}
                                    </Text>
                                    <Text
                                        variant="caption"
                                        style={{ color: item.selected ? currentColors.white : currentColors.text.soft }}
                                    >
                                        {formatTime(item.usageTime || 0)}
                                    </Text>
                                </Box>
                            </Box>
                        </Pressable>
                    ))}
                </ScrollView>
            </Box>

            {/* Categories Section */}
            <Box className="mb-4">
                <Text variant="h4" className="font-bold mb-2" style={{ color: currentColors.text.main }}>
                    Categories
                </Text>
                <Box className="flex-row flex-wrap" style={{ gap: 8 }}>
                    {categories.map(category => (
                        <Pressable
                            key={category}
                            className="w-[48%]"
                            onPress={() => setSelectedCategory(category === selectedCategory ? null : category)}
                        >
                            <Box
                                className="px-4 py-2 rounded-full"
                                style={{
                                    backgroundColor: category === selectedCategory ? currentColors.primary[500] : currentColors.surface.card,
                                    borderWidth: 1,
                                    borderColor: category === selectedCategory ? currentColors.primary[500] : currentColors.neutral[200]
                                }}
                            >
                                <Text
                                    variant="body"
                                    className="font-semibold"
                                    style={{ color: category === selectedCategory ? currentColors.white : currentColors.text.main }}
                                >
                                    {category}
                                </Text>
                            </Box>
                        </Pressable>
                    ))}
                </Box>
            </Box>

            {/* Apps Grid */}
            <Box className="mb-4 flex-1 flex flex-col">
                <Text variant="h4" className="font-bold mb-2" style={{ color: currentColors.text.main }}>
                    All Apps
                </Text>
                <ScrollView
                    className='flex-1'
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName='flex flex-row flex-wrap gap-2'
                >
                    {groupedApps?.["Other"]?.map((item: AppItem) => (
                        <Pressable
                            className='w-[23%]'
                            key={item.packageName}
                            onPress={() => {
                                setApps((prevApps: AppItem[] | undefined) =>
                                    prevApps?.map((app: AppItem) =>
                                        app.packageName === item.packageName
                                            ? { ...app, selected: !app.selected }
                                            : app
                                    )
                                );
                            }}
                        >
                            <Box
                                className="p-2 rounded-lg shadow-sm"
                                style={{
                                    backgroundColor: item.selected ? currentColors.primary[500] : currentColors.surface.card,
                                    shadowColor: currentColors.neutral[900],
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 2,
                                }}
                            >
                                <Box className="flex-col" style={{ gap: 1 }}>
                                    {item.iconUri ? (
                                        <Image
                                            src={item.iconUri}
                                            style={{
                                                aspectRatio: 1,
                                                width: '100%',
                                                borderRadius: 6
                                            }}
                                        // resizeMode="contain"
                                        />
                                    ) : (
                                        <Box
                                            className="w-full justify-center items-center rounded-lg overflow-hidden"
                                            style={{
                                                aspectRatio: 1,
                                                backgroundColor: currentColors.neutral[200]
                                            }}
                                        >
                                            <Text variant="h5" className="font-bold" style={{ color: currentColors.text.soft }}>
                                                {item.appName.charAt(0)}
                                            </Text>
                                        </Box>
                                    )}
                                    <Text
                                        variant="caption"
                                        className="font-semibold mt-1 truncate"
                                        style={{ color: item.selected ? currentColors.white : currentColors.text.main }}
                                    >
                                        {item.appName}
                                    </Text>
                                </Box>
                            </Box>
                        </Pressable>
                    ))}
                </ScrollView>
            </Box>

            {/* Save Button */}
            <Box className="p-4 pt-0">
                <Button
                    title='Save'
                    variant="primary"
                    onPress={handleSave}
                />
            </Box>
        </Box>
    );
}

// Helper function to format time
function formatTime(milliseconds: number) {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    if (minutes === 0) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}
