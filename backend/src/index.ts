import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getUser } from "./auth.js";
import dotenv from "dotenv";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolver.js";
import db from "./db.js";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const authorization = req.headers.authorization?.split("Bearer ")?.[1];
      const user = authorization ? getUser(authorization) : null;
      return {
        dataSources: {
          db,
        },
        user,
      };
    },
  });

  console.log(`Server ready at ${url}`);
};

startServer();
