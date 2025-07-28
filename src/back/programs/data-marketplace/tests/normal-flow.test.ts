import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import type { DataMarketplace } from "../../target/types/data_marketplace";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { expect } from "chai";
import BN from "bn.js";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { createListingTx, updateListingTx, removeListingTx, purchaseDataPassTx, claimRevenueTx, marketplacePDAs, calculateDataPassPayment, createMerkleLeafData, updateMerkleRootTx } from "@blockit/shared";
import { getListing, getListingCounter, getMerkleDistributor, getPass, getPassCounter, getPeriodId, getRevenueClaim, getSeller, initializeMarketplaceIfNeeded, mockMerkleRoot, createEligibilityMerkleRoot } from "./utils";
import { timeToUnix } from "@blockit/shared";

// This test demonstrates the complete normal flow of the data marketplace:
// 1. Initialize marketplace
// 2. Seller creates a listing (automatically activates seller)
// 3. Buyer purchases a data pass for a date range (NFT minted, funds to pool)
// 4. Authority updates merkle root for revenue distribution
// 5. Seller claims revenue using merkle proof
// 6. Seller updates listing
// 7. Seller removes listing

describe("Data Marketplace - Normal Flow", () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.DataMarketplace as Program<DataMarketplace>;

  // Test accounts
  // Use provider wallet as authority to match existing marketplace
  const authority = provider.wallet as anchor.Wallet;
  const seller = Keypair.generate();
  const buyer = Keypair.generate();

  // Log provider information
  console.log("\n=========== Provider Configuration ===========");
  console.log("- RPC URL:", provider.connection.rpcEndpoint);
  console.log("- Wallet PublicKey:", provider.wallet.publicKey.toBase58());
  console.log("- Commitment:", provider.opts.commitment);
  console.log("- Program ID:", program.programId.toBase58());
  console.log("================================================")

  // Test data - will be updated based on marketplace state
  // Merkle tree data (shared across tests)
  let merkleTree: MerkleTree;
  let claimAmount: BN;

  // Dates (Unix timestamps)
  const startDate = new BN(1704067200); // January 1, 2024
  const endDate = new BN(1706659200);   // January 31, 2024
  const pricePerDay = new BN(LAMPORTS_PER_SOL); // 1 SOL per day

  // Buyer wants first week of January
  const passStartDate = new BN(1704067200); // Jan 1
  const passEndDate = new BN(1704585600);   // Jan 7
  const maxPricePerDay = new BN(LAMPORTS_PER_SOL); // Willing to pay up to 1 SOL per day

  let listingId: BN;

  before(async () => {
    // Airdrop SOL to test accounts
    await provider.connection.requestAirdrop(seller.publicKey, 10 * LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(buyer.publicKey, 20 * LAMPORTS_PER_SOL);

    // Wait for airdrops to confirm
    await new Promise(resolve => setTimeout(resolve, 1000));
  });


  it("Step 1: Initialize marketplace", async () => {
    const marketplaceConfigPda = await initializeMarketplaceIfNeeded(program, authority.publicKey)
    const config = await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
    expect(config.authority.toString()).to.equal(authority.publicKey.toString());

    console.log("✅ Marketplace ready");

  });

  it("Step 2: Seller creates listing (auto-activates seller)", async () => {
    listingId = (await getListingCounter(program))

    const tx = await createListingTx(program, seller.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
    await provider.sendAndConfirm(tx, [seller]);


    const listing = await getListing(program, listingId);
    expect(listing.seller.toString()).to.equal(seller.publicKey.toString());
    expect(listing.pricePerDay.toString()).to.equal(pricePerDay.toString());

    const sellerAccount = await getSeller(program, seller.publicKey);
    expect(sellerAccount.seller.toString()).to.equal(seller.publicKey.toString());
    expect(sellerAccount.listingId?.toNumber()).to.equal(listingId.toNumber());
    console.log("✅ Listing created for Jan 2024 at 1 SOL/day and seller activated");
  });

  it("Step 3: Buyer purchases data pass for Jan 1-7", async () => {
    const passId = (await getPassCounter(program))

    // Get marketplace config before purchase
    const [marketplaceConfig] = marketplacePDAs.getMarketplaceConfig(program.programId);
    const configBefore = await program.account.marketplaceConfig.fetch(marketplaceConfig);

    // Use shared transaction builder

    const eligibility = createEligibilityMerkleRoot([seller.publicKey]);

    const tx = await purchaseDataPassTx(program, buyer.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
    await provider.sendAndConfirm(tx, [buyer]);

    const dataPass = await getPass(program, passId);
    const totalPayment = calculateDataPassPayment(passStartDate, passEndDate, maxPricePerDay, eligibility.count);

    expect(dataPass.buyer.toString()).to.equal(buyer.publicKey.toString());
    expect(dataPass.startDate.toString()).to.equal(passStartDate.toString());
    expect(dataPass.endDate.toString()).to.equal(passEndDate.toString());
    expect(dataPass.maxPricePerDay.toString()).to.equal(maxPricePerDay.toString());
    expect(dataPass.totalPaid.toString()).to.equal(totalPayment.toString());
    expect(dataPass.eligibleSellerCount).to.equal(eligibility.count);
    expect(dataPass.eligibilityMerkleRoot).to.deep.equal(eligibility.merkleRoot);

    // Verify marketplace revenue tracking
    const configAfter = await program.account.marketplaceConfig.fetch(marketplaceConfig);
    expect(configAfter.currentPeriodRevenue.toNumber()).to.equal(
      configBefore.currentPeriodRevenue.toNumber() + totalPayment.toNumber()
    );
    expect(configAfter.totalLifetimeRevenue.toNumber()).to.equal(
      configBefore.totalLifetimeRevenue.toNumber() + totalPayment.toNumber()
    );

    console.log("✅ Data pass purchased for Jan 1-7, NFT minted, funds in pool");
    console.log("   Pass gives access to 1 listing that was ≤ 1 SOL/day at purchase time");
    console.log("   Access rights are fixed - new listings won't be included");

  });

  it("Step 4: Authority updates merkle root", async () => {
    // Create merkle tree for revenue distribution
    claimAmount = new BN(7 * LAMPORTS_PER_SOL);
    const leafData = createMerkleLeafData(seller.publicKey, claimAmount);
    const leaf = keccak256(leafData);

    // Create a simple merkle tree with just one leaf for this test
    const leaves = [leaf];
    merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const merkleRoot = Array.from(merkleTree.getRoot());
    const periodId = await getPeriodId(program)

    // Check marketplace revenue before update
    const [marketplaceConfig] = marketplacePDAs.getMarketplaceConfig(program.programId);
    const configBefore = await program.account.marketplaceConfig.fetch(marketplaceConfig);

    const tx = await updateMerkleRootTx(program, authority.publicKey, periodId, merkleRoot);
    await provider.sendAndConfirm(tx, []);

    const merkleDistributor = await getMerkleDistributor(program, periodId)
    expect(merkleDistributor.periodId.toNumber()).to.equal(periodId.toNumber());
    
    // Verify MerkleDistributor initial state
    expect(merkleDistributor.totalClaims.toNumber()).to.equal(0);
    expect(merkleDistributor.claimedAmount.toNumber()).to.equal(0);
    expect(merkleDistributor.totalPoolBalance.toNumber()).to.equal(configBefore.currentPeriodRevenue.toNumber());

    // Verify currentPeriodRevenue was reset
    const configAfter = await program.account.marketplaceConfig.fetch(marketplaceConfig);
    expect(configAfter.currentPeriodRevenue.toNumber()).to.equal(0);

    console.log("✅ Merkle root updated for revenue distribution");

    // Note: periodId stays the same for claiming from this distribution
    // It will be incremented for the next distribution
  });

  it("Step 5: Seller claims revenue", async () => {
    // Generate merkle proof for the seller using shared helper
    const leafData = createMerkleLeafData(seller.publicKey, claimAmount);
    const leaf = keccak256(leafData);
    const proof = merkleTree.getProof(leaf);
    const merkleProof = proof.map(p => Array.from(p.data));
    const merkleRoot = Array.from(merkleTree.getRoot());

    const sellerBalanceBefore = await provider.connection.getBalance(seller.publicKey);
    
    const periodId = await getPeriodId(program)
    const [merkleDistributorPda] = marketplacePDAs.getMerkleDistributor(periodId, program.programId);
    const [dataSellerPda] = marketplacePDAs.getSeller(seller.publicKey, program.programId);

    // Get seller account before claim
    const sellerAccountBefore = await program.account.dataSeller.fetch(dataSellerPda);
    const totalRevenueBefore = sellerAccountBefore.totalRevenue.toNumber();

    const updateTx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
    await provider.sendAndConfirm(updateTx, []);

    // Get distributor state before claim
    const distributorBefore = await program.account.merkleDistributor.fetch(merkleDistributorPda);

    const tx = await claimRevenueTx(program, seller.publicKey, periodId, claimAmount, merkleProof);
    await provider.sendAndConfirm(tx, [seller]);

    const sellerBalanceAfter = await provider.connection.getBalance(seller.publicKey);
    const revenueClaim = await getRevenueClaim(program, seller.publicKey, periodId)

    // Verify SellerRevenueClaim
    expect(revenueClaim.amountClaimed.toString()).to.equal(claimAmount.toString());
    expect(revenueClaim.claimTimestamp.toNumber()).to.be.greaterThan(0);
    expect(revenueClaim.periodId.toNumber()).to.equal(periodId.toNumber());
    
    // Verify DataSeller totalRevenue increased
    const sellerAccountAfter = await program.account.dataSeller.fetch(dataSellerPda);
    expect(sellerAccountAfter.totalRevenue.toNumber()).to.equal(
      totalRevenueBefore + claimAmount.toNumber()
    );

    // Verify MerkleDistributor tracking
    const distributorAfter = await program.account.merkleDistributor.fetch(merkleDistributorPda);
    expect(distributorAfter.totalClaims.toNumber()).to.equal(1);
    expect(distributorAfter.claimedAmount.toNumber()).to.equal(claimAmount.toNumber());
    
    // Account for transaction fees
    expect(sellerBalanceAfter).to.be.greaterThan(sellerBalanceBefore);

    console.log("✅ Seller claimed 7 SOL revenue");
  });

  it("Step 6: Seller updates listing", async () => {
    const newEndDate = new BN(1709251200); // February 29, 2024
    const newPricePerDay = new BN(0.8 * LAMPORTS_PER_SOL); // 0.8 SOL per day

    const tx = await updateListingTx(program, seller.publicKey, listingId, timeToUnix(newEndDate), newPricePerDay);
    await provider.sendAndConfirm(tx, [seller]);

    const listing = await getListing(program, listingId);
    expect(listing.endDate.toString()).to.equal(newEndDate.toString());
    expect(listing.pricePerDay.toString()).to.equal(newPricePerDay.toString());

    console.log("✅ Listing updated: extended to Feb 2024, price reduced to 0.8 SOL/day");
  });

  it("Step 7: Seller removes listing", async () => {
    const tx = await removeListingTx(program, seller.publicKey, listingId);
    await provider.sendAndConfirm(tx, [seller]);

    // Verify listing is closed
    try {
      await getListing(program, listingId);
      expect.fail("Listing should be closed");
    } catch (error: any) {
      expect(error.message).to.include("Account does not exist");
    }

    // Verify seller's listing ID is removed
    const sellerAccount = await getSeller(program, seller.publicKey);
    expect(sellerAccount.listingId).to.be.null;

    console.log("✅ Listing removed and seller deactivated");
  });
});