-- DropForeignKey
ALTER TABLE "data_sellers" DROP CONSTRAINT "data_sellers_listingId_fkey";

-- AddForeignKey
ALTER TABLE "data_sellers" ADD CONSTRAINT "data_sellers_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "data_listings"("listingId") ON DELETE NO ACTION ON UPDATE NO ACTION;
