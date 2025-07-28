import { Connection, Transaction, PublicKey } from '@solana/web3.js';
import { useCallback, useMemo } from 'react';
import { useEmbeddedSolanaWallet } from '@privy-io/expo';

export const useSolana = () => {
  const { wallets } = useEmbeddedSolanaWallet();
  
  const connection = useMemo(() => {
    const rpcUrl = process.env.EXPO_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
    return new Connection(rpcUrl, 'confirmed');
  }, []);

  const signAndSendTransaction = useCallback(async (transaction: Transaction) => {
    if (!wallets || wallets.length === 0) {
      throw new Error('No wallet connected');
    }

    const wallet = wallets[0];
    
    // Set transaction metadata
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.feePayer = new PublicKey(wallet.address);

    // Sign and send the transaction
    const provider = await wallet.getProvider();
    const signature = await provider.request({
      method: 'signAndSendTransaction',
      params: {
        transaction,
        connection,
      }
    });

    console.log('Transaction signature:', signature);
    return signature;
  }, [wallets, connection]);

  return {
    connection,
    signAndSendTransaction,
    walletAddress: wallets?.[0]?.address,
    connected: wallets && wallets.length > 0,
  };
};