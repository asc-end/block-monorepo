import axios from 'axios';

export const appConfig = {
    apiUrl: 'http://192.168.1.29:3001',
    wsUrl: 'ws://192.168.1.29:3001'
};

export const createApiClient = (token?: string | null) => {
    try {
      console.log("wsh", token);
        return axios.create({
            baseURL: appConfig.apiUrl,
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
    } catch (error) {
        console.error('Error creating API client:', error);
        throw error;
    }
};