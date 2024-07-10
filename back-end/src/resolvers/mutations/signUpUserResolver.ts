import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Context } from "../../helpers/prismaContext";
import { RegisterUserArgs } from "../types/types";

const signUpUserResolver = async (
  _: unknown,
  args: RegisterUserArgs,
  context: Context
): Promise<{ token: string; user: User }> => {
  const { email, name, password } = args;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await context.prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return { token, user: newUser };
};

export default signUpUserResolver;
