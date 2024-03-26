
import {Context}  from '../helpers/prismaContext'

const getpizzasWithSizesAndPricesResolver = async (
  _parent: unknown,
  _args: unknown,
  _context: Context,
  _info: unknown
) => {
  try {
    // Fetch all pizzas with their related sizes and prices
    const pizzasWithSizesAndPrices = await _context.prisma.pizza.findMany({
      include: {
        pizzaPrice: {
          include: {
            size: true, // Include the related size
          },
        },
      },
    });

    // Process the data to format it as desired
    const formattedPizzas = pizzasWithSizesAndPrices.map((pizza) => ({
      id_pizza: pizza.id_pizza,
      name: pizza.name,
      top_quantity: pizza.top_quantity,
      description: pizza.description,
      image: pizza.image,
      sizesWithPrices: pizza.pizzaPrice.map((pizzaPrice) => ({
        id_size: pizzaPrice.size.id_size,
        p_size: pizzaPrice.size.p_size,
        price_topping: pizzaPrice.size.price_topping,
        price: pizzaPrice.price, // Include the price from pizzaPrice
      })),
    }));

    return formattedPizzas;
  } catch (error) {
    console.error("Error fetching pizza data:", error);
    throw new Error("Unable to fetch pizza data");
  } finally {
    await _context.prisma.$disconnect();
  }
};

export default getpizzasWithSizesAndPricesResolver;
