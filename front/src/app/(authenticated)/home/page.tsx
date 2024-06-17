"use client";
import React, { useEffect } from "react";
import { gql, useQuery, ApolloError, useLazyQuery } from "@apollo/client";
import { date } from "zod";

const query = gql(`
    query Query {
  me {
    name
  }
}
`);

function Home() {
  const [token, setToken] = React.useState<string | null>(null);
  const [getUser, { data, loading, error }] = useLazyQuery(query);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      getUser({
        context: {
          headers: {
            authorization: `Bearer ${tokenFromStorage}`,
          },
        },
      });
    }
  }, []);

  return <div>Home</div>;
}

export default Home;
