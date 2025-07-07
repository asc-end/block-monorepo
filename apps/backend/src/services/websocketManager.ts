import WebSocket from 'ws';
import { WebSocketMessage } from '../types';

export class WebSocketManager {
  private userConnections: Map<string, Set<WebSocket>> = new Map();

  addUserConnection(userId: string, ws: WebSocket): void {
    if(!userId) return
    let connections = this.userConnections.get(userId);
    if (!connections) {
      connections = new Set();
      this.userConnections.set(userId, connections);
    }
    connections.add(ws);

    const removeConnection = () => {
      const conns = this.userConnections.get(userId);
      if (conns) {
        conns.delete(ws);
        if (conns.size === 0) {
          this.userConnections.delete(userId);
        }
      }
    };
    ws.on('close', removeConnection);
    ws.on('error', (error) => {
      console.error(`WebSocket error for user ${userId}:`, error);
      removeConnection();
    });
  }

  sendMessageToUser(userId: string, message: WebSocketMessage): boolean {
    const connections = this.userConnections.get(userId);
    if (!connections || connections.size === 0) return false;

    let success = true;
    connections.forEach((ws) => {
      try {
        ws.send(JSON.stringify(message));
      } catch (error) {
        console.error(`Failed to send message to user ${userId}:`, error);
        success = false;
      }
    });
    return success;
  }

  removeUserConnection(userId: string): void {
    const connections = this.userConnections.get(userId);
    if (connections) {
      connections.forEach((ws) => {
        try {
          ws.close();
        } catch (error) {
          console.error(`Error closing WebSocket for user ${userId}:`, error);
        }
      });
      this.userConnections.delete(userId);
    }
  }
} 