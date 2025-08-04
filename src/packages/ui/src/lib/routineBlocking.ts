import type { Routine } from '@blockit/shared';
import { isRoutineInActiveTimeWindow } from './routine';

export interface BlockedItem {
  domains?: string[];           // For web extension
  packageNames?: string[];      // For Android
  bundleIds?: string[];        // For iOS
}

export interface RoutineBlockingConfig {
  apiUrl: string;
  getAuthToken: () => Promise<string | null>;
  onRoutinesUpdate?: (routines: Routine[]) => void;
  onBlockedItemsUpdate?: (items: BlockedItem) => void;
}

export class RoutineBlockingService {
  private routines: Routine[] = [];
  private config: RoutineBlockingConfig;
  private checkInterval?: ReturnType<typeof setInterval>;
  private fetchInterval?: ReturnType<typeof setInterval>;

  constructor(config: RoutineBlockingConfig) {
    this.config = config;
    console.log("CONFIG", config)
  }

  async fetchRoutines(): Promise<Routine[]> {
    try {
      const token = await this.config.getAuthToken();
      if (!token) { return []}

      const url = `${this.config.apiUrl}/routines`;
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      
      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      this.routines = data.routines || data || [];
      if (this.routines.length > 0) {
        console.log('[RoutineBlockingService] First routine:', this.routines[0]);
      }
      
      if (this.config.onRoutinesUpdate) {
        this.config.onRoutinesUpdate(this.routines);
      }

      // Update blocked items immediately after fetching
      this.updateBlockedItems();
      
      return this.routines;
    } catch (error) {
      console.error('Error fetching routines:', error);
      return [];
    }
  }

  updateBlockedItems(): BlockedItem {
    const blockedDomains = new Set<string>();
    const blockedPackageNames = new Set<string>();
    const blockedBundleIds = new Set<string>();
    
    // Debug current time
    const now = new Date();
    
    // Get all active routines in time window
    const activeRoutines = this.routines.filter(r => {
      const isActive = isRoutineInActiveTimeWindow(r);
      return isActive;
    });
    
    for (const routine of activeRoutines) {
      for (const blockedApp of routine.blockedApps || []) {
        if (blockedApp.app) {
          // Add domains for web
          if (blockedApp.app.domains) {
            blockedApp.app.domains.forEach(domain => blockedDomains.add(domain));
          }
          
          // Add Android package names
          if (blockedApp.app.androidPackageName) {
            blockedPackageNames.add(blockedApp.app.androidPackageName);
          }
          
          // Add iOS bundle IDs
          if (blockedApp.app.iosBundleId) {
            blockedBundleIds.add(blockedApp.app.iosBundleId);
          }
        }
      }
    }
    
    const blockedItems: BlockedItem = {
      domains: Array.from(blockedDomains),
      packageNames: Array.from(blockedPackageNames),
      bundleIds: Array.from(blockedBundleIds)
    };
    
    if (this.config.onBlockedItemsUpdate) {
      this.config.onBlockedItemsUpdate(blockedItems);
    }
    
    return blockedItems;
  }

  getActiveRoutines(): Routine[] {
    return this.routines.filter(r => isRoutineInActiveTimeWindow(r));
  }

  start(): void {
    
    // Initial fetch
    this.fetchRoutines();
    
    // Check for time window changes every minute
    this.checkInterval = setInterval(() => {
      this.updateBlockedItems();
    }, 60 * 1000);
    
    // Fetch fresh routines every 5 minutes
    this.fetchInterval = setInterval(() => {
      this.fetchRoutines();
    }, 5 * 60 * 1000);
  }

  stop(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = undefined;
    }
    
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval);
      this.fetchInterval = undefined;
    }
  }

  // Force an immediate update
  async refresh(): Promise<void> {
    await this.fetchRoutines();
  }
}