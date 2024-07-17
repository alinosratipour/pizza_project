import express from "express";
import cors from "cors";
import { sendEmail } from "./sendEmail";
import { ApolloServer } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import typeDefs from "./resolvers/schema";
import resolvers from "./resolvers";
import dotenv from "dotenv"; // Import dotenv package

dotenv.config(); // Load environment variables from .env file

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
});

const app = express();
app.use(express.json());
app.use(cors()); 


app.post('/send-email', async (req, res) => {
  console.log('Received request at /send-email');
  const { userDetails, basketItems } = req.body;
  console.log('Request body:', req.body);

  try {
    await sendEmail(userDetails, basketItems);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error:any) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});


async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`REST endpoint for emails at http://localhost:${PORT}/send-email`);
  });
}

startServer();
