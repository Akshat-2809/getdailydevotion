import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { FLAME_CORE_PATH, FLAME_PATH } from "@/components/FlameMark";
import { ACCENT } from "./site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Daily Devotion — A little light, every day.";

function Flame({ size }: { size: number }) {
  return (
    <svg width={size * (30 / 38)} height={size} viewBox="0 0 30 38">
      <path d={FLAME_PATH} fill={ACCENT} />
      <path d={FLAME_CORE_PATH} fill="#FFF6D8" />
    </svg>
  );
}

/** Shared by opengraph-image and twitter-image: twilight sky, the flame, the headline. */
export function renderOgImage() {
  // Sync reads keep the image prerendered at build time (async fs would make it dynamic).
  const font = (f: string) => readFileSync(join(process.cwd(), "assets", f));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          background: "linear-gradient(180deg, #0E0C1F 0%, #3E3060 45%, #D68C80 82%, #F6E0B0 100%)",
          fontFamily: "Instrument Serif",
          color: "#F3EEF8",
          overflow: "hidden",
        }}
      >
        {/* glow behind the flame */}
        <div style={{ position: "absolute", right: 70, top: 120, width: 420, height: 420, borderRadius: 9999, background: "radial-gradient(circle, rgba(255,211,106,.55), rgba(255,211,106,0) 65%)" }} />
        <div style={{ position: "absolute", right: 200, top: 200, display: "flex" }}>
          <Flame size={210} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 46 }}>
          <Flame size={52} />
          <span>daily</span>
          <span style={{ fontStyle: "italic" }}>devotion</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 118, lineHeight: 0.95, letterSpacing: "-0.01em" }}>
          <div style={{ display: "flex", gap: 26 }}>
            <span>A little</span>
            <span style={{ fontStyle: "italic", color: "#F6D48A" }}>light,</span>
          </div>
          <span>every day.</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Serif", data: font("InstrumentSerif-Regular-subset.ttf"), style: "normal", weight: 400 },
        { name: "Instrument Serif", data: font("InstrumentSerif-Italic-subset.ttf"), style: "italic", weight: 400 },
      ],
    },
  );
}

export function renderAppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, #3A2F5C, #0E0C1F)" }}>
        <div style={{ position: "absolute", width: 150, height: 150, borderRadius: 9999, background: "radial-gradient(circle, rgba(255,211,106,.5), rgba(255,211,106,0) 65%)" }} />
        <Flame size={110} />
      </div>
    ),
    { width: 180, height: 180 },
  );
}
