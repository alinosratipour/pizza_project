import express from "express";
import { ApolloServer } from "apollo-server-express";
import { PrismaClient } from "@prisma/client"; // Import Prisma Client
import typeDefs from "./resolvers/schema"; // Import your GraphQL type definitions
import resolvers from "./resolvers"; // Import your resolvers
const prisma = new PrismaClient(); // Initialize Prisma Client

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }), // Provide Prisma Client to Apollo Server context
});

const app = express();

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
