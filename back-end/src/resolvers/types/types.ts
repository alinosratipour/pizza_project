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
  phoneNumber: string;
  postalCode: string;
  country: string;
}

export interface AddressUpdateInput {
  addressId?: number;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country?: string;
  phoneNumber: string;
}

export interface UpdateUserArgs {
  userId: number;
  name?: string;
  addresses?: AddressUpdateInput[];
}

export interface CreateOrderArgs {
  userId: number;
  addressId: number;
  paymentType: string;
  status: string;
  totalAmount: number;
  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {
  productId: number;
  quantity: number;
  price: number;
  toppings: string[];
}
