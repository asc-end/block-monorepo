  import EscrowIndexer from '../api/scripts/indexEscrow';

async function main() {
  console.log('Running commitment reconciliation...');
  
  const indexer = new EscrowIndexer();
  
  try {
    await indexer.reconcileCommitments();
    console.log('Reconciliation completed successfully');
  } catch (error) {
    console.error('Reconciliation failed:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

main().catch(console.error);