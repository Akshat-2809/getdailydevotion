import "server-only";
import { attachDatabasePool } from "@vercel/functions";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

type DB = NodePgDatabase<typeof schema>;

const globalForDb = globalThis as unknown as { ddPool?: Pool };

/** Lazily creates one pool per server instance. Returns null when DATABASE_URL is unset. */
export function getDb(): DB | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalForDb.ddPool) {
    globalForDb.ddPool = new Pool({
      connectionString: url,
      // Serverless functions handle one request at a time; keep the footprint small.
      max: 3,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 5_000,
    });
    // On Vercel Fluid compute, closes idle connections before the instance suspends. No-op elsewhere.
    attachDatabasePool(globalForDb.ddPool);
  }
  return drizzle(globalForDb.ddPool, { schema });
}
