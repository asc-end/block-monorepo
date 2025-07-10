import { api } from "../stores/authStore";

export function createUser(walletAddress: string) { 
    return api().post('/users/create', { walletAddress });
}