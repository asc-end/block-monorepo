import { PublicKey, Connection } from '@solana/web3.js';
import { Program, AnchorProvider, BN } from '@coral-xyz/anchor';
import { PrismaClient } from '@prisma/client';
import { marketplacePDAs, MARKETPLACE_PROGRAM_ID } from '@blockit/shared';
import type { DataMarketplace } from '../../../programs/target/types/data_marketplace';
import IDL from '../../../programs/target/idl/data_marketplace.json';

export interface DataAccessRequest {
  buyer: string;
  seller: string;
  date: Date;
  appName?: string;
  platform?: 'web' | 'mobile';
}

export interface DataAccessResponse {
  hasAccess: boolean;
  passId?: string;
  accessToken?: string;
  reason?: string;
}

export class DataPassService {
  private prisma: PrismaClient;
  private program: Program<DataMarketplace>;
  private accessCache: Map<string, { expires: number; result: DataAccessResponse }> = new Map();

  constructor(prisma: PrismaClient, connection: Connection) {
    this.prisma = prisma;
    const provider = new AnchorProvider(connection, {} as any, { commitment: 'confirmed' });
    this.program = new Program(IDL as DataMarketplace, MARKETPLACE_PROGRAM_ID, provider);
  }

  /**
   * Verify if a buyer has access to a seller's data for a specific date
   */
  async verifyAccess(request: DataAccessRequest): Promise<DataAccessResponse> {
    const cacheKey = `${request.buyer}-${request.seller}-${request.date.toISOString()}`;
    
    // Check cache first
    const cached = this.accessCache.get(cacheKey);
    if (cached && cached.expires > Date.now()) {
      return cached.result;
    }

    try {
      // Validate addresses
      let buyerPubkey: PublicKey, sellerPubkey: PublicKey;
      try {
        buyerPubkey = new PublicKey(request.buyer);
        sellerPubkey = new PublicKey(request.seller);
      } catch (e) {
        return { hasAccess: false, reason: 'Invalid address format' };
      }

      const requestedDate = new BN(Math.floor(request.date.getTime() / 1000));

      // Get all data passes for the buyer
      const passes = await this.program.account.dataPass.all([
        {
          memcmp: {
            offset: 8 + 8, // After discriminator + pass_id
            bytes: buyerPubkey.toBase58(),
          },
        },
      ]);

      // Check each pass
      for (const pass of passes) {
        const passData = pass.account;
        
        // Check if date is within pass range
        if (passData.startDate.lte(requestedDate) && passData.endDate.gte(requestedDate)) {
          // Get the snapshot to verify seller was eligible
          const snapshot = await this.prisma.listingSnapshot.findUnique({
            where: {
              merkleRoot: Buffer.from(passData.snapshotMerkleRoot)
            }
          });

          if (snapshot) {
            const listings = snapshot.listings as any[];
            const sellerInSnapshot = listings.some(l => l.seller === request.seller);
            
            if (sellerInSnapshot) {
              // Generate access token
              const accessToken = this.generateAccessToken({
                buyer: request.buyer,
                seller: request.seller,
                date: request.date,
                passId: passData.passId.toString(),
                expires: Date.now() + 3600000 // 1 hour
              });

              const result = {
                hasAccess: true,
                passId: passData.passId.toString(),
                accessToken
              };

              // Cache the result
              this.accessCache.set(cacheKey, {
                expires: Date.now() + 300000, // 5 minutes
                result
              });

              // Log access for analytics
              await this.logDataAccess(request, passData.passId.toString());

              return result;
            }
          }
        }
      }

      const noAccessResult = { hasAccess: false, reason: 'No valid data pass found' };
      
      // Cache negative results too (shorter TTL)
      this.accessCache.set(cacheKey, {
        expires: Date.now() + 60000, // 1 minute
        result: noAccessResult
      });

      return noAccessResult;
    } catch (error) {
      console.error('Error verifying data access:', error);
      return { hasAccess: false, reason: 'Verification error' };
    }
  }

  /**
   * Get sellers' app usage data that a buyer has access to via data passes
   */
  async getAccessibleAppUsage(
    buyer: string,
    startDate: Date,
    endDate: Date
  ): Promise<any[]> {
    try {
      const buyerPubkey = new PublicKey(buyer);
      
      // Get all data passes for this buyer
      const passes = await this.program.account.dataPass.all([
        {
          memcmp: {
            offset: 8 + 8, // After discriminator + pass_id
            bytes: buyerPubkey.toBase58(),
          },
        },
      ]);
      
      const startTimestamp = new BN(Math.floor(startDate.getTime() / 1000));
      const endTimestamp = new BN(Math.floor(endDate.getTime() / 1000));
      
      const eligibleSellers = new Set<string>();
      
      // Find all sellers this buyer has access to
      for (const pass of passes) {
        const passData = pass.account;
        
        // Check if pass overlaps with requested period
        if (passData.startDate.lte(endTimestamp) && passData.endDate.gte(startTimestamp)) {
          // Get sellers from the snapshot
          const snapshot = await this.prisma.listingSnapshot.findUnique({
            where: {
              merkleRoot: Buffer.from(passData.snapshotMerkleRoot)
            }
          });

          if (snapshot) {
            const listings = snapshot.listings as any[];
            listings.forEach(l => eligibleSellers.add(l.seller));
          }
        }
      }

      if (eligibleSellers.size === 0) {
        return [];
      }

      // Get app usage data from eligible sellers
      const users = await this.prisma.user.findMany({
        where: {
          walletAddress: {
            in: Array.from(eligibleSellers)
          }
        },
        select: {
          id: true,
          walletAddress: true
        }
      });

      const userIds = users.map(u => u.id);
      const walletToId = new Map(users.map(u => [u.walletAddress, u.id]));

      const appUsage = await this.prisma.appUsage.findMany({
        where: {
          userId: {
            in: userIds
          },
          hourStart: {
            gte: startDate,
            lte: endDate
          }
        }
      });

      // Return data with seller wallet addresses
      return appUsage.map(usage => {
        const sellerWallet = Array.from(walletToId.entries())
          .find(([_, id]) => id === usage.userId)?.[0];
        
        return {
          sellerWallet,
          appName: usage.appName,
          timeSpent: usage.timeSpent,
          platform: usage.platform,
          hourStart: usage.hourStart
        };
      }).filter(u => u.sellerWallet); // Filter out any without wallet

    } catch (error) {
      console.error('Error getting accessible app usage:', error);
      return [];
    }
  }

  /**
   * Generate a short-lived access token
   */
  private generateAccessToken(data: any): string {
    // In production, use proper JWT tokens
    return Buffer.from(JSON.stringify(data)).toString('base64');
  }

  /**
   * Validate an access token
   */
  validateAccessToken(token: string): any | null {
    try {
      const data = JSON.parse(Buffer.from(token, 'base64').toString());
      if (data.expires && data.expires > Date.now()) {
        return data;
      }
    } catch {
      // Invalid token
    }
    return null;
  }

  /**
   * Log data access for analytics
   */
  private async logDataAccess(request: DataAccessRequest, passId: string): Promise<void> {
    // This could be used for:
    // - Analytics on data usage patterns
    // - Compliance/audit trails
    // - Usage-based pricing tiers
    console.log(`[DataPassService] Access granted: Buyer ${request.buyer} can access Seller ${request.seller}'s data (Pass: ${passId})`);
  }

  /**
   * Clean up expired cache entries
   */
  cleanupCache(): void {
    const now = Date.now();
    for (const [key, value] of this.accessCache.entries()) {
      if (value.expires < now) {
        this.accessCache.delete(key);
      }
    }
  }
}