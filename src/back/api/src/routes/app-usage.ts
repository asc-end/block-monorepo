import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { AuthTokenClaims } from '@privy-io/server-auth';
import { prisma } from '../config';
import { getCanonicalName } from '@blockit/shared';
const router = Router();

interface AppUsageRequest extends Request {
    verifiedClaims?: AuthTokenClaims;
    body: {
        appName: string;
        timeSpent: number;
        platform: "mobile" | "web";
        hourStart: string; // ISO string for hour start
    };
}

// Record hourly app usage time
router.post('/hourly', authMiddleware, async (req: AppUsageRequest & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
    try {
        const userId = req.verifiedClaims?.userId;
        if (!userId) return res.status(401).json({ error: 'User not authenticated' });

        const { appName, timeSpent, platform, hourStart } = req.body;

        if (!appName || typeof timeSpent !== 'number' || !platform || !hourStart) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Parse and validate hour start time
        const hourStartDate = new Date(hourStart);
        hourStartDate.setMinutes(0, 0, 0); // Ensure it's at the start of the hour

        // Get canonical app name based on platform
        const canonicalAppName = getCanonicalName(appName,  platform )

        // Upsert the app usage for this hour
        // Use increment to properly accumulate time instead of replacing
        const appUsage = await prisma.appUsage.upsert({
            where: {
                userId_appName_platform_hourStart: {
                    userId,
                    appName: canonicalAppName,
                    platform,
                    hourStart: hourStartDate
                }
            },
            update: {
                timeSpent: {
                    increment: timeSpent
                }
            },
            create: {
                userId,
                appName: canonicalAppName,
                platform,
                timeSpent,
                hourStart: hourStartDate
            }
        });

        res.status(200).json(appUsage);
    } catch (error) {
        console.error('Error recording hourly app usage:', error);
        res.status(500).json({ error: 'Failed to record hourly app usage' });
    }
});


interface AppUsageStatsRequest extends Request {
    verifiedClaims?: AuthTokenClaims;
    query: {
        startDate?: string;
        endDate?: string;
    };
}

// Set hourly app usage time (replaces instead of incrementing)
router.post('/hourly-set', authMiddleware, async (req: AppUsageRequest & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
    try {
        const userId = req.verifiedClaims?.userId;
        if (!userId) return res.status(401).json({ error: 'User not authenticated' });

        const { appName, timeSpent, platform, hourStart } = req.body;

        if (!appName || typeof timeSpent !== 'number' || !platform || !hourStart) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Parse and validate hour start time
        const hourStartDate = new Date(hourStart);
        hourStartDate.setMinutes(0, 0, 0); // Ensure it's at the start of the hour

        // Get canonical app name based on platform
        const canonicalAppName = getCanonicalName(appName, platform)

        // Upsert the app usage for this hour
        // Use direct set instead of increment for absolute values
        const appUsage = await prisma.appUsage.upsert({
            where: {
                userId_appName_platform_hourStart: {
                    userId,
                    appName: canonicalAppName,
                    platform,
                    hourStart: hourStartDate
                }
            },
            update: {
                timeSpent: timeSpent
            },
            create: {
                userId,
                appName: canonicalAppName,
                platform,
                timeSpent,
                hourStart: hourStartDate
            }
        });

        res.status(200).json(appUsage);
    } catch (error) {
        console.error('Error setting hourly app usage:', error);
        res.status(500).json({ error: 'Failed to set hourly app usage' });
    }
});

