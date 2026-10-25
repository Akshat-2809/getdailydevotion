"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { joinWaitlist } from "@/app/actions/waitlist";
import { LANGUAGES } from "@/lib/site";
import { Offscreen } from "./Offscreen";
import s from "./Circle.module.css";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The candle, the ring of twelve lights and the waitlist form. A successful sign-up lights all three. */
export function CircleJoin({ heading }: { heading: ReactNode }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") doneRef.current?.focus();
  }, [status]);

  async function join(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setError("Please enter a valid email address, then try again.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await joinWaitlist({
        email,
        language: String(form.get("language") ?? "en"),
        website: String(form.get("website") ?? ""),
      });
      if (res.status === "error") {
        setStatus("error");
        setError(res.message);
      } else {
        setStatus("success");
      }
    } catch {
      // The action itself couldn't be reached (offline, deploy in progress).
      setStatus("error");
      setError("We couldn't reach our server. Please check your connection and try again.");
    }
  }

  const lit = status === "success";
  return (
    <div className={`wrap ${s.cgrid}`}>
      <Offscreen className={s.ringBox} aria-hidden="true">
        <div className={`${s.ring} ${lit ? s.lit : ""}`}>
          <span className={s.halo} />
          {Array.from({ length: 12 }, (_, k) => (
            <span key={k} className={s.rd} style={{ "--rot": `${k * 30}deg`, transitionDelay: `${k * 0.09}s` } as React.CSSProperties} />
          ))}
          <div className={s.candle}><span className={s.wick} /></div>
          <span className={s.fl} />
        </div>
      </Offscreen>
      <div className={s.side}>
        {heading}
        {lit ? (
          <div className={`card ${s.done}`} ref={doneRef} tabIndex={-1} role="status">
            <span className="lab">You&apos;re in</span>
            <h3>Welcome to the <em>first circle.</em></h3>
            <p className={s.muted}>We&apos;ll write to you when it&apos;s ready.</p>
          </div>
        ) : (
          <form className={`card ${s.form}`} onSubmit={join} noValidate aria-busy={status === "submitting"}>
            <div className={s.field}>
              <label htmlFor="circle-email">Email</label>
              <input
                id="circle-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                required
                maxLength={254}
                aria-invalid={status === "error" || undefined}
                aria-describedby="circle-status"
              />
            </div>
            <div className={s.field}>
              <label htmlFor="circle-lang">The language you reflect in</label>
              <select id="circle-lang" name="language" defaultValue="en">
                {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>
            <div className={s.hp} aria-hidden="true">
              <label htmlFor="circle-website">Website</label>
              <input id="circle-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <button type="submit" className="btn btn-glow" disabled={status === "submitting"}>
              {status === "submitting" ? "Lighting…" : "Light my candle"}
            </button>
            <p id="circle-status" className={status === "error" ? s.err : "sr-only"} aria-live="polite">
              {status === "submitting" ? "Lighting your candle…" : status === "error" ? error : ""}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
