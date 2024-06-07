"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
exports.resolvers = {
    Query: {
        me: async (_, __, ctx) => {
            if (!ctx.userId)
                return null;
            return prisma.user.findUnique({ where: { id: parseInt(ctx.userId.toString()) } });
        },
        articles: async (_, __, ctx) => {
            return prisma.article.findMany({ include: { author: true, comments: true, likes: true } });
        },
        article: async (_, { id }, ctx) => {
            return prisma.article.findUnique({ where: { id: parseInt(id, 10) }, include: { author: true, comments: true, likes: true } });
        },
        users: async (_, __, ctx) => {
            return prisma.user.findMany();
        },
    },
    Mutation: {
        signup: async (_, args, ctx) => {
            const hashedPassword = await bcryptjs_1.default.hash(args.password, 10);
            const user = await prisma.user.create({ data: { email: args.email, password: hashedPassword, name: args.name } });
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
            return { token, user };
        },
        login: async (_, args, ctx) => {
            const user = await prisma.user.findUnique({ where: { email: args.email } });
            if (!user) {
                throw new Error('No such user found');
            }
            const valid = await bcryptjs_1.default.compare(args.password, user.password);
            if (!valid) {
                throw new Error('Invalid password');
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
            return { token, user };
        },
        createArticle: async (_, args, ctx) => {
            const userId = ctx.userId;
            if (!userId)
                throw new Error('Not authenticated');
            return prisma.article.create({
                data: {
                    title: args.title,
                    content: args.content,
                    author: { connect: { id: parseInt(userId) } },
                },
            });
        },
        updateArticle: async (_, args, ctx) => {
            const userId = ctx.userId;
            if (!userId)
                throw new Error('Not authenticated');
            const article = await prisma.article.findUnique({ where: { id: parseInt(args.id, 10) } });
            if (article?.authorId !== parseInt(userId))
                throw new Error('Not authorized');
            return prisma.article.update({
                where: { id: parseInt(args.id, 10) },
                data: { title: args.title ?? undefined, content: args.content ?? undefined },
            });
        },
        deleteArticle: async (_, args, ctx) => {
            const userId = ctx.userId;
            if (!userId)
                throw new Error('Not authenticated');
            const article = await prisma.article.findUnique({ where: { id: parseInt(args.id, 10) } });
            if (article?.authorId !== parseInt(userId))
                throw new Error('Not authorized');
            return prisma.article.delete({ where: { id: parseInt(args.id, 10) } });
        },
        addComment: async (_, args, ctx) => {
            const userId = ctx.userId;
            if (!userId)
                throw new Error('Not authenticated');
            return prisma.comment.create({
                data: {
                    content: args.content,
                    article: { connect: { id: parseInt(args.articleId, 10) } },
                    author: { connect: { id: parseInt(userId) } },
                },
            });
        },
        likeArticle: async (_, args, ctx) => {
            const userId = ctx.userId;
            if (!userId)
                throw new Error('Not authenticated');
            return prisma.like.create({
                data: {
                    article: { connect: { id: parseInt(args.articleId, 10) } },
                    user: { connect: { id: parseInt(userId) } },
                },
            });
        },
    },
    User: {
        articles: (parent, _, ctx) => prisma.article.findMany({ where: { authorId: parent.id } }),
        comments: (parent, _, ctx) => prisma.comment.findMany({ where: { authorId: parent.id } }),
        likes: (parent, _, ctx) => prisma.like.findMany({ where: { userId: parent.id } }),
    },
    Article: {
        author: (parent, _, ctx) => prisma.user.findUnique({ where: { id: parent.authorId } }),
        comments: (parent, _, ctx) => prisma.comment.findMany({ where: { articleId: parent.id } }),
        likes: (parent, _, ctx) => prisma.like.findMany({ where: { articleId: parent.id } }),
    },
    Comment: {
        author: (parent, _, ctx) => prisma.user.findUnique({ where: { id: parent.authorId } }),
    },
    Like: {
        user: (parent, _, ctx) => prisma.user.findUnique({ where: { id: parent.userId } }),
    },
};
