import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

export const prisma = new PrismaClient();
const JWT_SECRET = "blabla";

export interface User {
  userId: string;
  email: string;
}

export interface DataSourceContext {
  prisma: PrismaClient;
  userId: string;
}

export const context = ({ req }: { req: Request }): DataSourceContext => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    let userId: string = ""; 
  
    if (token) {
      try {
        const payload = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
        userId = payload.userId.toString();
      } catch (error) {
        console.error('Invalid token', error);
        throw new Error('Invalid token');
      }
    }
  
    return { prisma, userId };
  };
