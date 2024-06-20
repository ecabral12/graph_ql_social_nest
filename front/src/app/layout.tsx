import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "../lib/apollo-wrapper";
import { Toaster } from "react-hot-toast";
import Transition from "./transition";
import { Suspense } from "react";
import Loading from "./(authenticated)/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reddot",
  description: "Share and discuss your thoughts with the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApolloWrapper>
        <body className={inter.className}>
          <Suspense fallback={<Loading />}>
            <Transition>
              <Toaster position="bottom-center" />
              {children}
            </Transition>
          </Suspense>
        </body>
      </ApolloWrapper>
    </html>
  );
}
