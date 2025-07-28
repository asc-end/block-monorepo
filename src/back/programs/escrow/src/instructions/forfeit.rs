use anchor_lang::solana_program::clock::Clock;
use anchor_lang::solana_program::rent::Rent;
use anchor_lang::prelude::*;
use crate::errors::EscrowError;
use crate::Commitment;
// use crate::PROTOCOL_FEE_BPS;
// use crate::BPS_DENOMINATOR;
use crate::TREASURY_KEY;
// use crate::PROTOCOL_TREASURY_KEY;

pub fn forfeit_commitment(ctx: Context<Forfeit>) -> Result<()> {
    let commitment = &ctx.accounts.commitment;
    let clock = Clock::get()?;

    require!( clock.unix_timestamp < commitment.unlock_time, EscrowError::AlreadyUnlocked );

    let commitment_balance = ctx.accounts.commitment.to_account_info().lamports();
    let rent_exempt = Rent::get()?.minimum_balance(commitment.to_account_info().data_len());
    let total_amount = commitment_balance.saturating_sub(rent_exempt);

    // Calculate protocol fee (10%)
    // let protocol_fee = (total_amount as u128)
    //     .checked_mul(PROTOCOL_FEE_BPS as u128)
    //     .unwrap()
    //     .checked_div(BPS_DENOMINATOR as u128)
    //     .unwrap() as u64;

    // let treasury_amount = total_amount.saturating_sub(protocol_fee);

    // // Transfer 10% to protocol treasury
    // **ctx
    //     .accounts
    //     .commitment
    //     .to_account_info()
    //     .try_borrow_mut_lamports()? -= protocol_fee;
    // **ctx
    //     .accounts
    //     .protocol_treasury
    //     .to_account_info()
    //     .try_borrow_mut_lamports()? += protocol_fee;

    // Transfer 90% to treasury
    **ctx
        .accounts
        .commitment
        .to_account_info()
        .try_borrow_mut_lamports()? -= total_amount;
    **ctx
        .accounts
        .treasury
        .to_account_info()
        .try_borrow_mut_lamports()? += total_amount;

    // Emit event for historical tracking
    emit_cpi!(CommitmentForfeitedEvent {
        commitment: commitment.key(),
        user: commitment.user,
        amount: commitment.amount,
        unlock_time: commitment.unlock_time,
        // protocol_fee: protocol_fee,
        // treasury_amount: treasury_amount,
    });

    Ok(())
}

#[event_cpi]
#[derive(Accounts)]
pub struct Forfeit<'info> {
    #[account(
        mut,
        seeds = [b"commitment", commitment.user.as_ref(), &commitment.id.to_le_bytes()],
        bump = commitment.bump,
        close = user
    )]
    pub commitment: Account<'info, Commitment>,

    /// Authority that can forfeit this commitment
    #[account( constraint = authority.key() == commitment.authority @ EscrowError::InvalidAuthority)]
    pub authority: Signer<'info>,

    /// User whose commitment is being forfeited
    #[account( mut, constraint = user.key() == commitment.user @ EscrowError::InvalidUser)]
    pub user: SystemAccount<'info>,

    /// Treasury account
    /// CHECK: Treasury account
    #[account( mut, constraint = treasury.key() == TREASURY_KEY @ EscrowError::InvalidTreasury)]
    pub treasury: AccountInfo<'info>,
}

#[event]
pub struct CommitmentForfeitedEvent {
    pub commitment: Pubkey,
    pub user: Pubkey,
    pub amount: u64,
    pub unlock_time: i64,
    // pub protocol_fee: u64,
    // pub treasury_amount: u64,
}
