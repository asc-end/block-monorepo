use anchor_lang::prelude::*;
use crate::errors::EscrowError;
use crate::Commitment;
use anchor_lang::solana_program::clock::Clock;
use anchor_lang::solana_program::system_instruction;


pub fn create_commitment( ctx: Context<Create>, id: u64, amount: u64, unlock_time: i64, authority: Pubkey) -> Result<()> {
    let clock = Clock::get()?;

    require!( unlock_time > clock.unix_timestamp, EscrowError::InvalidUnlockTime );

    // Initialize commitment account data
    let commitment = &mut ctx.accounts.commitment;
    commitment.user = ctx.accounts.user.key();
    commitment.id = id;
    commitment.amount = amount;
    commitment.unlock_time = unlock_time;
    commitment.authority = authority;
    commitment.created_at = clock.unix_timestamp;
    commitment.bump = ctx.bumps.commitment;

    // Store values we need for the event before moving ownership
    let commitment_key = commitment.key();

    // Transfer SOL to commitment PDA
    let ix = system_instruction::transfer(&ctx.accounts.user.key(), &commitment_key, amount);

    anchor_lang::solana_program::program::invoke(
        &ix,
        &[
            ctx.accounts.user.to_account_info(),
            ctx.accounts.commitment.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
    )?;

    emit_cpi!(CommitmentCreatedEvent{
            commitment: commitment_key,
            user: ctx.accounts.user.key(),
            id,
            amount,
            unlock_time,
            authority,
            created_at: clock.unix_timestamp,
    });

    Ok(())
}

#[event_cpi]
#[derive(Accounts)]
#[instruction(id: u64, amount: u64, unlock_time: i64, authority: Pubkey)]
pub struct Create<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + Commitment::INIT_SPACE,
        seeds = [b"commitment", user.key().as_ref(), &id.to_le_bytes()],
        bump
    )]
    pub commitment: Account<'info, Commitment>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[event]
pub struct CommitmentCreatedEvent {
    pub commitment: Pubkey,
    pub user: Pubkey,
    pub id: u64,
    pub amount: u64,
    pub unlock_time: i64,
    pub authority: Pubkey,
    pub created_at: i64,
}