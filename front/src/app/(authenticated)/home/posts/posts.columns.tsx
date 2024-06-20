"use client";

import { Article } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Heart, HeartOff } from "lucide-react";
import { DeletePost, LikePost } from "./post.action";
import { toast } from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { set } from "react-hook-form";
import { useRouter } from "next/router";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const postsColumns: ColumnDef<Article>[] = [
  {
    accessorKey: "author.name",
    header: "Author",
    cell: (row) => {
      return (
        <Badge
          variant={"outline"}
          className="cursor-pointer"
          onClick={() => {
            window.location.replace(
              `/home/users/${row.row.original.author.id}`
            );
          }}
        >
          {row.row.original.author.name}
        </Badge>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: (row) => {
      return (
        <Button
          variant="link"
          onClick={() =>
            window.location.replace(`/home/posts/${row.row.original.id}`)
          }
        >
          {row.row.original.title}
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (row) => {
      const timestamp = parseInt(row.row.original.createdAt);
      return new Date(timestamp).toLocaleDateString();
    },
  },
  {
    accessorKey: "likes",
    header: "Likes",
    cell: (row) => {
      return <Badge>{row.row.original.likes.length}</Badge>;
    },
  },
];

if (typeof window === "undefined") {
  throw new Error("No token found");
}

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

if (userId) {
  postsColumns.push({
    accessorKey: "actions",
    header: "Actions",
    cell: (row) => {
      if (row.row.original.author.id === userId) {
        return (
          <div className="flex space-x-2 items-center">
            <Button size={"sm"}>Edit</Button>
            <Button
              size={"sm"}
              variant={"destructive"}
              onClick={async () => {
                confirm("Are you sure you want to delete this post?");
                if (token) {
                  const res = await DeletePost(row.row.original.id, token);
                  if (res) {
                    toast.success("Post deleted");
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }
                }
              }}
            >
              Delete
            </Button>
          </div>
        );
      } else {
        return (
          <div className="flex space-x-2 items-center">
            <Button
              size={"sm"}
              variant={"outline"}
              className={
                row.row.original.likes.some((like) => like.user.id === userId)
                  ? "border-pink-500 border-2 text-pink-500"
                  : "text-gray-500"
              }
              disabled={row.row.original.likes.some(
                (like) => like.user.id === userId
              )}
              onClick={async () => {
                if (token) {
                  if (
                    !row.row.original.likes.some(
                      (like) => like.user.id === userId
                    )
                  ) {
                    const res = await LikePost(row.row.original.id, token);
                    if (res) {
                      toast.success("Liked post");
                    }
                  }
                }
              }}
            >
              {row.row.original.likes.some(
                (like) => like.user.id === userId
              ) ? (
                <HeartOff />
              ) : (
                <Heart />
              )}
            </Button>
          </div>
        );
      }
    },
  });
}
