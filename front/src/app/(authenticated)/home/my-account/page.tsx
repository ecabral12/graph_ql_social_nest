"use client";
import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import PostList from "../posts/posts.list";

const query = gql(`
    query Me {
  me {
    id
    email
    name
    articles {
      id
      title
      content
      author {
        id
        name
      }
      comments {
        id
        content
        author {
          name
          id
        }
        createdAt
      }
      likes {
        id
        user {
          id
        }
      }
      createdAt
    }
  }
}
  `);

function Account() {
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

  return (
    <div>
      <div>
        <div className="w-full p-4 ">
          <h1>My posts</h1>
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
