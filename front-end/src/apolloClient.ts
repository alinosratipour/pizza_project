// src/apolloClient.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //uri: 'http://localhost:5000/graphql', // Replace with your GraphQL server URL
  uri: "https://pizza-project-pagq.onrender.com/graphql",
  cache: new InMemoryCache(),
});

export default client;
