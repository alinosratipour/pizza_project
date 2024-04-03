import { seedPizza } from "./seedPizza";
import { seedBase } from "./seedBase";
import { seedSize } from "./seedSize";
import { seedBasePrice } from "./seedBasePrice";
import { seedPizzaPrice } from "./seedPizzaPrice";
import { seedToppings } from "./seedToppings";
import { seedToppingPrice } from "./seedToppingPrice";
import { seedToppingsOnPizza } from "./seedToppingsOnPizza";
export async function seed() {
  try {
    await seedPizza();
    await seedBase();
    await seedSize();
    await seedBasePrice();
    await seedPizzaPrice();
    await seedToppings();
    await seedToppingPrice();
    await seedToppingsOnPizza();
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
