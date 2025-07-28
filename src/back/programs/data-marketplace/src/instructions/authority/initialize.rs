use anchor_lang::prelude::*;
use crate::state::*;

pub fn initialize_marketplace(ctx: Context<InitializeMarketplace>) -> Result<()> {
    let marketplace_config = &mut ctx.accounts.marketplace_config;
    marketplace_config.authority = ctx.accounts.authority.key();
    marketplace_config.current_period_revenue = 0;
    marketplace_config.total_lifetime_revenue = 0;
    marketplace_config.listing_counter = 0;
    marketplace_config.pass_counter = 0;
    marketplace_config.snapshot_period = 0;
    marketplace_config.bump = ctx.bumps.marketplace_config;
    Ok(())
}

#[event_cpi]
#[derive(Accounts)]
pub struct InitializeMarketplace<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + MarketplaceConfig::INIT_SPACE,
        seeds = [b"marketplace_config"],
        bump
    )]
    pub marketplace_config: Account<'info, MarketplaceConfig>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}