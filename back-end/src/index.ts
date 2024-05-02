import express from "express";
import { ApolloServer } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import typeDefs from "./resolvers/schema";
import resolvers from "./resolvers";
import dotenv from "dotenv"; // Import dotenv package

dotenv.config(); // Load environment variables from .env file

const prisma = new PrismaClient();
const isProduction = process.env.NODE_ENV === "production";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
 introspection: !isProduction, // Enable introspection for GraphQL Playground in non-production environments
  playground: !isProduction, // Enable GraphQL Playground in non-production environments
}as any);

const app = express();

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
