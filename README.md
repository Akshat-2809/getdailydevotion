# Daily Devotion — getdailydevotion.com

> **The forms deliver nothing.** The "first circle" waitlist form and the contact form only check the entry in the browser and show their success message. Nothing is sent, stored or emailed, and there is no database or backend. Anyone who wants to reach Daily Devotion must email `support@getdailydevotion.com`, so that address must be a real, monitored mailbox.

Production site for Daily Devotion: a faithful port of the approved homepage design, plus legal and contact pages. It is one Next.js app on Vercel.

```
dailydevotion/
├── design/project/     Approved design. Main.dc.html is the source of truth (open via a local server, see below)
└── web/                Next.js 16 (App Router, React 19, TypeScript) → Vercel, root directory `web`
    └── src/
        ├── app/api/health/   GET /api/health → { status: "ok" }
        └── lib/forms/        zod schemas the forms validate with, in the browser
```

## What runs in the browser

Sections are Server Components. Only these ship JavaScript:

| Piece | Why |
|---|---|
| `SkyBackground` | page scroll → `--sky` on `<html>`, `data-sky="dark"` when luminance < .5 (rAF-throttled, passive listener, no React re-render) |
| `BeadNav` | IntersectionObserver: active = last section whose top is above 50% of the viewport (`lib/useActiveSection.ts`) |
| `TopNav` | top-bar links (A moment, The idea, Founder, Contact): a glass pill whose current link carries a lit flame dot (same active-section rule); under 1000px a bead menu button opens a panel with the links and the first-circle button |
| `HeroLight`, `GreetingRotator`, `TypedReflection` | cursor light (mouse/pen only), 8 greetings / 2.4s, typing at 38ms/char with a 3.2s hold |
| `MomentsTabs` | tablist: arrows, Home/End, roving tabindex, `aria-selected`/`aria-controls` |
| `VennPicker` | hover or click; `aria-pressed` |
| `Lamps` | lights each lamp once its top passes 62% of the viewport (toggles a class on server-rendered children) |
| `CircleJoin`, `ContactForm` | forms: validate with zod in the browser, then show success. No network request. |
| `Offscreen` | sets `data-offscreen` so looping animations (stars, flames, glows) pause off-screen |

Content is set in Instrument Serif, Figtree and DM Mono via `next/font` (self-hosted, metric-matched fallbacks, so the font swap causes no layout shift). The five Noto Sans scripts for the greeting are subset to exactly the characters of each greeting (`web/src/fonts`, about 13 KB in total) and loaded with `next/font/local`. They aren't preloaded; each loads the first time its greeting appears. The full Google families would add about 90 KB of render-blocking `@font-face` CSS to every page.

## Local setup

Requirements: Node 20.9+.

```bash
cd web
npm install
npm run dev                     # http://localhost:3000
```

No environment variables are needed. `NEXT_PUBLIC_SITE_URL` (see `.env.example`) is optional.

To view the original design next to the port: `cd design/project && python3 -m http.server 8001`, then open http://localhost:8001/Main.dc.html.

### Scripts (in `web/`)

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` / `npm run start` | Production build / serve it |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm run typecheck` | `next typegen && tsc --noEmit` |

## How the forms work

Both forms run entirely in the browser. On submit they call `preventDefault`, validate with the zod schemas in `web/src/lib/forms/schemas.ts`, and then either show the error next to the field (what was typed stays in place) or show the success state. Nothing is sent anywhere, so nothing reaches anyone.

| Form | Fields | On success |
|---|---|---|
| First circle (`CircleJoin`, homepage) | email, language | The ring and candle light, and "Welcome to the first circle." shows |
| Contact (`ContactForm`, `/contact`) | name, email, message | "Message sent." with a small flame |

The privacy policy and terms say the forms don't send or store anything, and point people to the contact email.

## Deploy to Vercel

1. Push the repo to GitHub, GitLab or Bitbucket, then in Vercel choose **Add New → Project** and import it. Set **Root Directory** to `web`. The Next.js preset and build command are detected.
2. Deploy. No environment variables are required. Preview deployments serve a `Disallow: /` robots.txt, so they stay out of search results.

