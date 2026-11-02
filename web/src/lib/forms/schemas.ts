import { z } from "zod";
import { LANGUAGES } from "@/lib/site";

// Messages match what the forms have always shown on screen.
const email = (message: string) =>
  z.string().trim().toLowerCase().max(254, "That email is too long.").pipe(z.email(message));

export const waitlistSchema = z.object({
  email: email("Please enter a valid email address, then try again."),
  language: z.enum(LANGUAGES.map((l) => l.value) as [string, ...string[]], "Please choose a language."),
});

export const CONTACT_FIELDS = ["name", "email", "message"] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120, "That name is too long."),
  email: email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Please write a little more, at least 10 characters.")
    .max(5000, "That message is too long. Please keep it under 5,000 characters."),
});
