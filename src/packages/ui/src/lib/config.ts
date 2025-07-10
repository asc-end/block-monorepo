import axios from 'axios';
import { getApiUrl, getWsUrl } from '../stores/configStore';

export const appConfig = {
    get apiUrl() {
        try {
            return getApiUrl();
        } catch {
            return 'http://localhost:3001';
        }
    },
    get wsUrl() {
        try {
            return getWsUrl();
        } catch {
            return 'ws://localhost:3001';
        }
    }
};

export const createApiClient = (token?: string | null) => {
    try {
        const apiUrl = appConfig.apiUrl;
        return axios.create({
            baseURL: apiUrl,
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
    } catch (error) {
        console.error('Error creating API client:', error);
        throw error;
    }
};