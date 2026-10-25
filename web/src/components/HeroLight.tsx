"use client";

import { useEffect, useRef } from "react";

/**
 * The warm light in the hero. It follows a mouse or pen over the parent section
 * (rAF-throttled, written straight to CSS variables). On touch it stays where it is.
 */
export function HeroLight({ className }: { className: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = ref.current;
    const host = orb?.parentElement;
    if (!orb || !host) return;
    let raf = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      raf = 0;
      const rect = host.getBoundingClientRect();
      orb.style.setProperty("--mx", `${(((x - rect.left) / rect.width) * 100).toFixed(1)}%`);
      orb.style.setProperty("--my", `${(((y - rect.top) / rect.height) * 100).toFixed(1)}%`);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={ref} className={className} aria-hidden="true" />;
}
