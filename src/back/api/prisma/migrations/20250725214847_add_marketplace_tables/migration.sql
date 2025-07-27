-- CreateTable
CREATE TABLE "merkle_distributions" (
    "id" SERIAL NOT NULL,
    "periodId" BIGINT NOT NULL,
    "merkleRoot" BYTEA NOT NULL,
    "totalPoolBalance" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "claimPeriodEnd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merkle_distributions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seller_proofs" (
    "sellerAddress" TEXT NOT NULL,
    "periodId" BIGINT NOT NULL,
    "amount" BIGINT NOT NULL,
    "proof" JSONB NOT NULL,
    "claimed" BOOLEAN NOT NULL DEFAULT false,
    "claimedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seller_proofs_pkey" PRIMARY KEY ("sellerAddress","periodId")
);

-- CreateTable
CREATE TABLE "listing_snapshots" (
    "merkleRoot" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listings" JSONB NOT NULL,

    CONSTRAINT "listing_snapshots_pkey" PRIMARY KEY ("merkleRoot")
);

-- CreateIndex
CREATE UNIQUE INDEX "merkle_distributions_periodId_key" ON "merkle_distributions"("periodId");

-- CreateIndex
CREATE INDEX "merkle_distributions_periodId_idx" ON "merkle_distributions"("periodId");

-- CreateIndex
CREATE INDEX "seller_proofs_sellerAddress_idx" ON "seller_proofs"("sellerAddress");

-- CreateIndex
CREATE INDEX "seller_proofs_periodId_idx" ON "seller_proofs"("periodId");

-- CreateIndex
CREATE INDEX "seller_proofs_claimed_idx" ON "seller_proofs"("claimed");

-- CreateIndex
CREATE INDEX "listing_snapshots_createdAt_idx" ON "listing_snapshots"("createdAt");
