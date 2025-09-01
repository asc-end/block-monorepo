import AsyncStorage from '@react-native-async-storage/async-storage'
import { PublicKey, PublicKeyInitData } from '@solana/web3.js'
import {
  Account as AuthorizedAccount,
  AuthorizationResult,
  AuthorizeAPI,
  AuthToken,
  Base64EncodedAddress,
  DeauthorizeAPI,
  SignInPayload,
} from '@solana-mobile/mobile-wallet-adapter-protocol'
import { toUint8Array } from 'js-base64'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { WalletIcon } from '@wallet-standard/core'
import { identity, SolanaAppConfig } from '@/constants/SolanaAppConfig'
import { ellipsify } from '@/utils/ellipsify'


export type Account = Readonly<{
  address: Base64EncodedAddress
  displayAddress?: string
  icon?: WalletIcon
  label?: string
  publicKey: PublicKey
}>

type WalletAuthorization = Readonly<{
  accounts: Account[]
  authToken: AuthToken
  selectedAccount: Account
}>

function getAccountFromAuthorizedAccount(account: AuthorizedAccount): Account {
  const publicKey = getPublicKeyFromAddress(account.address)
  return {
    address: account.address,
    // TODO: Fix?
    displayAddress: (account as unknown as { display_address: string }).display_address,
    icon: account.icon,
    label: account.label ?? ellipsify(publicKey.toString(), 8),
    publicKey,
  }
}

function getAuthorizationFromAuthorizationResult(
  authorizationResult: AuthorizationResult,
  previouslySelectedAccount?: Account,
): WalletAuthorization {
  let selectedAccount: Account
  if (
    // We have yet to select an account.
    previouslySelectedAccount == null ||
    // The previously selected account is no longer in the set of authorized addresses.
    !authorizationResult.accounts.some(({ address }) => address === previouslySelectedAccount.address)
  ) {
    const firstAccount = authorizationResult.accounts[0]
    selectedAccount = getAccountFromAuthorizedAccount(firstAccount)
  } else {
    selectedAccount = previouslySelectedAccount
  }
  return {
    accounts: authorizationResult.accounts.map(getAccountFromAuthorizedAccount),
    authToken: authorizationResult.auth_token,
    selectedAccount,
  }
}

function getPublicKeyFromAddress(address: Base64EncodedAddress): PublicKey {
  const publicKeyByteArray = toUint8Array(address)
  return new PublicKey(publicKeyByteArray)
}

function cacheReviver(key: string, value: any) {
  if (key === 'publicKey') {
    return new PublicKey(value as PublicKeyInitData) // the PublicKeyInitData should match the actual data structure stored in AsyncStorage
  } else {
    return value
  }
}

const AUTHORIZATION_STORAGE_KEY = 'authorization-cache'

const queryKey = ['wallet-authorization']

function usePersistAuthorization() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (auth: WalletAuthorization | null): Promise<void> => {
      await AsyncStorage.setItem(AUTHORIZATION_STORAGE_KEY, JSON.stringify(auth))
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey })
    },
  })
}

function useFetchAuthorization() {
  return useQuery({
    queryKey,
    queryFn: async (): Promise<WalletAuthorization | null> => {
      const cacheFetchResult = await AsyncStorage.getItem(AUTHORIZATION_STORAGE_KEY)

      // Return prior authorization, if found.
      return cacheFetchResult ? JSON.parse(cacheFetchResult, cacheReviver) : null
    },
  })
}

function useInvalidateAuthorizations() {
  const client = useQueryClient()
  return () => client.invalidateQueries({ queryKey })
}

