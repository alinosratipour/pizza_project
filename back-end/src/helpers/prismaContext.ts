import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  disconnect: () => void; // Function to disconnect Prisma //
}

const prisma = new PrismaClient();

const context: Context = {
  prisma,
  disconnect: () => {
    prisma.$disconnect();
  }
};

export default context;
