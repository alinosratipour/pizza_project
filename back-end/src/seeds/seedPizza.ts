import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedPizza() {
  try {
    // Define an array of pizza data to insert
    const pizzaData = [
      {
        name: "Margherita",
        top_quantity: 3,
        description:
          "Classic Italian pizza with tomatoes, mozzarella, and basil.",
        image: "uploads/pizza.jpg",
      },
      {
        name: "Pepperoni",
        top_quantity: 5,
        description: "A favorite with spicy pepperoni slices.",
        image: "uploads/pizza.jpg",
      },
      {
        name: "Hawaiian",
        top_quantity: 4,
        description: "Tropical pizza with ham and pineapple.",
        image: "uploads/pizza.jpg",
      },
      {
        name: "Vegetarian",
        top_quantity: 6,
        description: "Loaded with fresh vegetables and cheese.",
      },
      {
        name: "Supreme",
        top_quantity: 7,
        description: "The works: sausage, peppers, onions, and more.",
        image: "uploads/pizza.jpg",
      },
      {
        name: "BBQ Chicken",
        top_quantity: 5,
        description: "Tangy barbecue sauce with chicken and onions.",
        image: "uploads/pizza.jpg",
      },
      {
        name: "Mushroom Lovers",
        top_quantity: 4,
        description: "For those who can’t get enough mushrooms.",
        image: "uploads/pizza.jpg",
      },
      {
        name: "Meat Lovers",
        top_quantity: 8,
        description: "Packed with all types of meaty goodness.",
        image: "uploads/pizza.jpg",
      },
      {
        name: "Veggie Supreme",
        top_quantity: 7,
        description: "The ultimate veggie pizza experience.",
        image: "uploads/pizza.jpg",
      },
      {
        name: "Buffalo Chicken",
        top_quantity: 5,
        description: "Spicy buffalo sauce and chicken.",
        image: "uploads/pizza.jpg",
      },
    ];

    // Insert pizza data into the database
    const createdPizzas = await prisma.pizza.createMany({
      data: pizzaData,
    });

    console.log("Pizza records inserted:", createdPizzas);
  } catch (error) {
    console.error("Error seeding pizza data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPizza();
