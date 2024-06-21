import { Button } from "@/components/ui/button";
import { Article } from "@/gql/graphql";
import { ArrowRight, Flame } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function PostsTrends({ mostLiked }: { mostLiked: Article[] }) {
  const router = useRouter();
  const posts = mostLiked.filter((post) => post.likes.length > 1);
  return (
    <div className="flex flex-col space-y-4 items-center">
      <div className="flex items-center space-x-2 text-center">
        <Flame />
        <h1 className="text-2xl">Tendances</h1>
      </div>
      <div className="border border-gray-200 p-4 rounded-md mt-4 w-full">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex space-x-4 items-center justify-between"
          >
            <div className="flex items-center space-x-2 justify-between">
              <span>{`${post.likes.length} 🔥`}</span>
              <h1 className="text-sm">
                {post.title.length > 10
                  ? post.title.slice(0, 20) + "..."
                  : post.title}
              </h1>
            </div>
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => {
                router.push(`/home/posts/${post.id}`);
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
