import { sql } from "./db";

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

export interface TimelineRow {
  time: string;
  step: string;
}

export interface HoursRow {
  range: string;
  time: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface WhySection {
  heading: string;
  intro: string;
  timelineHeading: string;
  timeline: TimelineRow[];
  learnHeading: string;
  learn: string[];
  note: string;
  extraHeading: string;
  extraItems: { name: string; note: string }[];
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
}

export interface TowerSection {
  eyebrow: string;
  heading: string;
  body: string;
  bullets: string[];
  ctaButtonText: string;
  ctaHref: string;
  images: GalleryImage[];
}

export interface PracticalSection {
  hoursHeading: string;
  hours: HoursRow[];
  addressHeading: string;
  address: string;
  metro: string;
  bestTimeHeading: string;
  bestTimeBody: string;
}

export interface PriceSection {
  heading: string;
  subheading: string;
  note: string;
  // Column headers for the price-comparison table below — admin-editable
  // so this can be relabeled without a code change.
  itemLabel: string;
  priceLabel: string;
  column1Label: string;
  column2Label: string;
  bestForLabel: string;
}

export interface HomepageSections {
  why: WhySection;
  tower: TowerSection;
  practical: PracticalSection;
  price: PriceSection;
}

export interface HeaderContent {
  logoImage: string;
  logoAlt: string;
  navLinks: NavLink[];
  ctaText: string;
  ctaHref: string;
}

export interface FooterContent {
  tagline: string;
  columns: FooterColumn[];
  addressHeading: string;
  addressLine1: string;
  addressLine2: string;
  copyrightText: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  dark: string;
  accent: string;
}

export interface HomepageContent {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  heroGallery: GalleryImage[];
  heroCtaPrimaryText: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryHref: string;
  ratingValue: string;
  ratingCount: string;
  showFeaturedTour: boolean;
  featuredTourId: string;
  featuredBadgeLabel: string;
  featuredUrgencyText: string;
  featuredReasons: string[];
  sections: HomepageSections;
  header: HeaderContent;
  footer: FooterContent;
  theme: ThemeColors;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  noIndex: boolean;
  noFollow: boolean;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export const DEFAULT_HEADER: HeaderContent = {
  logoImage: "",
  logoAlt: "Amsterdam Boat Tours",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  ctaText: "Book a Cruise",
  ctaHref: "/#tours",
};

export const DEFAULT_FOOTER: FooterContent = {
  tagline:
    "<strong>Independent booking guide.</strong> Not affiliated with any single boat operator — we curate canal sightseeing and evening cruises from licensed Dutch operators and earn a commission on bookings made through our links, at no extra cost to you.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Canal Cruises", href: "/#tours" },
        { label: "Evening Cruise", href: "/#night-cruise" },
        { label: "Cruise Prices", href: "/#prices" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ],
  addressHeading: "Main Boarding Pier",
  addressLine1: "Damrak 26 (near Centraal Station)",
  addressLine2: "1012 LG Amsterdam, Netherlands",
  copyrightText:
    "Amsterdam Boat Tours. All prices shown in EUR and subject to change by the boat operator.",
};

export const DEFAULT_THEME: ThemeColors = {
  primary: "#ea580c",   // Dutch Orange
  secondary: "#0284c7", // Delft Azure Blue
  dark: "#091b3d",      // Amsterdam Midnight Navy
  accent: "#f59e0b",    // Golden Ochre
};

export const DEFAULT_GALLERY: GalleryImage[] = [
  {
    src: "/images/gallery/canal-cruise.jpg",
    alt: "A classic glass-topped canal cruise boat gliding past historic Amsterdam houses and trees",
    label: "Canal Cruise",
  },
  {
    src: "/images/gallery/evening-lights.jpg",
    alt: "Illuminated Skinny Bridge glowing over the Amstel River with canal tour boat",
    label: "Evening Lights",
  },
  {
    src: "/images/gallery/historic-gables.jpg",
    alt: "Historic 17th-century Dutch canal houses with step, neck, and bell gables reflected in water",
    label: "Historic Gables",
  },
  {
    src: "/images/gallery/unesco-canal-ring.jpg",
    alt: "Wide angle panoramic view of the UNESCO Canal Ring with arched bridges and canal tour boat",
    label: "UNESCO Canal Ring",
  },
];

export const DEFAULT_SECTIONS: HomepageSections = {
  why: {
    heading: "What You Actually See on an Amsterdam Canal Cruise",
    intro:
      "One hour, one loop, and more of Amsterdam's 17th-century Canal Ring than you could comfortably reach on foot in an entire afternoon. Here's the route, landmark by landmark.",
    timelineHeading: "Sample cruise route",
    timeline: [
      { time: "0:00", step: "Depart Damrak or Centraal Station, gliding past historic harbour docks" },
      { time: "0:10", step: "Enter the Herengracht and cruise past the lavish mansions of the Golden Bend (Gouden Bocht)" },
      { time: "0:22", step: "Glide under the iconic wooden Skinny Bridge (Magere Brug) on the Amstel River" },
      { time: "0:35", step: "Pass the towering Westerkerk spire and the Anne Frank House on Prinsengracht" },
      { time: "0:48", step: "Navigate the picturesque houseboats and leafy bridges of the Jordaan district" },
      { time: "1:00", step: "Return to the Centraal Station harbour loop" },
    ],
    learnHeading: "What you'll notice",
    learn: [
      "Why Amsterdam's 17th-century canal houses lean slightly forward and have roof hoist hooks",
      "How the UNESCO World Heritage Canal Ring was engineered during the Dutch Golden Age",
      "Which of Amsterdam's 1,500+ bridges has the famous Seven Bridges view from the water",
      "Why narrow facades were built to minimize property tax based on canal frontage",
    ],
    note: "Cruises run with multilingual audio commentary (up to 19 languages), so you always know what you're looking at as it passes. Boats feature covered, heated saloon seating, so weather rarely cancels a departure.",
    extraHeading: "Where you can board",
    extraItems: [
      { name: "Damrak & Centraal Station", note: "Directly opposite Amsterdam Centraal — the primary dock for standard and evening cruises" },
      { name: "Anne Frank House Pier", note: "Along Prinsengracht, convenient after visiting the Anne Frank House and the Jordaan" },
      { name: "Rokin Pier", note: "In the central shopping heart, near Dam Square and the flower market" },
    ],
    ctaText: "Convinced? The 1-hour classic canal cruise starts at €18/person and departs every 15–30 minutes.",
    ctaButtonText: "Book the Canal Cruise →",
    ctaHref: "#tours",
  },
  tower: {
    eyebrow: "Evening Cruise with Wine & Cheese",
    heading: "See Amsterdam's Canals Glowing After Dark",
    body:
      "The concentric canals transform once the sun sets. Historic brick facades reflect on the calm water, <strong>arched stone bridges are illuminated with thousands of fairy lights</strong>, and the evening departure includes unlimited Dutch wines, craft beers, and authentic cheeses inside a cozy saloon boat — an unforgettable night on the water.",
    bullets: [
      "Dutch cheese tasting, fine wine, beer, and traditional jenever included on board",
      "Over 1,500 illuminated bridges and glowing canal townhouses after dusk",
      "Cozy, heated covered boat with open viewing areas",
      "Best photo light: 20 minutes following sunset during the blue hour",
    ],
    ctaButtonText: "See Evening Wine & Cheese Cruise",
    ctaHref: "#tours",
    images: [
      {
        src: "/images/gallery/evening-lights.jpg",
        alt: "Illuminated Skinny Bridge glowing over the Amstel River with canal tour boat",
        label: "Evening Lights",
      },
      {
        src: "/images/gallery/golden-hour-cruise.jpg",
        alt: "Open-air canal cruise boat gliding past historic canal houses during golden hour",
        label: "Golden Hour Cruise",
      },
      {
        src: "/images/gallery/unesco-canal-ring.jpg",
        alt: "Wide angle view of UNESCO Canal Ring bridges and canal boat",
        label: "Canal Ring",
      },
      {
        src: "/images/gallery/jordaan-district.jpg",
        alt: "Charming canals and houseboats in the historic Jordaan district",
        label: "Jordaan District",
      },
    ],
  },
  practical: {
    hoursHeading: "Cruise Timetables (2026)",
    hours: [
      { range: "April – October (Summer)", time: "9:00 AM – 10:30 PM (departs every 15–20 mins)" },
      { range: "November – March (Winter)", time: "10:00 AM – 9:00 PM (departs every 30 mins)" },
    ],
    addressHeading: "Primary Boarding Points",
    address:
      "Damrak Pier 5 — 1012 LG Amsterdam (opposite Centraal Station). Trams 4, 14, 24.\nAnne Frank Pier — Prinsengracht 263, Westermarkt tram stop.\nRokin Pier — Rokin 38, near Dam Square & Rokin Metro Station.",
    metro: "Arrive 15 minutes before your time slot — check your voucher for your exact pier number.",
    bestTimeHeading: "Best Time for a Cruise",
    bestTimeBody:
      "Late afternoon into golden hour provides the finest sunlight for canal house photos. Weekday mornings before 11:30 AM offer the quietest canals with fewer boats.",
  },
  price: {
    heading: "Compare & Choose Your Amsterdam Cruise",
    subheading:
      "All four options side by side — pick the cruise that matches your itinerary, then book instantly online.",
    note: "Infants under 3 ride free; children (4–12) and youth receive discounted tickets on most departures — check each ticket's booking page for full details.",
    itemLabel: "Cruise Option",
    priceLabel: "Price",
    column1Label: "Duration",
    column2Label: "Tasting / Drinks",
    bestForLabel: "Best For",
  },
};

const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  heroBadge: "⚓ Certified operators · Free cancellation · Instant confirmation",
  heroHeading: "Amsterdam Canal Cruise Tours — See Amsterdam From the Water",
  heroSubheading:
    "Glide past 17th-century canal mansions, the Skinny Bridge, and the Anne Frank House on a sightseeing or evening cruise through UNESCO-listed canals. Book online — instant confirmation, free cancellation on most tickets.",
  heroImage:
    "https://images.unsplash.com/photo-1755589066709-ec12ec11baa1?q=80&w=2400&auto=format&fit=crop",
  heroImageAlt: "A classic Amsterdam canal cruise boat gliding along the UNESCO canal ring past historic gabled townhouses",
  heroGallery: DEFAULT_GALLERY,
  heroCtaPrimaryText: "Compare Canal Cruises",
  heroCtaPrimaryHref: "#tours",
  heroCtaSecondaryText: "See Cruise Prices",
  heroCtaSecondaryHref: "#prices",
  ratingValue: "4.45 / 5",
  ratingCount: "48,000+ reviews",
  showFeaturedTour: true,
  featuredTourId: "amsterdam-1-hour-canal-cruise",
  featuredBadgeLabel: "Recommended",
  featuredUrgencyText: "Best Price · Limited Availability",
  featuredReasons: [
    "Our most-booked cruise — 48,000+ reviews, averaging 4.45 stars",
    "Departs every 15–30 minutes, all day near Centraal Station",
    "Free cancellation up to 24 hours before departure",
  ],
  sections: DEFAULT_SECTIONS,
  header: DEFAULT_HEADER,
  footer: DEFAULT_FOOTER,
  theme: DEFAULT_THEME,
  metaTitle: "",
  metaDescription: "",
  focusKeyword: "",
  noIndex: false,
  noFollow: false,
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
};

