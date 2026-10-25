export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://getdailydevotion.com").replace(/\/$/, "");
export const SITE_NAME = "Daily Devotion";
export const SITE_TITLE = "Daily Devotion — A little light, every day";
export const SITE_DESCRIPTION =
  "We're building consumer apps at the intersection of AI, content and devotion. For the world.";
export const CONTACT_EMAIL = "support@getdailydevotion.com";
export const FOUNDER_EMAIL = "arihant@getdailydevotion.com";
/** Aarihant's LinkedIn. Shown in the "Write to Aarihant" lamp at the end of his timeline (hidden if empty). */
export const FOUNDER_LINKEDIN = "https://www.linkedin.com/in/aarihant-aaryan-1900b4171/";
export const ACCENT = "#F2B544";

/** Section ids, in page order. The bead nav and the footer links use these. */
export const SECTIONS = [
  { id: "dawn", label: "Dawn" },
  { id: "moment", label: "A moment" },
  { id: "idea", label: "The idea" },
  { id: "founder", label: "Founder" },
  { id: "circle", label: "First circle" },
  { id: "night", label: "Night" },
] as const;

/** Options for "The language you reflect in". The waitlist action accepts the `value`s. */
export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी · Hindi" },
  { value: "te", label: "తెలుగు · Telugu" },
  { value: "ta", label: "தமிழ் · Tamil" },
  { value: "es", label: "Español · Spanish" },
  { value: "ar", label: "العربية · Arabic" },
  { value: "other", label: "Another language" },
] as const;
