import s from "./SkyBackground.module.css";

/** The sky layer for sub-pages: one fixed colour, taken from --sky on the page's tone wrapper. No client JS. */
export function StaticSky() {
  return <div className={s.sky} aria-hidden="true" />;
}