function parseReasons(value: unknown): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function parseJsonWithDefault<T extends object>(value: unknown, fallback: T): T {
  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      parsed = null;
    }
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fallback;
  return { ...fallback, ...(parsed as Partial<T>) };
}

function rowToHomepage(row: any): HomepageContent {
  const sectionsRaw = parseJsonWithDefault<HomepageSections>(row.sections_json, DEFAULT_SECTIONS);
  return {
    heroBadge: row.hero_badge || "",
    heroHeading: row.hero_heading || "",
    heroSubheading: row.hero_subheading || "",
    heroImage: row.hero_image || "",
    heroImageAlt: row.hero_image_alt || "",
    heroGallery: (() => {
      const g = parseReasons(row.hero_gallery);
      return g.length ? (g as unknown as GalleryImage[]) : DEFAULT_GALLERY;
    })(),
    heroCtaPrimaryText: row.hero_cta_primary_text || DEFAULT_HOMEPAGE_CONTENT.heroCtaPrimaryText,
    heroCtaPrimaryHref: row.hero_cta_primary_href || DEFAULT_HOMEPAGE_CONTENT.heroCtaPrimaryHref,
    heroCtaSecondaryText: row.hero_cta_secondary_text || DEFAULT_HOMEPAGE_CONTENT.heroCtaSecondaryText,
    heroCtaSecondaryHref: row.hero_cta_secondary_href || DEFAULT_HOMEPAGE_CONTENT.heroCtaSecondaryHref,
    ratingValue: row.rating_value || "",
    ratingCount: row.rating_count || "",
    showFeaturedTour: !!row.show_featured_tour,
    featuredTourId: row.featured_tour_id || "",
    featuredBadgeLabel: row.featured_badge_label || "",
    featuredUrgencyText: row.featured_urgency_text || "",
    featuredReasons: parseReasons(row.featured_reasons),
    sections: {
      why: { ...DEFAULT_SECTIONS.why, ...sectionsRaw.why },
      tower: { ...DEFAULT_SECTIONS.tower, ...sectionsRaw.tower },
      practical: { ...DEFAULT_SECTIONS.practical, ...sectionsRaw.practical },
      price: { ...DEFAULT_SECTIONS.price, ...sectionsRaw.price },
    },
    header: parseJsonWithDefault<HeaderContent>(row.header_json, DEFAULT_HEADER),
    footer: parseJsonWithDefault<FooterContent>(row.footer_json, DEFAULT_FOOTER),
    theme: parseJsonWithDefault<ThemeColors>(row.theme_json, DEFAULT_THEME),
    metaTitle: row.meta_title || "",
    metaDescription: row.meta_description || "",
    focusKeyword: row.focus_keyword || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    canonicalUrl: row.canonical_url || "",
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || "",
  };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const rows = await sql`SELECT * FROM homepage WHERE id = 1 LIMIT 1`;
    return rows.length ? rowToHomepage(rows[0]) : DEFAULT_HOMEPAGE_CONTENT;
  } catch {
    return DEFAULT_HOMEPAGE_CONTENT;
  }
}

