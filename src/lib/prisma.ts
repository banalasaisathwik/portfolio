import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL || "file:./dev.db";
const sqliteUrl =
  databaseUrl === "file:./dev.db" ? "file:./prisma/dev.db" : databaseUrl;
const adapter = new PrismaBetterSqlite3({ url: sqliteUrl });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
