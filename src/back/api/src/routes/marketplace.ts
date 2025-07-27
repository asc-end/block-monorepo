import { Router, Request, Response } from 'express';
import { PublicKey, Connection } from '@solana/web3.js';
import { Program, AnchorProvider, BN, Wallet } from '@coral-xyz/anchor';
import { authMiddleware } from '../middleware/auth';
import { marketplacePDAs, MARKETPLACE_PROGRAM_ID, calculateDataPassPayment } from '@blockit/shared';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import type { DataMarketplace } from '../../../programs/target/types/data_marketplace';
import IDL from '../../../programs/target/idl/data_marketplace.json';
import { DataPassService } from '../services/dataPassService';

const router = Router();

// Initialize connection and program
const connection = new Connection(process.env.RPC_URL || 'http://127.0.0.1:8899', 'confirmed');
const provider = new AnchorProvider(connection, {} as any, { commitment: 'confirmed' });
const program = new Program(IDL as DataMarketplace, provider);

// Initialize data pass service
let dataPassService: DataPassService;

// Initialize service on first request
router.use((req, res, next) => {
  if (!dataPassService) {
    dataPassService = new DataPassService(req.app.locals.prisma, connection);
  }
  next();
});

/**
 * GET /api/marketplace/claims/:seller/:periodId
 * Get merkle proof for a seller to claim revenue
 */
router.get('/claims/:seller/:periodId', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { seller, periodId } = req.params;
    
    // Validate seller address
    let sellerPubkey: PublicKey;
    try {
      sellerPubkey = new PublicKey(seller);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid seller address' });
    }

    // Get proof from database
    const proof = await req.app.locals.prisma.sellerProof.findUnique({
      where: {
        seller_address_period_id: {
          seller_address: seller,
          period_id: BigInt(periodId)
        }
      }
    });

    if (!proof) {
      return res.status(404).json({ error: 'No proof found for this seller and period' });
    }

    // Check if already claimed
    if (proof.claimed) {
      return res.status(400).json({ 
        error: 'Revenue already claimed',
        claimedAt: proof.claimedAt
      });
    }

    res.json({
      amount: proof.amount.toString(),
      proof: proof.proof as number[][],
      periodId: proof.periodId.toString()
    });
  } catch (error) {
    console.error('Error getting claim proof:', error);
    res.status(500).json({ error: 'Failed to get claim proof' });
  }
});

/**
 * POST /api/marketplace/claims/:seller/:periodId/mark-claimed
 * Mark a proof as claimed (called after successful on-chain claim)
 */
router.post('/claims/:seller/:periodId/mark-claimed', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { seller, periodId } = req.params;

    await req.app.locals.prisma.sellerProof.update({
      where: {
        seller_address_period_id: {
          seller_address: seller,
          period_id: BigInt(periodId)
        }
      },
      data: {
        claimed: true,
        claimedAt: new Date()
      }
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error marking claim:', error);
    res.status(500).json({ error: 'Failed to mark claim' });
  }
});

/**
 * POST /api/marketplace/snapshot
 * Create a merkle snapshot of current eligible listings
 */
