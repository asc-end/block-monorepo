// Re-export all types from Prisma client
export * from './client';

// Re-export PrismaClient class (but don't instantiate it)
export { PrismaClient } from './client';

// Re-export Prisma namespace for things like Prisma.UserSelect
export { Prisma } from './client';