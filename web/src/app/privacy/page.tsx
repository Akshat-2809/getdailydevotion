import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, type LegalSection } from "@/components/LegalDoc";
import s from "@/components/LegalDoc.module.css";
import { LEGAL_LOCATION } from "@/lib/legal";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy — Daily Devotion",
  description:
    "How Daily Devotion collects, uses, shares and protects personal data, and the rights you have under Indian law, including the Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/privacy" },
};

const mail = (address: string) => <a href={`mailto:${address}`}>{address}</a>;

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are and what this policy covers",
    body: (
      <>
        <p>
          Daily Devotion (&ldquo;Daily Devotion&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) is based in{" "}
          {LEGAL_LOCATION}. We are building consumer apps at the intersection of AI, content and devotion, and we are at an
          early stage.
        </p>
        <p>This policy explains how we handle personal data when you:</p>
        <ul>
          <li>visit getdailydevotion.com (the &ldquo;Website&rdquo;);</li>
          <li>join our waitlist, the &ldquo;first circle&rdquo;;</li>
          <li>send us a message through the contact form, or write to us by email.</li>
        </ul>
        <p>
          We follow the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and
          Procedures and Sensitive Personal Data or Information) Rules, 2011 (the &ldquo;SPDI Rules&rdquo;). We are also
          aligning our practices with the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection
          Rules, 2025 (together, the &ldquo;DPDP Law&rdquo;) as their provisions come into force. For the data described in
          this policy, Daily Devotion decides why and how it is processed, so we act as the <b>Data Fiduciary</b>, and you are
          the <b>Data Principal</b>.
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "Personal data we collect",
    body: (
      <>
        <h3>Data you give us</h3>
        <ul>
          <li>
            <b>Waitlist:</b> your email address, and the language you reflect in, which you choose on the form.
          </li>
          <li>
            <b>Contact form:</b> your name, email address and the message you write.
          </li>
          <li>
            <b>Emails:</b> whatever you choose to include when you write to us.
          </li>
        </ul>
        <h3>Data collected automatically</h3>
        <ul>
          <li>
            <b>IP address:</b> used when you submit a form, to prevent spam and abuse. We store it only as a salted, one-way
            hash, which cannot practically be turned back into your IP address.
          </li>
          <li>
            <b>Browser information:</b> the user-agent string your browser sends when you submit a form.
          </li>
          <li>
            <b>Server logs:</b> our hosting providers keep standard request logs (IP address, date and time, page or address
            requested, browser type) for security and reliability.
          </li>
        </ul>
        <h3>Cookies and tracking</h3>
        <p>
          The Website does not use cookies for advertising or analytics, and does not track you across other websites. Fonts
          are served from our own domain, so your browser does not contact third-party font services when you visit. The
          changing sky, the greetings and the other animations on the homepage run entirely in your browser, and nothing
          about them is sent to us.
        </p>
        <p>
          If we introduce analytics or other non-essential cookies in future, we will update this policy first and ask for
          your consent where the law requires it.
        </p>
        <h3>Data we do not want</h3>
        <p>
          Please do not send us sensitive personal data or information under the SPDI Rules (such as passwords, bank account
          or card details, health information or biometric data) through the Website or by email. We also do not need to know
          your religious or philosophical beliefs, so please don&apos;t include them in your messages.
        </p>
      </>
    ),
  },
  {
    id: "purposes",
    title: "Why we use your data, and on what basis",
    body: (
      <>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th scope="col">Purpose</th>
                <th scope="col">Data used</th>
                <th scope="col">Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Keep your place in the first circle and tell you when you can try Daily Devotion</td>
                <td>Email address</td>
                <td>Your consent, given when you join</td>
              </tr>
              <tr>
                <td>Understand which languages people reflect in, and write to you in yours where we can</td>
                <td>Language</td>
                <td>Your consent</td>
              </tr>
              <tr>
                <td>Send a short welcome email confirming you&apos;re in</td>
                <td>Email address</td>
                <td>Your consent</td>
              </tr>
              <tr>
                <td>Read and reply to your message</td>
                <td>Name, email address, message</td>
                <td>Your consent, and data you provided voluntarily for that purpose</td>
              </tr>
              <tr>
                <td>Keep the Website secure and prevent spam and abuse</td>
                <td>Hashed IP address, browser information, server logs</td>
                <td>Reasonable security practices required by law</td>
              </tr>
              <tr>
                <td>Meet legal obligations and respond to lawful requests</td>
                <td>Any of the above, as needed</td>
                <td>Compliance with law, or with a judgment or order</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We do not sell personal data, we do not use it to show you advertising, and we do not use it for automated
          decisions that have legal or similarly significant effects on you. We will only email you about Daily Devotion, and
          you can ask us to stop at any time.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share data with",
    body: (
      <>
        <p>We share personal data only where needed, and only with:</p>
        <ul>
          <li>
            <b>Service providers</b> who process data on our behalf under contracts with confidentiality and security
            obligations:
          </li>
        </ul>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th scope="col">Provider</th>
                <th scope="col">What they do for us</th>
                <th scope="col">Data involved</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vercel Inc.</td>
                <td>Website hosting and delivery, including the server code that handles the forms</td>
                <td>Server logs, form submissions in transit</td>
              </tr>
              <tr>
                <td>Neon (Databricks, Inc.)</td>
                <td>Database hosting for waitlist sign-ups and contact messages</td>
                <td>Email, language, name and message (contact form only), hashed IP, browser information, server logs</td>
              </tr>
              <tr>
                <td>Resend (Plus Five Five, Inc.)</td>
                <td>Sending the welcome email, message acknowledgements and our internal notifications</td>
                <td>Email address and language; name and message for contact-form emails</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>
            <b>Professional advisers</b>, such as lawyers and auditors, under a duty of confidentiality.
          </li>
          <li>
            <b>Government and regulatory authorities</b>, courts and law enforcement agencies, where the law requires it or
            to protect our legal rights.
          </li>
          <li>
            <b>A buyer or successor</b>, if we are involved in a merger, acquisition or sale of assets, subject to this
            policy continuing to protect your data.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "transfers",
    title: "Where your data is stored",
    body: (
      <p>
        The service providers listed in section 04 may store or process data outside India. The DPDP Law permits such
        transfers except to countries the Central Government restricts by notification, and we will not transfer personal
        data to any restricted country. We use providers that commit by contract to protect the data to a standard at least
        equal to Indian law.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep data",
    body: (
      <>
        <ul>
          <li>
            <b>Waitlist sign-ups:</b> until you ask us to remove you, or until we close the waitlist, whichever comes first.
            We review the list at least once every 24 months and delete entries we no longer need.
          </li>
          <li>
            <b>Contact messages and email correspondence:</b> for up to 24 months after our last exchange, then deleted.
          </li>
          <li>
            <b>Hashed IP addresses and browser information</b> are kept with the sign-up or message they belong to, and
            deleted with it.
          </li>
          <li>
            <b>Server logs</b> are kept by our hosting providers for a short period, typically no more than 30 days.
          </li>
        </ul>
        <p>If you withdraw consent or ask us to erase your data, we will delete it unless the law requires us to keep it.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect data",
    body: (
      <>
        <p>
          We maintain reasonable security practices and procedures, as required by section 43A of the Information
          Technology Act, 2000 and the SPDI Rules, including:
        </p>
        <ul>
          <li>encryption of data in transit (TLS) and at rest;</li>
          <li>access limited to the people who need it, with multi-factor authentication on our accounts;</li>
          <li>storing IP addresses only as salted one-way hashes;</li>
          <li>limits on how many forms can be submitted from one network, to stop abuse; and</li>
          <li>choosing service providers with strong security practices, and reviewing our controls regularly.</li>
        </ul>
        <p>
          No method of transmission or storage is completely secure, but we work to protect personal data against loss,
          misuse and unauthorised access.
        </p>
        <h3>If something goes wrong</h3>
        <p>
          If a personal data breach occurs, we will inform affected individuals and the Data Protection Board of India as the
          DPDP Law requires. We will also report cyber security incidents to CERT-In within the time set by its directions.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Subject to the law, you have the right to:</p>
        <ol>
          <li>ask for a summary of the personal data we process about you, how we process it, and who we have shared it with;</li>
          <li>ask us to correct, complete or update inaccurate or incomplete data;</li>
          <li>ask us to erase your data, unless the law requires us to keep it;</li>
          <li>
            withdraw your consent at any time, as easily as you gave it. For the waitlist, just ask to be removed. This does
            not affect processing that already took place;
          </li>
          <li>nominate another person to exercise your rights if you die or become unable to do so; and</li>
          <li>have your grievances addressed by us, and then, if you are not satisfied, by the Data Protection Board of India.</li>
        </ol>
        <p>
          To exercise any of these rights, email {mail(CONTACT_EMAIL)} with the subject &ldquo;Privacy request&rdquo;, or use
          our <Link href="/contact">contact form</Link>. We may ask you to confirm your identity before acting on the request.
          We will respond within 30 days.
        </p>
        <p>
          The DPDP Law also expects Data Principals not to impersonate others, not to suppress material information, and not
          to file false or frivolous complaints.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        The waitlist and contact form are meant for people aged 18 or over. We do not knowingly collect personal data from
        children. If you believe a child has sent us personal data, please contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "Links to other websites",
    body: <p>If the Website links to sites we do not control, their own privacy policies apply when you visit them.</p>,
  },
  {
    id: "grievance-officer",
    title: "Grievance Officer",
    body: (
      <>
        <p>
          In line with Rule 5(9) of the SPDI Rules and the DPDP Law, we have appointed a Grievance Officer to handle privacy
          concerns and complaints:
        </p>
        <div className={s.callout}>
          <p>
            <b>Grievance Officer, Daily Devotion</b>
          </p>
          <p>Email: {mail(CONTACT_EMAIL)} (subject: &ldquo;Grievance&rdquo;)</p>
          <p>Address: {LEGAL_LOCATION}</p>
        </div>
        <p>
          We will acknowledge your grievance promptly and resolve it within 30 days of receipt. If you are not satisfied with
          our response, you may approach the Data Protection Board of India once the relevant provisions of the DPDP Law are
          in force.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy as Daily Devotion or the law changes. We will post the new version on this page with a new
        &ldquo;Last updated&rdquo; date. If we make a material change, we will tell people on the waitlist by email before it
        takes effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        For any question about this policy or how we handle personal data, write to {mail(CONTACT_EMAIL)} or use our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      title={<>Privacy <em>policy.</em></>}
      intro={
        <>
          <p>Devotion asks us to slow down, return, and remember. Respecting that includes respecting your data.</p>
          <p>
            This policy explains what we collect, why, who we share it with, how long we keep it, and the rights you have.
            The short version: we only ask for what we need to keep you posted, and we never sell it.
          </p>
        </>
      }
      sections={SECTIONS}
    />
  );
}
