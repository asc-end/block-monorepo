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

export type RoutineState = {
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
};

const initialTimeSettings: TimeSettings = {
    selectedDays: [],
    startTime: "09:00",
    endTime: "17:00",
    timeMode: 'blocking',
    duration: 60
};

export const useRoutineStore = create<RoutineState>((set) => ({
    blockedApps: [],
    setBlockedApps: (apps) => set({ blockedApps: apps }),
    endDate: null,
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
        endDate: null,
        stakeAmount: undefined,
        timeSettings: initialTimeSettings
    }),
})); 