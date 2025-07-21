use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;

declare_id!("GUpRsMgjFf9pHfekSZUmjEjPrq52QJGybhJFHAGFczPg");

pub const PROTOCOL_FEE_BPS: u16 = 1000; // 10%
pub const BPS_DENOMINATOR: u16 = 10000;

#[program]
pub mod escrow {
    use super::*;

    pub fn create_commitment(
        ctx: Context<CreateCommitment>,
        amount: u64,
        unlock_time: i64,
        authority: Pubkey,
        created_at: i64,
    ) -> Result<()> {
        let commitment = &mut ctx.accounts.commitment;
        let clock = Clock::get()?;
        
        // Verify the provided timestamp matches the current time (with small tolerance)
        require!(
            (clock.unix_timestamp - created_at).abs() <= 5,
            EscrowError::InvalidTimestamp
        );
        
        require!(
            unlock_time > clock.unix_timestamp,
            EscrowError::InvalidUnlockTime
        );

        commitment.user = ctx.accounts.user.key();
        commitment.amount = amount;
        commitment.unlock_time = unlock_time;
        commitment.authority = authority;
        commitment.created_at = created_at;
        commitment.bump = ctx.bumps.commitment;

        // Transfer SOL to commitment PDA
        let ix = system_instruction::transfer(
            &ctx.accounts.user.key(),
            &commitment.key(),
            amount,
        );
        
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.user.to_account_info(),
                ctx.accounts.commitment.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        Ok(())
    }

    pub fn claim_commitment(ctx: Context<ClaimCommitment>) -> Result<()> {
        let commitment = &ctx.accounts.commitment;
        let clock = Clock::get()?;
        
        require!(
            clock.unix_timestamp >= commitment.unlock_time,
            EscrowError::StillLocked
        );

        let commitment_balance = ctx.accounts.commitment.to_account_info().lamports();
        let rent_exempt = Rent::get()?.minimum_balance(commitment.to_account_info().data_len());
        let total_amount = commitment_balance.saturating_sub(rent_exempt);

        // Transfer everything back to user
        **ctx.accounts.commitment.to_account_info().try_borrow_mut_lamports()? -= total_amount;
        **ctx.accounts.user.to_account_info().try_borrow_mut_lamports()? += total_amount;

        Ok(())
    }

    pub fn forfeit_commitment(ctx: Context<ForfeitCommitment>) -> Result<()> {
        let commitment = &ctx.accounts.commitment;
        let clock = Clock::get()?;
        
        require!(
            clock.unix_timestamp < commitment.unlock_time,
            EscrowError::AlreadyUnlocked
        );

        let commitment_balance = ctx.accounts.commitment.to_account_info().lamports();
        let rent_exempt = Rent::get()?.minimum_balance(commitment.to_account_info().data_len());
        let total_amount = commitment_balance.saturating_sub(rent_exempt);

        // Calculate protocol fee (10%)
        let protocol_fee = (total_amount as u128)
            .checked_mul(PROTOCOL_FEE_BPS as u128)
            .unwrap()
            .checked_div(BPS_DENOMINATOR as u128)
            .unwrap() as u64;

        let treasury_amount = total_amount.saturating_sub(protocol_fee);

        // Transfer 10% to protocol treasury
        **ctx.accounts.commitment.to_account_info().try_borrow_mut_lamports()? -= protocol_fee;
        **ctx.accounts.protocol_treasury.to_account_info().try_borrow_mut_lamports()? += protocol_fee;

        // Transfer 90% to treasury
        **ctx.accounts.commitment.to_account_info().try_borrow_mut_lamports()? -= treasury_amount;
        **ctx.accounts.treasury.to_account_info().try_borrow_mut_lamports()? += treasury_amount;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(amount: u64, unlock_time: i64, authority: Pubkey, created_at: i64)]
pub struct CreateCommitment<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + Commitment::INIT_SPACE,
        seeds = [b"commitment", user.key().as_ref(), &created_at.to_le_bytes(), &unlock_time.to_le_bytes()],
        bump
    )]
    pub commitment: Account<'info, Commitment>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimCommitment<'info> {
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

#[derive(Accounts)]
pub struct ForfeitCommitment<'info> {
    #[account(
        mut,
        seeds = [b"commitment", commitment.user.as_ref(), &commitment.created_at.to_le_bytes(), &commitment.unlock_time.to_le_bytes()],
        bump = commitment.bump,
        close = user
    )]
    pub commitment: Account<'info, Commitment>,
    
    /// Authority that can forfeit this commitment
    #[account(
        constraint = authority.key() == commitment.authority @ EscrowError::InvalidAuthority
    )]
    pub authority: Signer<'info>,
    
    /// User whose commitment is being forfeited
    #[account(
        mut,
        constraint = user.key() == commitment.user @ EscrowError::InvalidUser
    )]
    pub user: SystemAccount<'info>,
    
    /// CHECK: Treasury account
    #[account(mut)]
    pub treasury: AccountInfo<'info>,
    
    /// CHECK: Protocol treasury
    #[account(mut)]
    pub protocol_treasury: AccountInfo<'info>,
}

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

#[error_code]
pub enum EscrowError {
    #[msg("Invalid unlock time")]
    InvalidUnlockTime,
    #[msg("Commitment is still locked")]
    StillLocked,
    #[msg("Commitment has already been unlocked")]
    AlreadyUnlocked,
    #[msg("Invalid user")]
    InvalidUser,
    #[msg("Invalid authority")]
    InvalidAuthority,
    #[msg("Invalid timestamp - must be within 5 seconds of current time")]
    InvalidTimestamp,
}