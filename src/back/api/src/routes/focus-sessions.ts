import { Request, Response, Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { AuthTokenClaims } from '@privy-io/server-auth';
import { wsManager } from '../services/init';
import { prisma } from '../config';

const router = Router();

// Create a new focus session
router.post('/', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
    try {
        const { duration } = req.body;
        const userId = req.verifiedClaims?.userId;
        if (!userId) return res.status(401).json({ error: 'User not authenticated' });

        // Check if user already has an in-progress focus session
        const existingSession = await prisma.focusSession.findFirst({
            where: {
                userId,
                status: 'in_progress',
            },
        });

        if (existingSession) return res.status(400).json({ error: 'You already have an active focus session.' });

        const session = await prisma.focusSession.create({
            data: {
                userId,
                startTime: new Date(),
                duration,
                status: 'in_progress',
            },
        });

        // Emit WebSocket message to notify clients about the new focus session
        wsManager.sendMessageToUser(userId, {
            type: 'FOCUS_SESSION_UPDATED',
            payload: { session, action: 'created' }
        });

        res.json(session);
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

        const session = await prisma.focusSession.update({
            where: { 
                id,
                userId,
                status: 'in_progress'
            },
            data: {
                status: 'canceled',
            },
        });

        // Emit WebSocket message to notify clients about the disabled focus session
        wsManager.sendMessageToUser(userId, {
            type: 'FOCUS_SESSION_UPDATED',
            payload: { session, action: 'disabled' }
        });

        res.json(session);
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
                status: 'in_progress'
            },
            data: {
                status: 'finished',
            },
        });

        // Emit WebSocket message to notify clients about the completed focus session
        wsManager.sendMessageToUser(userId, {
            type: 'FOCUS_SESSION_UPDATED',
            payload: { session, action: 'completed' }
        });

        res.json(session);
    } catch (error) {
        console.error('Error completing focus session:', error);
        res.status(500).json({ error: 'Failed to complete focus session' });
    }
});

// Get user's focus sessions
router.get('/', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
    try {
        const userId = req.verifiedClaims?.userId;

        const sessions = await prisma.focusSession.findMany({
            where: { userId },
            orderBy: { startTime: 'desc' },
        });

        res.json(sessions);
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
                status: 'in_progress',
            },
        });

        res.json(session);
    } catch (error) {
        console.error('Error fetching active focus session:', error);
        res.status(500).json({ error: 'Failed to fetch active focus session' });
    }
});

export default router; 