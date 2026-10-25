import type { ReactNode } from "react";
import { NightFooter } from "./NightFooter";
import { StaticSky } from "./StaticSky";
import { TopBar } from "./TopBar";

const TONES = {
  // Lilac morning, the sky's second stop: calm and light, for long reading.
  morning: { cls: "tone-light", sky: "rgb(236, 226, 240)" },
  // Twilight, the sky's sixth stop: an evening letter.
  twilight: { cls: "tone-dark", sky: "rgb(62, 48, 96)" },
};

/** Frame for the sub-pages: a fixed sky in one tone, the top bar and the night footer. */
export function SubPage({ tone, children }: { tone: keyof typeof TONES; children: ReactNode }) {
  const t = TONES[tone];
  return (
    <div className={`${t.cls} tone-bg`} style={{ "--sky": t.sky } as React.CSSProperties}>
      <StaticSky />
      <div className="layer">
        <TopBar home={false} />
        {children}
        <NightFooter home={false} />
      </div>
    </div>
  );
}
