import { PrivyClient } from '@privy-io/server-auth';
import { PrismaClient } from '@blockit/database';

// if (!process.env.PRIVY_SECRET) {
//   throw new Error('PRIVY_SECRET environment variable is not set');
// }

export const privy = new PrivyClient("cm1iz25fc00l51dg0jxrtd9sz", process.env.PRIVY_SECRET!!);

// Create PrismaClient instance with API's own environment variables
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;