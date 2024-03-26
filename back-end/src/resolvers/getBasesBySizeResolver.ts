import { Context } from '../helpers/prismaContext';

const getBasesBySizeResolver = async (
  _parent: unknown,
  args: { id_size: number },
  _context: Context,
  _info: unknown
) => {
  try {
    const { id_size } = args;

    const bases = await _context.prisma.base.findMany();

    const basePrices = await _context.prisma.basePrice.findMany({
      where: {
        id_size: id_size, // Filter by the selected size
      },
    });

    const basesWithPrices = bases.map((base) => {
      // Find the matching basePrice entry for the selected size
      const basePrice = basePrices.find((bp) => bp.id_base === base.id_base);

      return {
        id_base: base.id_base,
        base: base.name,
        price: basePrice ? basePrice.price_base : 0, // Access the price_base field
      };
    });

    return basesWithPrices;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching bases by size:', error);
      throw new Error('Unable to fetch bases by size');
    }
  }
};

export default getBasesBySizeResolver;
