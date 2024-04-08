import { PrismaClient } from "@prisma/client";
import { seedToppings } from "./seedToppings";
const prisma = new PrismaClient();

export async function seedToppingPrice() {
  try {
   await seedToppings()
    // Get the existing sizes and their IDs
    const existingSizes = await prisma.size.findMany();
    const sizeIds = existingSizes.map((size) => size.id_size);

    // Get the existing toppings
    const existingToppings = await prisma.toppings.findMany();

    // Loop through each existing topping
    for (const topping of existingToppings) {
      // Create topping price records for each existing size
      const toppingPrices = sizeIds.map((id_size) => ({
        id_topping: topping.id,
        id_size: id_size,
        price_topping: 0, // Set your desired default price here
      }));

      // Create topping price records in the database
      await prisma.toppingPrice.createMany({
        data: toppingPrices,
      });

      console.log(`Topping prices seeded for topping: ${topping.name}`);
    }
  } catch (error) {
    console.error("Error seeding topping prices:", error);
    throw error;
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}

// Call the seeding function
seedToppingPrice().catch((error) => console.error(error));
