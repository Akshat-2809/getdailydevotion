"use client";

import { useRef, useState } from "react";
import { Offscreen } from "./Offscreen";
import s from "./Moments.module.css";

const DAYS = [
  { dn: "MON", name: "Monday", theme: "Gratitude", t: "Name three small things that went right yesterday. Hold each one for a breath." },
  { dn: "TUE", name: "Tuesday", theme: "Hope", t: "Think of something you are waiting for. Let it be enough, for now, that it is coming." },
  { dn: "WED", name: "Wednesday", theme: "Stillness", t: "Sit for one minute without reaching for anything. Notice what remains." },
  { dn: "THU", name: "Thursday", theme: "Kindness", t: "Choose one person today and make their day a little lighter, without telling them." },
  { dn: "FRI", name: "Friday", theme: "Patience", t: "Something will take longer than you want today. Let it, and see what that teaches you." },
  { dn: "SAT", name: "Saturday", theme: "Forgiveness", t: "Put down one small grudge. You can pick it up later if you need to. You probably won’t." },
  { dn: "SUN", name: "Sunday", theme: "Rest", t: "Rest is not a reward for work. It is part of the rhythm. Let today be slow." },
];

/** Mon–Sun tablist (arrow keys, Home/End) and the reflection card, which re-animates on each change. */
export function MomentsTabs() {
  const [day, setDay] = useState(0);
  const [flip, setFlip] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const pick = (i: number) => {
    if (i === day) return;
    setDay(i);
    setFlip((f) => f + 1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = DAYS.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? (day === last ? 0 : day + 1)
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (day === 0 ? last : day - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    pick(next);
    tabs.current[next]?.focus();
  };

  const d = DAYS[day];
  return (
    <div className={s.mgrid}>
      <div className={s.days} role="tablist" aria-label="Days of the week" onKeyDown={onKeyDown}>
        {DAYS.map((x, i) => (
          <button
            key={x.dn}
            ref={(el) => { tabs.current[i] = el; }}
            type="button"
            role="tab"
            id={`day-tab-${i}`}
            className={`${s.day} ${i === day ? s.on : ""}`}
            aria-selected={i === day}
            aria-controls="day-panel"
            tabIndex={i === day ? 0 : -1}
            onClick={() => pick(i)}
          >
            <span className={s.dn}>{x.dn}</span>
            <span className={s.dt}>{x.theme}</span>
            <span className={s.dot} />
          </button>
        ))}
      </div>
      <Offscreen className={`card ${s.mcard}`} role="tabpanel" id="day-panel" aria-labelledby={`day-tab-${day}`}>
        <span className={s.glow} aria-hidden="true" />
        <div className={`${flip % 2 === 0 ? s.fA : s.fB} ${s.body}`}>
          <span className="lab">{d.name} · morning</span>
          <span className={s.theme}>{d.theme}</span>
          <p className={s.txt}>{d.t}</p>
        </div>
        <div className={s.meta}><span>About 2 minutes</span><span>Your language</span><span>Illustration</span></div>
      </Offscreen>
    </div>
  );
}
