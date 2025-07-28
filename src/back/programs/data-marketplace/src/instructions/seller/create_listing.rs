use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::*;

pub fn create_listing(
    ctx: Context<CreateListing>,
    start_date: i64,
    end_date: i64,
    price_per_day: u64,
) -> Result<()> {
    require!(start_date < end_date, MarketplaceError::InvalidDateRange);
    require!(price_per_day > 0, MarketplaceError::InvalidPrice);
    
    let listing = &mut ctx.accounts.listing;
    let marketplace_config = &mut ctx.accounts.marketplace_config;
    let data_seller = &mut ctx.accounts.data_seller;
    
    // Check if seller already has a listing
    require!(data_seller.listing_id.is_none(), MarketplaceError::SellerAlreadyHasListing);
    
    // Initialize seller if needed
    if data_seller.seller == Pubkey::default() {
        data_seller.seller = ctx.accounts.seller.key();
        data_seller.total_revenue = 0;
        data_seller.unclaimed_revenue = 0;
        data_seller.bump = ctx.bumps.data_seller;
    }
    
    listing.listing_id = marketplace_config.listing_counter;
    listing.seller = ctx.accounts.seller.key();
    listing.start_date = start_date;
    listing.end_date = end_date;
    listing.price_per_day = price_per_day;
    listing.bump = ctx.bumps.listing;
    
    // Link listing to seller
    data_seller.listing_id = Some(marketplace_config.listing_counter);
    
    marketplace_config.listing_counter += 1;
    
    emit_cpi!(ListingCreatedEvent {
        listing_id: listing.listing_id,
        seller: ctx.accounts.seller.key(),
        start_date,
        end_date,
        price_per_day,
    });
    
    Ok(())
}

#[event_cpi]
#[derive(Accounts)]
pub struct CreateListing<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,
    
    #[account(
        init,
        payer = seller,
        space = 8 + DataListing::INIT_SPACE,
        seeds = [b"listing", marketplace_config.listing_counter.to_le_bytes().as_ref()],
        bump
    )]
    pub listing: Account<'info, DataListing>,
    
    #[account(
        mut,
        seeds = [b"marketplace_config"],
        bump = marketplace_config.bump
    )]
    pub marketplace_config: Account<'info, MarketplaceConfig>,
    
    #[account(
        init_if_needed,
        payer = seller,
        space = 8 + DataSeller::INIT_SPACE,
        seeds = [b"seller", seller.key().as_ref()],
        bump
    )]
    pub data_seller: Account<'info, DataSeller>,
    
    pub system_program: Program<'info, System>,
}

#[event]
pub struct ListingCreatedEvent {
    pub listing_id: u64,
    pub seller: Pubkey,
    pub start_date: i64,
    pub end_date: i64,
    pub price_per_day: u64,
}