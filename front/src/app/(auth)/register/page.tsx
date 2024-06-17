"use client";
import React, { useEffect } from "react";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { getClient, query } from "@/lib/client";
import { toast } from "react-hot-toast";
import { set } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RegisterForm from "./register.form";

function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Hello 👋🏼</CardTitle>
          <CardDescription>
            Créez un compte pour accéder à l'ensemble de nos services
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm">Vous avez déjà un compte ?</p>
          <a href="/login" className="text-blue-500 text-sm ml-1">
            Connectez-vous
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterPage;
