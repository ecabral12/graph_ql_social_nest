"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const schema_js_1 = require("./schema.js");
const resolver_js_1 = require("./resolver.js");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const getUser = (token) => {
    if (token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
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
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_js_1.typeDefs,
    resolvers: resolver_js_1.resolvers,
    context
});
server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
});
