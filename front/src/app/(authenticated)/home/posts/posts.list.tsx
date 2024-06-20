import { Article } from "@/__generated__/graphql";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FireExtinguisher,
  Flame,
  Heart,
  HeartOff,
  Snowflake,
  SunSnow,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import { motion } from "framer-motion";

dayjs.extend(relativeTime);
dayjs.locale("fr");
function PostList({ posts, userId }: { posts: Article[]; userId: string }) {
  if (!posts) return null;
  if (!userId) userId = localStorage.getItem("userId") || "";
  const [filteredPosts, setFilteredPosts] = React.useState<Article[]>(posts);
  const [selectedFilter, setSelectedFilter] = React.useState<string>("");
  const router = useRouter();
  const filterby = (type: string) => {
    let newfilteredPosts;
    switch (type) {
      case "fire":
        newfilteredPosts = posts.filter((post) => post.likes.length > 10);
        setSelectedFilter("fire");
        break;
      case "hot":
        newfilteredPosts = posts.filter((post) => post.likes.length > 5);
        setSelectedFilter("hot");
        break;
      case "like":
        console.log(userId);
        newfilteredPosts = posts.filter((post) =>
          post.likes.some((like) => like.user.id === userId)
        );
        setSelectedFilter("like");
        break;
      case "snow":
        newfilteredPosts = posts.filter((post) => post.likes.length < 5);
        setSelectedFilter("snow");
        break;
      default:
        setSelectedFilter("");
        newfilteredPosts = posts;
    }
    setFilteredPosts(newfilteredPosts);
  };

  React.useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="text-2xl text-left  mb-4"
        >
          {selectedFilter === "fire"
            ? "🔥 Trending Posts"
            : selectedFilter === "hot"
            ? "🔥 Hot Posts"
            : selectedFilter === "like"
            ? "❤️ Liked Posts"
            : selectedFilter === "snow"
            ? "❄️ Cold Posts"
            : "All Posts"}
        </motion.h1>
        <div className="flex items-center space-x-2 text-center">
          <Button variant={"link"} onClick={() => filterby("")}>
            All
          </Button>
          <Button variant={"link"} onClick={() => filterby("fire")}>
            <FireExtinguisher
              color={selectedFilter === "fire" ? "red" : "black"}
              fill={selectedFilter === "fire" ? "red" : "none"}
            />
          </Button>
          <Button variant={"link"} onClick={() => filterby("hot")}>
            <Flame
              color={selectedFilter === "hot" ? "red" : "black"}
              fill={selectedFilter === "hot" ? "red" : "none"}
            />
          </Button>
          <Button variant={"link"} onClick={() => filterby("like")}>
            <Heart
              color={selectedFilter === "like" ? "red" : "black"}
              fill={selectedFilter === "like" ? "red" : "none"}
            />
          </Button>
          <Button variant={"link"} onClick={() => filterby("snow")}>
            <SunSnow
              color={selectedFilter === "snow" ? "blue" : "black"}
              fill={selectedFilter === "snow" ? "blue" : "none"}
            />
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        {filteredPosts.length === 0 && <p>No posts yet.</p>}
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className={
              "border border-gray-200 p-4 rounded-md flex justify-between items-center" +
              (post.likes.length >= 10
                ? " border-red-500 shadow-orange-300 shadow"
                : "")
            }
          >
            <div className="flex space-x-4 items-center">
              <div className="flex items-center space-x-2">
                {post.likes.length > 1 && post.likes.length < 10 ? (
                  <Flame
                    color="red"
                    className="animate-pulse shadow-orange-300 transform scale-110"
                  />
                ) : post.likes.length >= 10 ? (
                  <FireExtinguisher
                    color="red"
                    className="animate-pulse shadow-orange-300 transform scale-125"
                  />
                ) : (
                  <SunSnow color="blue" />
                )}
              </div>
              <div>
                <Button
                  variant={"link"}
                  className="cursor-pointer"
                  asChild
                  style={{ paddingLeft: "0px" }}
                  onClick={() => {
                    router.push(`/home/posts/${post.id}`);
                  }}
                >
                  <h1 className="text-xl ml-0">{post.title}</h1>
                </Button>
                <p className="text-xs text-gray-500">
                  par {post.author.name}{" "}
                  {dayjs(parseInt(post.createdAt)).fromNow()}
                </p>
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
    </>
  );
}

export default PostList;
