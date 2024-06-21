"use client";
import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import PostList from "../posts/posts.list";
import { get_me } from "@/lib/graphql-const";
import { User } from "@/gql/graphql";

export type UserData = {
  me: User;
};

function Account() {
  const [token, setToken] = React.useState<string | null>(null);
  const [getUser, { data, loading, error }] = useLazyQuery<UserData>(get_me);
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

  return (
    <div>
      <div>
        <div className="w-full p-4 ">
          <h1>Mes articles</h1>
          <div>
            {data && data.me.articles && (
              <PostList posts={data.me.articles} userId={data.me.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
