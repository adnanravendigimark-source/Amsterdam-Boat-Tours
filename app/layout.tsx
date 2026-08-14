import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { resolveRobots } from "@/lib/seo";
import { getSiteChrome } from "@/lib/homepage";
import { hexToRgbTriplet } from "@/lib/color";
import "./globals.css";

export const dynamic = "force-dynamic";

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
  "https://images.unsplash.com/photo-1755589066709-ec12ec11baa1?q=80&w=2400&auto=format&fit=crop";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Amsterdam Boat Tours",
  url: SITE_URL,
  description:
    "Independent guide comparing Amsterdam canal sightseeing cruises, evening wine & cheese saloon cruises, and combo tickets from licensed operators.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Amsterdam Boat Tours",
  url: SITE_URL,
};

export function generateMetadata(): Metadata {
  const robots = resolveRobots(false);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Amsterdam Canal Cruise Tours & Tickets (2026)",
      template: "%s | Amsterdam Boat Tours",
    },
    description:
      "Compare Amsterdam canal sightseeing cruises, evening wine & cheese cruises, and museum combos. Instant online booking, free cancellation on most tickets.",
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
        "Sightseeing, wine & cheese, and combo cruises through Amsterdam's UNESCO canal ring. Compare prices and book online.",
      type: "website",
      url: SITE_URL,
      siteName: "Amsterdam Boat Tours",
      images: [{ url: DEFAULT_OG_IMAGE, width: 2400, height: 1350, alt: "Amsterdam canal cruise boat on the water" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Amsterdam Canal Cruise Tours & Tickets | Sightseeing + Evening Cruises",
      description:
        "Sightseeing, wine & cheese, and combo cruises through Amsterdam's UNESCO canal ring. Compare prices and book online.",
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
      <body className="font-body bg-stone-50 text-slate-900 antialiased selection:bg-blue-500 selection:text-white">
        {themeStyle && <style dangerouslySetInnerHTML={{ __html: themeStyle }} />}
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
