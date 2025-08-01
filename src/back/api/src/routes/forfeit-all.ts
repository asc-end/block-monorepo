import { Request, Response, Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { AuthTokenClaims } from '@privy-io/server-auth';
import { prisma } from '../config';
import { forfeitService } from '../services/forfeitService';

const router = Router();

router.post('/', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    const userId = req.verifiedClaims?.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });
    
    const results = {
      focusSessions: { forfeited: 0, totalAmount: 0, errors: [] as string[] },
      routines: { forfeited: 0, totalAmount: 0, errors: [] as string[] }
    };

    // Get user's wallet address
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { walletAddress: true }
    });

    if (!user?.walletAddress) {
      return res.status(400).json({ error: 'User wallet address not found' });
    }

    // Get active focus sessions
    const activeFocusSessions = await prisma.focusSession.findMany({
      where: {
        userId,
        status: 'active'
      },
      include: {
        commitment: true
      }
    });

    // Forfeit each active focus session
    for (const session of activeFocusSessions) {
      try {
        // If session has commitment, forfeit it on-chain first
        if (session.commitment && session.commitment.status === 'active') {
          await forfeitService.forfeitCommitment(
            user.walletAddress,
            session.commitment.id // Use the commitment ID which is the PDA
          );

          // Update commitment status
          await prisma.commitment.update({
            where: { id: session.commitment.id },
            data: {
              status: 'forfeited',
              forfeitedAt: new Date()
            }
          });
        }

        // Update focus session status
        await prisma.focusSession.update({
          where: { id: session.id },
          data: { status: 'canceled' }
        });

        results.focusSessions.forfeited++;
        if (session.commitment?.amount) {
          results.focusSessions.totalAmount += Number(session.commitment.amount);
        }
      } catch (error) {
        results.focusSessions.errors.push(
          `Failed to forfeit session ${session.id}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    // Get active routines
    const activeRoutines = await prisma.routine.findMany({
      where: {
        userId,
        status: 'active'
      },
      include: {
        commitment: true
      }
    });

    // Forfeit each active routine
    for (const routine of activeRoutines) {
      try {
        // If routine has commitment, forfeit it on-chain
        if (routine.commitment && routine.commitment.status === 'active') {
          await forfeitService.forfeitCommitment(
            user.walletAddress,
            routine.commitment.id // Use the commitment ID which is the PDA
          );

          await prisma.commitment.update({
            where: { id: routine.commitment.id },
            data: {
              status: 'forfeited',
              forfeitedAt: new Date()
            }
          });
        }

        // Update routine status
        await prisma.routine.update({
          where: { id: routine.id },
          data: { status: 'canceled' }
        });

        results.routines.forfeited++;
        if (routine.commitment?.amount) {
          results.routines.totalAmount += Number(routine.commitment.amount);
        }
      } catch (error) {
        results.routines.errors.push(
          `Failed to forfeit routine ${routine.id}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    res.json({
      success: true,
      message: 'Forfeit all completed',
      results
    });
  } catch (error) {
    console.error('Error in forfeit-all:', error);
    res.status(500).json({ 
      error: 'Failed to forfeit all',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;