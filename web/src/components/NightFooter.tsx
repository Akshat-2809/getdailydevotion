import Link from "next/link";
import { CONTACT_EMAIL, SECTIONS } from "@/lib/site";
import { Offscreen } from "./Offscreen";
import s from "./NightFooter.module.css";

/**
 * Night sky: stars, a shooting star, a crescent moon and a hill with lit windows.
 * On the homepage the scroll-driven sky is already night here; sub-pages (`home={false}`) paint their own.
 */
export function NightFooter({ home = true }: { home?: boolean }) {
  const base = home ? "" : "/";
  return (
    <Offscreen as="footer" className={`${s.night} ${home ? "" : s.standalone}`} id={home ? "night" : undefined}>
      <span className={s.stars} aria-hidden="true" />
      <span className={s.stars2} aria-hidden="true" />
      <span className={s.shoot} aria-hidden="true" />
      <span className={s.moon} aria-hidden="true" />
      <div className={`wrap ${s.nin}`}>
        <span className={`lab ${s.gn}`}>Good night</span>
        <h2>Rest well.<br /><em>See you at dawn.</em></h2>
        <nav className={s.nl} aria-label="Footer">
          {SECTIONS.filter((sec) => sec.id !== "night").map((sec) => (
            <Link key={sec.id} href={`${base}#${sec.id}`}>{sec.label}</Link>
          ))}
        </nav>
        <a className={s.mail} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </div>
      <div className={s.hill} aria-hidden="true">
        <span className={s.win} style={{ left: "22%" }} />
        <span className={s.win} style={{ left: "47%", animationDelay: ".8s" }} />
        <span className={s.win} style={{ left: "71%", animationDelay: "1.6s" }} />
      </div>
      <div className={s.legal}>
        <span>© 2026 Daily Devotion · Hyderabad</span>
        <span>
          <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/contact">Contact</Link> ·{" "}
          <Link href={`${base}#dawn`}>Back to dawn ↑</Link>
        </span>
      </div>
    </Offscreen>
  );
}
