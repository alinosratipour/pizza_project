// seedBasePrice.ts
import { PrismaClient } from '@prisma/client';
import { seedBase } from './seedBase'; // Import seedBase function

const prisma = new PrismaClient();

export async function seedBasePrice() {
  try {
    // Ensure that the Base table is seeded before seeding BasePrice
    await seedBase();

    // Define your data to seed here
    const dataToSeed = [
      { id_size: 4, id_base: 1, price_base: 4.0 },
      { id_size: 4, id_base: 2, price_base: 5.0 },
      { id_size: 4, id_base: 3, price_base: 6.0 },
      // Add more data as needed
    ];

    // Seed the data into the database
    const seededData = await prisma.basePrice.createMany({
      data: dataToSeed,
    });

    console.log('Seeded data:', seededData);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}
