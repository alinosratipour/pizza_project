import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar DateTime
  type ToppingPrice {
    id: Int!
    id_size: Int!
    price_topping: Float!
    size: Size
    topping: Toppings
  }

  type ToppingOnPizza {
    id: Int!
    id_pizza: Int!
    toppings: Toppings
  }

  type Toppings {
    id: Int!
    name: String!
    pizzas: [ToppingOnPizza!]
    toppingPrice: [ToppingPrice!]
    toppingPricesBySize: [ToppingPriceForSize!] # New field
  }

  type ToppingPriceForSize {
    id_size: Int
    name: String
    price: Float
  }
  type Pizza {
    id_pizza: Int!
    name: String!
    top_quantity: Int!
    description: String
    image: String
    sizes: [Size!]!
    sizesWithPrices: [SizeWithPrice!]!
    toppingsOnPizza: [ToppingOnPizza!]!
  }

  type SizeWithPrice {
    id_size: Int!
    p_size: String!
    price_topping: Float!
    price: Float!
  }

  type Size {
    id_size: Int!
    p_size: String!
    price_topping: Float!
    bases: [String!]!
    toppings: [ToppingPrice!]
  }

  type Base {
    id_base: Int!
    name: String!
    increase_price: Int!
  }

  type SizeWithRelatedBases {
    id_size: String
    size: String!
    bases: [BaseWithPrice!]!
  }

  type BaseWithPrice {
    id_base: Int
    base: String!
    price: Float!
  }

  type User {
    id: Int!
    email: String!
    name: String
    addresses: [Address!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Address {
    id: Int!
    address1: String!
    address2: String!
    city: String!
    state: String
    phoneNumber: String!
    postalCode: String!
    country: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input AddressUpdateInput {
    addressId: Int
    address1: String!
    address2: String
    city: String!
    state: String
    postalCode: String!
    country: String!
    phoneNumber: String!
  }
  

  type LoginResponse {
    token: String!
    user: UserWithAddresses!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    registerUser(
      email: String!
      name: String
      password: String!
      address1: String!
      address2: String!
      city: String!
      state: String
      phoneNumber: String!
      postalCode: String!
      country: String!
    ): User!
    loginUser(email: String!, password: String!): LoginResponse!
    signUpUser(email: String!, name: String!, password: String!): AuthPayload!
    updateUser(
      userId: Int!
      name: String
      addresses: [AddressUpdateInput!]
    ): User!
  }

  type UserWithAddresses {
    id: Int!
    email: String!
    name: String
    addresses: [Address!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    getAllPizzasList: [Pizza!]!
    getpizzaWithRelatedToppings: [Pizza!]!
    getSizesWithBases: [SizeWithRelatedBases!]!
    getpizzasWithSizesAndPrices: [Pizza!]!
    getToppingPricesBySize(id_size: Int): [ToppingPriceForSize]
    getBasesPricesBySize(id_size: Int): [BaseWithPrice]
    getToppingsOnPizza(pizzaId: Int!): [ToppingOnPizza!]!
    #loginUser(email: String!, password: String!): LoginResponse!
  }
`;

export default typeDefs;
