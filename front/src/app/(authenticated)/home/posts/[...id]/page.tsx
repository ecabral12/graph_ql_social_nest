"use client";
import { Button } from "@/components/ui/button";
import { gql, useLazyQuery } from "@apollo/client";
import dayjs from "dayjs";
import { HeartIcon, MessageCircle, Trash2 } from "lucide-react";
import React from "react";
import { DeleteComment, DeletePost, LikePost } from "../post.action";
import { toast } from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/__generated__/graphql";
import { CommentForm } from "./comment.form";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import PostDrawer from "../post.drawer";
import { get_article } from "@/lib/graphql-const";

dayjs.extend(relativeTime);
dayjs.locale("fr");
interface ArticleData {
  article: Article;
}

function page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [token, setToken] = React.useState<string | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [liked, setLiked] = React.useState<boolean>(false);
  const [getArticle, { data, loading, error, refetch }] =
    useLazyQuery<ArticleData>(get_article);

  React.useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setUserId(localStorage.getItem("userId"));
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      try {
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
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  React.useEffect(() => {
    if (
      data &&
      data.article &&
      data.article.likes.some((like) => like.user.id === userId)
    ) {
      setLiked(true);
    }
  }, [data]);

  const like = async (postId: string) => {
    if (!token) return console.error("No token");
    const res = await LikePost(postId, token);
    if (res) {
      refetch();
      setLiked(!liked);
      toast.success(liked ? "Unliked" : "Liked");
    }
  };
  const deleteComment = (commentId: string) => async () => {
    confirm("Are you sure you want to delete this comment?");
    if (!token) return console.error("No token");
    const res = await DeleteComment(commentId, token);
    if (res) {
      refetch();
      toast.success("Comment deleted");
    }
  };

  const deleteArticle = async (articleId: string) => {
    if (!token) return console.error("No token");
    const res = await DeletePost(articleId, token);
    if (res) {
      toast.success("Article deleted");
      router.push("/home");
    }
  };

  return (
    <div className="w-full p-4">
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 w-full ">
          <div className="border p-4 rounded-md flex flex-col items-center ">
            <h1 className="text-xl text-center">Votre avis compte pour nous</h1>
            <div className="flex flex-col items-center space-y-2">
              <Button
                variant="ghost"
                onClick={() => {
                  data && data.article && like(data.article.id);
                }}
              >
                <HeartIcon
                  fill={liked ? "red" : "none"}
                  color={liked ? "red" : "black"}
                />
              </Button>
            </div>
            <CommentForm articleId={params.id} refetch={refetch} />
          </div>
          {data && data.article && data.article.author.id === userId && (
            <div className="col-span-1 flex  border p-4 rounded-md flex-col items-center mt-2">
              <h1 className="text-xl text-center">Actions</h1>
              <div className="flex flex-col items-center space-y-2 mt-1">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    confirm("Are you sure you want to delete this article?");
                    deleteArticle(data.article.id);
                  }}
                >
                  Supprimer l'article
                </Button>
                <PostDrawer type="edit" post={data.article} />
              </div>
            </div>
          )}
        </div>

        {data && data.article && (
          <div className="border p-4 rounded-md col-span-3">
            <div className="flex justify-between items-center">
              <div className="flex flex-col space-y-1">
                <h1 className="text-2xl ">{data.article.title}</h1>
                <p className="text-gray-500 ">
                  {dayjs(parseInt(data.article.createdAt)).format(
                    "DD/MM/YYYY HH:mm"
                  )}
                </p>
                <p className="text-sm text-gray-500 ">
                  {data.article.author.name}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 ">
                  <HeartIcon />
                  <Badge>
                    {data.article.likes.length} like
                    {data.article.likes.length > 1 && "s"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle />
                  <Badge>{data.article.comments.length} commentaires</Badge>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="border p-4 rounded-md overflow-wrap break-words">
                {data.article.content}
              </div>
              <div>
                <h1 className="text-xl mt-4">Comments</h1>
                {data.article.comments.length === 0 && (
                  <p>Pas de commentaires</p>
                )}
                {data.article.comments.map((comment) => (
                  <div key={comment.id} className="border p-4 rounded-md mt-4 ">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <p>{comment.author.name}</p>
                        <p className="text-gray-500">
                          {dayjs(parseInt(data.article.createdAt)).fromNow()}
                        </p>
                      </div>
                      <div>
                        {comment.author.id === userId && (
                          <Trash2
                            onClick={deleteComment(comment.id)}
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                    <Separator />
                    <p className="text-sm mt-2">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
