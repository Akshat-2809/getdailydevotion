"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "./site";

/**
 * Index into SECTIONS of the section being read: the last one whose top is above the middle
 * of the viewport. Any intersection change re-checks all six, so jumps (anchor clicks) can't
 * leave a stale state. Returns -1 on pages without those sections.
 */
export function useActiveSection() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const els = SECTIONS.map((sec) => document.getElementById(sec.id)).filter((el): el is HTMLElement => !!el);
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    const update = () => {
      const mid = window.innerHeight * 0.5;
      let sec = 0;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top < mid) sec = i;
      });
      setActive(sec);
    };
    const io = new IntersectionObserver(update, { rootMargin: "0px 0px -50% 0px" });
    els.forEach((el) => io.observe(el));
    update();
    return () => io.disconnect();
  }, []);

  return active;
}
