use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Commitment {
    pub user: Pubkey,
    pub id: u64,
    pub amount: u64,
    pub unlock_time: i64,
    pub authority: Pubkey,
    pub created_at: i64,
    pub bump: u8,
}