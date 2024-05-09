// src/apolloClient.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://pizza-project-pagq.onrender.com/graphql",
  cache: new InMemoryCache(),
});

export default client;
