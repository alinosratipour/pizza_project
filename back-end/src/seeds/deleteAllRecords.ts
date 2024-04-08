import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteAllRecords() {
  try {
    // Delete all records from each table
    await prisma.pizzaPrice.deleteMany({});
    await prisma.toppingOnPizza.deleteMany({});
    await prisma.pizza.deleteMany({});
    await prisma.toppings.deleteMany({});
    await prisma.toppingPrice.deleteMany({});
    await prisma.size.deleteMany({});
    await prisma.base.deleteMany({});
    await prisma.basePrice.deleteMany({});
   
    
    console.log('All records deleted successfully.');
  } catch (error) {
    console.error('Error deleting records:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllRecords();
