import AffiliateClickTracker from "@/components/AffiliateClickTracker";
import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { resolveRobots } from "@/lib/seo";
import { getSiteChrome } from "@/lib/homepage";
import { hexToRgbTriplet } from "@/lib/color";
import "./globals.css";
import { jsonLd } from "@/lib/safeHtml";


const displayFont = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const DEFAULT_OG_IMAGE =
  "https://vel8aqzfqfybmsb2.public.blob.vercel-storage.com/uploads/amsterdam-canal-boat-hero-M7TeLyUpOHh3doGlrxzdwr4smtU1SL.jpg";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Amsterdam Boat Cruise",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/Logo.png` },
  description:
    "Independent guide comparing Amsterdam canal cruise tickets — sightseeing, evening and drinks cruises — bookable on GetYourGuide.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Amsterdam Boat Cruise",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function generateMetadata(): Metadata {
  const robots = resolveRobots(false);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Amsterdam Canal Cruise Tickets 2026: Compare 3 Cruises",
      template: "%s | Amsterdam Boat Cruise",
    },
    description:
      "Compare Amsterdam canal cruise tickets — guided, evening and drinks cruises — with prices checked on GetYourGuide.",
    keywords: [
      "Amsterdam canal cruise",
      "Amsterdam boat tours",
      "Amsterdam canal cruise tickets",
      "evening wine and cheese cruise Amsterdam",
      "Amsterdam canal tour Damrak",
      "best canal cruise Amsterdam",
      "cheap Amsterdam canal cruise",
      "UNESCO canal ring boat tour",
      "Van Gogh museum canal cruise combo",
    ],
    alternates: {
      canonical: "/",
    },
    robots,
    openGraph: {
      title: "Amsterdam Canal Cruise Tours & Tickets | Sightseeing + Evening Cruises",
      description:
        "Guided, evening and drinks cruises through Amsterdam's canal ring. Compare prices and book on GetYourGuide.",
      type: "website",
      url: SITE_URL,
      siteName: "Amsterdam Boat Cruise",
      images: [{ url: DEFAULT_OG_IMAGE, width: 2400, height: 1350, alt: "Amsterdam canal cruise boat on the water" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Amsterdam Canal Cruise Tours & Tickets | Sightseeing + Evening Cruises",
      description:
        "Guided, evening and drinks cruises through Amsterdam's canal ring. Compare prices and book on GetYourGuide.",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

function buildThemeStyle(theme: { primary: string; secondary: string; dark: string; accent: string }) {
  const vars: [string, string | null][] = [
    ["--color-canal-primary", hexToRgbTriplet(theme.primary)],
    ["--color-canal-blue", hexToRgbTriplet(theme.secondary)],
    ["--color-canal-ink", hexToRgbTriplet(theme.dark)],
    ["--color-gold-400", hexToRgbTriplet(theme.accent)],
  ];
  const declarations = vars
    .filter(([, value]) => value !== null)
    .map(([name, value]) => `${name}:${value};`)
    .join("");
  return declarations ? `:root{${declarations}}` : "";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = await getSiteChrome();
  const themeStyle = buildThemeStyle(theme);

  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SYMDM65LVH" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SYMDM65LVH');
          `}
        </Script>
      </head>
      <body className="font-body bg-stone-50 text-slate-900 antialiased selection:bg-blue-500 selection:text-white">
        {themeStyle && <style dangerouslySetInnerHTML={{ __html: themeStyle }} />}
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd) }}
        />
        <AffiliateClickTracker />
      </body>
    </html>
  );
}
