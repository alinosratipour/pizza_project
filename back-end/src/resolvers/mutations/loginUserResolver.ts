import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Context } from "../../helpers/prismaContext";
import { LoginUserArgs, LoginUserResponse, UserWithAddresses } from "../types/types";

// Secret key for JWT
//const JWT_SECRET = process.env.JWT_SECRET || "Secret";

const loginUserResolver = async (
  _: unknown,
  args: LoginUserArgs,
  context: Context
): Promise<LoginUserResponse> => {
  try {
    const { email, password } = args;

    const user = await context.prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    // Fetch user's addresses
    const addresses = await context.prisma.address.findMany({
      where: { userId: user.id },
    });

    // Ensure addresses are always returned as an array
    const userWithAddresses: UserWithAddresses = {
      ...user,
      addresses: addresses || [],
    };

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token, user: userWithAddresses };
  } catch (error: any) {
    throw new Error(`Failed to login user: ${error.message}`);
  }
};

export default loginUserResolver;
