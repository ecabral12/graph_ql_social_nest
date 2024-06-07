"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.prisma = new client_1.PrismaClient();
const JWT_SECRET = "blabla";
const context = ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    let userId = "";
    if (token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            userId = payload.userId.toString();
        }
        catch (error) {
            console.error('Invalid token', error);
            throw new Error('Invalid token');
        }
    }
    return { prisma: exports.prisma, userId };
};
exports.context = context;
