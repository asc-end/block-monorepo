import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { AuthTokenClaims } from '@privy-io/server-auth';
import { prisma } from '../config';
import { RoutineStatus, TimeMode } from '@prisma/client';
import { forfeitService } from '../services/forfeitService';

const router = express.Router();

interface CreateRoutineBody {
  name: string;
  emoji: string;
  timeMode: TimeMode;
  selectedDays: string[];
  startTime?: string;
  endTime?: string;
  dailyLimit?: number;
  endDate?: string;
  stakeAmount: number;
  blockedApps: Array<{
    packageName: string;
    appName: string;
    icon?: string;
  }>;
}

/**
 * POST /routines
 * Create a new routine
 */
router.post('/', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    const userId = req.verifiedClaims?.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });
    console.log("create routine")
    console.log("req.body", req.body)
    const {
      name,
      emoji,
      timeMode,
      selectedDays,
      startTime,
      endTime,
      dailyLimit,
      endDate,
      stakeAmount,
      blockedApps
    }: CreateRoutineBody = req.body;

    // Validate required fields
    if (!name || !timeMode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Default to all days if none selected
    const days = selectedDays && selectedDays.length > 0
      ? selectedDays
      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Validate time mode specific fields
    if (timeMode === 'blocking' && (!startTime || !endTime)) {
      return res.status(400).json({ error: 'Start time and end time are required for blocking mode' });
    }
    if (timeMode === 'limit' && !dailyLimit) {
      return res.status(400).json({ error: 'Daily limit is required for limit mode' });
    }

    // Process blocked apps - find or create App records
    const appConnections = [];
    for (const app of blockedApps) {
      let appRecord = await prisma.app.findFirst({
        where: {
          OR: [
            { androidPackageName: app.packageName },
            { iosBundleId: app.packageName }
          ]
        }
      });

      if (!appRecord) {
        // Create new app record for unknown app
        appRecord = await prisma.app.create({
          data: {
            name: app.appName,
            icon: app.icon,
            androidPackageName: app.packageName.includes('.') ? app.packageName : null,
            iosBundleId: !app.packageName.includes('.') ? app.packageName : null,
            isUserSubmitted: true,
            domains: []
          }
        });
      }

      appConnections.push({ appId: appRecord.id });
    }

    // Create routine with connected apps
    const routine = await prisma.routine.create({
      data: {
        userId,
        name,
        emoji,
        timeMode,
        selectedDays: days,
        startTime,
        endTime,
        dailyLimit,
        endDate: endDate ? new Date(endDate) : null,
        stakeAmount,
        blockedApps: {
          create: appConnections
        }
      },
      include: {
        blockedApps: {
          include: {
            app: true
          }
        }
      }
    });

    res.status(201).json(routine);
  } catch (error) {
    console.error('Error creating routine:', error);
    res.status(500).json({ error: 'Failed to create routine' });
  }
});

/**
 * GET /routines/current
 * Get all current (active/paused) routines for the authenticated user
 */
router.get('/current', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    const userId = req.verifiedClaims?.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });

    // First, update any expired routines that are still active
    const now = new Date();
    await prisma.routine.updateMany({
      where: {
        userId,
        status: 'active',
        endDate: {
          not: null,
          lt: now
        }
      },
      data: {
        status: 'completed'
      }
    });

    // Get only active and paused routines
    const routines = await prisma.routine.findMany({
      where: {
        userId,
        status: {
          in: ['active', 'paused']
        }
      },
      include: {
        blockedApps: {
          include: {
            app: true
          }
        },
        commitments: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Serialize BigInt values in commitments
    const serializedRoutines = routines.map(routine => ({
      ...routine,
      commitments: routine.commitments.map(commitment => ({
        ...commitment,
        amount: commitment.amount.toString()
      }))
    }));

    res.json(serializedRoutines);
  } catch (error) {
    console.error('Error fetching current routines:', error);
    res.status(500).json({ error: 'Failed to fetch current routines' });
  }
});

/**
 * GET /routines
 * Get all routines for the authenticated user
 */
router.get('/', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    const userId = req.verifiedClaims?.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });


    // First, update any expired routines that are still active
    const now = new Date();
    await prisma.routine.updateMany({
      where: {
        userId,
        status: 'active',
        endDate: {
          not: null,
          lt: now
        }
      },
      data: {
        status: 'completed'
      }
    });

    const routines = await prisma.routine.findMany({
      where: { userId },
      include: {
        blockedApps: {
          include: {
            app: true
          }
        },
        commitments: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Serialize BigInt values in commitments if any routines have them
    const serializedRoutines = routines.map(routine => ({
      ...routine,
      commitments: routine.commitments.map(commitment => ({
        ...commitment,
        amount: commitment.amount.toString()
      }))
    }));

    res.json(serializedRoutines);
  } catch (error) {
    console.error('Error fetching routines:', error);
    res.status(500).json({ error: 'Failed to fetch routines' });
  }
});

