import { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { useAuthStore, api } from '../stores/authStore';
import { appConfig } from '../lib/config';

interface WebSocketMessage {
    type: string;
    payload?: any;
}

interface UseWebSocketOptions {
    onFocusSessionUpdate?: (session: any, action: 'created' | 'disabled' | 'completed') => void;
}

export const useWebSocket = (options: UseWebSocketOptions = {}) => {
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { token } = useAuthStore();
    const { onFocusSessionUpdate } = options;

    const extractUserIdFromToken = async (): Promise<string | null> => {
        try {
            const { data } = await api().get('/users/verify');
            return data.userId;
        } catch (error) {
            console.error('Error extracting userId from token:', error);
            return null;
        }
    };

    const connect = useCallback(async () => {
        if (!token) return;

        try {
            const userId = await extractUserIdFromToken();
            if (!userId) return;

            const ws = new WebSocket(`${appConfig.wsUrl}?userId=${userId}`);

            ws.onopen = () => {
                setIsConnected(true);
                if (reconnectTimeoutRef.current) {
                    clearTimeout(reconnectTimeoutRef.current);
                    reconnectTimeoutRef.current = null;
                }
            };

            ws.onmessage = (event) => {
                try {
                    const message: WebSocketMessage = JSON.parse(event.data);
                    if (message.type === 'FOCUS_SESSION_UPDATED') {
                        const { session, action } = message.payload;
                        onFocusSessionUpdate?.(session, action);
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                setIsConnected(false);
            };

            ws.onclose = (event) => {
                setIsConnected(false);

                // Only attempt to reconnect if it wasn't a manual close
                if (event.code !== 1000 && token) {
                    console.log('Attempting to reconnect in 5 seconds...');
                    reconnectTimeoutRef.current = setTimeout(() => {
                        connect();
                    }, 5000);
                }
            };

            wsRef.current = ws;
        } catch (error) {
            console.error('Failed to connect WebSocket:', error);
            setIsConnected(false);
            // Retry connection after delay
            if (token) {
                reconnectTimeoutRef.current = setTimeout(() => {
                    connect();
                }, 5000);
            }
        }
    }, [token, onFocusSessionUpdate]);

    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }

        if (wsRef.current) {
            wsRef.current.close(1000, 'Manual disconnect');
            wsRef.current = null;
        }
        setIsConnected(false);
    }, []);

    useEffect(() => {
        token ? connect() : disconnect();
        return disconnect;
    }, [token]);

    return {
        isConnected,
        disconnect
    };
}; 