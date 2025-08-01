import { Connection, Transaction, VersionedTransaction, TransactionSignature, PublicKey } from '@solana/web3.js';
import { useCallback, useMemo } from 'react';
import { useEmbeddedSolanaWallet } from '@privy-io/expo';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { useAuthorization } from './useMwaAuthorization';
import { SolanaAppConfig } from '@/constants/SolanaAppConfig';

export const useSolana = () => {
  const { wallets } = useEmbeddedSolanaWallet();
  const { authorizeSession } = useAuthorization()
  const { selectedAccount } = useAuthorization();

  const connection = useMemo(() => {
    const rpcUrl = process.env.EXPO_PUBLIC_SOLANA_RPC_URL || SolanaAppConfig.clusters.devnet.endpoint;
    return new Connection(rpcUrl, 'confirmed');
  }, []);

  const signAndSendTransactionWithPrivy = useCallback(async (transaction: Transaction | VersionedTransaction) => {
    if (!wallets || wallets.length === 0) {
      throw new Error('No wallet connected');
    }

    const wallet = wallets[0];

    // Set transaction metadata
    if (transaction instanceof Transaction) {
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      transaction.feePayer = new PublicKey(wallet.address);
    }
    else {

    }

    // Sign and send the transaction
    const provider = await wallet.getProvider();
    const signature = await provider.request({
      method: 'signAndSendTransaction',
      params: {
        transaction,
        connection,
      }
    }).catch((e) => {
      console.log("Error signing and sending transaction", e)
      throw e
    })

    console.log('Transaction signature:', signature);
    return signature;
  }, [wallets, connection]);

  const signAndSendTransactionWithMwa = useCallback(
    async (transaction: Transaction | VersionedTransaction): Promise<{ signature: string }> => {
      console.log("Mwa sign and send transaction")
      // const connection = new Connection(SolanaAppConfig.clusters['devnet'].endpoint, 'confirmed');
      const minContextSlot = await connection.getMinimumLedgerSlot();
      const recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      console.log("Selected account", selectedAccount)
      // if(transaction instanceof Transaction) {
      //   transaction.recentBlockhash = recentBlockhash;
      //   transaction.feePayer = selectedAccount?.publicKey;
      // }
      console.log("Transaction", transaction)
      const signedTx = await transact(async (wallet) => {
        // const minContextSlot = await connection.getMinimumLedgerSlot();
        console.log("Min context slot", 0)
        const authResult = await authorizeSession(wallet)

        console.log("Signing and sending transaction with MWA", transaction)
        if (transaction instanceof Transaction) {
          transaction.recentBlockhash = recentBlockhash;
          transaction.feePayer = authResult.publicKey;
        }
        const signatures = await wallet.signAndSendTransactions({
          transactions: [transaction],
          minContextSlot: minContextSlot,
        })
        return signatures[0]
        // const tx = await wallet.signTransactions({transactions: [transaction]}  )
        // return tx[0]
      })
      // console.log("Signed tx", signedTx)
      // const signature = await connection.sendRawTransaction(signedTx[0].serialize());
      // console.log("Signature", signature)
      return { signature: signedTx }
    },
    [authorizeSession],
  )

  const signMessageWithMwa = useCallback(
    async (message: Uint8Array): Promise<Uint8Array> => {
      return await transact(async (wallet) => {
        const authResult = await authorizeSession(wallet)
        const signedMessages = await wallet.signMessages({
          addresses: [authResult.address],
          payloads: [message],
        })
        return signedMessages[0]
      })
    },
    [authorizeSession],
  )

  const signAndSendTransaction = useMemo(() => {
    if (wallets && wallets.length > 0) {
      return signAndSendTransactionWithPrivy
    }
    return signAndSendTransactionWithMwa
  }, [wallets, signAndSendTransactionWithPrivy, signAndSendTransactionWithMwa])

  return {
    connection,
    signAndSendTransaction,
    walletAddress: selectedAccount?.publicKey.toBase58() ?? wallets?.[0]?.address,
    connected: wallets && wallets.length > 0,
  };
};