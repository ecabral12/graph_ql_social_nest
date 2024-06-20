"use client";
import { gql, useLazyQuery } from "@apollo/client";
import React from "react";

const post = gql(`
  query post($articleId: ID!) {
  article(id: $articleId) {
    id
    title
    content
    author {
      id
      name
    }
    createdAt
  }
}
`);

function page({ params }: { params: { id: string } }) {
  const [token, setToken] = React.useState<string | null>(null);
  const [getArticle, { data, loading, error }] = useLazyQuery(post);

  React.useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      getArticle({
        variables: {
          articleId: parseInt(params.id),
        },
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
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {data && (
        <div>
          <h1>{data.article.title}</h1>
          <p>{data.article.content}</p>
          <p>Author: {data.article.author.name}</p>
        </div>
      )}
    </div>
  );
}

export default page;
