import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedToppings() {
  try {
    // Insert data into the Toppings table
    await prisma.toppings.createMany({
      data: [
        { name: 'Mushroom' },
        { name: 'Pepperoni' },
        { name: 'Onion' },
        { name: 'Sausage' },
        { name: 'Green Pepper' },
        { name: 'Black Olive' },
        { name: 'Pineapple' },
        { name: 'Bacon' },
        { name: 'Spinach' },
        { name: 'Tomato' },
        // Add more toppings as needed
      ],
    });

    console.log('Toppings seeded successfully.');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedToppings();