## Connect getdailydevotion.com (GoDaddy)

### Website → Vercel
1. Vercel → Project → **Settings → Domains**: add `getdailydevotion.com` and `www.getdailydevotion.com`. Choose to redirect `www` to the apex; canonical URLs, the sitemap and OG tags use the apex.
2. Vercel shows the exact records to create. Use its values; typically:
   - apex: **A** record, host `@`, value the IP Vercel shows (often `76.76.21.21`)
   - `www`: **CNAME** record, host `www`, value the target Vercel shows (often `cname.vercel-dns.com`)
3. GoDaddy → **My Products → getdailydevotion.com → DNS → Manage DNS**: delete the default "Parked" **A** record for `@` and any existing `www` CNAME, then add Vercel's records (TTL 1 hour or less).
4. Wait for both domains to show **Valid Configuration** in Vercel. HTTPS is issued automatically.

### Email
The site sends and receives no email itself. To receive mail at `support@getdailydevotion.com` (shown on the site as the way to reach you) and `arihant@getdailydevotion.com`, set up a mailbox provider (Google Workspace, Zoho, …) and add its MX records to the domain.

### Optional: dailydevotion.ai → getdailydevotion.com (301)
If you buy it: add `dailydevotion.ai` and `www.dailydevotion.ai` to the same Vercel project under **Settings → Domains**, choose **Redirect to `getdailydevotion.com`** with **301 (Permanent)**, and point its DNS at Vercel with the records shown. Vercel's redirect keeps the path; GoDaddy's own "Forwarding → 301" also works but drops it.

## Environment variables (Vercel)

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | no | Defaults to `https://getdailydevotion.com` |

## Fidelity notes (vs. `design/project/Main.dc.html`)

Compared side by side in Chrome at 1440px and 390px, scrolling dawn to night:
- **Layout:** every section has exactly the same top and height as the design at both widths (same total page height). The sky colour matches at each section.
- **Pixels:** under 0.5% differ per section at 1440px (looping animations caught at different moments). At 390px the most is 1.5%, in Idea (the centred "here" disc, below) and Circle (the ring, below).
- **Interactions:** all checked in the browser: greeting rotation, typing and reduced-motion, cursor light, anchors under the sticky bar, bead nav current/past, tablist keyboard, Venn hover/click, lamps, sky dark switch, and the waitlist idle → success/error.


- **Ring radius** is `--ring-r`, scaled from the ring's width (170px at 420px). In the design, the dots spill outside the ring on phones.
- **Candle flame** sits on the wick and grows on success. In the design, the `flick` animation overrode the flame's `transform`, so it sat at the bottom of the candle and never grew. Its scale is now a registered custom property, `--fs`, which can transition while it flickers.
- **Venn "here" disc** is centred with the `translate` property. In the design, the `breathe` animation replaced `translate(-50%,-50%)` and the disc drifted off-centre.
- **Top bar navigation** (added on request): the footer's links also sit in the top bar, so the header doesn't look like every other site's. The design's top bar had only the logo and the button.
- **Footer:** links point to `/#section`, so they work from sub-pages. "Privacy · Terms" link to the real pages, and "Contact" was added. The email is a `mailto:` link to `support@getdailydevotion.com`.
- **Sub-pages** (privacy, terms, contact, 404) share the brand language but not the homepage layout. Legal pages are lilac-morning, with numbered lamps and a contents bead thread (a chip row on mobile). Contact is twilight. The top bar there has a frosted backing.
- **Accessibility, with no visual change:** the typed reflection exposes the whole sentence to screen readers instead of announcing each keystroke; greetings carry `lang`; the forms have live status regions.
- **Hero fade-ins** start at opacity .01, not 0. It looks identical, but Chrome can then record the hero text as LCP.
- **Glass cards:** write `backdrop-filter` without a manual `-webkit-` copy. The CSS minifier (lightningcss) otherwise keeps only the prefixed one, and Chrome loses the blur. It adds the prefix itself.
