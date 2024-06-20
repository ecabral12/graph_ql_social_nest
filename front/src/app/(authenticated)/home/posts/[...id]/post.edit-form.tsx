"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
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
import { Textarea } from "@/components/ui/textarea";
import { gql, useMutation } from "@apollo/client";
import { Article } from "@/__generated__/graphql";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Le titre doit contenir au moins 3 caractères.",
  }),
  content: z.string().min(5, {
    message: "Le contenu doit contenir au moins 5 caractères.",
  }),
});

const mutation = gql(`
 mutation UpdateArticle($updateArticleId: ID!, $title: String, $content: String) {
  updateArticle(id: $updateArticleId, title: $title, content: $content) {
    id
  }
}
`);

export function PostEditForm({ post }: { post: Article }) {
  const router = useRouter();
  const [mutateFunction, { data, loading, error }] = useMutation(mutation);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = mutateFunction({
        variables: {
          title: values.title,
          content: values.content,
          updateArticleId: parseInt(post.id),
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      });
      console.log(res);
      toast.promise(res, {
        loading: "Mise à jour...",
        success: "Article mis à jour",
        error: "Une erreur est survenue",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="What did i do ?" {...field} />
              </FormControl>
              <FormDescription>Le titre de votre article.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu</FormLabel>
              <FormControl>
                <Textarea placeholder="content" {...field} />
              </FormControl>
              <FormDescription>Le contenu de votre article.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Mettre à jour
        </Button>
      </form>
    </Form>
  );
}
