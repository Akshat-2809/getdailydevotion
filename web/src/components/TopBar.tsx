import Link from "next/link";
import { FlameMark } from "./FlameMark";
import { TopNav } from "./TopNav";
import s from "./TopBar.module.css";

/**
 * Sticky top bar: logo, section links, first-circle button. On sub-pages (`home={false}`) the
 * links go back to the homepage, and the bar gets a frosted backing so long text doesn't run
 * underneath the logo.
 */
export function TopBar({ home = true }: { home?: boolean }) {
  const base = home ? "" : "/";
  return (
    <header className={`${s.top} ${home ? "" : s.solid}`}>
      <div className={`wrap ${s.topin}`}>
        <Link className={s.logo} href={home ? "#dawn" : "/"} aria-label="Daily Devotion home">
          <FlameMark className={s.flamemark} />
          <span className={s.wm}>daily <em>devotion</em></span>
        </Link>
        <TopNav home={home} />
        <Link className={`btn btn-soft ${s.btn}`} href={`${base}#circle`}>Join the first circle</Link>
      </div>
    </header>
  );
}
