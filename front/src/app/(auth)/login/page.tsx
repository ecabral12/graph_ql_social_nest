"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login.form";

function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Hello 👋🏼</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm">Vous n'avez pas de compte ?</p>
          <a href="/register" className="text-blue-500 text-sm ml-1">
            Inscrivez-vous
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
