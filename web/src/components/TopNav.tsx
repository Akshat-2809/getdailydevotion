"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "@/lib/site";
import { useActiveSection } from "@/lib/useActiveSection";
import s from "./TopBar.module.css";

// The footer's section links, minus Dawn (the logo) and First circle (the button), plus Contact and Privacy.
const LINKS = [
  { id: "moment", label: "A moment" },
  { id: "idea", label: "The idea" },
  { id: "founder", label: "Founder" },
  { id: "contact", label: "Contact", page: "/contact" },
  { id: "privacy", label: "Privacy", page: "/privacy" },
];

/**
 * Top bar navigation. Desktop: a glass pill whose current link carries a lit flame dot,
 * following the section being read (same rule as the bead nav). Phones: a bead button
 * that opens a glass panel with the links and the first-circle button.
 */
export function TopNav({ home }: { home: boolean }) {
  const pathname = usePathname();
  const active = useActiveSection();
  const activeId = active >= 0 ? SECTIONS[active].id : null;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const base = home ? "" : "/";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const items = LINKS.map((l) => {
    const href = l.page ?? `${base}#${l.id}`;
    const current = l.page ? pathname === l.page : home && activeId === l.id;
    return { ...l, href, current, aria: current ? (l.page ? ("page" as const) : ("location" as const)) : undefined };
  });

  return (
    <>
      <nav className={s.pill} aria-label="Main">
        {items.map((l) => (
          <Link key={l.id} href={l.href} className={`${s.pl} ${l.current ? s.on : ""}`} aria-current={l.aria}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className={s.menu} ref={wrapRef}>
        <button
          type="button"
          className={`${s.menuBtn} ${open ? s.open : ""}`}
          aria-expanded={open}
          aria-controls="top-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
          <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
        </button>
        <nav id="top-menu" className={`card ${s.panel}`} aria-label="Menu" hidden={!open}>
          {items.map((l, i) => (
            <Link
              key={l.id}
              href={l.href}
              className={`${s.pi} ${l.current ? s.on : ""}`}
              aria-current={l.aria}
              onClick={() => setOpen(false)}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className={s.num}>0{i + 1}</span>
              {l.label}
            </Link>
          ))}
          <Link className={`btn btn-glow ${s.panelCta}`} href={`${base}#circle`} onClick={() => setOpen(false)}>
            Join the first circle
          </Link>
        </nav>
      </div>
    </>
  );
}
