import { User } from '@prisma/client';
import { Context } from '../../helpers/prismaContext';
import { UpdateUserArgs } from '../types/types';

const updateUserResolver = async (
  _: unknown,
  args: UpdateUserArgs,
  context: Context
): Promise<User> => {
  const { userId, name, addresses } = args;

  try {
    // Ensure the user exists before proceeding
    const existingUser = await context.prisma.user.findUnique({
      where: { id: userId },
      include: { addresses: true },
    });

    if (!existingUser) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    // Update user's name if provided
    if (name) {
      await context.prisma.user.update({
        where: { id: userId },
        data: { name },
      });
    }

    // Handle addresses
    if (addresses && addresses.length > 0) {
      const userHasAddress = existingUser.addresses.length > 0;

      if (userHasAddress) {
        // Update existing address if user has one
        const addressId = existingUser.addresses[0].id; // Assuming only one address per user for simplicity

        await context.prisma.address.update({
          where: { id: addressId },
          data: {
            address1: addresses[0].address1,
            address2: addresses[0].address2 || '', // Ensure address2 is not undefined
            city: addresses[0].city,
            state: addresses[0].state || '',
            postalCode: addresses[0].postalCode,
            country: addresses[0].country  || '',
            phoneNumber: addresses[0].phoneNumber,
          },
        });
      } else {
        // Create new address if user doesn't have one
        await context.prisma.address.create({
          data: {
            address1: addresses[0].address1,
            address2: addresses[0].address2 || '', // Ensure address2 is not undefined
            city: addresses[0].city,
            state: addresses[0].state || '',
            postalCode: addresses[0].postalCode,
            country: addresses[0].country  || '',
            phoneNumber: addresses[0].phoneNumber,
            user: { connect: { id: userId } },
          },
        });
      }
    }

    // Fetch and return the updated user with addresses included
    const updatedUser = await context.prisma.user.findUnique({
      where: { id: userId },
      include: { addresses: true },
    });

    if (!updatedUser) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    return updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update user: ${error.message}`);
    } else {
      throw new Error('Failed to update user: Unknown error occurred');
    }
  }
};

export default updateUserResolver;
