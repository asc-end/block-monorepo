use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::*;

pub fn update_listing(
    ctx: Context<UpdateListing>,
    new_end_date: Option<i64>,
    new_price_per_day: Option<u64>,
) -> Result<()> {
    let listing = &mut ctx.accounts.listing;
    
    if let Some(new_end) = new_end_date {
        require!(new_end > listing.end_date, MarketplaceError::InvalidDateRange);
        listing.end_date = new_end;
    }
    
    if let Some(new_price) = new_price_per_day {
        require!(new_price > 0, MarketplaceError::InvalidPrice);
        listing.price_per_day = new_price;
    }
    
    emit_cpi!(ListingUpdatedEvent {
        listing_id: listing.listing_id,
        seller: ctx.accounts.seller.key(),
        new_end_date: listing.end_date,
        new_price_per_day: listing.price_per_day,
    });
    
    Ok(())
}

#[event_cpi]
#[derive(Accounts)]
pub struct UpdateListing<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,
    
    #[account(
        mut,
        seeds = [b"listing", listing.listing_id.to_le_bytes().as_ref()],
        bump = listing.bump,
        constraint = listing.seller == seller.key() @ MarketplaceError::Unauthorized
    )]
    pub listing: Account<'info, DataListing>,
}

#[event]
pub struct ListingUpdatedEvent {
    pub listing_id: u64,
    pub seller: Pubkey,
    pub new_end_date: i64,
    pub new_price_per_day: u64,
}
