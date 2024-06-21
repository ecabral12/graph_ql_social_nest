"use client";
import React, { useEffect } from "react";
import PostDrawer from "../posts/post.drawer";
import { Button } from "@/components/ui/button";
import { gql, useLazyQuery } from "@apollo/client";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { get_me } from "@/lib/graphql-const";
import { UserData } from "../my-account/page";

function Menu() {
  const router = useRouter();
  const [token, setToken] = React.useState<string | null>(null);
  const [getUser, { data, loading, error }] = useLazyQuery<UserData>(get_me);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      getUser({
        context: {
          headers: {
            authorization: `Bearer ${tokenFromStorage}`,
          },
        },
      });
    }
  }, []);

  useEffect(() => {}, [data]);

  const logout = () => {
    localStorage.removeItem("token");
    deleteCookie("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <div className="w-full  p-4 ">
      <div className="flex items-center justify-between p-2">
        {data && data.me && (
          <h1 className="text-2xl ">Hey, {data.me.name} 👋</h1>
        )}
        <div className="flex items-center space-x-4">
          <Button onClick={logout}>Déconnexion</Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <Button className="col-span-1" onClick={() => router.push("/home")}>
          <Home size={24} />
        </Button>
        <PostDrawer type="new" post={null} />
        <Button
          onClick={() => router.push("/home/my-account")}
          className="col-span-1"
        >
          Mes articles
        </Button>
      </div>
    </div>
  );
}

export default Menu;
