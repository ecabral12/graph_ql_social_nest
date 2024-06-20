import { Article } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import React from "react";

function PostsTrends({ mostLiked }: { mostLiked: Article[] }) {
  const posts = mostLiked.filter((post) => post.likes.length > 1);
  return (
    <div className="flex flex-col space-y-4 items-center">
      <div className="flex items-center space-x-2 text-center">
        <Flame />
        <h1 className="text-2xl">Trending Posts</h1>
      </div>
      <div className="border border-gray-200 p-4 rounded-md mt-4 w-full">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex space-x-4 items-center justify-between"
          >
            <div className="flex items-center space-x-2 justify-between">
              <span>{`${post.likes.length} 🔥`}</span>
              <h1 className="text-md">{post.title}</h1>
              <p className="text-xs text-gray-500">by {post.author.name}</p>
            </div>
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => {
                window.location.href = `/home/post/${post.id}`;
              }}
            >
              <ArrowRight />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsTrends;
