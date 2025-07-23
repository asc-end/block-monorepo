import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { AuthTokenClaims } from '@privy-io/server-auth';
import { prisma } from '../config';

const router = express.Router();

/**
 * GET /apps
 * Get all apps from the database
 */
router.get('/', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    const userId = req.verifiedClaims?.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });

    const apps = await prisma.app.findMany({
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    });

    res.json(apps);
  } catch (error) {
    console.error('Error fetching apps:', error);
    res.status(500).json({ error: 'Failed to fetch apps' });
  }
});

/**
 * POST /apps
 * Create a new app (for user-submitted apps)
 */
router.post('/', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    const userId = req.verifiedClaims?.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });

    const { name, domain, packageName, icon } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'App name is required' });
    }

    // Check if app already exists
    if (packageName) {
      const existingApp = await prisma.app.findFirst({
        where: {
          OR: [
            { androidPackageName: packageName },
            { iosBundleId: packageName }
          ]
        }
      });

      if (existingApp) {
        return res.json(existingApp);
      }
    }

    if (domain) {
      const existingApp = await prisma.app.findFirst({
        where: {
          domains: {
            has: domain
          }
        }
      });

      if (existingApp) {
        return res.json(existingApp);
      }
    }

    // Create new app
    const newApp = await prisma.app.create({
      data: {
        name,
        icon,
        domains: domain ? [domain] : [],
        androidPackageName: packageName && packageName.includes('.') ? packageName : null,
        iosBundleId: packageName && !packageName.includes('.') ? packageName : null,
        isUserSubmitted: true,
        category: 'Other'
      }
    });

    res.status(201).json(newApp);
  } catch (error) {
    console.error('Error creating app:', error);
    res.status(500).json({ error: 'Failed to create app' });
  }
});

export default router;