import { createHash, timingSafeEqual } from "node:crypto";
import { count, desc } from "drizzle-orm";
import { connection } from "next/server";
import { getDb } from "@/lib/db/client";
import { waitlistSignups } from "@/lib/db/schema";

// For the founder; not shown on the site. Needs the X-Admin-Token header. Cached for 60s per instance.
let cached: { body: { count: number; byLanguage: Record<string, number> }; expires: number } | null = null;

const digest = (s: string) => createHash("sha256").update(s).digest();

export async function GET(req: Request) {
  // Always run at request time, never prerendered at build.
  await connection();

  const token = process.env.ADMIN_TOKEN;
  const given = req.headers.get("x-admin-token") ?? req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!token || !timingSafeEqual(digest(given), digest(token))) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const db = getDb();
  if (!db) return Response.json({ error: "DATABASE_URL is not set" }, { status: 503 });

  const now = Date.now();
  if (!cached || cached.expires <= now) {
    const rows = await db
      .select({ language: waitlistSignups.language, n: count() })
      .from(waitlistSignups)
      .groupBy(waitlistSignups.language)
      .orderBy(desc(count()));
    cached = {
      body: { count: rows.reduce((sum, r) => sum + r.n, 0), byLanguage: Object.fromEntries(rows.map((r) => [r.language, r.n])) },
      expires: now + 60_000,
    };
  }
  return Response.json(cached.body, { headers: { "Cache-Control": "private, max-age=60" } });
}
