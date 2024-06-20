"use client";
import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import PostList from "./posts/posts.list";
import PostsTrends from "./posts/posts.trend";
import Loading from "../loading";

const query = gql(`
    query Me {
  me {
    name
    email
  }
}
`);

const articlesQuery = gql(`
    query Articles {
  articles {
    id
    title
    content
    createdAt
    likes{
      id
      user{
        id
        }
      }
        comments{
        id
        }
    author {
      id
      name
    }
  }
}
`);

function Home() {
  const [token, setToken] = React.useState<string | null>(null);
  const [showLoading, setShowLoading] = React.useState<boolean>(true);
  const [getUser, { data, loading, error, refetch }] = useLazyQuery(query);
  const [
    getArticles,
    { data: articlesData, loading: articlesLoading, error: articlesError },
  ] = useLazyQuery(articlesQuery);

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
      getArticles({
        context: {
          headers: {
            authorization: `Bearer ${tokenFromStorage}`,
          },
        },
      });
    }
    refetch();
  }, []);

  if (showLoading) {
    setTimeout(() => {
      setShowLoading(false);
    }, 1000);
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="p-4 w-1/4 ">
          {articlesData && <PostsTrends mostLiked={articlesData?.articles} />}
        </div>
        <div className="p-4 w-3/4">
          {articlesData && (
            <>
              <PostList posts={articlesData.articles} userId={data.me.id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
