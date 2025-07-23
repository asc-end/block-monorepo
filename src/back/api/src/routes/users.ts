import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { AuthTokenClaims } from '@privy-io/server-auth';
import { prisma } from '../config';

const router = express.Router();

/**
 * GET /users/verify
 * Verifies that the provided auth token is valid.
 * Returns 200 OK if valid, 401 if not.
 */
router.get('/verify', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  const claims = req.verifiedClaims;
  if (!claims) return res.status(401).json({ message: 'Authentication failed' });

  res.status(200).json({ userId: claims.userId, appId: claims.appId });
});


router.post('/create',authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
      const { walletAddress, theme, timezone } = req.body;
      console.log("walletAddress", walletAddress)
      const userId = req.verifiedClaims?.userId;
      if (!userId) return res.status(401).json({ error: 'User not authenticated' });
      if (!walletAddress) return res.status(400).json({ error: 'Missing required fields' });

      console.log("userId", userId, walletAddress)
      const user = await prisma.user.upsert({
          where: {
              id: userId
          },
          update: {
              theme: theme || undefined,
              timezone: timezone || undefined
          },
          create: {
              id: userId,
              walletAddress,
              theme: theme || 'system',
              timezone: timezone || 'UTC'
          }
      });

      res.status(200).json(user);
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
  }
});

router.get('/me', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
      const userId = req.verifiedClaims?.userId;
      if (!userId) return res.status(401).json({ error: 'User not authenticated' });
      
      const user = await prisma.user.findUnique({ where: { id: userId }});
      if (!user) return res.status(404).json({ error: 'User not found' });

      res.status(200).json(user);
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.put('/profile', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
      const { theme, timezone } = req.body;
      const userId = req.verifiedClaims?.userId;
      if (!userId) {
          return res.status(401).json({ error: 'User not authenticated' });
      }

      // Validate theme value
      const validThemes = ['system', 'dark', 'light'];
      if (theme && !validThemes.includes(theme)) {
          return res.status(400).json({ error: 'Invalid theme value. Must be one of: system, dark, light' });
      }

      // Validate timezone value (basic check - you might want to use a library like moment-timezone for full validation)
      if (timezone && typeof timezone !== 'string') {
          return res.status(400).json({ error: 'Invalid timezone value' });
      }

      const user = await prisma.user.update({
          where: { id: userId },
          data: {
              theme: theme || undefined,
              timezone: timezone || undefined
          }
      });

      res.status(200).json(user);
  } catch (error) {
      console.error('Error updating user profile:', error);
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
          return res.status(404).json({ error: 'User not found' });
      }
      res.status(500).json({ error: 'Failed to update user profile' });
  }
});

/**
 * GET /users/stats
 * Get user statistics for routines and focus sessions
 */
router.get('/stats', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    const userId = req.verifiedClaims?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Get routine statistics
    const routineStats = await prisma.routine.groupBy({
      by: ['status'],
      where: { userId },
      _count: true
    });

    const routinesCompleted = routineStats.find(s => s.status === 'completed')?._count || 0;
    const routinesCanceled = routineStats.find(s => s.status === 'canceled')?._count || 0;

    // Get focus session statistics
    const focusSessionStats = await prisma.focusSession.groupBy({
      by: ['status'],
      where: { userId },
      _count: true
    });

    const focusSessionsCompleted = focusSessionStats.find(s => s.status === 'finished')?._count || 0;
    const focusSessionsCanceled = focusSessionStats.find(s => s.status === 'canceled')?._count || 0;

    // Calculate total staked amount
    const totalStakedResult = await prisma.routine.aggregate({
      where: { userId },
      _sum: {
        stakeAmount: true
      }
    });
    const totalStaked = totalStakedResult._sum.stakeAmount || 0;

    // Calculate total lost (from canceled routines with stakes)
    const totalLostResult = await prisma.routine.aggregate({
      where: { 
        userId,
        status: 'canceled',
        stakeAmount: {
          gt: 0
        }
      },
      _sum: {
        stakeAmount: true
      }
    });
    const totalLost = totalLostResult._sum.stakeAmount || 0;

    res.json({
      routinesCompleted,
      routinesCanceled,
      focusSessionsCompleted,
      focusSessionsCanceled,
      totalStaked,
      totalLost
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user statistics' });
  }
});

export default router;
