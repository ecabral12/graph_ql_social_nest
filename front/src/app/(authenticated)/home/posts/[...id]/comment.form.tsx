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
import { Textarea } from "@/components/ui/textarea";
import { gql, useMutation } from "@apollo/client";

const formSchema = z.object({
  content: z.string().min(5, {
    message: "le contenu doit contenir au moins 5 caractères.",
  }),
});

const mutation = gql(`
    mutation AddComment($articleId: ID!, $content: String!) {
  addComment(articleId: $articleId, content: $content) {
    id
  }
}
`);

export function CommentForm({
  articleId,
  refetch,
}: {
  articleId: string;
  refetch: () => void;
}) {
  const [mutateFunction, { data, loading, error }] = useMutation(mutation);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = mutateFunction({
        variables: {
          content: values.content,
          articleId: parseInt(articleId),
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      });

      refetch();
      toast.promise(res, {
        loading: "Ajout du commentaire...",
        success: "Commentaire ajouté avec succès.",
        error: "Erreur lors de l'ajout du commentaire.",
      });
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commentaire</FormLabel>
              <FormControl>
                <Textarea placeholder="I hope this is real..." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Envoyer
        </Button>
      </form>
    </Form>
  );
}
