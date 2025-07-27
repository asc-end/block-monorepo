use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct MarketplaceConfig {
    pub authority: Pubkey,
    pub current_period_revenue: u64,
    pub total_lifetime_revenue: u64,
    pub listing_counter: u64,
    pub pass_counter: u64,
    pub snapshot_period: u64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct DataSeller {
    pub seller: Pubkey,
    pub listing_id: Option<u64>,
    pub total_revenue: u64,
    pub unclaimed_revenue: u64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct DataListing {
    pub listing_id: u64,
    pub seller: Pubkey,
    pub start_date: i64,
    pub end_date: i64,
    pub price_per_day: u64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct DataPass {
    pub pass_id: u64,
    pub buyer: Pubkey,
    pub start_date: i64,
    pub end_date: i64,
    pub max_price_per_day: u64,
    pub total_paid: u64,
    pub data_nft_mint: Pubkey,
    pub purchased_at: i64,
    pub eligibility_merkle_root: [u8; 32], // Merkle root that includes both sellers and count
    pub eligible_seller_count: u32, // Number of sellers included
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct MerkleDistributor {
    pub merkle_root: [u8; 32],
    pub total_pool_balance: u64,
    pub snapshot_timestamp: i64,
    pub period_id: u64,
    pub total_claims: u64,
    pub claimed_amount: u64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct SellerRevenueClaim {
    pub seller: Pubkey,
    pub period_id: u64,
    pub amount_claimed: u64,
    pub claim_timestamp: i64,
    pub bump: u8,
}