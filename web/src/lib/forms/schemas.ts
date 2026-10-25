import { z } from "zod";
import { LANGUAGES } from "@/lib/site";

const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Please enter your email.")
  .max(254, "That email is too long.")
  .pipe(z.email("That email address doesn't look right. Please check it and try again."));

// Honeypot: real visitors never see or fill this.
const website = z.string().max(500).optional().default("");

export const waitlistSchema = z.object({
  email,
  language: z.enum(LANGUAGES.map((l) => l.value) as [string, ...string[]], "Please choose a language."),
  website,
});

export const CONTACT_FIELDS = ["name", "email", "message"] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120, "That name is too long."),
  email,
  message: z
    .string()
    .trim()
    .min(10, "Please write a little more, at least 10 characters.")
    .max(5000, "That message is too long. Please keep it under 5,000 characters."),
  website,
});

export type WaitlistResult = { status: "joined" | "already_joined" } | { status: "error"; message: string };

export type ContactResult =
  | { status: "sent" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<ContactField, string>> };
