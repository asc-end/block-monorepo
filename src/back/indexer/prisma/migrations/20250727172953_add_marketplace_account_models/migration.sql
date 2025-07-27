/*
  Warnings:

  - You are about to drop the `listing_snapshots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `merkle_distributions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "listing_snapshots";

-- DropTable
DROP TABLE "merkle_distributions";

-- CreateTable
CREATE TABLE "marketplace_config" (
    "accountAddress" TEXT NOT NULL,
    "authority" TEXT NOT NULL,
    "currentPeriodRevenue" TEXT NOT NULL,
    "totalLifetimeRevenue" TEXT NOT NULL,
    "listingCounter" TEXT NOT NULL,
    "passCounter" TEXT NOT NULL,
    "snapshotPeriod" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "marketplace_config_pkey" PRIMARY KEY ("accountAddress")
);

-- CreateTable
CREATE TABLE "data_sellers" (
    "sellerAddress" TEXT NOT NULL,
    "listingId" TEXT,
    "totalRevenue" TEXT NOT NULL,
    "unclaimedRevenue" TEXT NOT NULL,
    "accountAddress" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "data_sellers_pkey" PRIMARY KEY ("sellerAddress")
);

-- CreateTable
CREATE TABLE "data_listings" (
    "listingId" TEXT NOT NULL,
    "sellerAddress" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "pricePerDay" TEXT NOT NULL,
    "accountAddress" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "data_listings_pkey" PRIMARY KEY ("listingId")
);

-- CreateTable
CREATE TABLE "data_passes" (
    "passId" TEXT NOT NULL,
    "buyerAddress" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "maxPricePerDay" TEXT NOT NULL,
    "totalPaid" TEXT NOT NULL,
    "dataNftMint" TEXT NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL,
    "eligibleSellerCount" INTEGER NOT NULL,
    "accountAddress" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "data_passes_pkey" PRIMARY KEY ("passId")
);

-- CreateTable
CREATE TABLE "merkle_distributors" (
    "periodId" BIGINT NOT NULL,
    "merkleRoot" TEXT NOT NULL,
    "totalPoolBalance" TEXT NOT NULL,
    "snapshotTimestamp" TIMESTAMP(3) NOT NULL,
    "totalClaims" TEXT NOT NULL,
    "claimedAmount" TEXT NOT NULL,
    "accountAddress" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merkle_distributors_pkey" PRIMARY KEY ("periodId")
);

-- CreateIndex
CREATE UNIQUE INDEX "data_sellers_accountAddress_key" ON "data_sellers"("accountAddress");

-- CreateIndex
CREATE INDEX "data_sellers_listingId_idx" ON "data_sellers"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "data_listings_accountAddress_key" ON "data_listings"("accountAddress");

-- CreateIndex
CREATE INDEX "data_listings_sellerAddress_idx" ON "data_listings"("sellerAddress");

-- CreateIndex
CREATE INDEX "data_listings_isActive_idx" ON "data_listings"("isActive");

-- CreateIndex
CREATE INDEX "data_listings_startDate_endDate_idx" ON "data_listings"("startDate", "endDate");

-- CreateIndex
CREATE UNIQUE INDEX "data_passes_accountAddress_key" ON "data_passes"("accountAddress");

-- CreateIndex
CREATE INDEX "data_passes_buyerAddress_idx" ON "data_passes"("buyerAddress");

-- CreateIndex
CREATE INDEX "data_passes_purchasedAt_idx" ON "data_passes"("purchasedAt");

-- CreateIndex
CREATE UNIQUE INDEX "merkle_distributors_accountAddress_key" ON "merkle_distributors"("accountAddress");

-- CreateIndex
CREATE INDEX "merkle_distributors_snapshotTimestamp_idx" ON "merkle_distributors"("snapshotTimestamp");