router.post('/snapshot', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { maxPricePerDay, startDate, endDate } = req.body;

    if (!maxPricePerDay || !startDate || !endDate) {
      return res.status(400).json({ 
        error: 'Missing required fields: maxPricePerDay, startDate, endDate' 
      });
    }

    // Convert dates to BN
    const startDateBN = new BN(new Date(startDate).getTime() / 1000);
    const endDateBN = new BN(new Date(endDate).getTime() / 1000);
    const maxPriceBN = new BN(maxPricePerDay);

    // Get all listings from blockchain
    const listings = await program.account.dataListing.all();
    
    // Filter eligible listings
    const eligibleListings = listings.filter(listing => {
      const listingData = listing.account;
      const dateOverlap = listingData.startDate.lte(endDateBN) && listingData.endDate.gte(startDateBN);
      const priceOk = listingData.pricePerDay.lte(maxPriceBN);
      return dateOverlap && priceOk;
    });

    // Create merkle tree of eligible sellers
    const leaves = eligibleListings.map(listing => {
      return keccak256(listing.account.seller.toBuffer());
    });

    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const merkleRoot = Array.from(tree.getRoot());

    // Store snapshot in database
    const listingDetails = eligibleListings.map(l => ({
      seller: l.account.seller.toString(),
      listingId: l.account.listingId.toString(),
      pricePerDay: l.account.pricePerDay.toString(),
      startDate: l.account.startDate.toString(),
      endDate: l.account.endDate.toString()
    }));

    await req.app.locals.prisma.listingSnapshot.create({
      data: {
        merkle_root: Buffer.from(merkleRoot),
        listings: listingDetails
      }
    });

    res.json({
      merkleRoot,
      eligibleSellerCount: eligibleListings.length,
      listings: listingDetails
    });
  } catch (error) {
    console.error('Error creating snapshot:', error);
    res.status(500).json({ error: 'Failed to create snapshot' });
  }
});

/**
 * POST /api/marketplace/verify-access
 * Verify if a buyer has access to a seller's data
 */
router.post('/verify-access', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { buyer, seller, date, appName, platform } = req.body;

    if (!buyer || !seller || !date) {
      return res.status(400).json({ 
        error: 'Missing required fields: buyer, seller, date' 
      });
    }

    const result = await dataPassService.verifyAccess({
      buyer,
      seller,
      date: new Date(date),
      appName,
      platform
    });

    res.json(result);
  } catch (error) {
    console.error('Error verifying access:', error);
    res.status(500).json({ error: 'Failed to verify access' });
  }
});

/**
 * GET /api/marketplace/passes/:passId/new-sellers
 * Check for new sellers available since pass was purchased
 */
router.get('/passes/:passId/new-sellers', async (req: Request, res: Response) => {
  try {
    const { passId } = req.params;
    
    // Get the data pass details
    const [dataPassPda] = marketplacePDAs.getDataPass(new BN(passId), program.programId);
    const dataPass = await program.account.dataPass.fetch(dataPassPda);
    
    // Get current eligible sellers from snapshot
    const currentSellers = await dataPassService.getEligibleSellersFromSnapshot(
      Array.from(dataPass.snapshotMerkleRoot)
    );
    
    // Find all listings that match the pass criteria
    const allListings = await program.account.dataListing.all();
    const eligibleListings = allListings.filter(listing => {
      const l = listing.account;
      // Check if listing overlaps with pass date range
      const overlaps = l.startDate.lte(dataPass.endDate) && l.endDate.gte(dataPass.startDate);
      // Check if price is within buyer's max
      const priceOk = l.pricePerDay.lte(dataPass.maxPricePerDay);
      // Check if seller is not already in the pass
      const isNew = !currentSellers.some(s => s.equals(l.seller));
      
      return overlaps && priceOk && isNew;
    });
    
    // Calculate estimated cost for top-up
    const days = dataPass.endDate.sub(dataPass.startDate).div(new BN(86400)).add(new BN(1));
    const maxCostPerSeller = dataPass.maxPricePerDay.mul(days);
    const estimatedTotalCost = maxCostPerSeller.mul(new BN(eligibleListings.length));
    
    res.json({
      passId,
      dateRange: {
        start: new Date(dataPass.startDate.toNumber() * 1000),
        end: new Date(dataPass.endDate.toNumber() * 1000)
      },
      currentSellerCount: dataPass.eligibleSellerCount,
      newSellersAvailable: eligibleListings.length,
      newSellers: eligibleListings.map(l => ({
        seller: l.account.seller.toBase58(),
        pricePerDay: l.account.pricePerDay.toString(),
        listingId: l.account.listingId.toString()
      })),
      estimatedTopUpCost: estimatedTotalCost.toString(),
      maxPricePerDay: dataPass.maxPricePerDay.toString()
    });
  } catch (error) {
    console.error('Error checking new sellers:', error);
    res.status(500).json({ error: 'Failed to check new sellers' });
  }
});

