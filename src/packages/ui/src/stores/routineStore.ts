import { create } from 'zustand';

export type App = {
    packageName: string;
    appName: string;
    icon?: string;
};

export type TimeMode = 'blocking' | 'limit';

export type TimeSettings = {
    selectedDays: string[];
    startTime: string;
    endTime: string;
    timeMode: TimeMode;
    duration: number;
};

export type DraftState = {
    blockedApps: App[];
    endDate: Date | null;
    stakeAmount: number | undefined;
    timeSettings: TimeSettings;
};

export type RoutineState = {
    // Saved/committed state
    blockedApps: App[];
    setBlockedApps: (apps: App[]) => void;
    endDate: Date | null;
    setEndDate: (date: Date | null) => void;
    stakeAmount: number | undefined;
    setStakeAmount: (amount: number | undefined) => void;
    timeSettings: TimeSettings;
    setTimeSettings: (settings: TimeSettings) => void;
    setTimeMode: (mode: TimeMode) => void;
    resetRoutineState: () => void;
    
    // Draft state - for temporary unsaved changes
    draft: DraftState;
    setDraftBlockedApps: (apps: App[]) => void;
    setDraftEndDate: (date: Date | null) => void;
    setDraftStakeAmount: (amount: number | undefined) => void;
    setDraftTimeSettings: (settings: TimeSettings) => void;
    updateDraftDuration: (duration: number) => void;
    updateDraftTimeMode: (mode: TimeMode) => void;
    updateDraftSelectedDays: (days: string[]) => void;
    updateDraftTimeRange: (startTime: string, endTime: string) => void;
    
    // Draft management
    initializeDraft: () => void;
    commitDraft: () => void;
    discardDraft: () => void;
    hasDraftChanges: () => boolean;
};

// Default to blocking social media from 9 PM to 7 AM
const initialTimeSettings: TimeSettings = {
    selectedDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    startTime: "21:00",  // 9 PM
    endTime: "31:00",    // 7 AM next day (24 + 7)
    timeMode: 'blocking',
    duration: 60
};

// Helper to get default end date (2 weeks from now)
const getDefaultEndDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date;
};

export const useRoutineStore = create<RoutineState>((set, get) => ({
    // Saved state
    blockedApps: [],
    setBlockedApps: (apps) => set({ blockedApps: apps }),
    endDate: getDefaultEndDate(),
    setEndDate: (date) => set({ endDate: date }),
    stakeAmount: undefined,
    setStakeAmount: (amount) => set({ stakeAmount: amount }),
    timeSettings: initialTimeSettings,
    setTimeSettings: (settings) => set({ timeSettings: settings }),
    setTimeMode: (mode: TimeMode) => set((state) => ({
        timeSettings: { ...state.timeSettings, timeMode: mode }
    })),
    resetRoutineState: () => set({
        blockedApps: [],
        endDate: getDefaultEndDate(),
        stakeAmount: undefined,
        timeSettings: initialTimeSettings,
        draft: {
            blockedApps: [],
            endDate: getDefaultEndDate(),
            stakeAmount: undefined,
            timeSettings: initialTimeSettings
        }
    }),
    
    // Draft state
    draft: {
        blockedApps: [],
        endDate: getDefaultEndDate(),
        stakeAmount: undefined,
        timeSettings: initialTimeSettings
    },
    
    // Draft setters
    setDraftBlockedApps: (apps) => set((state) => ({
        draft: { ...state.draft, blockedApps: apps }
    })),
    
    setDraftEndDate: (date) => set((state) => ({
        draft: { ...state.draft, endDate: date }
    })),
    
    setDraftStakeAmount: (amount) => set((state) => ({
        draft: { ...state.draft, stakeAmount: amount }
    })),
    
    setDraftTimeSettings: (settings) => set((state) => ({
        draft: { ...state.draft, timeSettings: settings }
    })),
    
    updateDraftDuration: (duration) => set((state) => ({
        draft: { 
            ...state.draft, 
            timeSettings: { ...state.draft.timeSettings, duration }
        }
    })),
    
    updateDraftTimeMode: (mode) => set((state) => ({
        draft: { 
            ...state.draft, 
            timeSettings: { ...state.draft.timeSettings, timeMode: mode }
        }
    })),
    
    updateDraftSelectedDays: (days) => set((state) => ({
        draft: { 
            ...state.draft, 
            timeSettings: { ...state.draft.timeSettings, selectedDays: days }
        }
    })),
    
    updateDraftTimeRange: (startTime, endTime) => set((state) => ({
        draft: { 
            ...state.draft, 
            timeSettings: { ...state.draft.timeSettings, startTime, endTime }
        }
    })),
    
    // Initialize draft from current saved state (or defaults if empty)
    initializeDraft: () => set((state) => ({
        draft: {
            blockedApps: state.blockedApps.length > 0 ? [...state.blockedApps] : [],
            endDate: state.endDate || getDefaultEndDate(),
            stakeAmount: state.stakeAmount,
            timeSettings: { ...state.timeSettings }
        }
    })),
    
    // Commit draft to saved state
    commitDraft: () => set((state) => ({
        blockedApps: [...state.draft.blockedApps],
        endDate: state.draft.endDate,
        stakeAmount: state.draft.stakeAmount,
        timeSettings: { ...state.draft.timeSettings }
    })),
    
    // Discard draft and revert to saved state
    discardDraft: () => set((state) => ({
        draft: {
            blockedApps: [...state.blockedApps],
            endDate: state.endDate,
            stakeAmount: state.stakeAmount,
            timeSettings: { ...state.timeSettings }
        }
    })),
    
    // Check if draft has changes
    hasDraftChanges: () => {
        const state = get();
        return (
            // Check apps
            state.draft.blockedApps.length !== state.blockedApps.length ||
            !state.draft.blockedApps.every((app, i) => 
                app.packageName === state.blockedApps[i]?.packageName
            ) ||
            // Check date
            state.draft.endDate?.getTime() !== state.endDate?.getTime() ||
            // Check stake
            state.draft.stakeAmount !== state.stakeAmount ||
            // Check time settings
            JSON.stringify(state.draft.timeSettings) !== JSON.stringify(state.timeSettings)
        );
    }
})); 