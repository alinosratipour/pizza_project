import { Context } from "../helpers/prismaContext";

const getToppingsOnPizzaResolver = async (
  _parent: unknown,
  args: { pizzaId: number }, // Change the argument name to pizzaId
  context: Context,
  _info: unknown
) => {
  try {
    const { pizzaId } = args; // Adjust to pizzaId

    const toppingsOnPizza = await context.prisma.toppingOnPizza.findMany({
      where: {
        id_pizza: pizzaId, // Adjust to id_pizza
      },
      include: {
        topping: {
          include: {
            toppingPrice: true,
          },
        },
      },
    });

    const formattedToppingsOnPizza = toppingsOnPizza.map((toppingOnPizza) => {
      return {
        id: toppingOnPizza.id,
        id_pizza: toppingOnPizza.id_pizza,
        toppings: {
          id: toppingOnPizza.topping?.id || null,
          name: toppingOnPizza.topping?.name || null,
          toppingPrice: toppingOnPizza.topping?.toppingPrice || null,
        },
      };
    });

    console.log("Formatted Toppings on Pizza:", formattedToppingsOnPizza);

    return formattedToppingsOnPizza;
  } catch (error) {
    console.error("Error fetching toppings on pizza:", error);
    throw new Error("Failed to fetch toppings on pizza.");
  } finally {
    await context.prisma.$disconnect();
  }
};

export default getToppingsOnPizzaResolver;
