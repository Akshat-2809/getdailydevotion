"use client";

import { useEffect, useRef, useState } from "react";
import { sendContactMessage } from "@/app/actions/contact";
import type { ContactField as Field } from "@/lib/forms/schemas";
import { CONTACT_EMAIL } from "@/lib/site";
import s from "./Contact.module.css";

type FieldErrors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Record<Field, string>): FieldErrors {
  const e: FieldErrors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Please write a little more, at least 10 characters.";
  return e;
}

/** Contact form → sendContactMessage Server Action. Errors sit next to each field; on success a small flame lights. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") doneRef.current?.focus();
  }, [status]);

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = new FormData(e.currentTarget);
    const values = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
    };
    const local = validate(values);
    if (Object.keys(local).length) {
      setFieldErrors(local);
      setError("Please check the highlighted fields and try again.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setFieldErrors({});
    setError("");
    try {
      const res = await sendContactMessage({ ...values, website: String(form.get("website") ?? "") });
      if (res.status === "sent") {
        setStatus("success");
        return;
      }
      setFieldErrors(res.fieldErrors ?? {});
      setError(res.message);
    } catch {
      // The action itself couldn't be reached (offline, deploy in progress).
      setError(`We couldn't reach our server. Please check your connection and try again, or email ${CONTACT_EMAIL}.`);
    }
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div className={s.done} ref={doneRef} tabIndex={-1} role="status">
        <span className={s.doneFlame} aria-hidden="true"><span /></span>
        <strong className={s.doneTitle}>Message <em>sent.</em></strong>
        <span className={s.doneText}>Thanks for writing. We&apos;ll reply by email.</span>
      </div>
    );
  }

  const describe = (f: Field) => (fieldErrors[f] ? `cf-${f}-err` : undefined);
  const fieldError = (f: Field) =>
    fieldErrors[f] && <span id={`cf-${f}-err`} className={s.ferr}>{fieldErrors[f]}</span>;

  return (
    <form className={s.form} onSubmit={send} noValidate aria-busy={status === "submitting"}>
      <h2 className={s.formTitle}>Send a message</h2>
      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Sending your message…" : status === "error" ? error : ""}
      </p>

      <div className={s.two}>
        <div className={s.field}>
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" autoComplete="name" placeholder="Your name" required maxLength={120}
            aria-invalid={!!fieldErrors.name} aria-describedby={describe("name")} />
          {fieldError("name")}
        </div>
        <div className={s.field}>
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="you@email.com" required maxLength={254}
            aria-invalid={!!fieldErrors.email} aria-describedby={describe("email")} />
          {fieldError("email")}
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows={6} placeholder="What's on your mind?" required maxLength={5000}
          aria-invalid={!!fieldErrors.message} aria-describedby={describe("message")} />
        {fieldError("message")}
      </div>

      <div className={s.hp} aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && !Object.keys(fieldErrors).length && <p className={s.formErr}>{error}</p>}

      <div className={s.actions}>
        <button type="submit" className="btn btn-glow" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <span className={s.fine}>We&apos;ll only use your details to reply.</span>
      </div>
    </form>
  );
}
