import { seedPizza } from "./seedPizza";
import { seedBase } from "./seedBase";
import { seedSize } from "./seedSize";
import { seedBasePrice } from "./seedBasePrice";
import { seedPizzaPrices } from "./seedPizzaPrice";
import { seedToppings } from "./seedToppings";
import { seedToppingPrice } from "./seedToppingPrice";
import { seedToppingsOnPizza } from "./seedToppingsOnPizza";
export async function seed() {
  try {
    await seedPizza();
    await seedSize();
    await seedBasePrice();
    await seedPizzaPrices();
    await seedToppingPrice();
    await seedToppingsOnPizza();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}
