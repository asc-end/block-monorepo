import express from 'express';
import { createServer } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { wsManager } from './services/init';
import Users from './routes/users';
import FocusSessions from './routes/focus-sessions';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const userId = url.searchParams.get('userId');

  if (userId) return wsManager.addUserConnection(userId, ws);
  ws.close(1008, 'Invalid or missing userId');
});


// ROUTES
app.use('/users', Users);
app.use('/focus-session', FocusSessions);

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