import { Article } from "@/__generated__/graphql";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, HeartOff, Snowflake } from "lucide-react";
import React from "react";

function PostList({ posts, userId }: { posts: Article[]; userId: string }) {
  return (
    <div className="flex flex-col space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border border-gray-200 p-4 rounded-md flex justify-between items-center"
        >
          <div className="flex space-x-4 items-center">
            <div className="flex items-center space-x-2">
              {post.likes.length > 1 ? (
                <Flame
                  color="red"
                  className="animate-pulse shadow-orange-300 transform scale-110"
                />
              ) : (
                <Snowflake color="blue" />
              )}
            </div>
            <div>
              <Button
                variant={"link"}
                className="cursor-pointer"
                asChild
                style={{ paddingLeft: "0px" }}
                onClick={() => {
                  window.location.replace(`/home/posts/${post.author.id}`);
                }}
              >
                <h1 className="text-xl ml-0">{post.title}</h1>
              </Button>
              <p className="text-xs text-gray-500">by {post.author.name}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Badge>{post.likes.length} likes</Badge>
            <Badge>{post.comments.length} comments</Badge>
            {new Date(post.createdAt).getTime() <
            new Date().getTime() - 86400000 ? (
              <Badge>{new Date(post.createdAt).toLocaleDateString()}</Badge>
            ) : (
              <Badge variant="secondary">New</Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
