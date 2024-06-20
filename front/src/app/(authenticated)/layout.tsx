import { Separator } from "@/components/ui/separator";
import Menu from "./home/navigation/menu";
import { Suspense } from "react";
import Loading from "./loading";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Menu />
        <Separator />
        <div>{children}</div>
      </Suspense>
    </div>
  );
}
