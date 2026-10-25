import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, type LegalSection } from "@/components/LegalDoc";
import { LEGAL_LOCATION } from "@/lib/legal";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use — Daily Devotion",
  description: "The terms that apply when you use the Daily Devotion website at getdailydevotion.com and join the first circle.",
  alternates: { canonical: "/terms" },
};

const mail = (address: string) => <a href={`mailto:${address}`}>{address}</a>;

const SECTIONS: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    body: (
      <>
        <p>
          These terms of use (&ldquo;Terms&rdquo;) govern your access to and use of getdailydevotion.com and its pages (the
          &ldquo;Website&rdquo;). The Website is operated by Daily Devotion, based in {LEGAL_LOCATION} (&ldquo;Daily
          Devotion&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;).
        </p>
        <p>By using the Website you agree to these Terms. If you do not agree, please do not use the Website.</p>
        <p>
          These Terms are an electronic record under the Information Technology Act, 2000 and the rules made under it, and do
          not need a physical or digital signature.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Who may use the Website",
    body: (
      <p>
        Anyone may browse the Website. To join the waitlist or send us a message, you must be at least 18 years old and
        competent to contract under the Indian Contract Act, 1872.
      </p>
    ),
  },
  {
    id: "website-content",
    title: "What the Website is, and is not",
    body: (
      <ul>
        <li>
          <b>Early stage.</b> Daily Devotion is being built now. The Website describes what we are working on. It is not an
          offer to provide a product or service, and what we build may change without notice.
        </li>
        <li>
          <b>Illustrations.</b> The sample reflections, the seven mornings and the other examples on the Website are
          illustrations written for the Website. They are not content from a released product and are not promises of
          particular features or results.
        </li>
        <li>
          <b>No professional advice.</b> The reflections on the Website are general words of encouragement, not medical,
          psychological, financial or other professional advice. If you need support, please speak to a qualified person.
        </li>
      </ul>
    ),
  },
  {
    id: "waitlist",
    title: "The first circle and the contact form",
    body: (
      <>
        <p>When you join the waitlist (the &ldquo;first circle&rdquo;) or contact us through the Website:</p>
        <ul>
          <li>the email address and other information you give must be your own and accurate;</li>
          <li>
            joining the waitlist does not create a contract, and does not guarantee access to Daily Devotion or a launch
            date. We may decide who gets early access, and when, at our discretion;
          </li>
          <li>you can leave the waitlist at any time by writing to {mail(CONTACT_EMAIL)}; and</li>
          <li>
            we handle the personal data you give us as described in our <Link href="/privacy">privacy policy</Link>.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>You agree not to:</p>
        <ol>
          <li>use the Website for any unlawful, fraudulent or harmful purpose, or in breach of these Terms;</li>
          <li>impersonate any person, sign anyone else up for the waitlist, or misrepresent your identity;</li>
          <li>send spam, or submit false, automated or bulk entries through the Website&apos;s forms;</li>
          <li>scrape, crawl or copy the Website by automated means, except for search engines that follow our robots.txt file;</li>
          <li>probe, scan or test the vulnerability of the Website, or breach its security measures;</li>
          <li>introduce viruses, malware or other harmful code, or interfere with the Website&apos;s operation; or</li>
          <li>copy, modify, reverse engineer or create derivative works from the Website, except as the law allows.</li>
        </ol>
        <p>
          If you find a security vulnerability, please report it to {mail(CONTACT_EMAIL)} and give us a reasonable time to fix
          it before disclosing it.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <>
        <p>
          The Website and everything on it, including text, graphics, illustrations, the Daily Devotion name and flame logo,
          and the underlying code, belong to Daily Devotion or its licensors and are protected by Indian and international
          intellectual property laws.
        </p>
        <p>
          We grant you a limited, non-exclusive, non-transferable, revocable licence to view the Website for your own personal
          use. You may not use our name, logo or other marks without our prior written permission.
        </p>
        <p>If you send us feedback or ideas, we may use them without any obligation to you.</p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party websites",
    body: (
      <p>
        The Website may link to websites and services run by others. We do not control them and are not responsible for
        their content, terms or privacy practices.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <p>
        To the extent the law allows, the Website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without
        warranties of any kind, whether express or implied, including warranties of accuracy, completeness, availability,
        fitness for a particular purpose or non-infringement. We work to keep the Website accurate and available, but we do not
        guarantee that it will be error-free, secure or uninterrupted.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>To the extent the law allows:</p>
        <ol>
          <li>
            Daily Devotion is not liable for any indirect, incidental, special or consequential loss, or for any loss of
            profits, data or goodwill, arising from your use of, or inability to use, the Website; and
          </li>
          <li>our total liability arising from the Website or these Terms will not exceed ₹5,000.</li>
        </ol>
        <p>Nothing in these Terms limits liability that cannot be limited under applicable law, including for fraud.</p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: (
      <p>
        You agree to indemnify Daily Devotion against claims, losses and reasonable costs, including legal fees, that arise
        from your breach of these Terms or your misuse of the Website.
      </p>
    ),
  },
  {
    id: "suspension",
    title: "Suspension of access",
    body: (
      <p>
        We may suspend or restrict access to the Website, or remove entries from the waitlist, at any time, including to
        protect its security or if we reasonably believe you have breached these Terms.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law and jurisdiction",
    body: (
      <p>
        These Terms are governed by the laws of India. The courts at Hyderabad, Telangana have exclusive jurisdiction over any
        dispute arising from these Terms or the Website.
      </p>
    ),
  },
  {
    id: "grievances",
    title: "Grievances",
    body: (
      <p>
        Under the Information Technology Act, 2000 and the rules made under it, you may raise any complaint about the Website
        with our Grievance Officer at {mail(CONTACT_EMAIL)} (subject: &ldquo;Grievance&rdquo;). We will resolve grievances within
        30 days. More detail is in our <Link href="/privacy#grievance-officer">privacy policy</Link>.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these Terms",
    body: (
      <p>
        We may update these Terms from time to time. The updated version takes effect when we post it on this page with a new
        &ldquo;Last updated&rdquo; date. If you keep using the Website after that, you accept the updated Terms.
      </p>
    ),
  },
  {
    id: "general",
    title: "General",
    body: (
      <ul>
        <li>
          <b>Entire terms:</b> these Terms and our privacy policy are the whole agreement between you and Daily Devotion about
          the Website.
        </li>
        <li>
          <b>Severability:</b> if any provision is held invalid or unenforceable, the rest remain in effect.
        </li>
        <li>
          <b>No waiver:</b> if we do not enforce a provision, we have not waived our right to enforce it later.
        </li>
        <li>
          <b>Assignment:</b> you may not transfer your rights under these Terms. We may transfer ours as part of a merger,
          acquisition or sale of assets.
        </li>
        <li>
          <b>Events beyond our control:</b> we are not responsible for delays or failures caused by events outside our
          reasonable control.
        </li>
      </ul>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        For any question about these Terms, write to {mail(CONTACT_EMAIL)} or use our <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDoc
      title={<>Terms of <em>use.</em></>}
      intro={
        <p>
          These terms explain the rules for using getdailydevotion.com and joining the first circle. Please read them before
          using the Website.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
