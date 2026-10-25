"use client";

import { useEffect, useState } from "react";
import s from "./Hero.module.css";

const SERIF = "var(--disp)";
const GREETINGS = [
  { t: "Good morning", l: "English", lang: "en", f: SERIF },
  { t: "सुप्रभात", l: "Hindi", lang: "hi", f: "var(--font-deva), sans-serif" },
  { t: "శుభోదయం", l: "Telugu", lang: "te", f: "var(--font-telugu), sans-serif" },
  { t: "Buenos días", l: "Spanish", lang: "es", f: SERIF },
  { t: "صباح الخير", l: "Arabic", lang: "ar", f: "var(--font-arabic), sans-serif" },
  { t: "காலை வணக்கம்", l: "Tamil", lang: "ta", f: "var(--font-tamil), sans-serif" },
  { t: "おはよう", l: "Japanese", lang: "ja", f: "var(--font-jp), sans-serif" },
  { t: "Bonjour", l: "French", lang: "fr", f: SERIF },
];

/** "Good morning" in eight languages, one every 2.4s. Not announced to screen readers. */
export function GreetingRotator() {
  const [g, setG] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setG((n) => (n + 1) % GREETINGS.length), 2400);
    return () => clearInterval(id);
  }, []);

  const gr = GREETINGS[g];
  return (
    <div className={s.greet} aria-live="off">
      <div className={s.g}>
        <span key={g} lang={gr.lang} style={{ fontFamily: gr.f }}>{gr.t}</span>
      </div>
      <span className={s.lang}>{gr.l}</span>
    </div>
  );
}
