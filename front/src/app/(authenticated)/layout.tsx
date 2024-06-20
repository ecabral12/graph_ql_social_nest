import { Separator } from "@/components/ui/separator";
import Menu from "./home/navigation/menu";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Menu />
      <Separator />
      <div>{children}</div>
    </div>
  );
}
