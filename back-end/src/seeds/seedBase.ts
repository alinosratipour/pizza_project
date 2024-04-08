// seedBase.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedBase() {
  try {
    console.log("Starting base seeding...");
    
    // Define an array of base data to insert
    const baseData = [
      {
        name: "DeepPan",
        increase_price: 2, // Adjust this value as needed
      },
      {
        name: "ThinCrust",
        increase_price: 1, // Adjust this value as needed
      },
      {
        name: "StuffedCrust",
        increase_price: 3, // Adjust this value as needed
      },
    ];

    // Insert base data into the database
    const createdBase = await prisma.base.createMany({
      data: baseData,
    });

    console.log("Base records inserted:", createdBase);
  } catch (error) {
    console.error("Error seeding base data:", error);
  } finally {
    await prisma.$disconnect();
    console.log("Disconnected from database");
  }
}

//seedBase();