import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { typeDefs } from './shema.js';
import { resolvers } from './resolver.js';
dotenv.config();
const prisma = new PrismaClient();
const getUser = (token) => {
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
            throw new Error('Invalid token');
        }
    }
    return null;
};
const context = ({ req }) => {
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
