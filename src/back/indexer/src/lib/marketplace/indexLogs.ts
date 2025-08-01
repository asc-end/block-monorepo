import { MerkleService } from "../../services/merkleService";
import { ScheduleService } from "../../services/scheduleService";
import { prisma } from "../prisma";

export async function handleListingCreated(data: any) {
    try {
        const listingId = data.listingId.toString();
        const sellerAddress = data.seller.toString();
        
        console.log('Listing created:', {
            listingId,
            seller: sellerAddress,
            pricePerDay: data.pricePerDay.toString()
        });

        // Update the seller's listingId to reference the new listing
        await prisma.dataSeller.update({
            where: { sellerAddress },
            data: { listingId }
        });

        console.log(`Updated seller ${sellerAddress} with listing ${listingId}`);
    } catch (error) {
        console.error('Error handling listing created event:', error);
    }
}

export async function handleListingUpdated(data: any) {
    try {
        const listingId = data.listingId.toString();
        const updateData: any = {};
        
        // Only update fields that were actually changed
        if (data.newEndDate && data.newEndDate.toNumber() > 0) {
            updateData.endDate = new Date(data.newEndDate.toNumber() * 1000);
        }
        
        if (data.newPricePerDay && data.newPricePerDay.toString() !== '0') {
            updateData.pricePerDay = data.newPricePerDay.toString();
        }
        
        console.log('Listing updated:', {
            listingId,
            updates: updateData
        });

        // Update the listing in the database
        if (Object.keys(updateData).length > 0) {
            await prisma.dataListing.update({
                where: { listingId },
                data: updateData
            });
            console.log(`Updated listing ${listingId} in database`);
        }
    } catch (error) {
        console.error('Error handling listing updated event:', error);
    }
}

export async function handleListingRemoved(data: any) {
    try {
        const listingId = data.listingId.toString();
        const sellerAddress = data.seller.toString();
        
        console.log('Listing removed:', {
            listingId,
            seller: sellerAddress
        });

        // Start a transaction to ensure both updates happen together
        await prisma.$transaction(async (tx) => {
            // Mark the listing as inactive
            await tx.dataListing.update({
                where: { listingId },
                data: { isActive: false }
            });

            // Remove the listing reference from the seller
            await tx.dataSeller.update({
                where: { sellerAddress },
                data: { listingId: null }
            });
        });

        console.log(`Marked listing ${listingId} as inactive and removed from seller ${sellerAddress}`);
    } catch (error) {
        console.error('Error handling listing removed event:', error);
    }
}

export async function handleDataPassPurchased(data: any) {
    try {
        console.log('Data pass purchased:', {
            passId: data.passId.toString(),
            buyer: data.buyer.toString(),
            totalPaid: data.totalPaid.toString(),
            eligibleSellerCount: data.eligibleSellerCount
        });

        // Trigger merkle distribution update for the current period
        const periodId = ScheduleService.getCurrentPeriodId();

        // Generate distribution (this would be done periodically, not on every purchase)
        // In production, you might batch these or do them on a schedule
        console.log(`Scheduling merkle update for period ${periodId} after pass purchase`);

    } catch (error) {
        console.error('Error handling data pass purchased event:', error);
    }
}

export async function handleRevenueClaimed(data: any) {
    try {
        const sellerAddress = data.seller.toString();
        const periodId = BigInt(data.periodId.toString());
        const amount = data.amount.toString();
        
        console.log('Revenue claimed:', {
            seller: sellerAddress,
            periodId: periodId.toString(),
            amount
        });

        // Mark the proof as claimed in database
        await prisma.sellerProof.update({
            where: {
                sellerAddress_periodId: {
                    sellerAddress,
                    periodId
                }
            },
            data: {
                claimed: true,
                claimedAt: new Date()
            }
        });

        // Update the seller's unclaimed revenue
        const seller = await prisma.dataSeller.findUnique({
            where: { sellerAddress }
        });
        
        if (seller) {
            const currentUnclaimed = BigInt(seller.unclaimedRevenue);
            const claimedAmount = BigInt(amount);
            const newUnclaimed = currentUnclaimed - claimedAmount;
            
            await prisma.dataSeller.update({
                where: { sellerAddress },
                data: {
                    unclaimedRevenue: newUnclaimed.toString()
                }
            });
        }

        console.log(`Marked proof as claimed for seller ${sellerAddress}, period ${periodId}`);
    } catch (error) {
        console.error('Error handling revenue claimed event:', error);
    }
}