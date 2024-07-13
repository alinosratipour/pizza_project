import { User } from "@prisma/client";
import { Context } from "../../helpers/prismaContext";
import { UpdateUserArgs } from "../types/types";

const updateUserResolver = async (
  _: unknown,
  args: UpdateUserArgs,
  context: Context
): Promise<User> => {
  const { userId, name, addresses } = args;

  try {
    // Update user's name if provided
    if (name) {
      await context.prisma.user.update({
        where: { id: userId },
        data: { name },
      });
    }

    // Update user's addresses if provided
    if (addresses && addresses.length > 0) {
      const updateAddressPromises = addresses.map(async (addressInput) => {
        const {
          addressId,
          address1,
          address2,
          city,
          state,
          postalCode,
          country,
          phoneNumber,
        } = addressInput;

        await context.prisma.address.update({
          where: { id: addressId },
          data: {
            address1,
            address2,
            city,
            state,
            postalCode,
            country,
            phoneNumber,
          },
        });
      });

      await Promise.all(updateAddressPromises);
    }

    // Fetch and return the updated user
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
      throw new Error("Failed to update user: Unknown error occurred");
    }
  }
};

export default updateUserResolver;
