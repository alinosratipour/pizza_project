import { Address, User as PrismaUser } from "@prisma/client";

export interface User extends PrismaUser {}

export interface UserWithAddresses extends User {
  addresses: Address[];
}

export interface LoginUserResponse {
  token: string;
  user: UserWithAddresses; // Adjusted to UserWithAddresses
}

export interface LoginUserArgs {
  email: string;
  password: string;
}

export interface RegisterUserArgs {
  email: string;
  name?: string;
  password: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