router.get('/stats', authMiddleware, async (req: AppUsageStatsRequest & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
    try {
        const userId = req.verifiedClaims?.userId;
        if (!userId) return res.status(401).json({ error: 'User not authenticated' });

        const { startDate, endDate } = req.query;
        // Get timezone offset in minutes (e.g., -240 for UTC+4)
        const timezoneOffset = parseInt(req.query.timezoneOffset as string) || 0;

        console.log(startDate, endDate, 'Timezone offset:', timezoneOffset)

        // Get total time spent per app with date and platform grouping
        const appStats = await prisma.appUsage.groupBy({
            by: ['appName', 'hourStart', 'platform', 'timeSpent'],
            where: {
                userId,
                // ...(startDate && endDate ? {
                    hourStart: {
                        gte: startDate!,
                        lte: endDate!
                    }
                // } : {})
            },
            // orderBy: [
            //     {
            //         hourStart: 'asc'
            //     },
            // ]
        });
        // console.log(appStats)

        // Get unique app names from the stats
        const uniqueAppNames = [...new Set(appStats.map(stat => stat.appName))];
        
        // Fetch app icons for these apps
        const apps = await prisma.app.findMany({
            where: {
                OR: [
                    { name: { in: uniqueAppNames } },
                    { androidPackageName: { in: uniqueAppNames } },
                    { iosBundleId: { in: uniqueAppNames } }
                ]
            },
            select: {
                name: true,
                androidPackageName: true,
                iosBundleId: true,
                icon: true
            }
        });
        
        // Create a map of app names to icons
        const appIconMap: Record<string, string | null> = {};
        apps.forEach(app => {
            if (app.name) appIconMap[app.name] = app.icon;
            if (app.androidPackageName) appIconMap[app.androidPackageName] = app.icon;
            if (app.iosBundleId) appIconMap[app.iosBundleId] = app.icon;
        });

        // Transform the data into the nested structure with icons
        const formattedStats: Record<string, Record<string, { mobile: number, web: number, icon?: string | null }>> = {};

        appStats.forEach(stat => {
            // Convert UTC date to local date using timezone offset
            const localDate = new Date(stat.hourStart.getTime() - (timezoneOffset * 60 * 1000));
            const dateStr = localDate.toISOString().split('T')[0];
            
            if (!formattedStats[dateStr]) {
                formattedStats[dateStr] = {};
            }
            if (!formattedStats[dateStr][stat.appName]) {
                formattedStats[dateStr][stat.appName] = {
                    web: 0,
                    mobile: 0,
                    icon: appIconMap[stat.appName] || null
                }
            }
            formattedStats[dateStr][stat.appName][stat.platform] += stat.timeSpent ?? 0;
        });

        // console.log(appStats)
        res.status(200).json(formattedStats);
    } catch (error) {
        console.error('Error fetching app usage stats:', error);
        res.status(500).json({ error: 'Failed to fetch app usage statistics' });
    }
});

router.get('/hourly-stats', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
    try {
        const userId = req.verifiedClaims?.userId;
        if (!userId) return res.status(401).json({ error: 'User not authenticated' });
        
        // Get timezone offset in minutes (e.g., -240 for UTC+4)
        // Note: getTimezoneOffset returns the difference in minutes from UTC
        // Positive offset means behind UTC, negative means ahead of UTC
        const timezoneOffset = parseInt(req.query.timezoneOffset as string) || 0;
        

        const { date } = req.query;
        if (!date || typeof date !== 'string') {
            return res.status(400).json({ error: 'Date parameter required' });
        }

        // Parse the date and adjust for timezone
        // timezoneOffset is in minutes, positive means behind UTC
        // So for UTC+4, timezoneOffset would be -240
        const startDate = new Date(date);
        // Set to start of day in user's timezone, then convert to UTC
        startDate.setHours(0, 0, 0, 0);
        // Adjust for timezone offset to get UTC time
        startDate.setMinutes(startDate.getMinutes() + timezoneOffset);
        
        const endDate = new Date(date);
        // Set to end of day in user's timezone, then convert to UTC
        endDate.setHours(23, 59, 59, 999);
        // Adjust for timezone offset to get UTC time
        endDate.setMinutes(endDate.getMinutes() + timezoneOffset);

        // Get all hourly data for the specified date
        const hourlyStats = await prisma.appUsage.findMany({
            where: {
                userId,
                hourStart: {
                    gte: startDate,
                    lte: endDate
                }
            },
            orderBy: {
                hourStart: 'asc'
            }
        });

        // Transform into hourly breakdown
        const hourlyBreakdown: Record<number, Record<string, { mobile: number, web: number }>> = {};
        
        // Initialize all 24 hours
        for (let hour = 0; hour < 24; hour++) {
            hourlyBreakdown[hour] = {};
        }

        // Fill in the actual data
        hourlyStats.forEach(stat => {
            // Convert UTC hour to local hour
            // timezoneOffset is in minutes, negative for ahead of UTC
            const localDate = new Date(stat.hourStart);
            localDate.setMinutes(localDate.getMinutes() - timezoneOffset);
            const hour = localDate.getHours();
            
            if (!hourlyBreakdown[hour][stat.appName]) {
                hourlyBreakdown[hour][stat.appName] = {
                    mobile: 0,
                    web: 0
                };
            }
            hourlyBreakdown[hour][stat.appName][stat.platform] = stat.timeSpent;
        });

        res.status(200).json({
            date,
            hourlyBreakdown,
            totalStats: hourlyStats.reduce((acc, stat) => {
                if (!acc[stat.appName]) {
                    acc[stat.appName] = { mobile: 0, web: 0 };
                }
                acc[stat.appName][stat.platform] += stat.timeSpent;
                return acc;
            }, {} as Record<string, { mobile: number, web: number }>)
        });
    } catch (error) {
        console.error('Error fetching hourly app usage stats:', error);
        res.status(500).json({ error: 'Failed to fetch hourly app usage statistics' });
    }
});

export default router;