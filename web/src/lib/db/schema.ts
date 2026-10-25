import { index, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const waitlistSignups = pgTable(
  "waitlist_signups",
  {
    id: serial("id").primaryKey(),
    // Stored trimmed and lowercased, so the unique constraint catches duplicates.
    email: varchar("email", { length: 254 }).notNull().unique(),
    // "The language you reflect in": a value from LANGUAGES in lib/site.ts.
    language: varchar("language", { length: 16 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    // Salted SHA-256 of the client IP, used only for rate limiting. Never the raw IP.
    ipHash: varchar("ip_hash", { length: 64 }).notNull(),
    userAgent: varchar("user_agent", { length: 300 }),
  },
  (t) => [index("waitlist_signups_ip_created_idx").on(t.ipHash, t.createdAt)],
);

export const contactMessages = pgTable(
  "contact_messages",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 254 }).notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    // Salted SHA-256 of the client IP, used only for rate limiting. Never the raw IP.
    ipHash: varchar("ip_hash", { length: 64 }).notNull(),
    userAgent: varchar("user_agent", { length: 300 }),
  },
  (t) => [index("contact_messages_ip_created_idx").on(t.ipHash, t.createdAt)],
);
