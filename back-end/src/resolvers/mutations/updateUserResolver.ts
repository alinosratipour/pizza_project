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
      const updateAddressPromises = addresses.map(async (addressInput) => {
        const {
          addressId,
          address1,
          address2 = '',
          city,
          state = '',
          postalCode,
          country,
          phoneNumber,
        } = addressInput;

        const addressData = {
          address1,
          address2,
          city,
          state,
          postalCode,
          country,
          phoneNumber,
        };

        if (addressId) {
          // Update existing address if addressId is provided
          const existingAddress = await context.prisma.address.findFirst({
            where: { id: addressId, userId: userId },
          });

          if (existingAddress) {
            await context.prisma.address.update({
              where: { id: addressId },
              data: addressData,
            });
          } else {
            throw new Error(`Address with ID ${addressId} not found for user.`);
          }
        } else {
          // Create new address if addressId is not provided
          await context.prisma.address.create({
            data: {
              ...addressData,
              user: { connect: { id: userId } }, // Connect address to the user
            },
          });
        }
      });

      await Promise.all(updateAddressPromises);
    }

    // Fetch and return the updated user with addresses included
    const updatedUser = await context.prisma.user.findUnique({
      where: { id: userId },
      include: { addresses: true }, // Ensure addresses are included in the response
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
