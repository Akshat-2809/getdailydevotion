"use client";

import { useEffect, useRef } from "react";

type Tag = "div" | "section" | "footer";
type Props = React.HTMLAttributes<HTMLElement> & { as?: Tag; children?: React.ReactNode };

/**
 * An element that sets `data-offscreen` while it is outside the viewport.
 * globals.css pauses every CSS animation inside it, so looping animations
 * (stars, flames, glows) don't run when nobody can see them.
 */
export function Offscreen({ as: Tag = "div", children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      el.toggleAttribute("data-offscreen", !entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.Ref<never>} {...rest}>
      {children}
    </Tag>
  );
}
