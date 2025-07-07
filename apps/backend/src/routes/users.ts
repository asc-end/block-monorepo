import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { AuthTokenClaims } from '@privy-io/server-auth';

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

export default router;
