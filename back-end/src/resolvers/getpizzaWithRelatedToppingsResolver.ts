
import {Context} from '../helpers/prismaContext'

const getpizzaWithRelatedToppingsResolver = async (
  _parent: unknown,
  _args: unknown,
  _context: Context,
  _info: unknown
) => {
  try {
    // Fetch data using _context.prisma
    const pizzasWithToppings = await _context.prisma.pizza.findMany({
      include: {
        toppingsOnPizza: {
          include: {
            topping: true, // Include the related Toppings
          },
        },
      },
    });

    // Process the data and format the response
    const formattedData = pizzasWithToppings.map((pizza) => ({
      id_pizza: pizza.id_pizza,
      name: pizza.name,
      top_quantity: pizza.top_quantity,
      description: pizza.description,
      image: pizza.image,
      toppingsOnPizza: pizza.toppingsOnPizza.map((toppingOnPizza) => ({
        id: toppingOnPizza.id,
        id_pizza: toppingOnPizza.id_pizza,
        idf_topping: toppingOnPizza.idf_topping,
        // Include other properties as needed
        toppings: toppingOnPizza.topping,
      })),
    }));

    return formattedData;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch data");
  } finally {
    await _context.prisma.$disconnect();;
  }
};

export default getpizzaWithRelatedToppingsResolver;
