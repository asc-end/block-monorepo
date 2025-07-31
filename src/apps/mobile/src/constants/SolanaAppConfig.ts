import { AppIdentity } from '@solana-mobile/mobile-wallet-adapter-protocol'
import { clusterApiUrl } from '@solana/web3.js'
import { IdentifierString } from '@wallet-standard/base'

export enum ClusterNetwork {
  Mainnet = 'mainnet-beta',
  Testnet = 'testnet',
  Devnet = 'devnet',
  Custom = 'custom',
}


export interface Cluster {
  id: IdentifierString
  name: string
  endpoint: string
  active?: boolean
}

export class SolanaAppConfig {
  static name = 'com.ascendmarie.blockit'
  static uri = 'https://com.ascendmarie.blockit'
  static domain = 'com.ascendmarie.blockit'
  static clusters: Record<ClusterNetwork, Cluster> = {
    "devnet": {
      id: 'solana:devnet',
      name: 'Devnet',
      endpoint: clusterApiUrl('devnet'),
    },
    "testnet": {
      id: 'solana:testnet',
      name: 'Testnet',
      endpoint: clusterApiUrl('testnet'),
    },
    "mainnet-beta": {
      id: 'solana:mainnet-beta',
      name: 'Mainnet',
      endpoint: clusterApiUrl('mainnet-beta'),
    },
    "custom": {
      id: 'solana:custom',
      name: 'Custom',
      endpoint: 'https://custom.com',
    },
  }
}

export const identity: AppIdentity = {
  name: SolanaAppConfig.name,
  uri: SolanaAppConfig.uri,
  // icon: "icon.png",
}

