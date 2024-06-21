"use server";
import { getClient } from "@/lib/client";
import {
  delete_article,
  delete_comment,
  like_article,
} from "@/lib/graphql-const";
import { gql } from "@apollo/client";
import { revalidatePath } from "next/cache";

export const LikePost = async (postId: string, token: string) => {
  const client = getClient();
  try {
    const res = await client.mutate({
      mutation: like_article,
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
      mutation: delete_article,
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
    mutation: delete_comment,
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
