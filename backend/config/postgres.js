// Prisma PostgreSQL client configuration.
// Serves relational data for users, orders, payments, and coupons.
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn']
});

export default prisma;
