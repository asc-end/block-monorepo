/*
  Warnings:

  - A unique constraint covering the columns `[listingId]` on the table `data_sellers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "data_sellers_listingId_key" ON "data_sellers"("listingId");

-- AddForeignKey
ALTER TABLE "data_sellers" ADD CONSTRAINT "data_sellers_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "data_listings"("listingId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller_proofs" ADD CONSTRAINT "seller_proofs_sellerAddress_fkey" FOREIGN KEY ("sellerAddress") REFERENCES "data_sellers"("sellerAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
