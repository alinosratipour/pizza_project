import { Context } from "../helpers/prismaContext";

const getSizesWithBasesResolver = async (
  _parent: unknown,
  _args: unknown,
  _context: Context,
  _info: unknown
) => {
  try {
    // Fetch all sizes with their related bases and prices
    const sizesWithBasesAndPrices = await _context.prisma.size.findMany({
      include: {
        basePrice: {
          include: {
            base: true,
          },
        },
      },
    });

    // Process the data to format it as desired
    const formattedData = sizesWithBasesAndPrices.map((size) => ({
      id_size: size.id_size, 
      size: size.p_size,
      price: size.price_topping,
      bases: size.basePrice.map((basePrice) => ({
        id_base: basePrice.base.id_base,
        base: basePrice.base.name,
        price: basePrice.price_base,
      })),
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching size data:", error);
    throw new Error("Unable to fetch size data");
  } finally {
    await _context.prisma.$disconnect();
  }
};

export default getSizesWithBasesResolver;
