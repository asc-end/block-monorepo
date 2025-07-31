import { SolanaAppConfig } from "@/constants/SolanaAppConfig";
import { useAuthorization } from "@/hooks/solana/useMwaAuthorization";
import { Pressable, Text, useTheme } from "@blockit/cross-ui-toolkit";
import { SolIcon } from "@blockit/ui";
import { PrivyUser, useLoginWithSiws } from "@privy-io/expo";
import { Base64EncodedAddress, SignInPayload } from "@solana-mobile/mobile-wallet-adapter-protocol";
import { transact, Web3MobileWallet } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { PublicKey } from "@solana/web3.js";
import { WalletIcon } from '@wallet-standard/core'
import { useCallback } from "react";

export type Account = Readonly<{
    address: Base64EncodedAddress
    displayAddress?: string
    icon?: WalletIcon
    label?: string
    publicKey: PublicKey
}>

const signInPayload: SignInPayload = {
    domain: SolanaAppConfig.domain,
    uri: SolanaAppConfig.uri,
    version: '1',
    statement: 'Sign into React Native Sample App',
    // timestamp: new Date().toISOString(),
    // resources: 
}


export function SolanaConnectButton() {
    const { currentColors } = useTheme();
    const { authorizeSessionWithSignIn, authorizeSession, deauthorizeSessions } = useAuthorization()
    const { login , generateMessage} = useLoginWithSiws();


    // For when user has not connected to both MWA or Privy
    const privyMwaSignIn = useCallback(
        async (): Promise<{ mwaResult: Account; privyUser: PrivyUser }> => {
            console.log("Privy MWA Sign In")
            try {
                const message = await generateMessage({
                    // wallet: { address: "3BeNZiw5j7husftD5W8Er9xYHN7xa9P36YJt3HfGRdky" },
                    // wallet: { address: "8N97qfq2ASQ14Rs4oTD63wPVAKfr5ZDLQoot66AdkNjc" },
                    wallet: { address: "CpRc1FhGyaFFfH8mt8Wt12RGWdj614ZnLypvTvNMRPtA" },
                    // 
                    from: { domain: SolanaAppConfig.domain, uri: SolanaAppConfig.uri },
                })

                const { signatureBase64} =  await transact(async (wallet: Web3MobileWallet) => {
                    console.log("Authorizing session with sign in payload")

                    const authResult = await authorizeSession(wallet)
                    // const authResult = await authorizeSessionWithSignIn(wallet, signInPayload)

                    console.log("Fetching privy siws message", authResult)
                    console.log("Wallet address", SolanaAppConfig.domain, SolanaAppConfig.uri)
            
                    console.log("Privy SIWS message", message)
                    const encodedPrivySiwsMessage = new TextEncoder().encode(message.message);
                    console.log("Waiting for sign message")
                    const [signatureBytes] = await wallet.signMessages({ addresses: [authResult.address], payloads: [encodedPrivySiwsMessage] })
                    const signatureBase64 = Buffer.from(signatureBytes).toString('base64');

                    console.log("Logging in with Privy SIWS")
       
                    console.log("Sign in with Privy success")

                    return { mwaResult: authResult, privyUser: user, signatureBase64 }
                    // return { mwaResult: authResult, privyUser: null }
                })

                const user = await login({
                    signature: signatureBase64,
                    message: message.message,
                    disableSignup: false,
                });
            } catch (error) {
                console.log("Error signing in with Privy", error)
                return { mwaResult: null, privyUser: null }
            }
        },
        [authorizeSession, generateMessage, login]
    )

    // const privyMwaSignIn = useCallback(
    //     async (): Promise<{ mwaResult: Account; privyUser: PrivyUser }> => {
    //         return await transact(async (wallet) => {
    //             const authResult = await authorizeSession(wallet)

    //             console.log("Fetching privy siws message", authResult)
    //             console.log("Wallet address", SolanaAppConfig.domain, SolanaAppConfig.uri)
    //             return generateMessage({
    //                 wallet: { address: authResult.publicKey.toBase58() },
    //                 from: { domain: SolanaAppConfig.domain, uri: SolanaAppConfig.uri },
    //             }).then(async (message) => {
    //                 console.log("Privy SIWS message", message)
    //                 const encodedPrivySiwsMessage = new TextEncoder().encode(message.message);
    //                 console.log("Waiting for sign message")
    //                 const [signatureBytes] = await wallet.signMessages({ addresses: [authResult.address], payloads: [encodedPrivySiwsMessage] })
    //                 const signatureBase64 = Buffer.from(signatureBytes).toString('base64');

    //                 console.log("Logging in with Privy SIWS")
    //                 const user = await login({
    //                     signature: signatureBase64,
    //                     message: message.message,
    //                     disableSignup: false,
    //                 });
    //                 console.log("Sign in with Privy success")

    //                 return { mwaResult: authResult, privyUser: user }
    //             }).catch((error) => {
    //                 console.log("Error generating message", error)
    //                 return null
    //             })


    //         })
    //     },
    //     [authorizeSessionWithSignIn],
    // )

    const connect = useCallback(async (): Promise<Account> => {
        return await transact(async (wallet) => {
            return await authorizeSession(wallet)
        })
    }, [authorizeSession])

    const signIn = useCallback(
        async (signInPayload: SignInPayload): Promise<Account> => {
            return await transact(async (wallet) => {
                return await authorizeSessionWithSignIn(wallet, signInPayload)
            })
        },
        [authorizeSessionWithSignIn],
    )
    const disconnect = useCallback(async (): Promise<void> => {
        await deauthorizeSessions()
    }, [deauthorizeSessions])

    return (
        <Pressable
            onPress={privyMwaSignIn}
            className="w-full gap-2 px-8 py-3 rounded-2xl shadow-lg active:opacity-90 flex flex-row items-center justify-center"
            style={{ backgroundColor: currentColors.primary[500] }}
        >
            <SolIcon size={20} color="white" />
            <Text variant="h3">
                Connect with Solana
            </Text>
        </Pressable>
    );
}