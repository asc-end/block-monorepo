use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::*;

pub fn update_merkle_root( ctx: Context<UpdateMerkleRoot>, merkle_root: [u8; 32]) -> Result<()> {
    let marketplace_config = &mut ctx.accounts.marketplace_config;
    let merkle_distributor = &mut ctx.accounts.merkle_distributor;
    let current_timestamp = Clock::get()?.unix_timestamp;
    
    merkle_distributor.merkle_root = merkle_root;
    merkle_distributor.total_pool_balance = marketplace_config.current_period_revenue;
    merkle_distributor.snapshot_timestamp = current_timestamp;
    merkle_distributor.period_id = marketplace_config.snapshot_period;
    merkle_distributor.total_claims = 0;
    merkle_distributor.claimed_amount = 0;
    merkle_distributor.bump = ctx.bumps.merkle_distributor;
    
    // Reset current period revenue for next period
    marketplace_config.current_period_revenue = 0;
    marketplace_config.snapshot_period += 1;
    
    emit_cpi!(MerkleRootUpdatedEvent {
        period_id: merkle_distributor.period_id,
        merkle_root,
        total_pool_balance: merkle_distributor.total_pool_balance,
    });
    
    Ok(())
}

#[derive(Accounts)]
pub struct UpdateMerkleRoot<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    
    #[account(
        mut,
        seeds = [b"marketplace_config"],
        bump = marketplace_config.bump,
        constraint = marketplace_config.authority == authority.key() @ MarketplaceError::Unauthorized
    )]
    pub marketplace_config: Account<'info, MarketplaceConfig>,
    
    #[account(
        init_if_needed,
        payer = authority,
        space = 8 + MerkleDistributor::INIT_SPACE,
        seeds = [b"merkle_distributor", marketplace_config.snapshot_period.to_le_bytes().as_ref()],
        bump
    )]
    pub merkle_distributor: Account<'info, MerkleDistributor>,
    
    pub system_program: Program<'info, System>,
}

#[event]
pub struct MerkleRootUpdatedEvent {
    pub period_id: u64,
    pub merkle_root: [u8; 32],
    pub total_pool_balance: u64,
}