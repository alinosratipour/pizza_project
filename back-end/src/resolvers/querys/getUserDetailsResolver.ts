import { Context } from "../../helpers/prismaContext"; // Adjust the path as per your project structure

const getUserDetailsResolver = async (
  _parent: unknown,
  _args: { userId: number }, // Define userId as an argument
  context: Context,
  _info: unknown
) => {
  try {
    const { userId } = _args;
    
    // Assuming you have a method in your context to fetch user details
    const user = await context.prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true, // Include addresses relation assuming it's in your schema
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Map the fetched user details to match the User type in your GraphQL schema
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      addresses: user.addresses,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Unable to fetch user data');
  }
};

export default getUserDetailsResolver;
