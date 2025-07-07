import { Request, Response, NextFunction } from 'express';
import { AuthTokenClaims } from '@privy-io/server-auth';
import { privy } from '../config';

export const authMiddleware = async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers.authorization?.split(' ')[1];
        // console.log(authToken)
        if (!authToken) return res.status(401).json({ message: 'Authentication token required' });
        
        const verifiedClaims = await privy.verifyAuthToken(authToken);
        if (!verifiedClaims) return res.status(401).json({ message: 'Invalid authentication token' });
        req.verifiedClaims = verifiedClaims;
        next();
    } catch (error) {
        console.log(`Token verification failed with error ${error}.`);
        return res.status(401).json({ message: 'Authentication failed' });
    }
}