"use client";
import React, { useEffect } from "react";
import { gql, useQuery, ApolloError, useLazyQuery } from "@apollo/client";
import { date } from "zod";
import { DataTable } from "./posts/posts.datatable";
import { postsColumns } from "./posts/posts.columns";
import Menu from "./navigation/menu";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { get } from "http";
import PostList from "./posts/posts.list";
import PostsTrends from "./posts/posts.trend";

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
  const [getUser, { data, loading, error }] = useLazyQuery(query);
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
  }, []);

  return (
    <div>
      {data && <Menu user={data.me} />}
      <Separator />
      <div className="flex justify-between w-full">
        <div className="p-4 w-1/4 ">
          {articlesData && <PostsTrends mostLiked={articlesData?.articles} />}
        </div>
        <div className="p-4 w-3/4">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="text-2xl text-center  mb-4"
          >
            Latest posts
          </motion.h1>
          {articlesData && (
            <>
              {/* <DataTable columns={postsColumns} data={articlesData.articles} /> */}
              <PostList posts={articlesData.articles} userId={data.me.id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
