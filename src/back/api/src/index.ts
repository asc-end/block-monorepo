

// Load dotenv for local development
// In production (Railway), env vars are provided by the platform
import dotenv from 'dotenv';
dotenv.config();

// Log environment info for debugging
console.log('Starting backend...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('PRIVY_SECRET exists:', !!process.env.PRIVY_SECRET);
import express from 'express';
import { createServer } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';
import cors from 'cors';
import { wsManager } from './services/init';
import { prisma } from './config';
import { handleSaveTasks } from './services/todoHandlers';
import Users from './routes/users';
import FocusSessions from './routes/focus-sessions';
import AppUsage from './routes/app-usage';
import Todo from "./routes/todo";
import Routines from './routes/routines';
import Apps from './routes/apps';
import Commitments from './routes/commitments';
import Marketplace from './routes/marketplace/index';
import MarketplaceSellers from './routes/marketplace/sellers';

const app = express();

app.use(cors());
app.use(express.json());

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  const url = new URL(req.url!, `http://${req.headers.host}`);

  const userId = url.searchParams.get('userId');
  if (!userId) return ws.close(1008, 'Invalid or missing userId');

  wsManager.addUserConnection(userId, ws);

  // Handle incoming messages
  //TO DO add auth middleware
  ws.on('message', async (data: Buffer) => {
    const timestamp = new Date().toISOString();
    const rawMessage = data.toString();
    
    try {
      const message = JSON.parse(rawMessage);

      switch (message.type) {
        case 'saveTasks':
          await handleSaveTasks(userId, message.payload);
          break;
      }
    } catch (error) {
      console.error(`[${timestamp}] Error handling WebSocket message from user ${userId}:`, {
        error: error instanceof Error ? error.message : String(error),
        rawMessage: rawMessage.substring(0, 200) + (rawMessage.length > 200 ? '...' : '')
      });
    }
  });
});


// ROUTES
app.use('/users', Users);
app.use('/focus-session', FocusSessions);
app.use('/app-usage', AppUsage);
app.use('/todo', Todo);
app.use('/routines', Routines);
app.use('/apps', Apps);
app.use('/marketplace', Marketplace);
app.use('/marketplace/sellers', MarketplaceSellers);
app.use('/commitments', Commitments);

app.get('/', (req, res) => { res.send('Hello World!') });
// Log every route being fetched
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});



const PORT = parseInt(process.env.PORT ?? "3001");
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
}); 