/**
 * GET /routines/:id
 * Get a specific routine
 */
router.get('/:id', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    const userId = req.verifiedClaims?.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });

    const { id } = req.params;

    // First check if this specific routine needs to be updated
    const now = new Date();
    await prisma.routine.updateMany({
      where: {
        id,
        userId,
        status: 'active',
        endDate: {
          not: null,
          lt: now
        }
      },
      data: {
        status: 'completed'
      }
    });

    const routine = await prisma.routine.findFirst({
      where: {
        id,
        userId
      },
      include: {
        blockedApps: {
          include: {
            app: true
          }
        },
        commitments: true
      }
    });

    if (!routine) {
      return res.status(404).json({ error: 'Routine not found' });
    }

    // Serialize BigInt values in commitments
    const serializedRoutine = {
      ...routine,
      commitments: routine.commitments.map(commitment => ({
        ...commitment,
        amount: commitment.amount.toString()
      }))
    };

    res.json(serializedRoutine);
  } catch (error) {
    console.error('Error fetching routine:', error);
    res.status(500).json({ error: 'Failed to fetch routine' });
  }
});

/**
 * PUT /routines/:id/status
 * Update routine status (pause, resume, complete, cancel)
 * If canceling, forfeit any active commitments
 */
router.put('/:id/status', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    const userId = req.verifiedClaims?.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });

    const { id } = req.params;
    const { status }: { status: RoutineStatus } = req.body;

    if (!status || !['active', 'paused', 'completed', 'canceled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Fetch routine with commitments and user info
    const routine = await prisma.routine.findFirst({
      where: { id, userId },
      include: {
        commitments: true,
        user: true
      }
    });

    if (!routine) return res.status(404).json({ error: 'Routine not found' });

    let txPassed = true
    // If canceling the routine, forfeit any active commitments
    if (status === 'canceled' && routine.commitments.length > 0) {
      for (const commitment of routine.commitments) {
        if (commitment.status === 'active') {
          try {
            console.log(`Forfeiting commitment ${commitment.id} for routine ${id}`);

            // Convert the commitment ID to the format expected by the contract
            const commitmentIdNumber = parseInt(commitment.id) || commitment.id;

            // Forfeit on-chain
            const signature = await forfeitService.forfeitCommitment(
              routine.user.walletAddress,
              commitmentIdNumber
            );

            // Update commitment status in database
            await prisma.commitment.update({
              where: { id: commitment.id },
              data: {
                status: 'forfeited',
                forfeitedAt: new Date(),
                txSignature: signature
              }
            });

            console.log(`Commitment ${commitment.id} forfeited successfully. Tx: ${signature}`);
          } catch (error) {
            txPassed = false
            console.error(`Failed to forfeit commitment ${commitment.id}:`, error);
          }
        }
      }
    }
    if(!txPassed) throw new Error("Failed to forfeit commitment");

    // Update routine status
    const updatedRoutine = await prisma.routine.update({
      where: { id },
      data: { status },
      include: {
        blockedApps: {
          include: {
            app: true
          }
        },
        commitments: true
      }
    });

    // Serialize BigInt values in commitments
    const serializedRoutine = {
      ...updatedRoutine,
      commitments: updatedRoutine.commitments.map(commitment => ({
        ...commitment,
        amount: commitment.amount.toString()
      }))
    };

    res.json(serializedRoutine);
  } catch (error) {
    console.error('Error updating routine status:', error);
    res.status(500).json({ error: 'Failed to update routine status' });
  }
});

/**
 * DELETE /routines/:id
 * Delete a routine
 * - Can ONLY delete if routine has a stake amount but NO commitments
 * - This handles the case where commitment transaction failed
 */
router.delete('/:id', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    const userId = req.verifiedClaims?.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });

    const { id } = req.params;

    // Fetch routine with commitments
    const routine = await prisma.routine.findFirst({
      where: { id, userId },
      include: {
        commitments: true
      }
    });

    if (!routine) {
      return res.status(404).json({ error: 'Routine not found' });
    }

    // Only allow deletion if there's a stake amount but NO commitments
    // (This means the commitment transaction failed)
    if (routine.stakeAmount > 0 && routine.commitments.length === 0) {
      await prisma.routine.delete({
        where: { id }
      });
      res.status(204).send();
    } else if (routine.stakeAmount === 0) {
      // No stake amount, cannot delete
      return res.status(400).json({
        error: 'Cannot delete routine without stake amount'
      });
    } else {
      // Has commitments, cannot delete
      return res.status(400).json({
        error: 'Cannot delete routine with active commitments'
      });
    }
  } catch (error) {
    console.error('Error deleting routine:', error);
    res.status(500).json({ error: 'Failed to delete routine' });
  }
});

export default router;