import { BeadNav } from "@/components/BeadNav";
import { Circle } from "@/components/Circle";
import { Founder } from "@/components/Founder";
import { Hero } from "@/components/Hero";
import { Idea } from "@/components/Idea";
import { Moments } from "@/components/Moments";
import { NightFooter } from "@/components/NightFooter";
import { SkyBackground } from "@/components/SkyBackground";
import { Statement } from "@/components/Statement";
import { TopBar } from "@/components/TopBar";
import founderPhoto from "@/assets/founder/aarihant-aaryan.jpg";
import { CONTACT_EMAIL, FOUNDER_EMAIL, FOUNDER_LINKEDIN, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  email: CONTACT_EMAIL,
  description: SITE_DESCRIPTION,
  slogan: "A little light, every day.",
  founder: {
    "@type": "Person",
    name: "Aarihant Aaryan",
    jobTitle: "Co-founder",
    email: FOUNDER_EMAIL,
    image: `${SITE_URL}${founderPhoto.src}`,
    ...(FOUNDER_LINKEDIN ? { sameAs: [FOUNDER_LINKEDIN] } : {}),
  },
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SkyBackground />
      <BeadNav />
      <div className="layer">
        <TopBar />
        <main>
          <Hero />
          <Statement />
          <Moments />
          <Idea />
          <Founder />
          <Circle />
        </main>
        <NightFooter />
      </div>
    </>
  );
}
