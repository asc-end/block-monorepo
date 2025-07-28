use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::*;

pub fn remove_listing(ctx: Context<RemoveListing>) -> Result<()> {
    let data_seller = &mut ctx.accounts.data_seller;
    let listing_id = ctx.accounts.listing.listing_id;
    let seller = ctx.accounts.seller.key();
    
    // Remove listing ID from seller
    data_seller.listing_id = None;
    
    emit_cpi!(ListingRemovedEvent {
        listing_id,
        seller,
    });
    
    Ok(())
}

#[event_cpi]
#[derive(Accounts)]
pub struct RemoveListing<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,
    
    #[account(
        mut,
        close = seller,
        seeds = [b"listing", listing.listing_id.to_le_bytes().as_ref()],
        bump = listing.bump,
        constraint = listing.seller == seller.key() @ MarketplaceError::Unauthorized
    )]
    pub listing: Account<'info, DataListing>,
    
    #[account(
        mut,
        seeds = [b"seller", seller.key().as_ref()],
        bump = data_seller.bump
    )]
    pub data_seller: Account<'info, DataSeller>,
    
    #[account(
        mut,
        seeds = [b"marketplace_config"],
        bump = marketplace_config.bump
    )]
    pub marketplace_config: Account<'info, MarketplaceConfig>,
}

#[event]
pub struct ListingRemovedEvent {
    pub listing_id: u64,
    pub seller: Pubkey,
}