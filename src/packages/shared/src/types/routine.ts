export interface Commitment {
  id: string;
  userId: string;
  userPubkey: string;
  amount: string; // BigInt serialized as string
  unlockTime: string;
  createdAt: string;
  authorityPubkey: string;
  status: 'active' | 'claimed' | 'forfeited';
  claimedAt?: string;
  forfeitedAt?: string;
  txSignature?: string;
  routineId?: string;
  focusSessionId?: string;
}

export interface App {
  id: string;
  name: string;
  icon?: string;
  domains: string[];
  androidPackageName?: string;
  iosBundleId?: string;
  category?: string;
  isUserSubmitted: boolean;
}

export interface RoutineApp {
  routineId: string;
  appId: string;
  app: App;
}

export interface Routine {
  id: string;
  userId: string;
  name: string;
  emoji: string;
  timeMode: 'blocking' | 'limit';
  selectedDays: string[];
  startTime?: string;
  endTime?: string;
  dailyLimit?: number;
  endDate?: string;
  status: 'active' | 'paused' | 'completed' | 'canceled';
  blockedApps: RoutineApp[];
  commitment?: Commitment;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoutineInput {
  name: string;
  emoji: string;
  timeMode: 'blocking' | 'limit';
  selectedDays: string[];
  startTime?: string;
  endTime?: string;
  dailyLimit?: number;
  endDate?: string;
  blockedApps: Array<{
    packageName: string;
    appName: string;
    icon?: string;
  }>;
}