"use client";
import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import PostList from "./posts/posts.list";
import PostsTrends from "./posts/posts.trend";
import Loading from "../loading";
import { get_articles, get_me } from "@/lib/graphql-const";
import { Article } from "@/gql/graphql";

export type ArticleData = {
  articles: Article[];
};

function Home() {
  const [token, setToken] = React.useState<string | null>(null);
  const [showLoading, setShowLoading] = React.useState<boolean>(true);
  const [getUser, { data, loading, error, refetch }] = useLazyQuery(get_me);
  const [
    getArticles,
    { data: articlesData, loading: articlesLoading, error: articlesError },
  ] = useLazyQuery<ArticleData>(get_articles);

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
