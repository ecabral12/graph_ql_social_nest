import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import React from "react";
import { PostForm } from "./post.form";
import { PostEditForm } from "./[...id]/post.edit-form";
import { Article } from "@/__generated__/graphql";

type props = {
  type: string;
  post: Article | null;
};

function PostDrawer({ type, post }: props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" className="w-full">
          {type === "new" ? "Créer un post" : "Editer un post"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {type === "new" ? " Créer un post" : "Editer un post"}
          </DrawerTitle>
          <DrawerDescription>
            {type === "new" ? <PostForm /> : <PostEditForm post={post!} />}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline" className="w-full">
              Annuler
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default PostDrawer;
