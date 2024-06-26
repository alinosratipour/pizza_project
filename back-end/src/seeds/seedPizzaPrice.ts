// Import PrismaClient
const { PrismaClient } = require("@prisma/client");
import { seedSize } from "./seedSize";
// Create an instance of PrismaClient
const prisma = new PrismaClient();

export async function seedPizzaPrices() {
 // await new Promise(resolve => setTimeout(resolve, 2000));

  try {
    await seedSize();
    // Define an array of pizza prices with sizes and pizza IDs
    const pizzaPrices = [
      {
        id_size: 1, // Size ID
        id_pizza: 1, // Pizza ID
        price: 10.99, // Price for this combination
      },
      {
        id_size: 2,
        id_pizza: 1,
        price: 15.99,
      },
      {
        id_size: 3,
        id_pizza: 1,
        price: 12.99,
      },
      {
        id_size: 4,
        id_pizza: 1,
        price: 18.99,
      },

      {
        id_size: 1, // Size ID
        id_pizza: 2, // Pizza ID
        price: 10.99, // Price for this combination
      },
      {
        id_size: 2,
        id_pizza: 2,
        price: 15.99,
      },
      {
        id_size: 3,
        id_pizza: 2,
        price: 12.99,
      },

      {
        id_size: 1, // Size ID
        id_pizza: 3, // Pizza ID
        price: 10.99, // Price for this combination
      },
      {
        id_size: 2,
        id_pizza: 3,
        price: 15.99,
      },
      {
        id_size: 3,
        id_pizza: 3,
        price: 12.99,
      },

      {
        id_size: 1, // Size ID
        id_pizza: 4, // Pizza ID
        price: 10.99, // Price for this combination
      },
      {
        id_size: 2,
        id_pizza: 4,
        price: 15.99,
      },
      {
        id_size: 3,
        id_pizza: 4,
        price: 12.99,
      },

      {
        id_size: 1, // Size ID
        id_pizza: 5, // Pizza ID
        price: 10.99, // Price for this combination
      },
      {
        id_size: 2,
        id_pizza: 5,
        price: 15.99,
      },
      {
        id_size: 3,
        id_pizza: 5,
        price: 12.99,
      },

      {
        id_size: 1, // Size ID
        id_pizza: 6, // Pizza ID
        price: 10.99, // Price for this combination
      },
      {
        id_size: 2,
        id_pizza: 6,
        price: 15.99,
      },
      {
        id_size: 3,
        id_pizza: 6,
        price: 12.99,
      },

      {
        id_size: 1, // Size ID
        id_pizza: 7, // Pizza ID
        price: 10.99, // Price for this combination
      },
      {
        id_size: 2,
        id_pizza: 7,
        price: 15.99,
      },
      {
        id_size: 3,
        id_pizza: 7,
        price: 12.99,
      },

      {
        id_size: 1, // Size ID
        id_pizza: 8, // Pizza ID
        price: 10.99, // Price for this combination
      },
      {
        id_size: 2,
        id_pizza: 8,
        price: 15.99,
      },
      {
        id_size: 3,
        id_pizza: 8,
        price: 12.99,
      },

      {
        id_size: 1, // Size ID
        id_pizza: 9, // Pizza ID
        price: 10.99, // Price for this combination
      },
      {
        id_size: 2,
        id_pizza: 9,
        price: 15.99,
      },
      {
        id_size: 3,
        id_pizza: 9,
        price: 12.99,
      },

      {
        id_size: 1, // Size ID
        id_pizza: 10, // Pizza ID
        price: 10.99, // Price for this combination
      },
      {
        id_size: 2,
        id_pizza: 10,
        price: 15.99,
      },
      {
        id_size: 3,
        id_pizza: 10,
        price: 12.99,
      },
    ];

    const data = await prisma.pizzaPrice.createMany({
      data: pizzaPrices,
    });

    console.log("Pizza prices seeded successfully", data);
  } catch (error) {
    console.error("Error seeding pizza prices:", error);
  } finally {
    // Disconnect the Prisma client to release the connection pool
    await prisma.$disconnect();
  }
}

// Call the seedPizzaPrices function to start seeding
seedPizzaPrices();
