"use client";

import { useEffect, useState } from "react";
import s from "./Hero.module.css";

const REFLECTIONS = [
  { tag: "For a quiet morning", t: "Before the day asks anything of you, take one slow breath and name one thing you are grateful for." },
  { tag: "For a hard week", t: "Hope is a small, steady light. You do not need to see the whole path, only the next step." },
  { tag: "For a busy day", t: "Be gentle with someone today, including yourself. Kindness is a practice, not a mood." },
];
const TYPE_MS = 38;
const HOLD_MS = 3200;

/**
 * "Today's reflection": types each sample at ~38ms a character, holds 3.2s, then moves on.
 * With reduced motion the first one is shown in full. Screen readers get the whole sentence, not each keystroke.
 */
export function TypedReflection() {
  const [ti, setTi] = useState(0);
  const [tn, setTn] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off sync with a browser setting
      setTn(Infinity);
      return;
    }
    const full = REFLECTIONS[ti].t.length;
    const id =
      tn < full
        ? setTimeout(() => setTn(tn + 1), TYPE_MS)
        : setTimeout(() => {
            setTi((ti + 1) % REFLECTIONS.length);
            setTn(0);
          }, HOLD_MS);
    return () => clearTimeout(id);
  }, [ti, tn]);

  const r = REFLECTIONS[ti];
  return (
    <>
      <div className={s.head}>
        <span className="lab">Today&apos;s reflection</span>
        <span className="lab">{r.tag}</span>
      </div>
      <div className={s.arch} aria-hidden="true">
        <span className={s.sun} />
        <span className={s.hz} />
      </div>
      <p className={s.typed}>
        <span aria-hidden="true">{r.t.slice(0, tn)}</span>
        <span className="sr-only">{r.t}</span>
        <span className={s.caret} aria-hidden="true" />
      </p>
    </>
  );
}
