import { PrismaClient, User, Article, Comment, Like } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { DataSourceContext } from "./context.js";
import {
  Resolvers,
  MutationSignupArgs,
  MutationLoginArgs,
  MutationCreateArticleArgs,
  MutationUpdateArticleArgs,
  MutationDeleteArticleArgs,
  MutationAddCommentArgs,
  MutationLikeArticleArgs,
  QueryArticleArgs,
} from "./types.js";

dotenv.config();
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    me: async (_: {}, __: {}, ctx: DataSourceContext): Promise<User | null> => {
      if (!ctx.user?.id) return null;
      return prisma.user.findUnique({
        where: { id: parseInt(ctx.user.id.toString()) },
      });
    },
    articles: async (
      _: {},
      __: {},
      ctx: DataSourceContext
    ): Promise<Article[]> => {
      return prisma.article.findMany({
        include: { author: true, comments: true, likes: true },
      });
    },
    article: async (
      _: {},
      { id }: { id: string },
      ctx: DataSourceContext
    ): Promise<Article | null> => {
      return prisma.article.findUnique({
        where: { id: parseInt(id, 10) },
        include: { author: true, comments: true, likes: true },
      });
    },
    users: async (_: {}, __: {}, ctx: DataSourceContext): Promise<User[]> => {
      return prisma.user.findMany();
    },
  },
  Mutation: {
    signup: async (
      _: {},
      args: MutationSignupArgs,
      ctx: DataSourceContext
    ): Promise<{ token: string; user: User }> => {
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const user = await prisma.user.create({
        data: { email: args.email, password: hashedPassword, name: args.name },
      });
      const token = jwt.sign(
        { email: user.email, id: user.id },
        process.env.JWT_SECRET as string
      );
      return { token, user };
    },
    login: async (
      _: {},
      args: MutationLoginArgs,
      ctx: DataSourceContext
    ): Promise<{ token: string; user: User }> => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });
      if (!user) {
        throw new Error("No such user found");
      }
      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign(
        { email: user.email, id: user.id },
        process.env.JWT_SECRET as string
      );
      return { token, user };
    },
    createArticle: async (
      _: {},
      args: MutationCreateArticleArgs,
      ctx: DataSourceContext
    ): Promise<Article> => {
      const userId = ctx.user?.id;
      if (!userId) throw new Error("Not authenticated");
      return prisma.article.create({
        data: {
          title: args.title,
          content: args.content,
          author: { connect: { id: userId } },
        },
      });
    },
    updateArticle: async (
      _: {},
      args: MutationUpdateArticleArgs,
      ctx: DataSourceContext
    ): Promise<Article | null> => {
      const userId = ctx.user?.id;
      if (!userId) throw new Error("Not authenticated");
      const article = await prisma.article.findUnique({
        where: { id: parseInt(args.id, 10) },
      });
      if (article?.authorId !== userId) throw new Error("Not authorized");
      return prisma.article.update({
        where: { id: parseInt(args.id, 10) },
        data: {
          title: args.title ?? undefined,
          content: args.content ?? undefined,
        },
      });
    },
    deleteArticle: async (
      _: {},
      args: MutationDeleteArticleArgs,
      ctx: DataSourceContext
    ): Promise<Article | null> => {
      const userId = ctx.user?.id;
      if (!userId) throw new Error("Not authenticated");
      const article = await prisma.article.findUnique({
        where: { id: parseInt(args.id, 10) },
      });
      if (article?.authorId !== userId) throw new Error("Not authorized");
      return prisma.article.delete({ where: { id: parseInt(args.id, 10) } });
    },
    addComment: async (
      _: {},
      args: MutationAddCommentArgs,
      ctx: DataSourceContext
    ): Promise<Comment> => {
      const userId = ctx.user?.id;
      if (!userId) throw new Error("Not authenticated");
      return prisma.comment.create({
        data: {
          content: args.content,
          article: { connect: { id: parseInt(args.articleId, 10) } },
          author: { connect: { id: userId } },
        },
      });
    },
    likeArticle: async (
      _: {},
      args: MutationLikeArticleArgs,
      ctx: DataSourceContext
    ): Promise<Like> => {
      const userId = ctx.user?.id;
      if (!userId) throw new Error("Not authenticated");
      return prisma.like.create({
        data: {
          article: { connect: { id: parseInt(args.articleId, 10) } },
          user: { connect: { id: userId } },
        },
      });
    },
  },
  User: {
    articles: (
      parent: User,
      _: {},
      ctx: DataSourceContext
    ): Promise<Article[]> =>
      prisma.article.findMany({ where: { authorId: parent.id } }),
    comments: (
      parent: User,
      _: {},
      ctx: DataSourceContext
    ): Promise<Comment[]> =>
      prisma.comment.findMany({ where: { authorId: parent.id } }),
    likes: (parent: User, _: {}, ctx: DataSourceContext): Promise<Like[]> =>
      prisma.like.findMany({ where: { userId: parent.id } }),
  },
  Article: {
    author: (
      parent: Article,
      _: {},
      ctx: DataSourceContext
    ): Promise<User | null> =>
      prisma.user.findUnique({ where: { id: parent.authorId } }),
    comments: (
      parent: Article,
      _: {},
      ctx: DataSourceContext
    ): Promise<Comment[]> =>
      prisma.comment.findMany({ where: { articleId: parent.id } }),
    likes: (parent: Article, _: {}, ctx: DataSourceContext): Promise<Like[]> =>
      prisma.like.findMany({ where: { articleId: parent.id } }),
  },
  Comment: {
    author: (
      parent: Comment,
      _: {},
      ctx: DataSourceContext
    ): Promise<User | null> =>
      prisma.user.findUnique({ where: { id: parent.authorId } }),
  },
  Like: {
    user: (parent: Like, _: {}, ctx: DataSourceContext): Promise<User | null> =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
  },
};
