import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { PrismaClient } from '@prisma/client';
import { MerkleService } from './merkleService';
import { SquadsService, SquadsConfig } from './squadsService';
import BN from "bn.js"

export class ScheduleService {
  private merkleService: MerkleService;
  private squadsService: SquadsService | null = null;
  private prisma: PrismaClient;
  private updateInterval: NodeJS.Timeout | null = null;
  private snapshotInterval: NodeJS.Timeout | null = null;
  private connection: Connection;

  constructor(
    prisma: PrismaClient,
    connection: Connection,
    authorityKeypair?: Keypair,
    squadsConfig?: SquadsConfig
  ) {
    this.prisma = prisma;
    this.connection = connection;
    this.merkleService = new MerkleService(prisma, connection, authorityKeypair);
    
    if (squadsConfig) {
      this.squadsService = new SquadsService(connection, squadsConfig);
      console.log('[ScheduleService] Squads integration enabled');
    }
  }

  /**
   * Start scheduled jobs
   */
  start() {
    console.log('[ScheduleService] Starting scheduled jobs...');

    // Update merkle root every hour
    this.updateInterval = setInterval(async () => {
      await this.updateMerkleRoot();
    }, 60 * 60 * 1000); // 1 hour

    // Create snapshots for active passes every 30 minutes
    this.snapshotInterval = setInterval(async () => {
      await this.createActivePassSnapshots();
    }, 30 * 60 * 1000); // 30 minutes

    // Run immediately on start
    this.updateMerkleRoot();
    this.createActivePassSnapshots();
  }

  /**
   * Stop scheduled jobs
   */
  stop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    if (this.snapshotInterval) {
      clearInterval(this.snapshotInterval);
      this.snapshotInterval = null;
    }
    console.log('[ScheduleService] Stopped scheduled jobs');
  }

  /**
   * Update merkle root for current period
   */
  private async updateMerkleRoot() {
    try {
      console.log('[ScheduleService] Starting merkle root update...');
      
      // Calculate current period (daily periods)
      const now = new Date();
      const periodId = Math.floor(now.getTime() / (1000 * 60 * 60 * 24)); // Days since epoch
      
      // Check if we already have a distribution for this period
      const existingDistribution = await this.prisma.merkleDistribution.findUnique({
        where: { periodId: BigInt(periodId) }
      });

      if (existingDistribution) {
        console.log(`[ScheduleService] Distribution already exists for period ${periodId}`);
        return;
      }

      // Generate new distribution
      const { merkleRoot, totalAmount, sellerCount } = await this.merkleService.generateDistribution(periodId);

      // Store distribution
      await this.prisma.merkleDistribution.create({
        data: {
          periodId: BigInt(periodId),
          merkleRoot: Buffer.from(merkleRoot),
          totalPoolBalance: BigInt(totalAmount.toString()),
          claimPeriodEnd: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days to claim
        }
      });

      console.log(`[ScheduleService] Created distribution for period ${periodId}: ${sellerCount} sellers, ${totalAmount} lamports`);

      // Handle different environments
      const network = process.env.NETWORK || 'localnet';
      
      if (network === 'mainnet-beta' && this.squadsService) {
        // Mainnet: Use Squads multisig
        const authorityAddress = this.squadsService.getVaultPDA();
        const claimPeriodDays = new BN(7);
        
        const transactionBuffer = await this.merkleService.createUpdateMerkleRootTransaction(
          periodId,
          merkleRoot,
          totalAmount,
          claimPeriodDays,
          authorityAddress
        );

        const { proposalId, url } = await this.squadsService.submitTransaction(
          transactionBuffer,
          `Update merkle root for period ${periodId} - ${sellerCount} sellers, ${totalAmount} lamports`
        );

        console.log(`[ScheduleService] Submitted to Squads:`);
        console.log(`  Proposal ID: ${proposalId}`);
        console.log(`  Review at: ${url}`);
        
      } else if ((network === 'devnet' || network === 'localnet') && this.merkleService.hasAuthorityKeypair()) {
        // Devnet/Localnet: Direct execution with local keypair
        const claimPeriodDays = new BN(7);
        
        try {
          const tx = await this.merkleService.updateMerkleRootOnChain(
            periodId,
            merkleRoot,
            totalAmount,
            claimPeriodDays
          );
          
          console.log(`[ScheduleService] Updated merkle root on-chain (${network}): ${tx}`);
        } catch (error) {
          console.error(`[ScheduleService] Failed to update merkle root on ${network}:`, error);
        }
      } else {
        console.log(`[ScheduleService] No authority configured for ${network} - skipping on-chain update`);
      }

    } catch (error) {
      console.error('[ScheduleService] Error updating merkle root:', error);
    }
  }

  /**
   * Create snapshots for active data passes
   */
  private async createActivePassSnapshots() {
    try {
      console.log('[ScheduleService] Creating snapshots for active passes...');
      
      // This is a placeholder - in production, you might want to:
      // 1. Query for data passes that are about to be purchased
      // 2. Create snapshots based on pending transactions
      // 3. Clean up old snapshots
      
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const deletedCount = await this.prisma.listingSnapshot.deleteMany({
        where: {
          createdAt: {
            lt: oneWeekAgo
          }
        }
      });

      if (deletedCount.count > 0) {
        console.log(`[ScheduleService] Cleaned up ${deletedCount.count} old snapshots`);
      }

    } catch (error) {
      console.error('[ScheduleService] Error creating snapshots:', error);
    }
  }

  /**
   * Get current period ID
   */
  static getCurrentPeriodId(): number {
    return Math.floor(Date.now() / (1000 * 60 * 60 * 24)); // Days since epoch
  }

  /**
   * Get period start and end times
   */
  static getPeriodBounds(periodId: number): { start: Date; end: Date } {
    const start = new Date(periodId * 24 * 60 * 60 * 1000);
    const end = new Date((periodId + 1) * 24 * 60 * 60 * 1000 - 1);
    return { start, end };
  }
}