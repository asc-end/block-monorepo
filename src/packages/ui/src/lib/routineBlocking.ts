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
  private checkInterval?: NodeJS.Timeout;
  private fetchInterval?: NodeJS.Timeout;

  constructor(config: RoutineBlockingConfig) {
    this.config = config;
    console.log("CONFIG", config)
  }

  async fetchRoutines(): Promise<Routine[]> {
    console.log('[RoutineBlockingService] Fetching routines...');
    try {
      const token = await this.config.getAuthToken();
      console.log('[RoutineBlockingService] Auth token available:', !!token);
      if (!token) {
        console.warn('[RoutineBlockingService] No auth token available for fetching routines');
        return [];
      }

      const url = `${this.config.apiUrl}/routines`;
      console.log('[RoutineBlockingService] Fetching from:', url);
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('[RoutineBlockingService] Response status:', response.status);
      
      if (!response.ok) {
        console.error('[RoutineBlockingService] Failed to fetch routines:', response.status);
        return [];
      }

      const data = await response.json();
      console.log('[RoutineBlockingService] API response:', data);
      this.routines = data.routines || data || [];
      console.log('[RoutineBlockingService] Fetched routines:', this.routines.length);
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
    console.log('[RoutineBlockingService] Current time check:', {
      localTime: now.toLocaleTimeString(),
      utcTime: now.toUTCString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      offset: now.getTimezoneOffset()
    });
    
    // Get all active routines in time window
    const activeRoutines = this.routines.filter(r => {
      const isActive = isRoutineInActiveTimeWindow(r);
      console.log(`[RoutineBlockingService] Routine "${r.name}" (${r.startTime}-${r.endTime}):`, {
        status: r.status,
        days: r.selectedDays,
        isActive
      });
      return isActive;
    });
    console.log('[RoutineBlockingService] Active routines count:', activeRoutines.length);
    
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
    console.log('[RoutineBlockingService] Starting service...');
    
    // Initial fetch
    this.fetchRoutines();
    
    // Check for time window changes every minute
    this.checkInterval = setInterval(() => {
      console.log('[RoutineBlockingService] Periodic time window check');
      this.updateBlockedItems();
    }, 60 * 1000);
    
    // Fetch fresh routines every 5 minutes
    this.fetchInterval = setInterval(() => {
      console.log('[RoutineBlockingService] Periodic routine refresh');
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