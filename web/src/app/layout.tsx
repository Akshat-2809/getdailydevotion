import type { Metadata, Viewport } from "next";
import { DM_Mono, Figtree, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const instrument = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-instrument" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const dmMono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-dmmono" });

// Noto Sans (500) for the greeting rotator, subset to exactly the characters of each greeting
// (src/fonts, ~2–3 KB each). The full families would add ~90 KB of render-blocking @font-face CSS.
// Not preloaded: each loads the first time its greeting appears.
const deva = localFont({ src: "../fonts/noto-devanagari-greeting.woff2", weight: "500", display: "swap", preload: false, variable: "--font-deva" });
const telugu = localFont({ src: "../fonts/noto-telugu-greeting.woff2", weight: "500", display: "swap", preload: false, variable: "--font-telugu" });
const tamil = localFont({ src: "../fonts/noto-tamil-greeting.woff2", weight: "500", display: "swap", preload: false, variable: "--font-tamil" });
const arabic = localFont({ src: "../fonts/noto-arabic-greeting.woff2", weight: "500", display: "swap", preload: false, variable: "--font-arabic" });
const jp = localFont({ src: "../fonts/noto-jp-greeting.woff2", weight: "500", display: "swap", preload: false, variable: "--font-jp" });

const fontVars = [instrument, figtree, dmMono, deva, telugu, tamil, arabic, jp].map((f) => f.variable).join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#F6D2BE",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVars} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
