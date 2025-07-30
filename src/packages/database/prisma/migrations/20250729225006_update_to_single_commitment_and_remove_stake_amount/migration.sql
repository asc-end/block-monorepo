/*
  Warnings:

  - You are about to drop the column `stakeAmount` on the `routines` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[routineId]` on the table `commitments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[focusSessionId]` on the table `commitments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "routines" DROP COLUMN "stakeAmount";

-- CreateIndex
CREATE UNIQUE INDEX "commitments_routineId_key" ON "commitments"("routineId");

-- CreateIndex
CREATE UNIQUE INDEX "commitments_focusSessionId_key" ON "commitments"("focusSessionId");
