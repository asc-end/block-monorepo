import EscrowIndexer from './index';
import MarketplaceIndexer from './marketplaceIndexer';
import { prisma } from './lib/prisma';

async function main() {
  console.log('[CombinedIndexer] Starting all indexers...');
  
  // Create indexer instances
  const escrowIndexer = new EscrowIndexer();
  const marketplaceIndexer = new MarketplaceIndexer();
  
  // Start both indexers
  await Promise.all([
    escrowIndexer.start(),
    marketplaceIndexer.start()
  ]);
  
  console.log('[CombinedIndexer] All indexers started successfully');
  
  // Handle shutdown gracefully
  process.on('SIGINT', async () => {
    console.log('\n[CombinedIndexer] Shutting down all indexers...');
    
    await Promise.all([
      escrowIndexer.stop(),
      marketplaceIndexer.stop()
    ]);
    
    await prisma.$disconnect();
    process.exit(0);
  });
}

// Start combined indexer
main().catch(error => {
  console.error('[CombinedIndexer] Fatal error:', error);
  process.exit(1);
});