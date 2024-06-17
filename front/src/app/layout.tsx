import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "../lib/apollo-wrapper";
import { Toaster } from "react-hot-toast";
import Transition from "./transition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <Transition>
            <Toaster position="bottom-center" />
            {children}
          </Transition>
        </body>
      </ApolloWrapper>
    </html>
  );
}
