import type { ReactNode } from "react";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";
import { FlameMark } from "./FlameMark";
import { SubPage } from "./SubPage";
import s from "./LegalDoc.module.css";

export type LegalSection = { id: string; title: string; body: ReactNode };

type Props = { title: ReactNode; intro: ReactNode; sections: LegalSection[] };

const num = (i: number) => String(i + 1).padStart(2, "0");

/** Long-form legal page: centred header, lamp-numbered sections, contents on a bead thread. Server-rendered, no client JS. */
export function LegalDoc({ title, intro, sections }: Props) {
  return (
    <SubPage tone="morning">
      <main className={s.page}>
        <header className={`wrap ${s.head}`}>
          <span className={s.mark}><FlameMark width={26} height={33} /></span>
          <span className="lab">Legal · Last updated {LEGAL_LAST_UPDATED}</span>
          <h1 className={s.title}>{title}</h1>
          <div className={s.intro}>{intro}</div>
        </header>

        <div className={`wrap ${s.layout}`}>
          <nav className={s.toc} aria-label="On this page">
            <span className="lab">On this page</span>
            <ol>
              {sections.map((sec, i) => (
                <li key={sec.id}>
                  <a href={`#${sec.id}`}>
                    <i aria-hidden="true" />
                    <span className={s.tnum}>{num(i)}</span>
                    {sec.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className={s.doc}>
            {sections.map((sec, i) => (
              <section key={sec.id} id={sec.id} className={s.section} aria-labelledby={`${sec.id}-h`}>
                <span className={s.lamp} aria-hidden="true">{num(i)}</span>
                <div className={s.body}>
                  <h2 id={`${sec.id}-h`}>{sec.title}</h2>
                  {sec.body}
                </div>
              </section>
            ))}
          </article>
        </div>
      </main>
    </SubPage>
  );
}
