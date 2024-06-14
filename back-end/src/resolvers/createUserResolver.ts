import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { Context } from "../helpers/prismaContext";

const createUserResolver = {
  Mutation: {
    registerUser: async (
      _: unknown,
      {
        email,
        name,
        password,
        street,
        city,
        state,
        postalCode,
        country,
      }: {
        email: string;
        name?: string;
        password: string;
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      },
      context: Context
    ): Promise<User> => {
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
          addresses: true, // Ensure the address is included in the response
        },
      });

      return newUser;
    },
  },
};

export default createUserResolver;
