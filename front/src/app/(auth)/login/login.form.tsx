"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { getClient, query } from "@/lib/client";
import { toast } from "react-hot-toast";
const login_mutation = gql(
  `mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        }
    }
  }`
);

const formSchema = z.object({
  email: z.string().email({
    message: "Email invalide",
  }),
  password: z.string().min(8, {
    message: "Mot de passe trop court",
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const [mutateFunction, { data, loading, error }] =
    useMutation(login_mutation);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await mutateFunction({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      const data = res.data;
      if (!data) {
        throw new Error("No data returned");
      }
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("userId", data.login.user.id);
      setCookie("token", data.login.token);
      toast.success("Connecté avec succès");
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } catch (e: ApolloError | unknown) {
      if (e instanceof ApolloError) {
        toast.error(e.message);
      }
      console.error(e);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="mot de passe" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {loading ? "Chargement..." : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
}
