import { create } from 'zustand';
import { createApiClient } from '../lib/config';
import type { AxiosInstance } from 'axios';

interface AuthState {
  token: string | null;
  apiClient: AxiosInstance;
  setToken: (token: string | null) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  apiClient: createApiClient(),
  setToken: (token: string | null) => set({ 
    token, 
    apiClient: createApiClient(token) 
  }),
  clearToken: () => set({ 
    token: null, 
    apiClient: createApiClient() 
  }),
}));

export const api = () => useAuthStore.getState().apiClient;