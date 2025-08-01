import { createHash } from 'crypto';

// Generate discriminator from account name (how Anchor does it)
function accountDiscriminator(name: string): Buffer {
  return createHash('sha256')
    .update(`account:${name}`)
    .digest()
    .slice(0, 8);
}

// Account discriminators (generated using Anchor's method)
const ACCOUNT_DISCRIMINATORS = {
    marketplaceConfig: accountDiscriminator('MarketplaceConfig'),
    dataListing: accountDiscriminator('DataListing'),
    dataSeller: accountDiscriminator('DataSeller'),
    dataPass: accountDiscriminator('DataPass'),
    merkleDistributor: accountDiscriminator('MerkleDistributor'),
  };

  console.log('Account discriminators:', {
    marketplaceConfig: ACCOUNT_DISCRIMINATORS.marketplaceConfig.toString('hex'),
    dataListing: ACCOUNT_DISCRIMINATORS.dataListing.toString('hex'),
    dataSeller: ACCOUNT_DISCRIMINATORS.dataSeller.toString('hex'),
    dataPass: ACCOUNT_DISCRIMINATORS.dataPass.toString('hex'),
    merkleDistributor: ACCOUNT_DISCRIMINATORS.merkleDistributor.toString('hex'),
  });
  
  // Helper function to determine account type based on discriminator
  export function determineAccountType(data: Buffer): string | null {
    if (data.length < 8) {
      console.log('Data too short:', data.length);
      return null;
    }
    
    const discriminator = data.slice(0, 8);
    console.log('Looking for discriminator:', discriminator.toString('hex'));
    
    // Compare with known discriminators
    for (const [accountType, knownDiscriminator] of Object.entries(ACCOUNT_DISCRIMINATORS)) {
      if (discriminator.equals(knownDiscriminator)) {
        console.log('Found account type:', accountType);
        return accountType;
      }
    }
    
    console.log('No matching discriminator found');
    return null;
  }
  