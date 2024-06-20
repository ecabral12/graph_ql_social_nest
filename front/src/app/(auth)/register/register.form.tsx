"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
const register_mutation = gql(
  `mutation Register($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    token
  }
}`
);

const formSchema = z
  .object({
    email: z.string().email({
      message: "Email invalide",
    }),
    name: z.string().min(3, {
      message: "Nom trop court",
    }),
    password: z.string().min(8, {
      message: "Mot de passe trop court",
    }),
    confirmPassword: z.string().min(8, {
      message: "Mot de passe trop court",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
  });

export default function RegisterForm() {
  const router = useRouter();
  const [mutateFunction, { data, loading, error }] =
    useMutation(register_mutation);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await mutateFunction({
        variables: {
          email: values.email,
          name: values.name,
          password: values.password,
        },
      });
      const data = res.data;
      if (!data) {
        throw new Error("No data returned");
      }
      toast.success("Inscription réussie");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (e: ApolloError | unknown) {
      if (e instanceof ApolloError) {
        toast.error(e.message);
      }
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="nom" {...field} />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="confirmer mot de passe"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {loading ? "Chargement..." : "S'inscrire"}
        </Button>
      </form>
    </Form>
  );
}
