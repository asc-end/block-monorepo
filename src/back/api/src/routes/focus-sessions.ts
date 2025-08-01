import { Request, Response, Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { AuthTokenClaims } from '@privy-io/server-auth';
import { wsManager } from '../services/init';
import { prisma } from '../config';
import { forfeitService } from '../services/forfeitService';
import { AUTHORITY } from '@blockit/shared';

const router = Router();

// Create a new focus session
router.post('/', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
    try {
        const { duration, commitment } = req.body;
        const userId = req.verifiedClaims?.userId;
        if (!userId) return res.status(401).json({ error: 'User not authenticated' });

        // Check if user already has an in-progress focus session
        const existingSession = await prisma.focusSession.findFirst({
            where: {
                userId,
                status: 'active',
            },
        });

        if (existingSession) return res.status(400).json({ error: 'You already have an active focus session.' });

        // Create session with commitment if provided
        let session;
        if (commitment) {
            // Validate commitment data
            const { commitmentId, amount, unlockTime, signature } = commitment;
            if (!commitmentId || !amount || !unlockTime || !signature) {
                return res.status(400).json({ error: 'Invalid commitment data' });
            }

            // Get user's wallet address
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { walletAddress: true }
            });

            if (!user?.walletAddress) {
                return res.status(400).json({ error: 'User wallet address not found' });
            }

            // Create session and commitment in a transaction
            session = await prisma.$transaction(async (tx) => {
                const newSession = await tx.focusSession.create({
                    data: {
                        userId,
                        startTime: new Date(),
                        duration,
                        status: 'active',
                    }
                });

                await tx.commitment.create({
                    data: {
                        id: commitmentId,
                        userPubkey: user.walletAddress,
                        authorityPubkey: AUTHORITY,
                        amount: BigInt(Math.floor(amount * 1e9)), // Convert SOL to lamports
                        unlockTime: new Date(unlockTime),
                        createdAt: new Date(),
                        txSignature: signature,
                        status: 'active',
                        userId,
                        focusSessionId: newSession.id
                    }
                });

                return tx.focusSession.findUnique({
                    where: { id: newSession.id },
                    include: { commitment: true }
                });
            });
        } else {
            // Create session without commitment
            session = await prisma.focusSession.create({
                data: {
                    userId,
                    startTime: new Date(),
                    duration,
                    status: 'active',
                },
                include: {
                    commitment: true
                }
            });
        }

        if (!session) {
            return res.status(500).json({ error: 'Failed to create focus session' });
        }

        // Serialize BigInt values for WebSocket and response
        const serializedSession = {
            ...session,
            commitment: session.commitment ? {
                ...session.commitment,
                amount: session.commitment.amount.toString()
            } : null
        };

        // Emit WebSocket message to notify clients about the new focus session
        wsManager.sendMessageToUser(userId, {
            type: 'FOCUS_SESSION_UPDATED',
            payload: { session: serializedSession, action: 'created' }
        });

        res.json(serializedSession);
    } catch (error) {
        console.error('Error creating focus session:', error);
        res.status(500).json({ error: 'Failed to create focus session' });
    }
});

// Disable a focus session
router.post('/:id/disable', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.verifiedClaims?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // First get the session with commitments
        const sessionToCancel = await prisma.focusSession.findFirst({
            where: { 
                id,
                userId,
                status: 'active'
            },
            include: {
                commitment: {
                    where: { status: 'active' }
                },
                user: true
            }
        });

        if (!sessionToCancel) {
            return res.status(404).json({ error: 'Active session not found' });
        }

        // Update session status
        const session = await prisma.focusSession.update({
            where: { id },
            data: {
                status: 'canceled',
            },
            include: {
                commitment: true
            }
        });

        // Forfeit the active commitment if it exists
        if (sessionToCancel.commitment) {
            try {
                // Execute on-chain forfeit
                const signature = await forfeitService.forfeitCommitment(
                    sessionToCancel.user.walletAddress,
                    sessionToCancel.commitment.id
                );
                
                // Update commitment status in database
                await prisma.commitment.update({
                    where: { id: sessionToCancel.commitment.id },
                    data: {
                        status: 'forfeited',
                        forfeitedAt: new Date()
                    }
                });
            } catch (error) {
                console.error(`Failed to forfeit commitment ${sessionToCancel.commitment.id}:`, error);
            }
        }

        // Serialize BigInt values for WebSocket and response
        const serializedSession = {
            ...session,
            commitment: session.commitment ? {
                ...session.commitment,
                amount: session.commitment.amount.toString()
            } : null
        };

        // Emit WebSocket message to notify clients about the disabled focus session
        wsManager.sendMessageToUser(userId, {
            type: 'FOCUS_SESSION_UPDATED',
            payload: { session: serializedSession, action: 'disabled' }
        });

        res.json(serializedSession);
    } catch (error) {
        console.error('Error disabling focus session:', error);
        res.status(500).json({ error: 'Failed to disable focus session' });
    }
});

