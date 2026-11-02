"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT_FIELDS, contactSchema, type ContactField as Field } from "@/lib/forms/schemas";
import s from "./Contact.module.css";

type FieldErrors = Partial<Record<Field, string>>;
type Status = "idle" | "success" | "error";

/** Contact form, checked in the browser only: nothing is sent or stored. Errors sit next to each field; on success a small flame lights. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") doneRef.current?.focus();
  }, [status]);

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
    });
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Field;
        if (CONTACT_FIELDS.includes(key)) errors[key] ??= issue.message;
      }
      setFieldErrors(errors);
      setError("Please check the highlighted fields and try again.");
      setStatus("error");
      return;
    }
    setFieldErrors({});
    setError("");
    setStatus("success");
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
    <form className={s.form} onSubmit={send} noValidate>
      <h2 className={s.formTitle}>Send a message</h2>
      <p className="sr-only" aria-live="polite">
        {status === "error" ? error : ""}
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

      <div className={s.actions}>
        <button type="submit" className="btn btn-glow">Send message</button>
        <span className={s.fine}>We&apos;ll only use your details to reply.</span>
      </div>
    </form>
  );
}
