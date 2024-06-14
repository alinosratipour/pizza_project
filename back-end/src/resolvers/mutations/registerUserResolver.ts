import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { Context } from "../../helpers/prismaContext";
import { RegisterUserArgs } from "../types/types";

/**
 * Registers a new user with the provided data.
 * @param _: Ignored root value
 * @param args Input arguments for registering a user
 * @param context Context containing Prisma client and other utilities
 * @returns Newly created user
 * @throws Error if registration fails
 */
const registerUserResolver = async (
  _: unknown,
  args: RegisterUserArgs,
  context: Context
): Promise<User> => {
  try {
    const { email, name, password, street, city, state, postalCode, country } =
      args;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await context.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        addresses: {
          create: {
            street,
            city,
            state,
            postalCode,
            country,
          },
        },
      },
      include: {
        addresses: true,
      },
    });

    return newUser;
  } catch (error: any) {
    throw new Error(`Failed to register user: ${error.message}`);
  }
};

export default registerUserResolver;
