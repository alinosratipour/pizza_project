import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
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

  // ... (other seeding data for ToppingPrice and ToppingOnPizza tables)
  
  await prisma.$disconnect();
}

seed().catch((error) => {
  console.error('Error seeding database:', error);
});