/**
 * POST /api/marketplace/passes/:passId/top-up
 * Create a top-up transaction for an existing pass
 */
router.post('/passes/:passId/top-up', async (req: Request, res: Response) => {
  try {
    const { passId } = req.params;
    const { buyer } = req.body;
    
    if (!buyer) {
      return res.status(400).json({ error: 'Buyer address required' });
    }
    
    // Get the original pass
    const [dataPassPda] = marketplacePDAs.getDataPass(new BN(passId), program.programId);
    const dataPass = await program.account.dataPass.fetch(dataPassPda);
    
    // Verify the buyer owns this pass
    if (!dataPass.buyer.equals(new PublicKey(buyer))) {
      return res.status(403).json({ error: 'Unauthorized: Not the pass owner' });
    }
    
    // Get current eligible sellers
    const currentSellers = await dataPassService.getEligibleSellersFromSnapshot(
      Array.from(dataPass.snapshotMerkleRoot)
    );
    
    // Find new eligible listings
    const allListings = await program.account.dataListing.all();
    const newEligibleListings = allListings.filter(listing => {
      const l = listing.account;
      const overlaps = l.startDate.lte(dataPass.endDate) && l.endDate.gte(dataPass.startDate);
      const priceOk = l.pricePerDay.lte(dataPass.maxPricePerDay);
      const isNew = !currentSellers.some(s => s.equals(l.seller));
      return overlaps && priceOk && isNew;
    });
    
    if (newEligibleListings.length === 0) {
      return res.status(404).json({ error: 'No new sellers available for top-up' });
    }
    
    // Create a new merkle tree with just the new sellers
    const newSellers = newEligibleListings.map(l => l.account.seller);
    const topUpMerkleRoot = await merkleService.createSnapshotMerkleRoot(newSellers);
    
    // Create a new data pass that references the original
    // Note: This would require a new instruction in the smart contract
    const transaction = await dataPassService.createTopUpTransaction({
      originalPassId: passId,
      buyer: new PublicKey(buyer),
      newSellerCount: newEligibleListings.length,
      topUpMerkleRoot
    });
    
    res.json({
      transaction: transaction.toString('base64'),
      message: 'Top-up transaction created',
      newSellerCount: newEligibleListings.length,
      estimatedCost: calculateDataPassPayment(
        dataPass.startDate,
        dataPass.endDate,
        dataPass.maxPricePerDay
      ).mul(new BN(newEligibleListings.length)).toString()
    });
  } catch (error) {
    console.error('Error creating top-up:', error);
    res.status(500).json({ error: 'Failed to create top-up transaction' });
  }
});

/**
 * GET /api/marketplace/listings
 * Get all active listings with optional filters
 */
router.get('/listings', async (req: Request, res: Response) => {
  try {
    const { minPrice, maxPrice, active } = req.query;
    
    // Get all listings
    const listings = await program.account.dataListing.all();
    const now = Math.floor(Date.now() / 1000);
    
    // Filter listings
    let filtered = listings;
    
    if (active === 'true') {
      filtered = filtered.filter(l => 
        l.account.startDate.toNumber() <= now && 
        l.account.endDate.toNumber() >= now
      );
    }
    
    if (minPrice) {
      filtered = filtered.filter(l => 
        l.account.pricePerDay.gte(new BN(minPrice as string))
      );
    }
    
    if (maxPrice) {
      filtered = filtered.filter(l => 
        l.account.pricePerDay.lte(new BN(maxPrice as string))
      );
    }

    // Get seller info for each listing
    const listingsWithSellers = await Promise.all(
      filtered.map(async (listing) => {
        const [sellerPda] = marketplacePDAs.getSeller(listing.account.seller);
        let sellerInfo;
        try {
          sellerInfo = await program.account.dataSeller.fetch(sellerPda);
        } catch {
          sellerInfo = null;
        }

        return {
          listingId: listing.account.listingId.toString(),
          seller: listing.account.seller.toString(),
          startDate: new Date(listing.account.startDate.toNumber() * 1000).toISOString(),
          endDate: new Date(listing.account.endDate.toNumber() * 1000).toISOString(),
          pricePerDay: listing.account.pricePerDay.toString(),
          totalRevenue: sellerInfo ? sellerInfo.totalRevenue.toString() : '0'
        };
      })
    );

    res.json(listingsWithSellers);
  } catch (error) {
    console.error('Error getting listings:', error);
    res.status(500).json({ error: 'Failed to get listings' });
  }
});

