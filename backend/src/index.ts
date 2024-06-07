import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { typeDefs } from './schema.js';
import { resolvers } from './resolver.js';

dotenv.config();

const prisma = new PrismaClient();

const getUser = (token: string) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
  return null;
};

const context = ({ req }: { req: any }) => {
  const token = req.headers.authorization || '';
  const user = getUser(token);
  return { user, prisma };
};

// const server = new ApolloServer({
//   schema: applyMiddleware(makeExecutableSchema({ typeDefs, resolvers })),
//   context,
// });

// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
   
server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
});
