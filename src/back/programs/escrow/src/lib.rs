pub mod errors;
pub mod instructions;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("DYuG4KZ6S1A19aXzDwFhsCDiEHB99t4WgjF5xgbbxtRZ");

pub const PROTOCOL_FEE_BPS: u16 = 1000; // 10%
pub const BPS_DENOMINATOR: u16 = 10000;
pub const TREASURY_KEY: Pubkey = pubkey!("DoGXPkPav6iyXk6sKnaBQdzP2PsJ9hVZnv6CpPgVzkkA");

#[account]
#[derive(InitSpace)]
pub struct Commitment {
    pub user: Pubkey,
    pub amount: u64,
    pub unlock_time: i64,
    pub authority: Pubkey,
    pub created_at: i64,
    pub bump: u8,
}

#[program]
pub mod escrow {
    use super::*;

    pub fn create_commitment( ctx: Context<Create>, amount: u64, unlock_time: i64, authority: Pubkey, created_at: i64) -> Result<()> {
        create::create_commitment(ctx, amount, unlock_time, authority, created_at)
    }

    pub fn claim_commitment(ctx: Context<Claim>) -> Result<()> {
        claim::claim_commitment(ctx)
    }

    pub fn forfeit_commitment(ctx: Context<Forfeit>) -> Result<()> {
        forfeit::forfeit_commitment(ctx)
    }
}



// TODO: Add user stats account to track historical data
// #[account]
// #[derive(InitSpace)]
// pub struct UserStats {
//     pub user: Pubkey,
//     pub total_committed: u64,
//     pub total_claimed: u64,
//     pub total_forfeited: u64,
//     pub commitment_count: u32,
//     pub bump: u8,
// }
// This would cost ~0.002 SOL in rent-exemption per user (permanent storage)

#[cfg(all(test, feature = "litesvm"))]
mod litesvm_tests {
    include!("../tests/litesvm_tests.rs");
}
