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

router.get('/stats', authMiddleware, async (req: AppUsageStatsRequest & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
    try {
        const userId = req.verifiedClaims?.userId;
        if (!userId) return res.status(401).json({ error: 'User not authenticated' });

        const { startDate, endDate } = req.query;

        console.log(startDate, endDate)

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

        // Transform the data into the nested structure
        const formattedStats: Record<string, Record<string, { mobile: number, web: number }>> = {};

        appStats.forEach(stat => {
            const dateStr = stat.hourStart.toISOString().split('T')[0];
            if (!formattedStats[dateStr]) {
                formattedStats[dateStr] = {};
            }
            if (!formattedStats[dateStr][stat.appName]) {
                formattedStats[dateStr][stat.appName] = {
                    web: 0,
                    mobile: 0
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
        

        const { date } = req.query;
        if (!date || typeof date !== 'string') {
            return res.status(400).json({ error: 'Date parameter required' });
        }

        // Parse the date and get start/end of day in UTC
        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);
        
        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999);

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
            const hour = stat.hourStart.getUTCHours();
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