import { useState, useEffect, useMemo } from "react";
import { useRoutineStore } from '../../../stores/routineStore';
import { useTheme, Box, Text, Button, Pressable, TextInput, ScrollView, Image } from '@blockit/cross-ui-toolkit';
import { APP_CATEGORIES } from "../../../constants/apps";
import { api } from '../../../stores/authStore';

interface AppItem {
    id?: string;
    packageName: string;
    appName: string;
    iconUri?: string;
    isBlocked: boolean;
    category?: string;
    selected?: boolean;
    usageTime?: number;
    domains?: string[];
    isUserSubmitted?: boolean;
}


// Helper function to get app icon from various sources
function getAppIcon(appName: string, domain?: string): string | undefined {
    // Try to get icon from Clearbit for web domains
    if (domain) {
        // Clean up domain (remove www., trailing slashes)
        const cleanDomain = domain.replace(/^www\./, '').replace(/\/$/, '');
        return `https://logo.clearbit.com/${cleanDomain}`;
    }
    
    // For popular apps, use known icon sources
    const appNameLower = appName.toLowerCase();
    
    // Map of popular apps to their icon URLs
    const popularAppIcons: Record<string, string> = {
        'facebook': 'https://logo.clearbit.com/facebook.com',
        'instagram': 'https://logo.clearbit.com/instagram.com',
        'twitter': 'https://logo.clearbit.com/twitter.com',
        'x': 'https://logo.clearbit.com/x.com',
        'tiktok': 'https://logo.clearbit.com/tiktok.com',
        'snapchat': 'https://logo.clearbit.com/snapchat.com',
        'youtube': 'https://logo.clearbit.com/youtube.com',
        'netflix': 'https://logo.clearbit.com/netflix.com',
        'whatsapp': 'https://logo.clearbit.com/whatsapp.com',
        'discord': 'https://logo.clearbit.com/discord.com',
        'spotify': 'https://logo.clearbit.com/spotify.com',
        'reddit': 'https://logo.clearbit.com/reddit.com',
        'linkedin': 'https://logo.clearbit.com/linkedin.com',
        'pinterest': 'https://logo.clearbit.com/pinterest.com',
        'twitch': 'https://logo.clearbit.com/twitch.tv',
        'amazon': 'https://logo.clearbit.com/amazon.com',
        'gmail': 'https://logo.clearbit.com/gmail.com',
        'google maps': 'https://logo.clearbit.com/maps.google.com',
        'chrome': 'https://logo.clearbit.com/chrome.google.com',
        'slack': 'https://logo.clearbit.com/slack.com',
        'zoom': 'https://logo.clearbit.com/zoom.us',
        'teams': 'https://logo.clearbit.com/teams.microsoft.com',
        'microsoft teams': 'https://logo.clearbit.com/teams.microsoft.com',
        'notion': 'https://logo.clearbit.com/notion.so',
        'figma': 'https://logo.clearbit.com/figma.com',
        'github': 'https://logo.clearbit.com/github.com',
        'gitlab': 'https://logo.clearbit.com/gitlab.com',
        'vscode': 'https://logo.clearbit.com/code.visualstudio.com',
        'visual studio code': 'https://logo.clearbit.com/code.visualstudio.com',
        'telegram': 'https://logo.clearbit.com/telegram.org',
        'messenger': 'https://logo.clearbit.com/messenger.com',
        'skype': 'https://logo.clearbit.com/skype.com',
        'ebay': 'https://logo.clearbit.com/ebay.com',
        'paypal': 'https://logo.clearbit.com/paypal.com',
        'uber': 'https://logo.clearbit.com/uber.com',
        'lyft': 'https://logo.clearbit.com/lyft.com',
        'airbnb': 'https://logo.clearbit.com/airbnb.com',
        'dropbox': 'https://logo.clearbit.com/dropbox.com',
        'google drive': 'https://logo.clearbit.com/drive.google.com',
        'onedrive': 'https://logo.clearbit.com/onedrive.live.com',
        'outlook': 'https://logo.clearbit.com/outlook.com',
        'yahoo': 'https://logo.clearbit.com/yahoo.com',
        'bing': 'https://logo.clearbit.com/bing.com',
        'duckduckgo': 'https://logo.clearbit.com/duckduckgo.com',
        'firefox': 'https://logo.clearbit.com/firefox.com',
        'safari': 'https://logo.clearbit.com/apple.com',
        'edge': 'https://logo.clearbit.com/microsoftedge.com',
        'brave': 'https://logo.clearbit.com/brave.com',
        'opera': 'https://logo.clearbit.com/opera.com',
    };
    
    return popularAppIcons[appNameLower];
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
    { packageName: 'com.facebook.katana', appName: 'Facebook', iconUri: getAppIcon('Facebook'), isBlocked: false },
    { packageName: 'com.instagram.android', appName: 'Instagram', iconUri: getAppIcon('Instagram'), isBlocked: false },
    { packageName: 'com.twitter.android', appName: 'Twitter', iconUri: getAppIcon('Twitter'), isBlocked: false },
    { packageName: 'com.tiktok', appName: 'TikTok', iconUri: getAppIcon('TikTok'), isBlocked: false },
    { packageName: 'com.snapchat.android', appName: 'Snapchat', iconUri: getAppIcon('Snapchat'), isBlocked: false },
    { packageName: 'com.google.android.youtube', appName: 'YouTube', iconUri: getAppIcon('YouTube'), isBlocked: false },
    { packageName: 'com.netflix.mediaclient', appName: 'Netflix', iconUri: getAppIcon('Netflix'), isBlocked: false },
    { packageName: 'com.whatsapp', appName: 'WhatsApp', iconUri: getAppIcon('WhatsApp'), isBlocked: false },
    { packageName: 'com.discord', appName: 'Discord', iconUri: getAppIcon('Discord'), isBlocked: false },
    { packageName: 'com.spotify.music', appName: 'Spotify', iconUri: getAppIcon('Spotify'), isBlocked: false },
    { packageName: 'com.google.android.apps.maps', appName: 'Google Maps', iconUri: getAppIcon('Google Maps'), isBlocked: false },
    { packageName: 'com.google.android.gm', appName: 'Gmail', iconUri: getAppIcon('Gmail'), isBlocked: false },
    { packageName: 'com.android.chrome', appName: 'Chrome', iconUri: getAppIcon('Chrome'), isBlocked: false },
    { packageName: 'com.reddit.frontpage', appName: 'Reddit', iconUri: getAppIcon('Reddit'), isBlocked: false },
    { packageName: 'com.zhiliaoapp.musically', appName: 'TikTok', iconUri: getAppIcon('TikTok'), isBlocked: false },
    { packageName: 'com.mojang.minecraftpe', appName: 'Minecraft', iconUri: undefined, isBlocked: false },
    { packageName: 'com.supercell.clashofclans', appName: 'Clash of Clans', iconUri: undefined, isBlocked: false },
    { packageName: 'com.android.calendar', appName: 'Calendar', iconUri: undefined, isBlocked: false },
    { packageName: 'com.android.calculator2', appName: 'Calculator', iconUri: undefined, isBlocked: false },
    { packageName: 'com.android.settings', appName: 'Settings', iconUri: undefined, isBlocked: false },
];

