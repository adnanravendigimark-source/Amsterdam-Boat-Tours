import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedTour from "@/components/FeaturedTour";
import TourGrid from "@/components/TourGrid";
import WhatYouSee from "@/components/WhatYouSee";
import EveningCruise from "@/components/EveningCruise";
import PracticalInfo from "@/components/PracticalInfo";
import PriceComparison from "@/components/PriceComparison";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import { getTours } from "@/lib/data";
import { getHomepageContent } from "@/lib/homepage";
import { SITE_URL } from "@/lib/site";
import { resolveRobots, resolveCanonical, resolveOg, stripHtml, pageTitle } from "@/lib/seo";
import { jsonLd } from "@/lib/safeHtml";


export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepageContent();
  const og = resolveOg(
    { ogTitle: homepage.ogTitle, ogDescription: homepage.ogDescription, ogImage: homepage.ogImage },
    { title: homepage.heroHeading, description: stripHtml(homepage.heroSubheading), image: homepage.heroImage }
  );
  return {
    ...(homepage.metaTitle.trim() ? { title: pageTitle(homepage.metaTitle) } : {}),
    ...(homepage.metaDescription.trim() ? { description: homepage.metaDescription } : {}),
    alternates: { canonical: resolveCanonical("/", homepage.canonicalUrl) },
    robots: resolveRobots(homepage.noIndex, homepage.noFollow),
    openGraph: { title: og.title, description: og.description, url: "/", images: og.image ? [{ url: og.image }] : undefined },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: og.image ? [og.image] : undefined },
  };
}

export default async function HomePage() {
  // Structured data for this page. Deliberately no Product/AggregateRating:
  // the cruises are sold by GetYourGuide, not this site, and Google's review
  // snippet rules don't allow marking up ratings collected elsewhere. The
  // canals are what the page is about; the cruises are listed by name and link.
  const tours = await getTours();
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    about: {
      "@type": "TouristAttraction",
      name: "Amsterdam canal cruises",
      containedInPlace: { "@type": "City", name: "Amsterdam", sameAs: "https://en.wikipedia.org/wiki/Amsterdam" },
      sameAs: ["https://en.wikipedia.org/wiki/Canals_of_Amsterdam"],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tours.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.title, url: t.href })),
    },
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedTour />
        <TourGrid />
        <WhatYouSee />
        <EveningCruise />
        <PracticalInfo />
        <PriceComparison />
        <BlogSection />
        <FAQSection />
        <div className="h-20 sm:hidden" aria-hidden="true" />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(pageJsonLd) }}
      />
    </>
  );
}
