import Image from "next/image";
import founderPhoto from "@/assets/founder/aarihant-aaryan.jpg";
import { FOUNDER_EMAIL, FOUNDER_LINKEDIN } from "@/lib/site";
import { FlameMark } from "./FlameMark";
import { Lamps } from "./Lamps";
import s from "./Founder.module.css";

const LAMPS = [
  {
    yr: "2020 – 2023",
    title: "Small businesses",
    text: "Started straight out of college with Big Business, then Business Score: a credit score for small businesses that got them funded by lending partners.",
    stats: ["1 lakh businesses", "Thousands of CA partners"],
  },
  {
    yr: "Then",
    title: "Faith communities",
    text: "Built Jireh, a mobile-first app for churches covering information, engagement and giving.",
    stats: ["Week-4 retention above 30%", "Millions of dollars in payments"],
  },
  {
    yr: "2023 – 2024 · PhysicsWallah",
    title: "Learners across Bharat",
    text: "Built Englishwallah, an English learning product for Bharat, working closely with PW's co-founder.",
    stats: ["7-figure revenue in 2 weeks", "Lowest CAC at PW"],
  },
  {
    yr: "2025 – now",
    title: "AI × content × devotion",
    text: "Consumer apps for the world, built at the meeting point of the three.",
    stats: [],
  },
];

export function Founder() {
  return (
    <section className="sec" id="founder">
      <div className={`wrap ${s.fgrid}`}>
        <div className={`card ${s.fcard} rv`}>
          <div className={s.fph}>
            <Image
              src={founderPhoto}
              alt="Aarihant Aaryan"
              fill
              placeholder="blur"
              sizes="(max-width: 1000px) calc(100vw - 96px), 360px"
              className={s.photo}
            />
          </div>
          <div className={s.name}>
            <span className={s.nm}>Aarihant Aaryan</span>
            <span className="lab">Co-founder · Hyderabad</span>
          </div>
          <p className={s.bio}>
            Writes <em>Iron Sharpen Iron</em>, a newsletter on business, tech and human behaviour.
          </p>
        </div>
        <div className={s.col}>
          <div className={`rv ${s.intro}`}>
            <span className="lab">The founder</span>
            <h2 className={`h2 ${s.h2}`}>Third time building for <em>what people hold dear.</em></h2>
          </div>
          <Lamps className={s.lamps} litClass={s.lit}>
            {LAMPS.map((l) => (
              <div key={l.title} className={s.lamp}>
                <span className={s.lt}><FlameMark width={22} height={28} core={false} /></span>
                <div>
                  <span className={s.yr}>{l.yr}</span>
                  <h3>{l.title}</h3>
                  <p>{l.text}</p>
                  {l.stats.length > 0 && (
                    <div className={s.stats}>
                      {l.stats.map((st) => <span key={st}>{st}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* The thread ends in one more lamp: an invitation to write. */}
            <div className={`${s.lamp} ${s.signoff}`}>
              <span className={s.lt}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--flame)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <div>
                <span className={s.yr}>Write to Aarihant</span>
                <a className={s.mail} href={`mailto:${FOUNDER_EMAIL}`}>{FOUNDER_EMAIL}</a>
                {FOUNDER_LINKEDIN && (
                  <a className={s.li} href={FOUNDER_LINKEDIN} target="_blank" rel="noopener noreferrer">
                    or find him on LinkedIn <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </Lamps>
        </div>
      </div>
    </section>
  );
}
