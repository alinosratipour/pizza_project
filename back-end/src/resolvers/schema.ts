import { gql } from "apollo-server-express";

const typeDefs = gql`
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

  type Query {
    getAllPizzasList: [Pizza!]!
    getpizzaWithRelatedToppings: [Pizza!]!
    getSizesWithBases: [SizeWithRelatedBases!]!
    getpizzasWithSizesAndPrices: [Pizza!]!
    #getToppingPricesBySize: [ToppingPriceForSize!] # New query
    getToppingPricesBySize(id_size: Int): [ToppingPriceForSize]
    getBasesPricesBySize(id_size: Int): [BaseWithPrice] # New query
    getToppingsOnPizza(pizzaId: Int!): [ToppingOnPizza!]!
  }

  type Mutation {
    createPizza(name: String!, top_quantity: Int!, description: String): Pizza!
    createBase(name: String!, increase_price: Int!): Base! # Add a mutation to create a base
  }
`;

export default typeDefs;
