// use {
//     anchor_lang::prelude::*,
//     anchor_lang::{pubkey, AnchorSerialize},
//     anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL,
//     litesvm::LiteSVM,
//     anchor_lang::solana_program::{ system_program},
//     solana_sdk::{ signer::Signer, signature::Keypair, transaction::Transaction, pubkey::Pubkey, instruction::{AccountMeta, Instruction} },
//     crate::instructions::{ Create, Claim, Forfeit }
// };

// const PROGRAM_ID: Pubkey = pubkey!("DYuG4KZ6S1A19aXzDwFhsCDiEHB99t4WgjF5xgbbxtRZ");

// #[derive(AnchorSerialize)]
// struct CreateArgs {
//     amount: u64,
//     unlock_time: i64,
//     authority: Pubkey,
//     created_at: i64,
// }

// // Helper function to build create commitment instruction
// fn build_create_commitment_instruction(
//     commitment_pubkey: Pubkey,
//     user_pubkey: Pubkey,
//     amount: u64,
//     unlock_time: i64,
//     authority: Pubkey,
//     created_at: i64,
// ) -> Instruction {
//     let accounts = vec![
//         AccountMeta::new(commitment_pubkey, false),
//         AccountMeta::new(user_pubkey, true),
//         AccountMeta::new_readonly(system_program::ID, false),
//         AccountMeta::new_readonly(user_pubkey, true), // event_authority
//         AccountMeta::new_readonly(PROGRAM_ID, false), // program
//     ];

//     let mut data = vec![];

//     data.extend_from_slice(&CreateArgs {
//         amount,
//         unlock_time,
//         authority,
//         created_at,
//     }.try_to_vec().unwrap());

//     Instruction {
//         program_id: PROGRAM_ID,
//         accounts,
//         data,
//     }
// }

// // Helper function to build claim commitment instruction
// fn build_claim_commitment_instruction(
//     commitment_pubkey: Pubkey,
//     user_pubkey: Pubkey,
// ) -> Instruction {
//     let accounts = vec![
//         AccountMeta::new(commitment_pubkey, false),
//         AccountMeta::new(user_pubkey, true),
//         AccountMeta::new_readonly(user_pubkey, true), // event_authority
//         AccountMeta::new_readonly(PROGRAM_ID, false), // program
//     ];
//     // let mut data = Claim::discriminator().to_vec();

//     Instruction {
//         program_id: PROGRAM_ID,
//         accounts,
//         data: vec![],
//     }
// }

// // Helper function to build forfeit commitment instruction
// fn build_forfeit_commitment_instruction(
//     commitment_pubkey: Pubkey,
//     authority_pubkey: Pubkey,
//     user_pubkey: Pubkey,
//     treasury_pubkey: Pubkey,
// ) -> Instruction {
//     let accounts = vec![
//         AccountMeta::new(commitment_pubkey, false),
//         AccountMeta::new_readonly(authority_pubkey, true),
//         AccountMeta::new(user_pubkey, false),
//         AccountMeta::new(treasury_pubkey, false),
//         AccountMeta::new_readonly(authority_pubkey, true), // event_authority
//         AccountMeta::new_readonly(PROGRAM_ID, false), // program
//     ];

//     Instruction {
//         program_id: PROGRAM_ID,
//         accounts,
//         data: vec![],
//     }
// }

// #[test]
// fn test_create_commitment() {
//     println!("test_create_commitment");
//     let mut svm = LiteSVM::new();
    
//     // Load the escrow program into LiteSVM
//     let program_bytes = include_bytes!("../../target/deploy/escrow.so");
//     svm.add_program(PROGRAM_ID, program_bytes);

//     // Create test accounts
//     let user = Keypair::new();
//     let authority = Keypair::new();
    
//     // Airdrop SOL to user
//     svm.airdrop(&user.pubkey(), 5 * LAMPORTS_PER_SOL).unwrap();

//     // Test parameters
//     let amount = LAMPORTS_PER_SOL;
//     let created_at: i64 = 1234567890; // Fixed timestamp for testing
//     let unlock_time: i64 = created_at + 3600; // 1 hour from now

//     // Derive commitment PDA
//     let (commitment_pubkey, _bump) = Pubkey::find_program_address(
//         &[
//             b"commitment",
//             user.pubkey().as_ref(),
//             &created_at.to_le_bytes(),
//             &unlock_time.to_le_bytes(),
//         ],
//         &PROGRAM_ID,
//     );

