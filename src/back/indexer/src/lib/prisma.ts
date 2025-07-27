import { PrismaClient } from '@blockit/database';
export { Prisma } from '@blockit/database';
export type { PrismaClient } from '@blockit/database';

// Create PrismaClient instance with indexer's own environment variables
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});