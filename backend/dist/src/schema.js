"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.typeDefs = (0, graphql_tag_1.default) `
  type Query {
    me: User
    articles: [Article!]!
    article(id: ID!): Article
    users: [User!]!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createArticle(title: String!, content: String!): Article!
    updateArticle(id: ID!, title: String, content: String): Article!
    deleteArticle(id: ID!): Article!
    addComment(articleId: ID!, content: String!): Comment!
    likeArticle(articleId: ID!): Like!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    articles: [Article!]!
    comments: [Comment!]!
    likes: [Like!]!
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
    likes: [Like!]!
    createdAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
  }

  type Like {
    id: ID!
    user: User!
  }

  type AuthPayload {
    token: String
    user: User
  }
`;
