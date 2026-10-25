"use client";

import { useEffect } from "react";
import s from "./SkyBackground.module.css";

type RGB = [number, number, number];

// Dawn → lilac → clear sky → gold → dusk → twilight → night, keyed by page scroll progress.
const STOPS: [number, RGB][] = [
  [0, [246, 210, 190]],
  [0.16, [236, 226, 240]],
  [0.36, [220, 234, 244]],
  [0.54, [246, 224, 176]],
  [0.68, [214, 140, 128]],
  [0.8, [62, 48, 96]],
  [1, [14, 12, 31]],
];

function skyAt(p: number): RGB {
  for (let i = 0; i < STOPS.length - 1; i++) {
    if (p <= STOPS[i + 1][0]) {
      const k = (p - STOPS[i][0]) / (STOPS[i + 1][0] - STOPS[i][0]);
      const a = STOPS[i][1];
      const b = STOPS[i + 1][1];
      return [0, 1, 2].map((c) => Math.round(a[c] + (b[c] - a[c]) * k)) as RGB;
    }
  }
  return STOPS[STOPS.length - 1][1];
}

/**
 * Fixed sky behind the homepage. Scroll progress sets --sky on <html>, and data-sky="dark"
 * switches the ink/card/line tokens (globals.css) once luminance drops below .5.
 * Writes straight to the DOM, so scrolling never re-renders React.
 */
export function SkyBackground() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let lastP = -1;

    const measure = () => {
      raf = 0;
      const el = document.scrollingElement ?? root;
      const max = Math.max(1, el.scrollHeight - el.clientHeight);
      const p = Math.max(0, Math.min(1, el.scrollTop / max));
      if (Math.abs(p - lastP) <= 0.002) return;
      lastP = p;
      const c = skyAt(p);
      const lum = (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
      root.style.setProperty("--sky", `rgb(${c.join(",")})`);
      if (lum < 0.5) root.dataset.sky = "dark";
      else delete root.dataset.sky;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.style.removeProperty("--sky");
      delete root.dataset.sky;
    };
  }, []);

  return <div className={s.sky} aria-hidden="true" />;
}
