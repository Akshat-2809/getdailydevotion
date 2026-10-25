import "server-only";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/site";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type Mail = { to: string; subject: string; text: string; html?: string; replyTo?: string; key: string };

/** Sends every mail and logs failures. Never throws: email must not fail a sign-up or message. */
async function sendAll(tag: string, mails: Mail[]) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    console.warn(`[${tag}] RESEND_API_KEY or EMAIL_FROM not set, skipping emails`);
    return;
  }
  const resend = new Resend(apiKey);
  const results = await Promise.allSettled(
    mails.map(({ key, ...m }) => resend.emails.send({ from, ...m }, { idempotencyKey: key })),
  );
  results.forEach((r, i) => {
    const subject = mails[i]?.subject;
    if (r.status === "rejected") console.error(`[${tag}] email failed: ${subject}`, r.reason);
    else if (r.value.error) console.error(`[${tag}] email rejected by Resend: ${subject}`, r.value.error);
  });
}

const sign = ["", "— Daily Devotion", "A little light, every day."];

export function sendWaitlistEmails(s: { id: number; email: string; language: string }) {
  const notify = process.env.NOTIFY_EMAIL;
  const mails: Mail[] = [
    {
      to: s.email,
      replyTo: CONTACT_EMAIL,
      subject: "Welcome to the first circle",
      text: ["Welcome to the first circle. We'll write to you when it's ready.", ...sign].join("\n"),
      html: `<p style="font-size:17px">Welcome to the first circle. We'll write to you when it's ready.</p><p style="color:#4B4363">— Daily Devotion<br>A little light, every day.</p>`,
      key: `waitlist-welcome/${s.id}`,
    },
  ];
  if (notify) {
    mails.push({
      to: notify,
      subject: `New first-circle sign-up: ${s.email}`,
      text: `Email: ${s.email}\nLanguage: ${s.language}\nSign-up #${s.id}`,
      key: `waitlist-notify/${s.id}`,
    });
  }
  return sendAll(`waitlist#${s.id}`, mails);
}

export function sendContactEmails(m: { id: number; name: string; email: string; message: string }) {
  const notify = process.env.NOTIFY_EMAIL;
  const mails: Mail[] = [
    {
      to: m.email,
      replyTo: CONTACT_EMAIL,
      subject: "We've got your message",
      text: [`Hi ${m.name},`, "", "Thanks for writing to Daily Devotion. We've got your message and will reply by email.", ...sign].join("\n"),
      key: `contact-ack/${m.id}`,
    },
  ];
  if (notify) {
    mails.push({
      to: notify,
      replyTo: m.email,
      subject: `Contact form: ${m.name}`,
      text: [`From: ${m.name} <${m.email}>`, "", m.message].join("\n"),
      html: `<p><b>From:</b> ${escape(m.name)} &lt;${escape(m.email)}&gt;</p><p style="white-space:pre-wrap">${escape(m.message)}</p>`,
      key: `contact-notify/${m.id}`,
    });
  }
  return sendAll(`contact#${m.id}`, mails);
}
