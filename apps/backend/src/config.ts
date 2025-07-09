import { PrivyClient } from '@privy-io/server-auth';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

// Debug output
console.log('Environment variables check:');
console.log('PRIVY_SECRET exists:', !!process.env.PRIVY_SECRET);
console.log('PRIVY_SECRET value (first 10 chars):', process.env.PRIVY_SECRET?.substring(0, 10) + '...');
console.log('All env vars starting with PRIVY:', Object.keys(process.env).filter(key => key.startsWith('PRIVY')));

if (!process.env.PRIVY_SECRET) {
  console.error('Available environment variables:', Object.keys(process.env).sort());
  throw new Error('PRIVY_SECRET environment variable is not set. Check Railway Variables configuration.');
}

export const privy = new PrivyClient("cm1iz25fc00l51dg0jxrtd9sz", process.env.PRIVY_SECRET);
export const prisma = new PrismaClient();