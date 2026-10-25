"use server";

import { and, count, eq, gt, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { after } from "next/server";
import { getDb } from "@/lib/db/client";
import { waitlistSignups } from "@/lib/db/schema";
import { sendWaitlistEmails } from "@/lib/forms/email";
import { waitlistSchema, type WaitlistResult } from "@/lib/forms/schemas";
import { clientIp, hashIp, userAgent } from "@/lib/request";
import { CONTACT_EMAIL } from "@/lib/site";

const RATE_LIMIT = 10;
const RATE_WINDOW = "1 hour";

export async function joinWaitlist(input: { email: string; language: string; website: string }): Promise<WaitlistResult> {
  // Honeypot filled: pretend it worked, store nothing.
  if (String(input.website ?? "").trim() !== "") {
    console.info("[waitlist] honeypot triggered, dropping submission");
    return { status: "joined" };
  }

  const parsed = waitlistSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check your email and try again." };
  }

  const db = getDb();
  if (!db) {
    console.error("[waitlist] DATABASE_URL is not set");
    return { status: "error", message: `We couldn't light your candle just now. Please try again, or email ${CONTACT_EMAIL}.` };
  }

  const h = await headers();
  const ipHash = hashIp(clientIp(h));
  const { email, language } = parsed.data;

  try {
    // Counted in Postgres, so the limit holds across serverless instances.
    const [{ recent }] = await db
      .select({ recent: count() })
      .from(waitlistSignups)
      .where(and(eq(waitlistSignups.ipHash, ipHash), gt(waitlistSignups.createdAt, sql`now() - ${RATE_WINDOW}::interval`)));
    if (recent >= RATE_LIMIT) {
      return { status: "error", message: "We've had a lot of sign-ups from your network in the last hour. Please try again a little later." };
    }

    const [row] = await db
      .insert(waitlistSignups)
      .values({ email, language, ipHash, userAgent: userAgent(h) })
      .onConflictDoNothing({ target: waitlistSignups.email })
      .returning({ id: waitlistSignups.id });

    // Already in the circle: treat as success, with no second welcome email.
    if (!row) return { status: "already_joined" };

    // Emails go out after the response is sent; failures are logged, never surfaced.
    after(() => sendWaitlistEmails({ id: row.id, email, language }));
    return { status: "joined" };
  } catch (err) {
    console.error("[waitlist] failed to store sign-up", err);
    return { status: "error", message: "Something went wrong on our side and your candle didn't light. Please try again in a moment." };
  }
}
