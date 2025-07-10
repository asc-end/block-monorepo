// Common types for app/site blocking across platforms

export interface BlockableItem {
  id: string;
  name: string;
  displayName: string;
  iconUri?: string;
  isBlocked: boolean;
  selected?: boolean;
  usageTime?: number;
  category?: string;
  // Platform-specific fields
  packageName?: string; // Mobile only
  domain?: string; // Extension only
  url?: string; // Extension only
}

export interface BlockingCategory {
  name: string;
  keywords: string[];
  icon?: string;
}

export const COMMON_CATEGORIES: Record<string, BlockingCategory> = {
  'Social Media': {
    name: 'Social Media',
    keywords: ['facebook', 'instagram', 'twitter', 'x', 'tiktok', 'snapchat', 'linkedin', 'farcaster', 'tinder', 'reddit', 'pinterest']
  },
  'Messages': {
    name: 'Messages',
    keywords: ['whatsapp', 'telegram', 'messenger', 'discord', 'messages', 'signal', 'gmail', 'slack']
  },
  'Entertainment': {
    name: 'Entertainment',
    keywords: ['youtube', 'netflix', 'twitch', 'prime', 'disney', 'hulu', 'hbo', 'paramount', 'spotify', 'soundcloud']
  },
  'Games': {
    name: 'Games',
    keywords: ['game', 'play', 'puzzle', 'arcade', 'minecraft', 'roblox', 'fortnite', 'candy', 'chess', 'steam']
  },
  'News': {
    name: 'News',
    keywords: ['news', 'cnn', 'bbc', 'nytimes', 'reuters', 'bloomberg', 'reddit']
  },
  'Shopping': {
    name: 'Shopping',
    keywords: ['amazon', 'ebay', 'etsy', 'alibaba', 'walmart', 'target', 'bestbuy']
  },
  'Other': {
    name: 'Other',
    keywords: []
  }
};

export interface AppUsageData {
  [key: string]: number; // app/site name -> usage time in ms
}

export interface BlockingSession {
  id: string;
  startTime: number;
  endTime?: number;
  blockedItems: string[]; // IDs of blocked items
  platform: 'mobile' | 'extension';
}