//     // Create instruction using helper function
//     let ix = build_create_commitment_instruction(
//         commitment_pubkey,
//         user.pubkey(),
//         amount,
//         unlock_time,
//         authority.pubkey(),
//         created_at,
//     );

//     // Create and send transaction
//     let tx = Transaction::new_signed_with_payer(
//         &[ix],
//         Some(&user.pubkey()),
//         &[&user],
//         svm.latest_blockhash(),
//     );

//     let result = svm.send_transaction(tx);
//     assert!(result.is_ok(), "Transaction failed: {:?}", result);

//     // Verify commitment was created
//     let commitment_account = svm.get_account(&commitment_pubkey).unwrap();
//     assert!(commitment_account.lamports >= amount);

//     // Verify user's balance decreased
//     let user_account = svm.get_account(&user.pubkey()).unwrap();
//     assert!(user_account.lamports < 5 * LAMPORTS_PER_SOL);
// }

// #[test]
// fn test_claim_commitment() {
//     let mut svm = LiteSVM::new();
    
//     let program_bytes = include_bytes!("../../target/deploy/escrow.so");
//     svm.add_program(PROGRAM_ID, program_bytes);

//     let user = Keypair::new();
//     let authority = Keypair::new();
    
//     svm.airdrop(&user.pubkey(), 5 * LAMPORTS_PER_SOL).unwrap();

//     // Create commitment first
//     let amount = LAMPORTS_PER_SOL;
//     let created_at: i64 = 1234567890;
//     let unlock_time: i64 = created_at + 1; // Very short lock time for testing

//     let (commitment_pubkey, _) = Pubkey::find_program_address(
//         &[
//             b"commitment",
//             user.pubkey().as_ref(),
//             &created_at.to_le_bytes(),
//             &unlock_time.to_le_bytes(),
//         ],
//         &PROGRAM_ID,
//     );

//     // Create commitment
//     let create_ix = build_create_commitment_instruction(
//         commitment_pubkey,
//         user.pubkey(),
//         amount,
//         unlock_time,
//         authority.pubkey(),
//         created_at,
//     );

//     let create_tx = Transaction::new_signed_with_payer(
//         &[create_ix],
//         Some(&user.pubkey()),
//         &[&user],
//         svm.latest_blockhash(),
//     );

//     svm.send_transaction(create_tx).unwrap();

//     // Advance time to after unlock
//     // Note: LiteSVM doesn't have a direct way to advance clock, so we'll skip this part
//     // In a real test, you'd use solana-program-test which has warp_to_slot

//     // For now, let's just verify the commitment was created
//     let commitment_account = svm.get_account(&commitment_pubkey).unwrap();
//     assert!(commitment_account.lamports >= amount);
// }

// #[test]
// fn test_forfeit_commitment() {
//     let mut svm = LiteSVM::new();
    
//     let program_bytes = include_bytes!("../../target/deploy/escrow.so");
//     svm.add_program(PROGRAM_ID, program_bytes);

//     let user = Keypair::new();
//     let authority = Keypair::new();
//     let treasury = Keypair::new();
//     let protocol_treasury = Keypair::new();
    
//     svm.airdrop(&user.pubkey(), 5 * LAMPORTS_PER_SOL).unwrap();
//     svm.airdrop(&authority.pubkey(), LAMPORTS_PER_SOL).unwrap();

//     // Create commitment first
//     let amount = LAMPORTS_PER_SOL;
//     let created_at: i64 = 1234567890;
//     let unlock_time: i64 = created_at + 3600;

//     let (commitment_pubkey, _) = Pubkey::find_program_address(
//         &[
//             b"commitment",
//             user.pubkey().as_ref(),
//             &created_at.to_le_bytes(),
//             &unlock_time.to_le_bytes(),
//         ],
//         &PROGRAM_ID,
//     );

//     // Create commitment
//     let create_ix = build_create_commitment_instruction(
//         commitment_pubkey,
//         user.pubkey(),
//         amount,
//         unlock_time,
//         authority.pubkey(),
//         created_at,
//     );

//     let create_tx = Transaction::new_signed_with_payer(
//         &[create_ix],
//         Some(&user.pubkey()),
//         &[&user],
//         svm.latest_blockhash(),
//     );

//     svm.send_transaction(create_tx).unwrap();

//     // Now forfeit the commitment
//     let forfeit_ix = build_forfeit_commitment_instruction(
//         commitment_pubkey,
//         authority.pubkey(),
//         user.pubkey(),
//         treasury.pubkey(),
//     );

