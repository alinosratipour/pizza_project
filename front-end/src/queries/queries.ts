import { gql } from "@apollo/client";

export const GET_PIZZAS_WITH_SIZES_AND_PRICES = gql`
  {
    getpizzasWithSizesAndPrices {
      id_pizza
      sizesWithPrices {
        id_size
        p_size
        price_topping
        price
      }
    }
  }
`;

export const GET_TOPPING_PRICES = gql`
  query GetToppingPricesBySize($id_size: Int) {
    getToppingPricesBySize(id_size: $id_size) {
      id_size
      name
      price
    }
  }
`;

export const GET_ALL_SIZES_WITH_RELATED_BASES = gql`
  query GetBasesPricesBySize($id_size: Int) {
    getBasesPricesBySize(id_size: $id_size) {
      id_base
      base
      price
    }
  }
`;

export const GET_ALL_PIZZAS_LIST = gql`
  {
    getAllPizzasList {
      id_pizza
      name
      top_quantity
      description
      image
    }
  }
`;

export const GET_TOPPINGS_ON_PIZZA = gql`
  query GetToppingsOnPizza($id_pizza: Int!) {
    getToppingsOnPizza(pizzaId: $id_pizza) {
      id
      id_pizza
      toppings {
        pizzas {
          id_pizza
        }
        id
        name
        toppingPrice {
          id
          id_size
          price_topping
        }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        addresses {
          id
          address1
          address2
          city
          state
          postalCode
          country
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $name: String!
    $password: String!
    $phoneNumber: String!
    $address1: String!
    $address2: String!
    $city: String!
    $state: String
    $postalCode: String!
    $country: String!
  ) {
    registerUser(
      email: $email
      name: $name
      password: $password
      phoneNumber: $phoneNumber
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      postalCode: $postalCode
      country: $country
    ) {
      id
      email
      name
      addresses {
        id
        address1
        address2
        city
        state
        phoneNumber
        postalCode
        country
      }
    }
  }
`;

export const SIGN_UP_USER = gql`
  mutation SignUpUser($email: String!, $name: String!, $password: String!) {
    signUpUser(email: $email, name: $name, password: $password) {
      token
      user {
        id
        email
        name
        createdAt
        updatedAt
      }
    }
  }
`;
