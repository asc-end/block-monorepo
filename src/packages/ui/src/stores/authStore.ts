import { create } from 'zustand';
import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { getApiUrl } from './configStore';

interface AuthState {
  token: string | null;
  apiClient: AxiosInstance;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  createApiClient: (token?: string | null) => AxiosInstance;
  getTokenRefreshFunction?: () => Promise<string | null>;
  setTokenRefreshFunction: (fn: () => Promise<string | null>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  apiClient: axios.create(),
  getTokenRefreshFunction: undefined,
  
  createApiClient: (token?: string | null) => {
    try {
      const apiUrl = getApiUrl();
      const client = axios.create({
        baseURL: apiUrl,
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });

      // Add response interceptor to handle JWT expiration with retry
      client.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
          const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
          
          if (error.response?.status === 401 && !originalRequest._retry) {
            // JWT expired or invalid
            const errorData = error.response.data as any;
            if (errorData?.message?.includes('JWT expired') || 
                errorData?.message?.includes('Invalid token') ||
                errorData?.message?.includes('jwt expired')) {
              
              // Mark this request as retried to prevent infinite loops
              originalRequest._retry = true;
              
              // Try to refresh the token
              const refreshFunction = get().getTokenRefreshFunction;
              if (refreshFunction) {
                try {
                  const newToken = await refreshFunction();
                  if (newToken) {
                    // Update the token in the store
                    get().setToken(newToken);
                    
                    // Update the authorization header for the retry
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    
                    // Retry the original request with the new token
                    return axios(originalRequest);
                  }
                } catch (refreshError) {
                  console.error('Token refresh failed:', refreshError);
                }
              }
              
              // If refresh failed or no refresh function, clear the token
              get().clearToken();
            }
          }
          return Promise.reject(error);
        }
      );

      return client;
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

  setTokenRefreshFunction: (fn: () => Promise<string | null>) => {
    set({ getTokenRefreshFunction: fn });
  },
}));

export const api = () => useAuthStore.getState().apiClient;