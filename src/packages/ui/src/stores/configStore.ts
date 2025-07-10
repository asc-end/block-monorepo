import { create } from 'zustand';

export interface AppConfig {
  apiUrl: string;
  wsUrl: string;
  webUrl?: string;
  privyAppId?: string;
  privyClientId?: string;
  environment?: 'development' | 'staging' | 'production';
}

interface ConfigState {
  config: AppConfig | null;
  isInitialized: boolean;
  initializeConfig: (config: AppConfig) => void;
  getConfig: () => AppConfig;
  getApiUrl: () => string;
  getWsUrl: () => string;
}

export const useConfigStore = create<ConfigState>((set, get) => ({
  config: null,
  isInitialized: false,
  
  initializeConfig: (config: AppConfig) => {
    console.log("initializeConfig", config)
    if (get().isInitialized) {
      console.warn('Config store already initialized. Ignoring duplicate initialization.');
      return;
    }
    
    if (!config.apiUrl || !config.wsUrl) {
      throw new Error('Config must include apiUrl and wsUrl');
    }
    
    set({ config, isInitialized: true });
  },
  
  getConfig: () => {
    const { config, isInitialized } = get();
    if (!isInitialized || !config) {
      throw new Error('Config store not initialized. Call initializeConfig first.');
    }
    return config;
  },
  
  getApiUrl: () => {
    const config = get().getConfig();
    return config.apiUrl;
  },
  
  getWsUrl: () => {
    const config = get().getConfig();
    return config.wsUrl;
  },
}));

export const initializeConfig = (config: AppConfig) => {
  useConfigStore.getState().initializeConfig(config);
};

export const getConfig = () => {
  return useConfigStore.getState().getConfig();
};

export const getApiUrl = () => {
  return useConfigStore.getState().getApiUrl();
};

export const getWsUrl = () => {
  return useConfigStore.getState().getWsUrl();
};