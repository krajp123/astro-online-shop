// Prisma PostgreSQL client configuration.
// Serves all relational data for users, sellers, orders, payments, coupons, and payouts.
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn']
});

export default prisma;
