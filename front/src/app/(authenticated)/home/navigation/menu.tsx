import React from "react";
import PostDrawer from "../posts/post.drawer";
import { User } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function Menu({ user }: { user: User }) {
  return (
    <div className="w-full  p-4 ">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-2xl ">Hey, {user.name} 👋</h1>
        <div className="flex items-center space-x-4">
          <Button>Logout</Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <PostDrawer />
      </div>
    </div>
  );
}

export default Menu;
