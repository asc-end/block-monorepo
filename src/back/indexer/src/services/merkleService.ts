import { PublicKey, Connection, Keypair, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import { PrismaClient } from '@prisma/client';
import { marketplacePDAs, createMerkleLeafData, createSnapshotMerkleLeaf, MARKETPLACE_PROGRAM_ID } from '@blockit/shared';
import type { DataMarketplace } from '../../../programs/target/types/data_marketplace';
import IDL from '../../../programs/target/idl/data_marketplace.json' with { type: 'json' };
import BN from "bn.js"

export interface MerkleProof {
  amount: string;
  proof: number[][];
}

export interface SellerRevenue {
  seller: PublicKey;
  amount: BN;
}

export class MerkleService {
  private prisma: PrismaClient;
  private program: Program<DataMarketplace>;
  private connection: Connection;
  private authorityKeypair?: Keypair;

  constructor(prisma: PrismaClient, connection: Connection, authorityKeypair?: Keypair) {
    this.prisma = prisma;
    this.connection = connection;
    this.authorityKeypair = authorityKeypair;
    
    const wallet = authorityKeypair ? new Wallet(authorityKeypair) : new Wallet(Keypair.generate());
    const provider = new AnchorProvider(
      connection,
      wallet,
      { commitment: 'confirmed' }
    );

    this.program = new Program(IDL as DataMarketplace, provider);
  }

  /**
   * Check if authority keypair is available for direct execution
   */
  hasAuthorityKeypair(): boolean {
    return !!this.authorityKeypair;
  }

  /**
   * Generate merkle tree for revenue distribution
   */
  async generateDistribution(periodId: number): Promise<{
    merkleRoot: number[];
    totalAmount: BN;
    sellerCount: number;
  }> {
    console.log(`[MerkleService] Generating distribution for period ${periodId}`);

    // 1. Get all data passes for the current period
    const passes = await this.getDataPassesForPeriod();
    console.log(`[MerkleService] Found ${passes.length} active data passes`);

    // 2. Calculate revenue per seller
    const sellerRevenues = await this.calculateSellerRevenues(passes);
    console.log(`[MerkleService] Calculated revenue for ${sellerRevenues.size} sellers`);

    // 3. Create merkle tree
    const { tree, merkleRoot } = this.createMerkleTree(sellerRevenues);

    // 4. Store proofs in database
    await this.storeMerkleProofs(periodId, tree, sellerRevenues);

    // 5. Calculate total amount
    const totalAmount = Array.from(sellerRevenues.values())
      .reduce((sum, sr) => sum.add(sr.amount), new BN(0));

    console.log(`[MerkleService] Distribution ready: ${totalAmount.toString()} lamports for ${sellerRevenues.size} sellers`);

    return {
      merkleRoot: Array.from(merkleRoot),
      totalAmount,
      sellerCount: sellerRevenues.size
    };
  }

  /**
   * Get merkle proof for a seller
   */
  async getProofForSeller(seller: PublicKey, periodId: number): Promise<MerkleProof | null> {
    const proof = await this.prisma.sellerProof.findUnique({
      where: {
        sellerAddress_periodId: {
          sellerAddress: seller.toString(),
          periodId: periodId
        }
      }
    });

    if (!proof) {
      return null;
    }

    return {
      amount: proof.amount.toString(), // Convert BigInt back to string for API response
      proof: proof.proof as number[][]
    };
  }

  /**
   * Create transaction to update merkle root (for Squads multisig)
   */
  async createUpdateMerkleRootTransaction( periodId: number, merkleRoot: number[], authorityAddress: PublicKey): Promise<Buffer> {
    const [marketplaceConfig] = marketplacePDAs.getMarketplaceConfig();
    const [merkleDistributor] = marketplacePDAs.getMerkleDistributor(new BN(periodId));

    const instruction = await this.program.methods
      .updateMerkleRoot(merkleRoot)
      .accountsPartial({
        authority: authorityAddress, // This will be the Squads multisig
        marketplaceConfig,
        merkleDistributor,
      })
      .instruction();

    // Create versioned transaction
    const { blockhash } = await this.connection.getLatestBlockhash();
    const message = new TransactionMessage({
      payerKey: authorityAddress,
      recentBlockhash: blockhash,
      instructions: [instruction],
    }).compileToV0Message();

    const transaction = new VersionedTransaction(message);
    
    console.log(`[MerkleService] Created merkle root update transaction for period ${periodId}`);
    return Buffer.from(transaction.serialize());
  }

  /**
   * Update merkle root on-chain (direct execution - deprecated, use Squads instead)
   */
  async updateMerkleRootOnChain(
    periodId: number,
    merkleRoot: number[],
  ): Promise<string> {
    if (!this.authorityKeypair) {
      throw new Error('Authority keypair required for direct merkle root update');
    }
    
    const network = process.env.NETWORK || 'localnet';
    if (network === 'mainnet-beta') {
      console.warn('[MerkleService] Direct merkle root update on mainnet - should use Squads instead!');
    }
    
    const [marketplaceConfig] = marketplacePDAs.getMarketplaceConfig();
    const [merkleDistributor] = marketplacePDAs.getMerkleDistributor(new BN(periodId));

    const tx = await this.program.methods
      .updateMerkleRoot(merkleRoot)
      .accountsPartial({
        authority: this.authorityKeypair.publicKey,
        marketplaceConfig,
        merkleDistributor,
      })
      .rpc();

    console.log(`[MerkleService] Updated merkle root on-chain: ${tx}`);
    return tx;
  }

  /**
   * Get all data passes purchased in the current period
   */
  private async getDataPassesForPeriod() {
    // Get the current timestamp
    const now = Math.floor(Date.now() / 1000);

    // Fetch all data passes
    const passes = await this.program.account.dataPass.all();

    // Filter passes that are currently active
    return passes.filter(pass => {
      const startDate = pass.account.startDate.toNumber();
      const endDate = pass.account.endDate.toNumber();
      return startDate <= now && endDate >= now;
    });
  }

  /**
   * Calculate revenue distribution for each seller
   */
  private async calculateSellerRevenues(passes: any[]): Promise<Map<string, SellerRevenue>> {
    const sellerRevenues = new Map<string, SellerRevenue>();

    for (const pass of passes) {
      const passData = pass.account;

      // Get eligible sellers from the snapshot
      const eligibleSellers = await this.getEligibleSellersFromSnapshot(
        passData.snapshotMerkleRoot
      );

      // Calculate revenue per seller (equal distribution)
      if (eligibleSellers.length > 0) {
        const revenuePerSeller = passData.totalPaid.div(new BN(eligibleSellers.length));

        for (const seller of eligibleSellers) {
          const sellerKey = seller.toString();
          const existing = sellerRevenues.get(sellerKey);

          if (existing) {
            existing.amount = existing.amount.add(revenuePerSeller);
          } else {
            sellerRevenues.set(sellerKey, {
              seller,
              amount: revenuePerSeller
            });
          }
        }
      }
    }

    return sellerRevenues;
  }

  /**
   * Get eligible sellers from a snapshot merkle root
   */
  private async getEligibleSellersFromSnapshot( snapshotMerkleRoot: number[]): Promise<PublicKey[]> {
    // Look up the snapshot in the database
    const snapshot = await this.prisma.listingSnapshot.findUnique({
      where: {
        merkleRoot: Buffer.from(snapshotMerkleRoot)
      }
    });

    if (!snapshot) {
      console.error('[MerkleService] Snapshot not found for merkle root');
      return [];
    }

    // Extract seller addresses from the snapshot
    const listings = snapshot.listings as any[];
    return listings.map(listing => new PublicKey(listing.seller));
  }

  /**
   * Create merkle tree from seller revenues
   */
  private createMerkleTree(sellerRevenues: Map<string, SellerRevenue>): {
    tree: MerkleTree;
    merkleRoot: Buffer;
  } {
    const leaves: Buffer[] = [];

    // Create leaf for each seller
    for (const [_, revenue] of sellerRevenues) {
      const leafData = createMerkleLeafData(revenue.seller, revenue.amount);
      const leaf = keccak256(leafData);
      leaves.push(leaf);
    }

    // Create merkle tree
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const merkleRoot = tree.getRoot();

    return { tree, merkleRoot };
  }

  /**
   * Store merkle proofs in database
   */
  private async storeMerkleProofs( periodId: number, tree: MerkleTree, sellerRevenues: Map<string, SellerRevenue>): Promise<void> {
    const proofs = [];

    for (const [sellerKey, revenue] of sellerRevenues) {
      const leafData = createMerkleLeafData(revenue.seller, revenue.amount);
      const leaf = keccak256(leafData);
      const proof = tree.getProof(leaf);

      proofs.push({
        seller_address: sellerKey,
        period_id: BigInt(periodId),
        amount: BigInt(revenue.amount.toString()), // Convert BN to BigInt
        proof: proof.map(p => Array.from(p.data)),
        claimed: false
      });
    }

    // Batch upsert all proofs
    if (proofs.length > 0) {
      await this.prisma.$transaction(
        proofs.map(proof =>
          this.prisma.sellerProof.upsert({
            where: {
              sellerAddress_periodId: {
                sellerAddress: proof.seller_address,
                periodId: proof.period_id
              }
            },
            create: proof,
            update: proof
          })
        )
      );
    }

    console.log(`[MerkleService] Stored ${proofs.length} merkle proofs for period ${periodId}`);
  }

  /**
   * Mark a proof as claimed
   */
  async markProofAsClaimed(seller: PublicKey, periodId: number): Promise<void> {
    await this.prisma.sellerProof.update({
      where: {
        sellerAddress_periodId: {
          sellerAddress: seller.toString(),
          periodId: periodId
        }
      },
      data: {
        claimed: true,
        claimedAt: new Date()
      }
    });
  }

  /**
   * Create snapshot of current listings for a date/price range
   */
  async createListingsSnapshot( startDate: BN, endDate: BN, maxPricePerDay: BN): Promise<{ merkleRoot: number[], eligibleSellerCount: number, countProof: number[][] }> {
    // Get all listings
    const listings = await this.program.account.dataListing.all();

    // Filter eligible listings
    const eligibleListings = listings.filter(listing => {
      const listingData = listing.account;
      const dateOverlap = listingData.startDate.lte(endDate) && listingData.endDate.gte(startDate);
      const priceOk = listingData.pricePerDay.lte(maxPricePerDay);
      return dateOverlap && priceOk;
    });

    // Create merkle tree of eligible listings
    // First leaf is the count, then all seller addresses
    const leaves: Buffer[] = [];
    
    // Add count as first leaf
    const countLeaf = Buffer.alloc(32);
    countLeaf.writeUInt32LE(eligibleListings.length, 0);
    leaves.push(keccak256(countLeaf));
    
    // Add seller addresses
    eligibleListings.forEach(listing => {
      leaves.push(keccak256(createSnapshotMerkleLeaf(listing.account.seller)));
    });

    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const merkleRoot = Array.from(tree.getRoot());

    // Store snapshot in database
    await this.prisma.listingSnapshot.create({
      data: {
        merkleRoot: Buffer.from(merkleRoot),
        createdAt: new Date(),
        listings: eligibleListings.map(l => ({
          seller: l.account.seller.toString(),
          listingId: l.account.listingId.toString(),
          pricePerDay: l.account.pricePerDay.toString()
        }))
      }
    });

    // Get proof for the count (first leaf)
    const countProof = tree.getProof(leaves[0]).map(p => Array.from(p.data));
    
    return {
      merkleRoot,
      eligibleSellerCount: eligibleListings.length,
      countProof
    };
  }
}