/**
 * GET /api/marketplace/passes/:buyer
 * Get all data passes for a buyer
 */
router.get('/passes/:buyer', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { buyer } = req.params;
    
    // Validate buyer address
    let buyerPubkey: PublicKey;
    try {
      buyerPubkey = new PublicKey(buyer);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid buyer address' });
    }

    // Get all passes for buyer
    const passes = await program.account.dataPass.all([
      {
        memcmp: {
          offset: 8 + 8, // After discriminator + pass_id
          bytes: buyerPubkey.toBase58(),
        },
      },
    ]);

    const passDetails = passes.map(pass => ({
      passId: pass.account.passId.toString(),
      startDate: new Date(pass.account.startDate.toNumber() * 1000).toISOString(),
      endDate: new Date(pass.account.endDate.toNumber() * 1000).toISOString(),
      maxPricePerDay: pass.account.maxPricePerDay.toString(),
      totalPaid: pass.account.totalPaid.toString(),
      purchasedAt: new Date(pass.account.purchasedAt.toNumber() * 1000).toISOString(),
      eligibleSellerCount: pass.account.eligibleSellerCount,
      nftMint: pass.account.dataNftMint.toString()
    }));

    res.json(passDetails);
  } catch (error) {
    console.error('Error getting passes:', error);
    res.status(500).json({ error: 'Failed to get passes' });
  }
});

/**
 * GET /api/marketplace/stats
 * Get marketplace statistics
 */
router.get('/stats', async (req: Request, res: Response) => {
  try {
    // Get marketplace config
    const [configPda] = marketplacePDAs.getMarketplaceConfig();
    const config = await program.account.marketplaceConfig.fetch(configPda);

    // Get counts
    const totalListings = await program.account.dataListing.all();
    const activeSellers = await program.account.dataSeller.all();
    const totalPasses = await program.account.dataPass.all();

    res.json({
      totalPoolBalance: config.totalPoolBalance.toString(),
      listingCount: totalListings.length,
      activeListingCount: totalListings.filter(l => {
        const now = Math.floor(Date.now() / 1000);
        return l.account.startDate.toNumber() <= now && 
               l.account.endDate.toNumber() >= now;
      }).length,
      passCount: config.passCounter.toString(),
      activeSellers: activeSellers.filter(s => s.account.listingId !== null).length,
      currentPeriod: config.snapshotPeriod.toString()
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

/**
 * GET /api/marketplace/buyers/:buyer/accessible-data
 * Get sellers' app usage data that a buyer has access to via data passes
 */
router.get('/buyers/:buyer/accessible-data', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { buyer } = req.params;
    const { startDate, endDate } = req.query;

    // Verify the requesting user is the buyer
    if (req.user.walletAddress !== buyer) {
      return res.status(403).json({ error: 'Unauthorized to access this data' });
    }

    if (!startDate || !endDate) {
      return res.status(400).json({ 
        error: 'Missing required query parameters: startDate, endDate' 
      });
    }

    const usage = await dataPassService.getAccessibleAppUsage(
      buyer,
      new Date(startDate as string),
      new Date(endDate as string)
    );

    res.json({
      buyer,
      period: {
        start: startDate,
        end: endDate
      },
      dataCount: usage.length,
      data: usage
    });
  } catch (error) {
    console.error('Error getting accessible usage:', error);
    res.status(500).json({ error: 'Failed to get usage data' });
  }
});

export default router;