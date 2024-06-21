/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        }\n    }\n  }": types.LoginDocument,
    "mutation Register($email: String!, $password: String!, $name: String!) {\n  signup(email: $email, password: $password, name: $name) {\n    token\n  }\n}": types.RegisterDocument,
    "\n    query MeAccount {\n  me {\n    id\n    email\n    name\n    articles {\n      id\n      title\n      content\n      author {\n        id\n        name\n      }\n      comments {\n        id\n        content\n        author {\n          name\n          id\n        }\n        createdAt\n      }\n      likes {\n        id\n        user {\n          id\n        }\n      }\n      createdAt\n    }\n  }\n}\n  ": types.MeAccountDocument,
    "\n    query Me {\n  me {\n    name\n    email\n  }\n}\n": types.MeDocument,
    "\n    query MeHome {\n  me {\n    name\n    email\n  }\n}\n": types.MeHomeDocument,
    "\n    query Articles {\n  articles {\n    id\n    title\n    content\n    createdAt\n    likes{\n      id\n      user{\n        id\n        }\n      }\n        comments{\n        id\n        }\n    author {\n      id\n      name\n    }\n  }\n}\n": types.ArticlesDocument,
    "\n    mutation AddComment($articleId: ID!, $content: String!) {\n  addComment(articleId: $articleId, content: $content) {\n    id\n  }\n}\n": types.AddCommentDocument,
    "\n  query post($articleId: ID!) {\n  article(id: $articleId) {\n    id\n    title\n    content\n    author {\n      id\n      name\n    }\n      likes{\n        id\n        user{id}\n        }\n        comments{id\n        content\n        author{\n          id\n          name\n          }\n        }\n    createdAt\n  }\n}\n": types.PostDocument,
    "\n mutation UpdateArticle($updateArticleId: ID!, $title: String, $content: String) {\n  updateArticle(id: $updateArticleId, title: $title, content: $content) {\n    id\n  }\n}\n": types.UpdateArticleDocument,
    "\n    mutation createPost($title: String!, $content: String!) {\n  createArticle(title: $title, content: $content) {\n    id\n    title\n  }\n}\n": types.CreatePostDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        }\n    }\n  }"): (typeof documents)["mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        }\n    }\n  }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($email: String!, $password: String!, $name: String!) {\n  signup(email: $email, password: $password, name: $name) {\n    token\n  }\n}"): (typeof documents)["mutation Register($email: String!, $password: String!, $name: String!) {\n  signup(email: $email, password: $password, name: $name) {\n    token\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query MeAccount {\n  me {\n    id\n    email\n    name\n    articles {\n      id\n      title\n      content\n      author {\n        id\n        name\n      }\n      comments {\n        id\n        content\n        author {\n          name\n          id\n        }\n        createdAt\n      }\n      likes {\n        id\n        user {\n          id\n        }\n      }\n      createdAt\n    }\n  }\n}\n  "): (typeof documents)["\n    query MeAccount {\n  me {\n    id\n    email\n    name\n    articles {\n      id\n      title\n      content\n      author {\n        id\n        name\n      }\n      comments {\n        id\n        content\n        author {\n          name\n          id\n        }\n        createdAt\n      }\n      likes {\n        id\n        user {\n          id\n        }\n      }\n      createdAt\n    }\n  }\n}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Me {\n  me {\n    name\n    email\n  }\n}\n"): (typeof documents)["\n    query Me {\n  me {\n    name\n    email\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query MeHome {\n  me {\n    name\n    email\n  }\n}\n"): (typeof documents)["\n    query MeHome {\n  me {\n    name\n    email\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Articles {\n  articles {\n    id\n    title\n    content\n    createdAt\n    likes{\n      id\n      user{\n        id\n        }\n      }\n        comments{\n        id\n        }\n    author {\n      id\n      name\n    }\n  }\n}\n"): (typeof documents)["\n    query Articles {\n  articles {\n    id\n    title\n    content\n    createdAt\n    likes{\n      id\n      user{\n        id\n        }\n      }\n        comments{\n        id\n        }\n    author {\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddComment($articleId: ID!, $content: String!) {\n  addComment(articleId: $articleId, content: $content) {\n    id\n  }\n}\n"): (typeof documents)["\n    mutation AddComment($articleId: ID!, $content: String!) {\n  addComment(articleId: $articleId, content: $content) {\n    id\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query post($articleId: ID!) {\n  article(id: $articleId) {\n    id\n    title\n    content\n    author {\n      id\n      name\n    }\n      likes{\n        id\n        user{id}\n        }\n        comments{id\n        content\n        author{\n          id\n          name\n          }\n        }\n    createdAt\n  }\n}\n"): (typeof documents)["\n  query post($articleId: ID!) {\n  article(id: $articleId) {\n    id\n    title\n    content\n    author {\n      id\n      name\n    }\n      likes{\n        id\n        user{id}\n        }\n        comments{id\n        content\n        author{\n          id\n          name\n          }\n        }\n    createdAt\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n mutation UpdateArticle($updateArticleId: ID!, $title: String, $content: String) {\n  updateArticle(id: $updateArticleId, title: $title, content: $content) {\n    id\n  }\n}\n"): (typeof documents)["\n mutation UpdateArticle($updateArticleId: ID!, $title: String, $content: String) {\n  updateArticle(id: $updateArticleId, title: $title, content: $content) {\n    id\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createPost($title: String!, $content: String!) {\n  createArticle(title: $title, content: $content) {\n    id\n    title\n  }\n}\n"): (typeof documents)["\n    mutation createPost($title: String!, $content: String!) {\n  createArticle(title: $title, content: $content) {\n    id\n    title\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;