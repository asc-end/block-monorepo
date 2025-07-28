use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use anchor_spl::metadata::{
    create_metadata_accounts_v3,
    CreateMetadataAccountsV3,
    Metadata as Metaplex,
};
use mpl_token_metadata::types::DataV2;
use crate::state::*;
use crate::errors::*;

/// Verify merkle proof for a leaf
fn verify_proof(
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

pub fn purchase_data_pass(
    ctx: Context<PurchaseDataPass>, 
    start_date: i64, 
    end_date: i64, 
    max_price_per_day: u64, 
    eligibility_merkle_root: [u8; 32],
    eligible_seller_count: u32,
    count_proof: Vec<[u8; 32]>,
) -> Result<()> {
    require!(start_date < end_date, MarketplaceError::InvalidDateRange);
    require!(max_price_per_day > 0, MarketplaceError::InvalidPrice);
    require!(eligible_seller_count > 0, MarketplaceError::InvalidSellerCount);
    
    // Verify the count is in the merkle tree
    // Create the count leaf (same way as in the backend)
    let mut count_leaf_data = [0u8; 32];
    count_leaf_data[..4].copy_from_slice(&eligible_seller_count.to_le_bytes());
    let count_leaf = anchor_lang::solana_program::keccak::hashv(&[&count_leaf_data]).0;
    
    // Verify the proof
    require!(
        verify_proof(&count_proof, eligibility_merkle_root, count_leaf),
        MarketplaceError::InvalidMerkleProof
    );
    
    let marketplace_config = &mut ctx.accounts.marketplace_config;
    let data_pass = &mut ctx.accounts.data_pass;
    
    // Calculate total days and payment
    let days = (end_date - start_date) / 86400;
    require!(days > 0 && days <= 365, MarketplaceError::InvalidDateRange);
    
    let total_payment = max_price_per_day * days as u64 * eligible_seller_count as u64;
    
    // Initialize data pass
    data_pass.pass_id = marketplace_config.pass_counter;
    data_pass.buyer = ctx.accounts.buyer.key();
    data_pass.start_date = start_date;
    data_pass.end_date = end_date;
    data_pass.max_price_per_day = max_price_per_day;
    data_pass.total_paid = total_payment;
    data_pass.data_nft_mint = ctx.accounts.pass_nft_mint.key();
    data_pass.purchased_at = Clock::get()?.unix_timestamp;
    data_pass.eligibility_merkle_root = eligibility_merkle_root;
    data_pass.eligible_seller_count = eligible_seller_count;
    data_pass.bump = ctx.bumps.data_pass;
    
    // Mint NFT to buyer
    let seeds = &[
        b"marketplace_config".as_ref(),
        &[marketplace_config.bump],
    ];
    let signer = &[&seeds[..]];
    
    token::mint_to(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::MintTo {
                mint: ctx.accounts.pass_nft_mint.to_account_info(),
                to: ctx.accounts.buyer_nft_account.to_account_info(),
                authority: marketplace_config.to_account_info(),
            },
            signer,
        ),
        1,
    )?;
    
    // Create metadata
    let metadata_name = format!("Data Pass #{}", marketplace_config.pass_counter);
    let metadata_symbol = "PASS";
    let metadata_uri = format!(
        "https://api.datamarketplace.com/metadata/pass/{}",
        data_pass.pass_id
    );
    
    create_metadata_accounts_v3(
        CpiContext::new_with_signer(
            ctx.accounts.token_metadata_program.to_account_info(),
            CreateMetadataAccountsV3 {
                metadata: ctx.accounts.metadata_account.to_account_info(),
                mint: ctx.accounts.pass_nft_mint.to_account_info(),
                mint_authority: marketplace_config.to_account_info(),
                payer: ctx.accounts.buyer.to_account_info(),
                update_authority: marketplace_config.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
            },
            signer,
        ),
        DataV2 {
            name: metadata_name,
            symbol: metadata_symbol.to_string(),
            uri: metadata_uri,
            seller_fee_basis_points: 0,
            creators: None,
            collection: None,
            uses: None,
        },
        true,
        true,
        None,
    )?;
    
    // Transfer payment to pool
    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.buyer.to_account_info(),
                to: marketplace_config.to_account_info(),
            },
        ),
        total_payment,
    )?;
    
    // Update marketplace stats
    marketplace_config.current_period_revenue += total_payment;
    marketplace_config.total_lifetime_revenue += total_payment;
    marketplace_config.pass_counter += 1;
    
    emit_cpi!(DataPassPurchasedEvent {
        pass_id: data_pass.pass_id,
        buyer: ctx.accounts.buyer.key(),
        start_date,
        end_date,
        total_paid: total_payment,
        eligible_seller_count,
    });
    
    Ok(())
}

#[event_cpi]
#[derive(Accounts)]
pub struct PurchaseDataPass<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    
    #[account(
        init,
        payer = buyer,
        space = 8 + DataPass::INIT_SPACE,
        seeds = [b"data_pass", marketplace_config.pass_counter.to_le_bytes().as_ref()],
        bump
    )]
    pub data_pass: Account<'info, DataPass>,
    
    #[account(
        mut,
        seeds = [b"marketplace_config"],
        bump = marketplace_config.bump
    )]
    pub marketplace_config: Account<'info, MarketplaceConfig>,
    
    #[account(
        init,
        payer = buyer,
        mint::decimals = 0,
        mint::authority = marketplace_config,
        seeds = [b"pass_nft", data_pass.key().as_ref()],
        bump
    )]
    pub pass_nft_mint: Account<'info, Mint>,
    
    #[account(
        init,
        payer = buyer,
        associated_token::mint = pass_nft_mint,
        associated_token::authority = buyer
    )]
    pub buyer_nft_account: Account<'info, TokenAccount>,
    
    /// CHECK: Metadata account
    #[account(
        mut,
        seeds = [
            b"metadata",
            token_metadata_program.key().as_ref(),
            pass_nft_mint.key().as_ref()
        ],
        seeds::program = token_metadata_program.key(),
        bump
    )]
    pub metadata_account: UncheckedAccount<'info>,
    
    pub token_program: Program<'info, Token>,
    pub token_metadata_program: Program<'info, Metaplex>,
    pub associated_token_program: Program<'info, anchor_spl::associated_token::AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[event]
pub struct DataPassPurchasedEvent {
    pub pass_id: u64,
    pub buyer: Pubkey,
    pub start_date: i64,
    pub end_date: i64,
    pub total_paid: u64,
    pub eligible_seller_count: u32,
}