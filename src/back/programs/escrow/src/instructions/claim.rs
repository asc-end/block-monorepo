use anchor_lang::prelude::*;
use crate::errors::EscrowError;
use crate::Commitment;

pub fn claim_commitment(ctx: Context<Claim>) -> Result<()> {
    let commitment = &ctx.accounts.commitment;
    let clock = Clock::get()?;

    require!( clock.unix_timestamp >= commitment.unlock_time, EscrowError::StillLocked );

    // Emit event for historical tracking
    emit_cpi!(CommitmentClaimedEvent {
        commitment: commitment.key(),
        user: commitment.user,
        amount: commitment.amount,
        unlock_time: commitment.unlock_time,
    });

    Ok(())
}

#[event_cpi]
#[derive(Accounts)]
pub struct Claim<'info> {
    #[account(
        mut,
        seeds = [b"commitment", commitment.user.as_ref(), &commitment.created_at.to_le_bytes(), &commitment.unlock_time.to_le_bytes()],
        bump = commitment.bump,
        close = user
    )]
    pub commitment: Account<'info, Commitment>,

    #[account(
        mut,
        constraint = user.key() == commitment.user @ EscrowError::InvalidUser
    )]
    pub user: Signer<'info>,
}


#[event]
pub struct CommitmentClaimedEvent {
    pub commitment: Pubkey,
    pub user: Pubkey,
    pub amount: u64,
    pub unlock_time: i64,
}