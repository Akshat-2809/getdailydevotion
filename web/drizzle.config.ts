import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

// Loads .env.local for local runs; elsewhere DATABASE_URL comes from the environment.
if (existsSync(".env.local")) process.loadEnvFile(".env.local");

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
  strict: true,
});
