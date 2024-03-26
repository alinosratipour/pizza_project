import { Context } from "../helpers/prismaContext";

const getAllPizzasListResolver = async (
  _parent: unknown,
  _args: unknown,
  _context: Context, // Use the Context type
  _info: unknown
) => {
  try {
    const pizzas = await _context.prisma.pizza.findMany();
    return pizzas;
  } catch (error) {
    console.error("Error fetching pizza data:", error);
    throw new Error("Unable to fetch pizza data");
  } finally {
    await _context.prisma.$disconnect();
  }
};

export default getAllPizzasListResolver;
