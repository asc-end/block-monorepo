import { SolanaAppConfig } from "@/constants/SolanaAppConfig";
import { useAuthorization } from "@/hooks/solana/useMwaAuthorization";
import { Pressable, Text, useTheme } from "@blockit/cross-ui-toolkit";
import { SolIcon } from "@blockit/ui";
import { useLoginWithSiws } from "@privy-io/expo";
import { Base64EncodedAddress } from "@solana-mobile/mobile-wallet-adapter-protocol";
import { transact, Web3MobileWallet } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { PublicKey } from "@solana/web3.js";
import { WalletIcon } from '@wallet-standard/core'
import { useCallback, useState } from "react";

export type Account = Readonly<{
    address: Base64EncodedAddress
    displayAddress?: string
    icon?: WalletIcon
    label?: string
    publicKey: PublicKey
}>



export function SolanaConnectButton() {
    const { currentColors } = useTheme();
    const { authorizeSession } = useAuthorization()
    const { login, generateMessage } = useLoginWithSiws();
    const [isLoading, setIsLoading] = useState(false);
    const [authStep, setAuthStep] = useState<'connect' | 'sign'>('connect');
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [message, setMessage] = useState<{ message: string } | null>(null);


    // Step 1: Connect wallet and get address
    const connectWallet = useCallback(async () => {
        setIsLoading(true);
        
        try {
            const result = await transact(async (wallet: Web3MobileWallet) => {
                const authResult = await authorizeSession(wallet, true);
                return authResult;
            });
            
            if (result) {
                const address = result.publicKey.toBase58();
                setWalletAddress(address);
                
                // Generate message outside of transact
                const privyMessage = await generateMessage({
                    wallet: { address },
                    from: { domain: SolanaAppConfig.domain, uri: SolanaAppConfig.uri },
                });
                
                setMessage(privyMessage);
                setAuthStep('sign');
                console.log("Message generated:", privyMessage);
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
        } finally {
            setIsLoading(false);
        }
    }, [authorizeSession, generateMessage]);
    
    // Step 2: Sign message and login
    const signMessageAndLogin = useCallback(async () => {
        if (!walletAddress || !message) {
            console.error("No wallet address or message available");
            return;
        }
        
        setIsLoading(true);
        
        try {
            const result = await transact(async (wallet: Web3MobileWallet) => {
                // Re-authorize if needed (session might have expired)
                const authResult = await authorizeSession(wallet, true);
                
                const encodedPrivySiwsMessage = new TextEncoder().encode(message.message);
                
                const [signatureBytes] = await wallet.signMessages({ 
                    addresses: [authResult.address], 
                    payloads: [encodedPrivySiwsMessage] 
                });
                
                const signatureBase64 = Buffer.from(signatureBytes).toString('base64');
                return signatureBase64;
            });
            
            if (result) {
                const user = await login({
                    signature: result,
                    message: message.message,
                    disableSignup: false,
                });
                
                setWalletAddress(null);
                setMessage(null);
            }
        } catch (error) {
            console.error("Error signing message:", error);
        } finally {
            setIsLoading(false);
        }
    }, [walletAddress, message, authorizeSession, login]);



    return (
        <Pressable
            onPress={authStep === 'connect' ? connectWallet : signMessageAndLogin}
            disabled={isLoading}
            className="w-full gap-2 px-8 py-3 rounded-2xl shadow-lg active:opacity-90 flex flex-row items-center justify-center"
            style={{
                backgroundColor: authStep === 'sign' ? currentColors.success.main : currentColors.primary[500],
                opacity: isLoading ? 0.7 : 1
            }}
        >
            {!isLoading && <SolIcon size={20} color="white" />}
            <Text variant="h3" style={{ color: 'white' }}>
                {isLoading 
                    ? (authStep === 'connect' ? 'Connecting...' : 'Signing...') 
                    : authStep === 'connect' 
                        ? 'Connect with Solana' 
                        : 'Sign Message to Login'}
            </Text>
        </Pressable>
    );
}