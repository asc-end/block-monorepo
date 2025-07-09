import { PrivyClient } from '@privy-io/server-auth';
import { PrismaClient } from '@prisma/client';

// if (!process.env.PRIVY_SECRET) {
//   throw new Error('PRIVY_SECRET environment variable is not set');
// }

export const privy = new PrivyClient("cm1iz25fc00l51dg0jxrtd9sz", process.env.PRIVY_SECRET!!);
export const prisma = new PrismaClient();