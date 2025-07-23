import { spawn, ChildProcess } from 'child_process';
import { Connection } from '@solana/web3.js';

export class LocalValidator {
  private process: ChildProcess | null = null;
  private connection: Connection | null = null;
  private port: number;

  constructor(port: number = 8899) {
    this.port = port;
  }

  async start(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      // Use unique ports for each test run to avoid conflicts
      const faucetPort = this.port + 1000; // e.g., 8899 -> 9899
      
      this.process = spawn('solana-test-validator', [
        '--reset',
        '--quiet',
        '--rpc-port', this.port.toString(),
        '--faucet-port', faucetPort.toString(),
        '--bind-address', '0.0.0.0',
        '--ledger', `/tmp/test-ledger-${Date.now()}`, // Unique ledger path
      ]);

      this.process.on('error', (err) => {
        reject(new Error(`Failed to start validator: ${err.message}`));
      });
      
      // Capture stdout/stderr for debugging
      this.process.stdout?.on('data', (data) => {
        console.log('Validator stdout:', data.toString());
      });
      
      this.process.stderr?.on('data', (data) => {
        console.error('Validator stderr:', data.toString());
      });

      // Wait for validator to be ready
      setTimeout(async () => {
        try {
          this.connection = new Connection(`http://127.0.0.1:${this.port}`, 'confirmed');
          await this.connection.getVersion();
          resolve(this.connection);
        } catch (err) {
          reject(new Error('Validator failed to start'));
        }
      }, 10000); // Increased timeout to 10 seconds
    });
  }

  async stop(): Promise<void> {
    if (this.process) {
      this.process.kill();
      this.process = null;
    }
    this.connection = null;
  }

  getConnection(): Connection {
    if (!this.connection) {
      throw new Error('Validator not started');
    }
    return this.connection;
  }
}