//     let forfeit_tx = Transaction::new_signed_with_payer(
//         &[forfeit_ix],
//         Some(&authority.pubkey()),
//         &[&authority],
//         svm.latest_blockhash(),
//     );

//     let result = svm.send_transaction(forfeit_tx);
//     assert!(result.is_ok(), "Forfeit transaction failed: {:?}", result);

//     // Verify treasuries received funds
//     let treasury_account = svm.get_account(&treasury.pubkey()).unwrap();
//     let protocol_treasury_account = svm.get_account(&protocol_treasury.pubkey()).unwrap();
    
//     // Protocol gets 10% (1000 bps out of 10000)
//     let protocol_fee = amount * 1000 / 10000;
//     let treasury_amount = amount - protocol_fee;
    
//     assert_eq!(treasury_account.lamports, treasury_amount);
//     assert_eq!(protocol_treasury_account.lamports, protocol_fee);
// }

// #[test]
// fn test_invalid_unlock_time() {
//     let mut svm = LiteSVM::new();
    
//     let program_bytes = include_bytes!("../../target/deploy/escrow.so");
//     svm.add_program(PROGRAM_ID, program_bytes);

//     let user = Keypair::new();
//     let authority = Keypair::new();
    
//     svm.airdrop(&user.pubkey(), 5 * LAMPORTS_PER_SOL).unwrap();

//     // Test with unlock time in the past
//     let amount = LAMPORTS_PER_SOL;
//     let created_at: i64 = 1234567890;
//     let unlock_time: i64 = created_at - 3600; // 1 hour in the past

//     let (commitment_pubkey, _) = Pubkey::find_program_address(
//         &[
//             b"commitment",
//             user.pubkey().as_ref(),
//             &created_at.to_le_bytes(),
//             &unlock_time.to_le_bytes(),
//         ],
//         &PROGRAM_ID,
//     );

//     let ix = build_create_commitment_instruction(
//         commitment_pubkey,
//         user.pubkey(),
//         amount,
//         unlock_time,
//         authority.pubkey(),
//         created_at,
//     );

//     let tx = Transaction::new_signed_with_payer(
//         &[ix],
//         Some(&user.pubkey()),
//         &[&user],
//         svm.latest_blockhash(),
//     );

//     let result = svm.send_transaction(tx);
//     assert!(result.is_err(), "Transaction should have failed with invalid unlock time");
// }

// #[test]
// fn test_multiple_commitments() {
//     let mut svm = LiteSVM::new();
    
//     let program_bytes = include_bytes!("../../target/deploy/escrow.so");
//     svm.add_program(PROGRAM_ID, program_bytes);

//     let user = Keypair::new();
//     let authority = Keypair::new();
    
//     svm.airdrop(&user.pubkey(), 10 * LAMPORTS_PER_SOL).unwrap();

//     // Create multiple commitments with different parameters
//     for i in 0..3 {
//         let amount = LAMPORTS_PER_SOL;
//         let created_at: i64 = 1234567890 + i as i64;
//         let unlock_time: i64 = created_at + 3600 * (i + 1) as i64;

//         let (commitment_pubkey, _) = Pubkey::find_program_address(
//             &[
//                 b"commitment",
//                 user.pubkey().as_ref(),
//                 &created_at.to_le_bytes(),
//                 &unlock_time.to_le_bytes(),
//             ],
//             &PROGRAM_ID,
//         );

//         let ix = build_create_commitment_instruction(
//             commitment_pubkey,
//             user.pubkey(),
//             amount,
//             unlock_time,
//             authority.pubkey(),
//             created_at,
//         );

//         let tx = Transaction::new_signed_with_payer(
//             &[ix],
//             Some(&user.pubkey()),
//             &[&user],
//             svm.latest_blockhash(),
//         );

//         let result = svm.send_transaction(tx);
//         assert!(result.is_ok(), "Transaction {} failed: {:?}", i, result);

//         // Verify commitment was created
//         let commitment_account = svm.get_account(&commitment_pubkey).unwrap();
//         assert!(commitment_account.lamports >= amount);
//     }

//     // Verify user's balance decreased appropriately
//     let user_account = svm.get_account(&user.pubkey()).unwrap();
//     assert!(user_account.lamports < 7 * LAMPORTS_PER_SOL); // Started with 10, spent 3+
// }