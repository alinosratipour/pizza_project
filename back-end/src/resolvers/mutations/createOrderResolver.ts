import { Context } from "../../helpers/prismaContext";
import { ApolloError } from "apollo-server-express";
import { CreateOrderArgs, CreateOrderItemInput } from "../types/types";

const createOrderResolver = async (
  _: unknown,
  args: CreateOrderArgs,
  context: Context
) => {
  try {
    const { userId, addressId, paymentType, status, totalAmount, items } = args;

    // Check if the user exists
    const user = await context.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ApolloError(`User with id ${userId} does not exist`);
    }

    // Check if the address exists
    const address = await context.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      throw new ApolloError(`Address with id ${addressId} does not exist`);
    }

    // Create order
    const order = await context.prisma.order.create({
      data: {
        userId,
        addressId,
        paymentType,
        status,
        totalAmount,
      },
      include: {
        items: true,
      },
    });

    // Create order items
    await Promise.all(
      items.map(async (item: CreateOrderItemInput) => {
        const { productId, quantity, price, toppings,productName } = item;
        if (!productName) {
          throw new ApolloError(`productName is missing in item: ${JSON.stringify(item)}`);
        }
        return await context.prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId,
            quantity,
            price,
            toppings,
            productName,
          },
        });
      })
    );

    return order;
  } catch (error: any) {
    throw new ApolloError(`Failed to create order: ${error.message}`);
  }
};

export default createOrderResolver;
