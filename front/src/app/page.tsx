"use client";
import { gql, useQuery, ApolloError } from "@apollo/client";

export const userQuery = gql(`
query Query {
  me {
    id
    name
  }
}`);
export default function Home() {
  return <div></div>;
}
