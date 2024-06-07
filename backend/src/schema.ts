import gql from "graphql-tag"

 export const typeDefs = gql`
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
