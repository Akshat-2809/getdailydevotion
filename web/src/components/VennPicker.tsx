"use client";

import { useState, type ReactNode } from "react";
import { Offscreen } from "./Offscreen";
import s from "./Idea.module.css";

const VENN = [
  { label: "AI", text: "Personal, in your language, at your own pace.", cls: s.v1 },
  { label: "Content", text: "Made to be returned to, every day, rather than scrolled past.", cls: s.v2 },
  { label: "Devotion", text: "Rooted in the daily practices people already hold dear.", cls: s.v3 },
];

/** AI / Content / Devotion circles. Hover or click picks one; the description beside it follows. */
export function VennPicker({ heading, quote }: { heading: ReactNode; quote: ReactNode }) {
  const [v, setV] = useState(2);
  const cur = VENN[v];

  return (
    <div className={`wrap ${s.igrid}`}>
      <Offscreen className={`${s.venn} rv`} role="group" aria-label="AI, content and devotion. Choose a circle.">
        {VENN.map((c, i) => (
          <button
            key={c.label}
            type="button"
            className={`${s.vc} ${c.cls} ${i === v ? s.on : ""}`}
            aria-pressed={i === v}
            onClick={() => setV(i)}
            onMouseEnter={() => setV(i)}
          >
            <span>{c.label}</span>
          </button>
        ))}
        <span className={s.vcen} aria-hidden="true">here</span>
      </Offscreen>
      <div className={`${s.vdesc} rv`}>
        {heading}
        <p className={s.vt}>{cur.label}</p>
        <p className={s.vp} aria-live="polite">{cur.text}</p>
        {quote}
      </div>
    </div>
  );
}
