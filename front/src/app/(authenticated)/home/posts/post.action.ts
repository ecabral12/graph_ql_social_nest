"use server";
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import { revalidatePath } from "next/cache";

const like = gql(`
    mutation Mutation($articleId: ID!) {
  likeArticle(articleId: $articleId) {
    id
  }
}
`);

const deleteArticle = gql(`mutation Mutation($deleteArticleId: ID!) {
  deleteArticle(id: $deleteArticleId) {
    id
  }
}
`);

export const LikePost = async (postId: string, token: string) => {
  const client = getClient();
  try {
    const res = await client.mutate({
      mutation: like,
      variables: {
        articleId: postId,
      },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const DeletePost = async (postId: string, token: string) => {
  const client = getClient();

  try {
    const res = await client.mutate({
      mutation: deleteArticle,
      variables: {
        deleteArticleId: postId,
      },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
    revalidatePath("/home");
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const DeleteComment = async (commentId: string, token: string) => {
  const client = getClient();
  const res = await client.mutate({
    mutation: gql(`
      mutation Mutation($deleteCommentId: ID!) {
        deleteComment(id: $deleteCommentId) {
          id
        }
      }
    `),
    variables: {
      deleteCommentId: commentId,
    },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
  return res;
};
