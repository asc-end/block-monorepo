-- CreateEnum
CREATE TYPE "CommitmentStatus" AS ENUM ('active', 'claimed', 'forfeited');

-- CreateTable
CREATE TABLE "commitments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userPubkey" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "unlockTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "authorityPubkey" TEXT NOT NULL,
    "status" "CommitmentStatus" NOT NULL DEFAULT 'active',
    "claimedAt" TIMESTAMP(3),
    "forfeitedAt" TIMESTAMP(3),
    "txSignature" TEXT,
    "routineId" TEXT,
    "focusSessionId" TEXT,

    CONSTRAINT "commitments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "commitments_userId_idx" ON "commitments"("userId");

-- CreateIndex
CREATE INDEX "commitments_status_idx" ON "commitments"("status");

-- CreateIndex
CREATE INDEX "commitments_unlockTime_idx" ON "commitments"("unlockTime");

-- CreateIndex
CREATE INDEX "commitments_routineId_idx" ON "commitments"("routineId");

-- CreateIndex
CREATE INDEX "commitments_focusSessionId_idx" ON "commitments"("focusSessionId");

-- AddForeignKey
ALTER TABLE "commitments" ADD CONSTRAINT "commitments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commitments" ADD CONSTRAINT "commitments_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "routines"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commitments" ADD CONSTRAINT "commitments_focusSessionId_fkey" FOREIGN KEY ("focusSessionId") REFERENCES "focus_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