export async function getSiteChrome(): Promise<{ header: HeaderContent; footer: FooterContent; theme: ThemeColors }> {
  try {
    const rows = await sql`SELECT header_json, footer_json, theme_json FROM homepage WHERE id = 1 LIMIT 1`;
    if (!rows.length) return { header: DEFAULT_HEADER, footer: DEFAULT_FOOTER, theme: DEFAULT_THEME };
    const row = rows[0] as any;
    return {
      header: parseJsonWithDefault<HeaderContent>(row.header_json, DEFAULT_HEADER),
      footer: parseJsonWithDefault<FooterContent>(row.footer_json, DEFAULT_FOOTER),
      theme: parseJsonWithDefault<ThemeColors>(row.theme_json, DEFAULT_THEME),
    };
  } catch {
    return { header: DEFAULT_HEADER, footer: DEFAULT_FOOTER, theme: DEFAULT_THEME };
  }
}

export async function saveHomepageCopy(data: {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  heroGallery: GalleryImage[];
  heroCtaPrimaryText: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryHref: string;
  ratingValue: string;
  ratingCount: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}): Promise<void> {
  await sql`
    INSERT INTO homepage (
      id, hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
      hero_gallery, hero_cta_primary_text, hero_cta_primary_href,
      hero_cta_secondary_text, hero_cta_secondary_href,
      rating_value, rating_count, meta_title, meta_description, focus_keyword,
      canonical_url, og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroBadge}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage},
      ${data.heroImageAlt}, ${JSON.stringify(data.heroGallery || [])}::jsonb,
      ${data.heroCtaPrimaryText || ""}, ${data.heroCtaPrimaryHref || ""},
      ${data.heroCtaSecondaryText || ""}, ${data.heroCtaSecondaryHref || ""},
      ${data.ratingValue}, ${data.ratingCount},
      ${data.metaTitle || ""}, ${data.metaDescription || ""}, ${data.focusKeyword || ""},
      ${data.canonicalUrl || ""}, ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_badge = EXCLUDED.hero_badge,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      hero_gallery = EXCLUDED.hero_gallery,
      hero_cta_primary_text = EXCLUDED.hero_cta_primary_text,
      hero_cta_primary_href = EXCLUDED.hero_cta_primary_href,
      hero_cta_secondary_text = EXCLUDED.hero_cta_secondary_text,
      hero_cta_secondary_href = EXCLUDED.hero_cta_secondary_href,
      rating_value = EXCLUDED.rating_value,
      rating_count = EXCLUDED.rating_count,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      focus_keyword = EXCLUDED.focus_keyword,
      canonical_url = EXCLUDED.canonical_url,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}

export async function setHomepageIndexing(noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`
    INSERT INTO homepage (id, no_index, no_follow)
    VALUES (1, ${!!noIndex}, ${!!noFollow})
    ON CONFLICT (id) DO UPDATE SET
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow
  `;
}

export async function saveRecommendedTour(data: {
  showFeaturedTour: boolean;
  featuredTourId: string;
  featuredBadgeLabel: string;
  featuredUrgencyText: string;
  featuredReasons: string[];
}): Promise<void> {
  await sql`
    INSERT INTO homepage (
      id, show_featured_tour, featured_tour_id, featured_badge_label,
      featured_urgency_text, featured_reasons
    ) VALUES (
      1, ${!!data.showFeaturedTour}, ${data.featuredTourId}, ${data.featuredBadgeLabel},
      ${data.featuredUrgencyText}, ${JSON.stringify(data.featuredReasons || [])}::jsonb
    )
    ON CONFLICT (id) DO UPDATE SET
      show_featured_tour = EXCLUDED.show_featured_tour,
      featured_tour_id = EXCLUDED.featured_tour_id,
      featured_badge_label = EXCLUDED.featured_badge_label,
      featured_urgency_text = EXCLUDED.featured_urgency_text,
      featured_reasons = EXCLUDED.featured_reasons
  `;
}

export async function saveHomepageSections(sections: HomepageSections): Promise<void> {
  await sql`
    INSERT INTO homepage (id, sections_json)
    VALUES (1, ${JSON.stringify(sections)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET sections_json = EXCLUDED.sections_json
  `;
}

export async function saveSiteHeader(header: HeaderContent): Promise<void> {
  await sql`
    INSERT INTO homepage (id, header_json)
    VALUES (1, ${JSON.stringify(header)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET header_json = EXCLUDED.header_json
  `;
}

export async function saveSiteFooter(footer: FooterContent): Promise<void> {
  await sql`
    INSERT INTO homepage (id, footer_json)
    VALUES (1, ${JSON.stringify(footer)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET footer_json = EXCLUDED.footer_json
  `;
}

export async function saveSiteTheme(theme: ThemeColors): Promise<void> {
  await sql`
    INSERT INTO homepage (id, theme_json)
    VALUES (1, ${JSON.stringify(theme)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET theme_json = EXCLUDED.theme_json
  `;
}
