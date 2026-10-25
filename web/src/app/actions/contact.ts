"use server";

import { and, count, eq, gt, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { after } from "next/server";
import { getDb } from "@/lib/db/client";
import { contactMessages } from "@/lib/db/schema";
import { sendContactEmails } from "@/lib/forms/email";
import { CONTACT_FIELDS, contactSchema, type ContactField, type ContactResult } from "@/lib/forms/schemas";
import { clientIp, hashIp, userAgent } from "@/lib/request";
import { CONTACT_EMAIL } from "@/lib/site";

const RATE_LIMIT = 5;
const RATE_WINDOW = "1 hour";

export async function sendContactMessage(input: { name: string; email: string; message: string; website: string }): Promise<ContactResult> {
  if (String(input.website ?? "").trim() !== "") {
    console.info("[contact] honeypot triggered, dropping submission");
    return { status: "sent" };
  }

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField;
      if (CONTACT_FIELDS.includes(key)) fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields and try again.", fieldErrors };
  }

  const db = getDb();
  if (!db) {
    console.error("[contact] DATABASE_URL is not set");
    return { status: "error", message: `We couldn't send your message just now. Please try again, or email ${CONTACT_EMAIL}.` };
  }

  const h = await headers();
  const ipHash = hashIp(clientIp(h));
  const { name, email, message } = parsed.data;

  try {
    const [{ recent }] = await db
      .select({ recent: count() })
      .from(contactMessages)
      .where(and(eq(contactMessages.ipHash, ipHash), gt(contactMessages.createdAt, sql`now() - ${RATE_WINDOW}::interval`)));
    if (recent >= RATE_LIMIT) {
      return { status: "error", message: `We've had several messages from your network in the last hour. Please try again later, or email ${CONTACT_EMAIL}.` };
    }

    const [row] = await db
      .insert(contactMessages)
      .values({ name, email, message, ipHash, userAgent: userAgent(h) })
      .returning({ id: contactMessages.id });

    after(() => sendContactEmails({ id: row.id, name, email, message }));
    return { status: "sent" };
  } catch (err) {
    console.error("[contact] failed to store message", err);
    return { status: "error", message: `Something went wrong on our side and your message wasn't sent. Please try again, or email ${CONTACT_EMAIL}.` };
  }
}
