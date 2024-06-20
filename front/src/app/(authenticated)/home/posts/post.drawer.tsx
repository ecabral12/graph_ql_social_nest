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

function PostDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" className="w-full">
          Create Post
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>You are about to create a new post.</DrawerTitle>
          <DrawerDescription>
            <PostForm />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default PostDrawer;
