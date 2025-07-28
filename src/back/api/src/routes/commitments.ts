import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { AuthTokenClaims } from '@privy-io/server-auth';
import { prisma } from '../config';
import {AUTHORITY} from "@blockit/shared"

const router = express.Router();

interface CreateCommitmentBody {
  routineId: string;
  userId: string;
  commitmentId: string;
  amount: number;
  unlockTime: string;
  signature: string;
}

/**
 * POST /commitments
 * Create a new commitment record linked to a routine
 */
router.post('/', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    const authenticatedUserId = req.verifiedClaims?.userId;
    if (!authenticatedUserId) return res.status(401).json({ error: 'User not authenticated' });

    const {
      routineId,
      userId,
      commitmentId,
      amount,
      unlockTime,
      signature
    }: CreateCommitmentBody = req.body;

    // Validate that the authenticated user matches the userId in the request
    if (authenticatedUserId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to create commitment for another user' });
    }

    // Validate required fields
    if (!routineId || !commitmentId || !amount || !unlockTime || !signature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify the routine exists and belongs to the user
    const routine = await prisma.routine.findFirst({
      where: {
        id: routineId,
        userId: authenticatedUserId
      }
    });

    if (!routine) {
      return res.status(404).json({ error: 'Routine not found or does not belong to user' });
    }

    // Get user's wallet address
    const user = await prisma.user.findUnique({
      where: { id: authenticatedUserId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the commitment record
    const commitment = await prisma.commitment.create({
      data: {
        id: commitmentId,
        userId: authenticatedUserId,
        userPubkey: user.walletAddress,
        amount: BigInt(amount * 1e9), // Convert SOL to lamports
        unlockTime: new Date(unlockTime),
        createdAt: new Date(),
        authorityPubkey: AUTHORITY,
        status: 'active',
        txSignature: signature,
        routineId
      }
    });

    // Convert BigInt to string for JSON serialization
    const serializedCommitment = {
      ...commitment,
      amount: commitment.amount.toString()
    };

    res.status(201).json(serializedCommitment);
  } catch (error) {
    console.error('Error creating commitment:', error);
    res.status(500).json({ error: 'Failed to create commitment' });
  }
});

/**
 * GET /commitments
 * Get all commitments for the authenticated user
 */
router.get('/', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    const userId = req.verifiedClaims?.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });

    const commitments = await prisma.commitment.findMany({
      where: { userId },
      include: {
        routine: true,
        focusSession: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Convert BigInt to string for JSON serialization
    const serializedCommitments = commitments.map(commitment => ({
      ...commitment,
      amount: commitment.amount.toString()
    }));

    res.json(serializedCommitments);
  } catch (error) {
    console.error('Error fetching commitments:', error);
    res.status(500).json({ error: 'Failed to fetch commitments' });
  }
});

/**
 * GET /commitments/:id
 * Get a specific commitment
 */
router.get('/:id', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    const userId = req.verifiedClaims?.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });

    const { id } = req.params;

    const commitment = await prisma.commitment.findFirst({
      where: {
        id,
        userId
      },
      include: {
        routine: true,
        focusSession: true
      }
    });

    if (!commitment) {
      return res.status(404).json({ error: 'Commitment not found' });
    }

    // Convert BigInt to string for JSON serialization
    const serializedCommitment = {
      ...commitment,
      amount: commitment.amount.toString()
    };

    res.json(serializedCommitment);
  } catch (error) {
    console.error('Error fetching commitment:', error);
    res.status(500).json({ error: 'Failed to fetch commitment' });
  }
});

export default router;