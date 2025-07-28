import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';

// Constants
export const MARKETPLACE_PROGRAM_ID = new PublicKey('5CkSqkGqrHKRzVWVRJGa1odNcaXo4bJnt9Sq2Npqpxpj');
export const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

// PDA derivation helpers
export const marketplacePDAs = {
  getMarketplaceConfig: (programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([Buffer.from('marketplace_config')], programId),

  getSeller: (seller: PublicKey, programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([Buffer.from('seller'), seller.toBuffer()], programId),

  getListing: (listingId: BN, programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([Buffer.from('listing'), listingId.toArrayLike(Buffer, 'le', 8)], programId),

  getDataPass: (passId: BN, programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([Buffer.from('data_pass'), passId.toArrayLike(Buffer, 'le', 8)], programId),

  getPassNftMint: (dataPassPda: PublicKey, programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([Buffer.from('pass_nft'), dataPassPda.toBuffer()], programId),

  getMerkleDistributor: (periodId: BN, programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([Buffer.from('merkle_distributor'), periodId.toArrayLike(Buffer, 'le', 8)], programId),

  getRevenueClaim: (seller: PublicKey, periodId: BN, programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([
      Buffer.from('revenue_claim'),
      seller.toBuffer(),
      periodId.toArrayLike(Buffer, 'le', 8)
    ], programId),
};