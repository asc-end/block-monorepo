import { PublicKey } from '@solana/web3.js';
import WebSocket from 'ws';

interface SurfpoolSubscriptionParams {
  url: string;
  programId?: PublicKey;
  filter?: any;
  commitment?: string;
}

export class SurfpoolWebsocketClient {
  private ws: WebSocket | null = null;
  private subscriptions: Map<number, any> = new Map();
  private nextId = 1;
  private url: string;
  private callbacks: Map<number, (data: any) => void> = new Map();
  private reconnectInterval: NodeJS.Timeout | null = null;
  private isConnecting = false;

  constructor(url: string = 'ws://127.0.0.1:8900') {
    this.url = url;
  }

  async connect(): Promise<void> {
    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
      return;
    }

    this.isConnecting = true;

    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        this.ws.on('open', () => {
          console.log('Connected to Surfpool websocket');
          this.isConnecting = false;
          
          // Resubscribe to all existing subscriptions
          for (const [id, params] of this.subscriptions) {
            this.sendSubscription(id, params);
          }
          
          resolve();
        });

        this.ws.on('message', (data: string) => {
          try {
            const message = JSON.parse(data);
            console.log('Surfpool WS message:', JSON.stringify(message).substring(0, 200));
            
            // Handle subscription confirmations
            if (message.id && message.result) {
              console.log(`Subscription ${message.id} confirmed with subscription ID: ${message.result}`);
              // Map the request ID to the subscription ID returned by the server
              const params = this.subscriptions.get(message.id);
              if (params) {
                const callback = this.callbacks.get(message.id);
                if (callback) {
                  this.callbacks.delete(message.id);
                  this.callbacks.set(message.result, callback);
                }
              }
              return;
            }
            
            // Handle notifications - try different possible formats
            if (message.method === 'accountNotification' || message.method === 'logsNotification' ||
                message.method === 'programNotification' || message.method === 'notification') {
              console.log(`Received ${message.method} for subscription ${message.params?.subscription}`);
              const subscriptionId = message.params?.subscription;
              const callback = this.callbacks.get(subscriptionId);
              if (callback) {
                callback(message.params?.result || message.params);
              } else {
                console.warn(`No callback found for subscription ${subscriptionId}`);
              }
            }
            
            // Also check if the message has a subscription field directly
            if (message.subscription && this.callbacks.has(message.subscription)) {
              console.log(`Received notification for subscription ${message.subscription}`);
              const callback = this.callbacks.get(message.subscription);
              if (callback) {
                callback(message.result || message);
              }
            }
          } catch (error) {
            console.error('Error parsing websocket message:', error);
          }
        });

        this.ws.on('error', (error) => {
          console.error('Surfpool websocket error:', error);
          this.isConnecting = false;
          reject(error);
        });

        this.ws.on('close', () => {
          console.log('Surfpool websocket disconnected');
          this.isConnecting = false;
          this.attemptReconnect();
        });

      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  private attemptReconnect() {
    if (this.reconnectInterval) return;
    
    this.reconnectInterval = setInterval(async () => {
      try {
        await this.connect();
        if (this.reconnectInterval) {
          clearInterval(this.reconnectInterval);
          this.reconnectInterval = null;
        }
      } catch (error) {
        console.log('Reconnection failed, retrying...');
      }
    }, 5000);
  }

  private sendSubscription(id: number, params: any) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket not connected');
      return;
    }

    console.log({
      jsonrpc: '2.0',
      id,
      method: params.method,
      params: params.params
    })
    
    this.ws.send(JSON.stringify({
      jsonrpc: '2.0',
      id,
      method: params.method,
      params: params.params
    }))
  }

  async programSubscribe(
    programId: PublicKey,
    callback: (accountInfo: any) => void,
    commitment: string = 'confirmed'
  ): Promise<number> {
    const id = this.nextId++;
    
    const params = {
      method: 'programSubscribe',
      params: [
        programId.toBase58(),
        {
          encoding: 'base64',
          commitment
        }
      ]
    };

    this.subscriptions.set(id, params);
    this.callbacks.set(id, callback);
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.sendSubscription(id, params);
    }
    
    return id;
  }

  async accountSubscribe(
    pubkey: PublicKey,
    callback: (accountInfo: any) => void,
    config?: {
      encoding?: string;
      commitment?: string;
    }
  ): Promise<number> {
    const id = this.nextId++;
    
    const params = {
      method: 'accountSubscribe',
      params: [
        pubkey.toBase58(),
        {
          encoding: config?.encoding || 'base64',
          commitment: config?.commitment || 'confirmed'
        }
      ]
    };
    this.subscriptions.set(id, params);
    this.callbacks.set(id, callback);
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.sendSubscription(id, params);
    }
    
    return id;
  }

  async logsSubscribe(
    filter: { mentions?: string[] } | 'all',
    callback: (logs: any) => void,
    commitment: string = 'confirmed'
  ): Promise<number> {
    const id = this.nextId++;
    
    const params = {
      method: 'logsSubscribe',
      id,
      params: []
    };

    this.subscriptions.set(id, params);
    this.callbacks.set(id, callback);
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.sendSubscription(id, params);
    }
    
    return id;
  }

  async unsubscribe(subscriptionId: number): Promise<void> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    this.ws.send(JSON.stringify({
      jsonrpc: '2.0',
      id: this.nextId++,
      method: 'programUnsubscribe',
      params: [subscriptionId]
    }));

    this.subscriptions.delete(subscriptionId);
    this.callbacks.delete(subscriptionId);
  }

  async disconnect(): Promise<void> {
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
      this.reconnectInterval = null;
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.subscriptions.clear();
    this.callbacks.clear();
  }
}