// Complete a focus session
router.post('/:id/complete', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.verifiedClaims?.userId;
        if (!userId) return res.status(401).json({ error: 'User not authenticated' });

        const session = await prisma.focusSession.update({
            where: { 
                id,
                userId,
                status: 'active'
            },
            data: {
                status: 'completed',
            },
            include: {
                commitment: true
            }
        });

        // Note: Just like routines, commitments will have an unlock time
        // For focus sessions, the unlock time is startTime + duration
        // Users can claim their commitments after the unlock time passes

        // Serialize BigInt values for WebSocket and response
        const serializedSession = {
            ...session,
            commitment: session.commitment ? {
                ...session.commitment,
                amount: session.commitment.amount.toString()
            } : null
        };

        // Emit WebSocket message to notify clients about the completed focus session
        wsManager.sendMessageToUser(userId, {
            type: 'FOCUS_SESSION_UPDATED',
            payload: { session: serializedSession, action: 'completed' }
        });

        res.json(serializedSession);
    } catch (error) {
        console.error('Error completing focus session:', error);
        res.status(500).json({ error: 'Failed to complete focus session' });
    }
});

// Get user's focus sessions
router.get('/', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
    try {
        const userId = req.verifiedClaims?.userId;

        console.log(userId)
        // First, update any expired active focus sessions to completed
        const now = new Date();
        const expiredSessions = await prisma.focusSession.findMany({
            where: {
                userId,
                status: 'active',
                startTime: {
                    lte: new Date(now.getTime() - 24 * 60 * 60 * 1000) // Sessions older than 24 hours
                }
            }
        });

        console.log(expiredSessions)

        // Update expired sessions to completed
        for (const session of expiredSessions) {
            const endTime = new Date(session.startTime.getTime() + session.duration * 60 * 1000);
            if (endTime <= now) {
                await prisma.focusSession.update({
                    where: { id: session.id },
                    data: { status: 'completed' }
                });
            }
        }

        const sessions = await prisma.focusSession.findMany({
            where: { userId },
            orderBy: { startTime: 'desc' },
            include: {
                commitment: true
            }
        });

        console.log(sessions)

        // Convert BigInt values to strings for JSON serialization
        const serializedSessions = sessions.map(session => ({
            ...session,
            commitment: session.commitment ? {
                ...session.commitment,
                amount: session.commitment.amount.toString()
            } : null
        }));

        res.json(serializedSessions);
    } catch (error) {
        console.error('Error fetching focus sessions:', error);
        res.status(500).json({ error: 'Failed to fetch focus sessions' });
    }
});

// Get active focus session
router.get('/active', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
    try {
        const userId = req.verifiedClaims?.userId;

        const session = await prisma.focusSession.findFirst({
            where: {
                userId,
                status: 'active',
            },
            include: {
                commitment: true
            }
        });

        if (!session) {
            return res.json(null);
        }

        // Check if the session has expired
        const now = new Date();
        const endTime = new Date(session.startTime.getTime() + session.duration * 60 * 1000);
        
        if (endTime <= now) {
            // Mark the session as completed
            const updatedSession = await prisma.focusSession.update({
                where: { id: session.id },
                data: { status: 'completed' },
                include: {
                    commitment: true
                }
            });

            // Emit WebSocket message to notify clients
            const serializedSession = {
                ...updatedSession,
                commitment: updatedSession.commitment ? {
                    ...updatedSession.commitment,
                    amount: updatedSession.commitment.amount.toString()
                } : null
            };

            if (userId) {
                wsManager.sendMessageToUser(userId, {
                    type: 'FOCUS_SESSION_UPDATED',
                    payload: { session: serializedSession, action: 'completed' }
                });
            }

            return res.json(null); // No active session anymore
        }

        // Convert BigInt values to strings for JSON serialization
        const serializedSession = {
            ...session,
            commitment: session.commitment ? {
                ...session.commitment,
                amount: session.commitment.amount.toString()
            } : null
        };

        res.json(serializedSession);
    } catch (error) {
        console.error('Error fetching active focus session:', error);
        res.status(500).json({ error: 'Failed to fetch active focus session' });
    }
});

export default router; 