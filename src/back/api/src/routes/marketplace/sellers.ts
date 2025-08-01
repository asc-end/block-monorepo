import { Router, Request, Response } from 'express';
import { PublicKey, Connection } from '@solana/web3.js';
import { Program, AnchorProvider, BN, Wallet } from '@coral-xyz/anchor';
import { AuthTokenClaims } from '@privy-io/server-auth';
import { marketplacePDAs, MARKETPLACE_PROGRAM_ID, calculateDataPassPayment } from '@blockit/shared';
import { authMiddleware } from '../../middleware/auth';
import { prisma } from '../../config';

const router = Router();



// /**
//  * GET /marketplace/seller/claims/:seller/:periodId
//  * Get merkle proof for a seller to claim revenue
//  */
// router.get('/claims/:seller/:periodId', authMiddleware, async (req: Request, res: Response) => {
//   try {
//     const { seller, periodId } = req.params;
    
//     // Validate seller address
//     let sellerPubkey: PublicKey;
//     try {
//       sellerPubkey = new PublicKey(seller);
//     } catch (e) {
//       return res.status(400).json({ error: 'Invalid seller address' });
//     }

//     // Get proof from database
//     const proof = await prisma.sellerProof.findUnique({
//       where: {
//         sellerAddress_periodId: {
//           sellerAddress: seller,
//           periodId: BigInt(periodId)
//         }
//       }
//     });

//     if (!proof) return res.status(404).json({ error: 'No proof found for this seller and period' });

//     // Check if already claimed
//     if (proof.claimed) {
//       return res.status(400).json({ 
//         error: 'Revenue already claimed',
//         claimedAt: proof.claimedAt
//       });
//     }

//     res.json({
//       amount: proof.amount.toString(),
//       proof: proof.proof as number[][],
//       periodId: proof.periodId.toString()
//     });
//   } catch (error) {
//     console.error('Error getting claim proof:', error);
//     res.status(500).json({ error: 'Failed to get claim proof' });
//   }
// });


/**
 * GET /marketplace/seller/listings
 * Get all active listings with optional filters
 */
router.get('/listings', async (req: Request, res: Response) => {
  try {
    const { minPrice, maxPrice, active } = req.query;
    
    // Build where clause
    const where: any = {
      endDate: {
        gte: new Date()
      }
    };

    // Only filter by isActive if explicitly set
    if (active !== undefined) {
      where.isActive = active === 'true';
    }

    // Add price filters if provided
    if (minPrice || maxPrice) {
      where.pricePerDay = {};
      if (minPrice) where.pricePerDay.gte = minPrice.toString();
      if (maxPrice) where.pricePerDay.lte = maxPrice.toString();
    }

    // Get all listings with seller information
    const listings = await prisma.dataListing.findMany({
      where,
      include: {
        seller: true
      }
    });

    res.json(listings);
  } catch (error) {
    console.error('Error getting listings:', error);
    res.status(500).json({ error: 'Failed to get listings' });
  }
});

/**
 * GET /marketplace/seller/:seller
 * Get seller's dashboard data including earnings and listing stats from indexed data
 */
router.get('/:seller', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  try {
    console.log('Getting seller dashboard for:', req.params);
    const { seller } = req.params;
    const userId = req.verifiedClaims?.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });

    // Get user's wallet address
    const user = await prisma.user.findUnique({ where: { id: userId }});
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.walletAddress !== seller) return res.status(403).json({ error: 'Unauthorized to access this data' });

    // Get seller data from indexed database
    const sellerData = await prisma.dataSeller.findUnique({
      where: { sellerAddress: seller },
      include: {
        listing: true,
        proofs: true
      }
    });

    // Calculate total days of data sold
    let totalDaysSold = 0;
    let pendingApprovalDays = 0;

    if (sellerData?.listing) {
      const now = new Date();
      const startTime = new Date(Math.max(sellerData.listing.startDate.getTime(), sellerData.listing.updatedAt.getTime()));
      totalDaysSold = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24));
      
      // Pending approval is the number of days from today until the end of the listing
      if (sellerData?.listing && sellerData.listing.endDate) {
        const now = new Date();
        const endDate = new Date(sellerData.listing.endDate);
        pendingApprovalDays = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
      }
    
    }

    // Convert SOL amounts from lamports to SOL (divide by 10^9)
    const totalEarnings = sellerData?.totalRevenue ? (BigInt(sellerData.totalRevenue) / BigInt(1000000000)).toString() : '0';
    const pendingEarnings = sellerData?.unclaimedRevenue !== undefined ? (BigInt(sellerData.unclaimedRevenue) / BigInt(1000000000)).toString(): '0';
    const claimedEarnings = sellerData ? ((BigInt(sellerData.totalRevenue || 0) - BigInt(sellerData.unclaimedRevenue || 0)) / BigInt(1000000000)).toString() : '0';

    const response = {
      earnings: {
        total: totalEarnings,
        pending: pendingEarnings,
        claimed: claimedEarnings,
      },
      proofs: sellerData?.proofs || [],
      listing: sellerData?.listing || null
    };
    
    console.log('Seller dashboard response:', response);
    res.json(response);
  } catch (error) {
    console.error('Error getting seller dashboard:', error);
    res.status(500).json({ error: 'Failed to get dashboard data' });
  }
});

export default router;