import type { Metadata } from "next";
import Link from "next/link";
import { FlameMark } from "@/components/FlameMark";
import s from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found — Daily Devotion",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className={`tone-dark ${s.page}`}>
      <span className={s.stars} aria-hidden="true" />
      <span className={s.stars2} aria-hidden="true" />
      <span className={s.shoot} aria-hidden="true" />
      <span className={s.moon} aria-hidden="true" />
      <div className={`wrap ${s.inner}`}>
        <Link className={s.logo} href="/" aria-label="Daily Devotion home">
          <FlameMark />
          <span>daily <em>devotion</em></span>
        </Link>
        <span className="lab">Error 404</span>
        <h1 className={s.big}>Lost in <em>the dark?</em></h1>
        <p className="lede">This page doesn&apos;t exist, or it has gone out like a candle.</p>
        <Link className="btn btn-glow" href="/">Back to dawn</Link>
      </div>
      <div className={s.hill} aria-hidden="true">
        <span className={s.win} style={{ left: "30%" }} />
        <span className={s.win} style={{ left: "64%", animationDelay: "1.2s" }} />
      </div>
    </main>
  );
}
