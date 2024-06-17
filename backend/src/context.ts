import { AuthenticatedUser } from "./auth.js";

const test = 1;
import { PrismaClient } from "@prisma/client";
export type DataSourceContext = {
  dataSources: {
    db: PrismaClient;
  };
  user: AuthenticatedUser | null;
};
