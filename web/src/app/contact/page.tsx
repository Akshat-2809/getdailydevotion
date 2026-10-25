import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { FlameMark } from "@/components/FlameMark";
import { SubPage } from "@/components/SubPage";
import s from "@/components/Contact.module.css";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Daily Devotion",
  description: "Questions, ideas or feedback about Daily Devotion? Write to us and we'll reply by email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <SubPage tone="twilight">
      <main className={s.page}>
        <div className={s.glow} aria-hidden="true" />
        <header className={`wrap ${s.head}`}>
          <span className="lab">Contact</span>
          <h1 className={s.h1}>Say <em>hello.</em></h1>
          <p className={`lede ${s.lede}`}>Questions, ideas or feedback about Daily Devotion? Write to us and we&apos;ll reply by email.</p>
        </header>

        <div className={`wrap ${s.grid}`}>
          <div className={`card ${s.formCard}`}>
            <ContactForm />
          </div>

          <aside className={s.aside} aria-label="Other ways to reach us">
            <a className={s.item} href={`mailto:${CONTACT_EMAIL}`}>
              <span className={s.lt}><FlameMark width={16} height={20} core={false} /></span>
              <span className={s.itxt}>
                <span className="lab">Email</span>
                <b className={s.mail}>{CONTACT_EMAIL}</b>
              </span>
            </a>
            <div className={s.item}>
              <span className={s.lt}><FlameMark width={16} height={20} core={false} /></span>
              <span className={s.itxt}>
                <span className="lab">Based in</span>
                <b>Hyderabad, India</b>
              </span>
            </div>
            <Link className={s.item} href="/#circle">
              <span className={s.lt}><FlameMark width={16} height={20} core={false} /></span>
              <span className={s.itxt}>
                <span className="lab">Early access</span>
                <b>Join the first circle&nbsp;→</b>
              </span>
            </Link>
          </aside>
        </div>
      </main>
    </SubPage>
  );
}
