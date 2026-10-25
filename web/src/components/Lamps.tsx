"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { className: string; litClass: string; children: ReactNode };

/**
 * Lights each child once its top passes 62% of the viewport, and keeps it lit above that line.
 * The children are server-rendered; this only toggles a class on them, so it never re-renders.
 */
export function Lamps({ className, litClass, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = Array.from(ref.current?.children ?? []);
    if (!items.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const line = e.rootBounds?.bottom ?? window.innerHeight * 0.62;
          e.target.classList.toggle(litClass, e.boundingClientRect.top < line);
        }
      },
      { rootMargin: "0px 0px -38% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [litClass]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
