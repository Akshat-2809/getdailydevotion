"use client";

import { SECTIONS } from "@/lib/site";
import { useActiveSection } from "@/lib/useActiveSection";
import s from "./BeadNav.module.css";

/** Fixed prayer-bead section nav: the current bead glows, earlier ones are filled. */
export function BeadNav() {
  const active = Math.max(0, useActiveSection());

  return (
    <nav className={s.beads} aria-label="Sections">
      {SECTIONS.map((sec, i) => {
        const cls = i === active ? s.on : i < active ? s.past : "";
        return (
          <a
            key={sec.id}
            className={`${s.bead} ${cls}`}
            href={`#${sec.id}`}
            aria-label={sec.label}
            aria-current={i === active ? "location" : undefined}
          >
            <i />
            <span className={s.tip} aria-hidden="true">{sec.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
