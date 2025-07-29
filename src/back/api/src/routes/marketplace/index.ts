import { Request, Response, Router } from "express";
import { prisma } from "../../config";

const router = Router();


/**
 * GET /api/marketplace/stats
 * Get marketplace statistics
 */
router.get('/stats', async (req: Request, res: Response) => {
    try {
        const config = await prisma.marketplaceConfig.findFirst();
        res.json(config);
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({ error: 'Failed to get stats' });
    }
});

export default router;