"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { waitlistSchema } from "@/lib/forms/schemas";
import { LANGUAGES } from "@/lib/site";
import { Offscreen } from "./Offscreen";
import s from "./Circle.module.css";

type Status = "idle" | "success" | "error";

/** The candle, the ring of twelve lights and the waitlist form. A valid entry lights all three. Nothing is sent anywhere. */
export function CircleJoin({ heading }: { heading: ReactNode }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") doneRef.current?.focus();
  }, [status]);

  function join(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = waitlistSchema.safeParse({
      email: String(form.get("email") ?? ""),
      language: String(form.get("language") ?? "en"),
    });
    if (!parsed.success) {
      setStatus("error");
      setError(parsed.error.issues[0]?.message ?? "");
      return;
    }
    setError("");
    setStatus("success");
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
          <form className={`card ${s.form}`} onSubmit={join} noValidate>
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
            <button type="submit" className="btn btn-glow">Light my candle</button>
            <p id="circle-status" className={status === "error" ? s.err : "sr-only"} aria-live="polite">
              {status === "error" ? error : ""}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