interface RoutineAppsProps {
    onBack: () => void;
    nativeApps?: AppItem[]; // Optional native apps from mobile platform
}

export function RoutineApps({ onBack, nativeApps }: RoutineAppsProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [apps, setApps] = useState<AppItem[]>()
    const { blockedApps } = useRoutineStore();
    const [usageStats, setUsageStats] = useState<Record<string, number>>({});
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingApps, setLoadingApps] = useState(true);
    const { currentColors } = useTheme();
    const [installedApps, setInstalledApps] = useState<AppItem[]>([]);
    const { setBlockedApps } = useRoutineStore();
    const [showUrlInput, setShowUrlInput] = useState(false);
    const [urlInput, setUrlInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    // Check if we're in a browser environment (web or extension) vs React Native
    const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    const isReactNative = typeof window !== 'undefined' && window.navigator?.product === 'ReactNative';
    const showWebsiteFeature = isBrowser && !isReactNative;

    // Fetch apps from database and native apps
    useEffect(() => {
        const loadDatabaseApps = async () => {
            try {
                setLoadingApps(true);
                const response = await api().get('/apps');
                const dbAppsData = response.data;
                
                let formattedApps = dbAppsData.map((app: any) => {
                    const iconUrl = app.icon || getAppIcon(app.name, app.domains?.[0]);
                    console.log(`App: ${app.name}, Icon URL: ${iconUrl}`);
                    return {
                        id: app.id,
                        packageName: app.androidPackageName || app.iosBundleId || '',
                        appName: app.name,
                        iconUri: iconUrl,
                        isBlocked: false,
                        category: app.category || 'Other',
                        domains: app.domains || [],
                        isUserSubmitted: app.isUserSubmitted
                    };
                });
                
                // Merge with native apps if provided (from mobile platform)
                if (nativeApps && nativeApps.length > 0) {
                    // Create a map of database apps by package name for merging
                    const dbAppsMap = new Map(
                        formattedApps.map(app => [app.packageName.toLowerCase(), app])
                    );
                    
                    // Merge native apps with database apps, preferring native icons
                    nativeApps.forEach((nativeApp) => {
                        const packageNameLower = nativeApp.packageName.toLowerCase();
                        const existingApp = dbAppsMap.get(packageNameLower);
                        
                        if (existingApp) {
                            // Update existing app with native icon if available
                            if (nativeApp.iconUri) {
                                console.log(`Updating ${existingApp.appName} with native icon`);
                                existingApp.iconUri = nativeApp.iconUri;
                            }
                        } else {
                            // Add native app that's not in database
                            formattedApps.push(nativeApp);
                        }
                    });
                }
                
                setInstalledApps(formattedApps);
            } catch (error) {
                console.error("Error loading apps from database:", error);
                // Fallback to mock data
                setInstalledApps(mockInstalledApps);
            } finally {
                setLoadingApps(false);
            }
        };

        loadDatabaseApps();
    }, [nativeApps]);

    // Fetch usage stats from backend
    useEffect(() => {
        const loadUsageStats = async () => {
            try {
                setLoadingStats(true);
                
                // Get stats for last 30 days
                const endDate = new Date();
                const startDate = new Date();
                startDate.setDate(startDate.getDate() - 30);
                
                const response = await api().get('/app-usage/stats', {
                    params: {
                        startDate: startDate.toISOString(),
                        endDate: endDate.toISOString()
                    }
                });

                const statsData = response.data;
                const totalUsage: Record<string, number> = {};

                // Aggregate usage across all dates and platforms
                Object.values(statsData || {}).forEach((dayStats: any) => {
                    Object.entries(dayStats).forEach(([appName, platformStats]: [string, any]) => {
                        const mobileTime = platformStats.mobile || 0;
                        const webTime = platformStats.web || 0;
                        totalUsage[appName] = (totalUsage[appName] || 0) + mobileTime + webTime;
                    });
                });

                setUsageStats(totalUsage);
            } catch (error) {
                console.error("Error loading usage stats:", error);
                // Fallback to empty stats if API fails
                setUsageStats({});
            } finally {
                setLoadingStats(false);
            }
        };

        loadUsageStats();

        // Refresh stats every 5 minutes
        const interval = setInterval(loadUsageStats, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // Merge apps from database with apps from usage stats
    useEffect(() => {
        if (installedApps && installedApps.length > 0) {
            // Create a map of existing apps by name for quick lookup
            const existingAppsMap = new Map(
                installedApps.map(app => [app.appName.toLowerCase(), app])
            );
            
            // Find apps in usage stats that aren't in the database
            const appsFromStats: AppItem[] = [];
            Object.entries(usageStats).forEach(([appName, usageTime]) => {
                if (!existingAppsMap.has(appName.toLowerCase()) && usageTime > 0) {
                    // Create a new app entry for apps with usage but not in database
                    appsFromStats.push({
                        id: `usage-${appName}`,
                        packageName: appName.toLowerCase().replace(/\s+/g, '.'),
                        appName: appName,
                        iconUri: getAppIcon(appName),
                        isBlocked: false,
                        category: 'Other',
                        domains: [],
                        isUserSubmitted: false,
                        usageTime: usageTime
                    });
                }
            });
            
            // Combine database apps with usage stats apps
            const allApps = [
                ...installedApps.map(app => ({
                    ...app,
                    selected: blockedApps.some(blockedApp => blockedApp.packageName === app.packageName),
                    usageTime: usageStats[app.appName] || 0
                })),
                ...appsFromStats.map(app => ({
                    ...app,
                    selected: blockedApps.some(blockedApp => blockedApp.appName === app.appName)
                }))
            ];
            
            setApps(allApps);
        } else if (Object.keys(usageStats).length > 0) {
            // If no database apps but we have usage stats, create apps from stats
            const appsFromStats = Object.entries(usageStats).map(([appName, usageTime]) => ({
                id: `usage-${appName}`,
                packageName: appName.toLowerCase().replace(/\s+/g, '.'),
                appName: appName,
                iconUri: getAppIcon(appName),
                isBlocked: false,
                category: 'Other',
                domains: [],
                isUserSubmitted: false,
                selected: blockedApps.some(blockedApp => blockedApp.appName === appName),
                usageTime: usageTime
            }));
            
            setApps(appsFromStats);
        }
    }, [installedApps, blockedApps, usageStats]);


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


    // Get most used apps (top 6) from filtered apps
    const mostUsedApps = filteredApps?.sort((a, b) => (b.usageTime || 0) - (a.usageTime || 0)).slice(0, 6);

    const handleAddUrl = async () => {
        if (!urlInput || !nameInput) return;
        
        try {
            // Extract domain from URL
            let domain = urlInput;
            try {
                const url = new URL(urlInput.startsWith('http') ? urlInput : `https://${urlInput}`);
                domain = url.hostname;
            } catch (e) {
                // Use as-is if not a valid URL
            }
            
            const response = await api().post('/apps', {
                name: nameInput,
                domain: domain
            });
            
            const newApp = response.data;
            const formattedApp: AppItem = {
                id: newApp.id,
                packageName: domain,
                appName: newApp.name,
                iconUri: newApp.icon,
                isBlocked: false,
                category: newApp.category || 'Other',
                domains: newApp.domains || [domain],
                isUserSubmitted: true,
                selected: true
            };
            
            setInstalledApps(prev => [...prev, formattedApp]);
            setApps(prev => prev ? [...prev, formattedApp] : [formattedApp]);
            setUrlInput('');
            setNameInput('');
            setShowUrlInput(false);
        } catch (error) {
            console.error('Error adding URL:', error);
        }
    };

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
                        contentContainerStyle={{ gap: 8, paddingRight: 16, display: "flex", flexDirection: "row" }}
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
                    // className='flex flex-row'
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8, paddingRight: 16, display: "flex", flexDirection: "row" }}
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
                                    <Box
                                        className="w-full rounded-lg overflow-hidden justify-center items-center"
                                        style={{
                                            aspectRatio: 1,
                                            backgroundColor: currentColors.neutral[100]
                                        }}
                                    >
                                        {item.iconUri ? (
                                            <Image
                                                src={item.iconUri}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            />
                                        ) : (
                                            <Text variant="h5" className="font-bold" style={{ color: currentColors.text.soft }}>
                                                {item.appName.charAt(0)}
                                            </Text>
                                        )}
                                    </Box>
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
                    contentContainerStyle={{ gap: 8, paddingRight: 16, display: "flex", flexDirection: "row", flexWrap: "wrap" }}
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
                                    <Box
                                        className="w-full rounded-lg overflow-hidden justify-center items-center"
                                        style={{
                                            aspectRatio: 1,
                                            backgroundColor: currentColors.neutral[100]
                                        }}
                                    >
                                        {item.iconUri ? (
                                            <Image
                                                src={item.iconUri}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            />
                                        ) : (
                                            <Text variant="h5" className="font-bold" style={{ color: currentColors.text.soft }}>
                                                {item.appName.charAt(0)}
                                            </Text>
                                        )}
                                    </Box>
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

            {/* Add URL button for web and extension */}
            {showWebsiteFeature && (
                <Box className="mb-4">
                    {!showUrlInput ? (
                        <Button
                            title="Add Website"
                            variant="secondary"
                            onPress={() => setShowUrlInput(true)}
                        />
                    ) : (
                        <Box className="p-4 rounded-lg" style={{ backgroundColor: currentColors.surface.card }}>
                            <Text variant="h5" className="font-semibold mb-2" style={{ color: currentColors.text.main }}>
                                Add Website to Block
                            </Text>
                            <TextInput
                                placeholder="Website name (e.g., Facebook)"
                                value={nameInput}
                                onChangeText={setNameInput}
                                className="mb-2"
                            />
                            <TextInput
                                placeholder="URL (e.g., facebook.com)"
                                value={urlInput}
                                onChangeText={setUrlInput}
                                className="mb-3"
                            />
                            <Box className="flex-row" style={{ gap: 8 }}>
                                <Button
                                    title="Add"
                                    variant="primary"
                                    onPress={handleAddUrl}
                                />
                                <Button
                                    title="Cancel"
                                    variant="secondary"
                                    onPress={() => {
                                        setShowUrlInput(false);
                                        setUrlInput('');
                                        setNameInput('');
                                    }}
                                />
                            </Box>
                        </Box>
                    )}
                </Box>
            )}

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
