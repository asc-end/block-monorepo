import { create } from 'zustand';
import axios, { type AxiosInstance } from 'axios';
import { getApiUrl } from './configStore';

interface AuthState {
  token: string | null;
  apiClient: AxiosInstance;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  createApiClient: (token?: string | null) => AxiosInstance;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  apiClient: axios.create(),
  
  createApiClient: (token?: string | null) => {
    try {
      const apiUrl = getApiUrl();
      return axios.create({
        baseURL: apiUrl,
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
    } catch (error) {
      console.warn('Config not initialized, creating default axios instance');
      return axios.create();
    }
  },
  
  setToken: (token: string | null) => {
    const apiClient = get().createApiClient(token);
    set({ token, apiClient });
  },
  
  clearToken: () => {
    const apiClient = get().createApiClient();
    set({ token: null, apiClient });
  },
}));

export const api = () => useAuthStore.getState().apiClient;