import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedSize() {
  try {
    // Define an array of size data to insert
    const sizeData = [
        {
          p_size: 'small', // Should match the casing in your Prisma schema
          price_topping: 5.0,
        },
        {
          p_size: 'medium', // Should match the casing in your Prisma schema
          price_topping: 6.0,
        },
        {
          p_size: 'large', // Should match the casing in your Prisma schema
          price_topping: 7.0,
        },
        {
          p_size: 'Xlarge', // Should match the casing in your Prisma schema
          price_topping: 8.0,
        },
      ];

    // Insert size data into the database
    const createdSizes = await prisma.size.createMany({
      data: sizeData,
    });

    console.log('Size records inserted:', createdSizes);
  } catch (error) {
    console.error('Error seeding size data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSize();
