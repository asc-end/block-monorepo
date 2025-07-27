pub mod errors;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("5CkSqkGqrHKRzVWVRJGa1odNcaXo4bJnt9Sq2Npqpxpj");

#[program]
pub mod data_marketplace {
    use super::*;

    pub fn initialize_marketplace(ctx: Context<InitializeMarketplace>) -> Result<()> {
        instructions::initialize::initialize_marketplace(ctx)
    }

    
    pub fn create_listing(
        ctx: Context<CreateListing>,
        start_date: i64,
        end_date: i64,
        price_per_day: u64,
    ) -> Result<()> {
        instructions::create_listing::create_listing(
            ctx,
            start_date,
            end_date,
            price_per_day,
        )
    }
    
    pub fn update_listing(
        ctx: Context<UpdateListing>,
        new_end_date: Option<i64>,
        new_price_per_day: Option<u64>,
    ) -> Result<()> {
        instructions::update_listing::update_listing(ctx, new_end_date, new_price_per_day)
    }
    
    pub fn remove_listing(ctx: Context<RemoveListing>) -> Result<()> {
        instructions::remove_listing::remove_listing(ctx)
    }
    
    pub fn purchase_data_pass(
        ctx: Context<PurchaseDataPass>,
        start_date: i64,
        end_date: i64,
        max_price_per_day: u64,
        eligibility_merkle_root: [u8; 32],
        eligible_seller_count: u32,
        count_proof: Vec<[u8; 32]>,
    ) -> Result<()> {
        instructions::purchase_data_pass::purchase_data_pass(
            ctx, 
            start_date, 
            end_date, 
            max_price_per_day,
            eligibility_merkle_root,
            eligible_seller_count,
            count_proof
        )
    }
    
    pub fn claim_revenue(
        ctx: Context<ClaimRevenue>,
        amount: u64,
        merkle_proof: Vec<[u8; 32]>,
    ) -> Result<()> {
        instructions::claim_revenue::claim_revenue(ctx, amount, merkle_proof)
    }
    
    pub fn update_merkle_root(
        ctx: Context<UpdateMerkleRoot>,
        merkle_root: [u8; 32],
    ) -> Result<()> {
        instructions::update_merkle_root::update_merkle_root(
            ctx,
            merkle_root,
        )
    }
}