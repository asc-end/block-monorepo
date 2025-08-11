import { IdlAccounts } from "@coral-xyz/anchor";
import { prisma } from "../prisma";
import { DataMarketplace } from "../../../../programs/target/types/data_marketplace";
import { PublicKey } from "@solana/web3.js";
import { marketplacePDAs } from "@blockit/shared";
import BN from "bn.js"


// Helper function to index data seller accounts
export async function indexDataSellerAccount(seller: IdlAccounts<DataMarketplace>["dataSeller"], accountId: PublicKey, programId?: PublicKey) {
    try {
      console.log("ACCOUNT CHANGE SELLER", seller)
      
      // If there's a listingId, ensure the listing exists
      if (seller.listingId) {
        const listingIdBN = new BN(seller.listingId.toString());
        const [listingPDA] = marketplacePDAs.getListing(listingIdBN, programId);
        
        // Check if listing exists, if not create a placeholder
        const existingListing = await prisma.dataListing.findUnique({
          where: { listingId: seller.listingId.toString() }
        });
        
        if (!existingListing) {
          console.log(`Creating placeholder listing ${seller.listingId.toString()} for seller ${seller.seller.toString()}`);
          // Create a placeholder listing with minimal data
          await prisma.dataListing.upsert({
            where: { listingId: seller.listingId.toString() },
            create: {
              listingId: seller.listingId.toString(),
              sellerAddress: seller.seller.toString(),
              accountAddress: listingPDA.toBase58(),
              startDate: new Date(), // Placeholder - will be updated when actual listing arrives
              endDate: new Date(), // Placeholder - will be updated when actual listing arrives
              pricePerDay: "0", // Placeholder - will be updated when actual listing arrives
              isActive: true,
            },
            update: {} // Do nothing if it already exists
          });
        }
      }
      
      const data = {
        sellerAddress: seller.seller.toString(),
        accountAddress: accountId.toBase58(),
        listingId: seller.listingId ? seller.listingId.toString() : null,
        totalRevenue: seller.totalRevenue.toString(),
        unclaimedRevenue: seller.unclaimedRevenue.toString(),
      }
      await prisma.dataSeller.upsert({
        where: { accountAddress: accountId.toBase58() },
        update: data,
        create: data
      });
  
      console.log(`Indexed seller account for ${seller.seller.toString()} with listing ${seller.listingId?.toString() || 'none'}`);
    } catch (error) {
      console.error('Error storing seller account:', error);
    }
  }
  
  // Helper function to index marketplace config account
export async function indexMarketplaceConfigAccount(config: IdlAccounts<DataMarketplace>["marketplaceConfig"], accountId: PublicKey) {
    try {
      const _config = {
        accountAddress: accountId.toString(),
        authority: config.authority.toString(),
        currentPeriodRevenue: config.currentPeriodRevenue.toString(),
        totalLifetimeRevenue: config.totalLifetimeRevenue.toString(),
        listingCounter: config.listingCounter.toString(),
        passCounter: config.passCounter.toString(),
        snapshotPeriod: config.snapshotPeriod.toString(),
      }
  
      await prisma.marketplaceConfig.upsert({
        where: { accountAddress: accountId.toBase58()},
        update: _config,
        create: _config
      });
  
      console.log(`Indexed marketplace config: ${config.listingCounter.toString()} listings, ${config.passCounter.toString()} passes`);
    } catch (error) {
      console.error('Error storing marketplace config:', error);
    }
  }
  
  // Helper function to index merkle distributor accounts
export async function indexMerkleDistributorAccount(distributor: IdlAccounts<DataMarketplace>["merkleDistributor"], accountId: PublicKey) {
    try {
      const data = {
        accountAddress: accountId.toBase58(),
        merkleRoot: distributor.merkleRoot.toString(),
        totalPoolBalance: distributor.totalPoolBalance.toString(),
        snapshotTimestamp: new Date(parseInt(distributor.snapshotTimestamp.toString()) * 1000), // Convert Unix timestamp to Date
        periodId: BigInt(distributor.periodId.toString()),
        totalClaims: distributor.totalClaims.toString(),
        claimedAmount: distributor.claimedAmount.toString(),
      }
      await prisma.merkleDistributor.upsert({
        where: { accountAddress: accountId.toBase58() },
        update: data,
        create: data
      });
  
      console.log(`Indexed merkle distributor for period ${distributor.periodId.toString()}`);
    } catch (error) {
      console.error('Error storing merkle distributor:', error);
    }
  }

  // Helper function to index data pass accounts
export async function indexDataPassAccount(pass: IdlAccounts<DataMarketplace>["dataPass"], accountId: PublicKey) {
    try {
      const data = {
        accountAddress: accountId.toBase58(),
        passId: pass.passId.toString(),
        buyerAddress: pass.buyer.toString(),
        startDate: new Date(parseInt(pass.startDate.toString()) * 1000), // Convert Unix timestamp to Date
        endDate: new Date(parseInt(pass.endDate.toString()) * 1000), // Convert Unix timestamp to Date
        maxPricePerDay: pass.maxPricePerDay.toString(),
        totalPaid: pass.totalPaid.toString(),
        dataNftMint: pass.dataNftMint.toString(),
        purchasedAt: new Date(parseInt(pass.purchasedAt.toString()) * 1000), // Convert Unix timestamp to Date
        // TODO
        // eligibilityMerkleRoot: pass.eligibilityMerkleRoot.toString(),
        eligibleSellerCount: pass.eligibleSellerCount,
      }
      await prisma.dataPass.upsert({
        where: { accountAddress: accountId.toBase58() },
        update: data,
        create: data
      });
      console.log(`Indexed data pass ${pass.passId.toString()} for buyer ${pass.buyer.toString()}`);
    } catch (error) {
      console.error('Error storing data pass:', error);
    }
  }


// Helper function to index data listing accounts
export async function indexDataListingAccount(listing: IdlAccounts<DataMarketplace>["dataListing"], accountId: PublicKey) {
    try {
      console.log("ACCOUNT CHANGE LISTING", listing)

      const data = {
        sellerAddress: listing.seller.toString(),
        accountAddress: accountId.toBase58(),
        listingId: listing.listingId.toString(),
        startDate: new Date(parseInt(listing.startDate.toString()) * 1000), // Convert Unix timestamp to Date
        endDate: new Date(parseInt(listing.endDate.toString()) * 1000), // Convert Unix timestamp to Date
        pricePerDay: listing.pricePerDay.toString(),
      }
      await prisma.dataListing.upsert({
        where: { accountAddress: accountId.toBase58()},
        update: data,
        create: data
      });
      console.log(`Indexed listing ${listing.listingId.toString()} for seller ${listing.seller.toString()}`);
    } catch (error) {
      console.error('Error storing listing:', error);
    }
  }
  