export function useAuthorization() {
  const fetchQuery = useFetchAuthorization()
  const invalidateAuthorizations = useInvalidateAuthorizations()
  const persistMutation = usePersistAuthorization()

  const cluster = SolanaAppConfig.clusters.devnet
  const handleAuthorizationResult = useCallback(
    async (authorizationResult: AuthorizationResult): Promise<WalletAuthorization> => {
      const nextAuthorization = getAuthorizationFromAuthorizationResult(
        authorizationResult,
        fetchQuery.data?.selectedAccount,
      )
      await persistMutation.mutateAsync(nextAuthorization)
      return nextAuthorization
    },
    [fetchQuery.data?.selectedAccount, persistMutation],
  )

  // const authorizeSession = useCallback(
  //   async (wallet: AuthorizeAPI) => {
  //     console.log("Authorizing session")

  //     const config = {
  //       identity,
  //       chain: SolanaAppConfig.clusters['mainnet-beta'].id,
  //       auth_token: fetchQuery.data?.authToken,
  //     }
  //     console.log("Config", config)
  //     const authorizationResult = await wallet.authorize(config)
  //     return (await handleAuthorizationResult(authorizationResult)).selectedAccount
  //   },
  //   [fetchQuery.data?.authToken, handleAuthorizationResult, cluster.id],
  // )

  async function authorizeSession(wallet: AuthorizeAPI, forceNewAuth = false){
    console.log("Authorizing session", process.env.EXPO_PUBLIC_NETWORK, SolanaAppConfig.clusters)
    const config = {
      identity,
      chain: SolanaAppConfig.clusters[process.env.EXPO_PUBLIC_NETWORK].id,
      // chain: SolanaAppConfig.clusters["mainnet-beta"].id,
      auth_token: forceNewAuth ? undefined : fetchQuery.data?.authToken,
    }
    
    try {
      const authorizationResult = await wallet.authorize(config)
      return (await handleAuthorizationResult(authorizationResult)).selectedAccount
    } catch (error: any) {
      // If auth token is invalid, clear it and retry without it
      if (error.message?.includes('invalid') || error.message?.includes('expired') || error.message?.includes('not valid')) {
        console.log("Auth token invalid, retrying without token")
        await persistMutation.mutateAsync(null)
        const retryConfig = {
          identity,
          chain: SolanaAppConfig.clusters["devnet"].id,
          // Don't include auth_token in retry
        }
        const authorizationResult = await wallet.authorize(retryConfig)
        return (await handleAuthorizationResult(authorizationResult)).selectedAccount
      }
      throw error
    }
  }

  const authorizeSessionWithSignIn = useCallback(
    async (wallet: AuthorizeAPI, signInPayload: SignInPayload) => {
      console.log("Authorizing session with sign in payload", signInPayload)
      console.log("Identity", SolanaAppConfig.clusters[process.env.EXPO_PUBLIC_NETWORK].id)
      const authorizationResult = await wallet.authorize({
        identity,
        chain:SolanaAppConfig.clusters[process.env.EXPO_PUBLIC_NETWORK].id,
        auth_token: fetchQuery.data?.authToken,
        sign_in_payload: signInPayload,
      }).catch((error) => {
        console.log("Error authorizing session", error)
        return null
      })
      console.log("Authorization result", authorizationResult)
      return (await handleAuthorizationResult(authorizationResult)).selectedAccount
    },
    [fetchQuery.data?.authToken, handleAuthorizationResult, cluster.id],
  )

  const deauthorizeSession = useCallback(
    async (wallet: DeauthorizeAPI) => {
      if (fetchQuery.data?.authToken == null) {
        return
      }
      await wallet.deauthorize({ auth_token: fetchQuery.data.authToken })
      await persistMutation.mutateAsync(null)
    },
    [fetchQuery.data?.authToken, persistMutation],
  )

  const deauthorizeSessions = useCallback(async () => {
    await invalidateAuthorizations()
    await persistMutation.mutateAsync(null)
  }, [invalidateAuthorizations, persistMutation])

  return useMemo(
    () => ({
      accounts: fetchQuery.data?.accounts ?? null,
      authorizeSession,
      authorizeSessionWithSignIn,
      deauthorizeSession,
      deauthorizeSessions,
      isLoading: fetchQuery.isLoading,
      selectedAccount: fetchQuery.data?.selectedAccount ?? null,
    }),
    [
      authorizeSession,
      authorizeSessionWithSignIn,
      deauthorizeSession,
      deauthorizeSessions,
      fetchQuery.data?.accounts,
      fetchQuery.data?.selectedAccount,
      fetchQuery.isLoading,
    ],
  )
}
