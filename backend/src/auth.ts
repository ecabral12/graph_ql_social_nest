import jwt from "jsonwebtoken";

import { User } from "@prisma/client";

export type AuthenticatedUser = Pick<User, "id" | "email">;

export const getUser = (token: string): AuthenticatedUser | null => {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthenticatedUser;
    return payload;
  } catch {
    return null;
  }
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string
  );
  return token;
};
