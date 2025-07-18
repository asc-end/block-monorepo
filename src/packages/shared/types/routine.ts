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
  stakeAmount: number;
  status: 'active' | 'paused' | 'completed' | 'canceled';
  blockedApps: RoutineApp[];
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
  stakeAmount: number;
  blockedApps: Array<{
    packageName: string;
    appName: string;
    icon?: string;
  }>;
}