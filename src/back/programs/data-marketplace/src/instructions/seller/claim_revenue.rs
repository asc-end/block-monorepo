use anchor_lang::prelude::*;
use anchor_lang::system_program;
use crate::state::*;
use crate::errors::*;

pub fn claim_revenue(
    ctx: Context<ClaimRevenue>,
    amount: u64,
    merkle_proof: Vec<[u8; 32]>,
) -> Result<()> {
    let revenue_claim = &mut ctx.accounts.revenue_claim;
    let merkle_distributor = &ctx.accounts.merkle_distributor;
    let marketplace_config = &mut ctx.accounts.marketplace_config;
    let data_seller = &mut ctx.accounts.data_seller;
    
    // Check if already claimed by verifying the account exists and has claimed amount
    if revenue_claim.seller != Pubkey::default() && revenue_claim.amount_claimed > 0 {
        return Err(MarketplaceError::AlreadyClaimed.into());
    }
    
    // Verify merkle proof
    let leaf = anchor_lang::solana_program::keccak::hashv(&[
        &ctx.accounts.seller.key().to_bytes(),
        &amount.to_le_bytes(),
    ]);
    
    require!(
        verify_merkle_proof(
            &merkle_proof,
            merkle_distributor.merkle_root,
            leaf.0
        ),
        MarketplaceError::InvalidMerkleProof
    );
    
    // Initialize revenue claim if needed
    if revenue_claim.seller == Pubkey::default() {
        revenue_claim.seller = ctx.accounts.seller.key();
        revenue_claim.period_id = merkle_distributor.period_id;
        revenue_claim.amount_claimed = 0;
        revenue_claim.claim_timestamp = 0;
        revenue_claim.bump = ctx.bumps.revenue_claim;
    }
    
    // Transfer funds from marketplace pool
    // Since marketplace_config is a PDA with data, we need to deduct lamports directly
    **marketplace_config.to_account_info().try_borrow_mut_lamports()? -= amount;
    **ctx.accounts.seller.to_account_info().try_borrow_mut_lamports()? += amount;
    
    // Update claim record
    revenue_claim.amount_claimed = amount;
    revenue_claim.claim_timestamp = Clock::get()?.unix_timestamp;
    
    // Update seller's total revenue
    data_seller.total_revenue = data_seller
        .total_revenue
        .checked_add(amount)
        .ok_or(MarketplaceError::ArithmeticOverflow)?;
    
    // Update merkle distributor tracking
    let merkle_distributor = &mut ctx.accounts.merkle_distributor;
    merkle_distributor.total_claims += 1;
    merkle_distributor.claimed_amount = merkle_distributor
        .claimed_amount
        .checked_add(amount)
        .ok_or(MarketplaceError::ArithmeticOverflow)?;
    
    emit_cpi!(RevenueClaimedEvent {
        seller: ctx.accounts.seller.key(),
        period_id: merkle_distributor.period_id,
        amount,
    });
    
    Ok(())
}

fn verify_merkle_proof(
    proof: &[[u8; 32]],
    root: [u8; 32],
    leaf: [u8; 32],
) -> bool {
    let mut computed_hash = leaf;
    
    for proof_element in proof.iter() {
        if computed_hash <= *proof_element {
            computed_hash = anchor_lang::solana_program::keccak::hashv(&[
                &computed_hash,
                proof_element,
            ]).0;
        } else {
            computed_hash = anchor_lang::solana_program::keccak::hashv(&[
                proof_element,
                &computed_hash,
            ]).0;
        }
    }
    
    computed_hash == root
}

#[event_cpi]
#[derive(Accounts)]
pub struct ClaimRevenue<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,
    
    #[account(
        mut,
        seeds = [b"merkle_distributor", merkle_distributor.period_id.to_le_bytes().as_ref()],
        bump = merkle_distributor.bump
    )]
    pub merkle_distributor: Account<'info, MerkleDistributor>,
    
    #[account(
        init_if_needed,
        payer = seller,
        space = 8 + SellerRevenueClaim::INIT_SPACE,
        seeds = [
            b"revenue_claim",
            seller.key().as_ref(),
            merkle_distributor.period_id.to_le_bytes().as_ref()
        ],
        bump
    )]
    pub revenue_claim: Account<'info, SellerRevenueClaim>,
    
    #[account(
        mut,
        seeds = [b"marketplace_config"],
        bump = marketplace_config.bump
    )]
    pub marketplace_config: Account<'info, MarketplaceConfig>,
    
    #[account(
        mut,
        seeds = [b"seller", seller.key().as_ref()],
        bump = data_seller.bump
    )]
    pub data_seller: Account<'info, DataSeller>,
    
    pub system_program: Program<'info, System>,
}

#[event]
pub struct RevenueClaimedEvent {
    pub seller: Pubkey,
    pub period_id: u64,
    pub amount: u64,
}