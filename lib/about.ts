import { sql } from "./db";

export interface AboutReason {
  icon: string;
  title: string;
  body: string;
}

export interface AboutPageContent {
  heroEyebrow: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  introHeading: string;
  introParagraph1: string;
  introParagraph2: string;
  introImage: string;
  introImageAlt: string;
  reasonsHeading: string;
  reasonsSubheading: string;
  reasons: AboutReason[];
  disclosureHeading: string;
  disclosureBody: string;
  ctaText: string;
  ctaButtonLabel: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

const DEFAULT_ABOUT: AboutPageContent = {
  heroEyebrow: "About Us",
  heroHeading: "Your Independent Guide to Amsterdam Canal Cruise Tickets",
  heroSubheading:
    "We help travelers book the right Amsterdam canal sightseeing, wine & cheese, and combo cruise online — curated from licensed operators, explained in plain language.",
  heroImage: "https://images.unsplash.com/photo-1755589066709-ec12ec11baa1?q=80&w=2000&auto=format&fit=crop",
  heroImageAlt: "Classic canal cruise boat gliding along Amsterdam canals past gabled townhouses",
  introHeading: "Why We Built an Amsterdam Canal Cruise Guide",
  introParagraph1:
    "We built this site around one belief: exploring Amsterdam from the water is the single best way to understand the city's 17th-century Golden Age architecture and layout — but only if you book the right boat. With dozens of docks scattered across Damrak, Rokin, and the Anne Frank House, finding the right departure shouldn't be confusing.",
  introParagraph2:
    "We are an independent Amsterdam canal cruise guide — not an official boat operator. We compare classic 1-hour sightseeing cruises, evening wine & cheese saloon boats, and museum combo tickets from licensed operators, currently via GetYourGuide, pointing you directly to the top experiences.",
  introImage: "https://images.unsplash.com/photo-1759720694996-5f6b3435fe5a?q=80&w=1000&auto=format&fit=crop",
  introImageAlt: "Amsterdam canal houses and bridge glowing at dusk",
  reasonsHeading: "How We Pick Our Amsterdam Canal Cruises",
  reasonsSubheading: "Every cruise listed on this site is screened against four criteria before it earns a spot.",
  reasons: [
    { icon: "ShieldCheckIcon", title: "Licensed, Established Operators", body: "Every cruise we list runs with certified Dutch canal boat operators — not unregulated third-party resellers." },
    { icon: "StarIcon", title: "Real Review Volume", body: "We only list canal cruises with thousands of verified customer reviews and high customer satisfaction ratings." },
    { icon: "LockIcon", title: "Transparent Pricing", body: "The price you see on each tour card is the full price you pay — no unexpected booking surcharges at checkout." },
    { icon: "HeadsetIcon", title: "Honest, Clear Info", body: "We tell you exactly what is included on each boat — from audio headsets in 19 languages to Dutch wine and cheese pairings." },
  ],
  disclosureHeading: "A Note on How We Earn",
  disclosureBody:
    "When you book an Amsterdam canal cruise through a link on this site, we may earn a small affiliate commission from the operator at no extra cost to you. This is how we keep the site free and independently maintained without banner ads.",
  ctaText: "Ready to book your Amsterdam canal cruise?",
  ctaButtonLabel: "Compare Amsterdam Boat Tours",
  metaTitle: "About Us | Amsterdam Canal Cruise Tour & Ticket Booking Guide",
  metaDescription:
    "Who curates our Amsterdam canal sightseeing and evening cruises online, how we select licensed operators, and why booking ahead saves time.",
  canonicalUrl: "",
  noIndex: false,
  noFollow: false,
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
};

function parseReasons(value: unknown): AboutReason[] {
  if (Array.isArray(value)) return value as AboutReason[];
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

function rowToAbout(row: any): AboutPageContent {
  return {
    heroEyebrow: row.hero_eyebrow ?? DEFAULT_ABOUT.heroEyebrow,
    heroHeading: row.hero_heading ?? DEFAULT_ABOUT.heroHeading,
    heroSubheading: row.hero_subheading ?? DEFAULT_ABOUT.heroSubheading,
    heroImage: row.hero_image ?? DEFAULT_ABOUT.heroImage,
    heroImageAlt: row.hero_image_alt ?? DEFAULT_ABOUT.heroImageAlt,
    introHeading: row.intro_heading ?? DEFAULT_ABOUT.introHeading,
    introParagraph1: row.intro_paragraph_1 ?? DEFAULT_ABOUT.introParagraph1,
    introParagraph2: row.intro_paragraph_2 ?? DEFAULT_ABOUT.introParagraph2,
    introImage: row.intro_image ?? DEFAULT_ABOUT.introImage,
    introImageAlt: row.intro_image_alt ?? DEFAULT_ABOUT.introImageAlt,
    reasonsHeading: row.reasons_heading ?? DEFAULT_ABOUT.reasonsHeading,
    reasonsSubheading: row.reasons_subheading ?? DEFAULT_ABOUT.reasonsSubheading,
    reasons: parseReasons(row.reasons).length ? parseReasons(row.reasons) : DEFAULT_ABOUT.reasons,
    disclosureHeading: row.disclosure_heading ?? DEFAULT_ABOUT.disclosureHeading,
    disclosureBody: row.disclosure_body ?? DEFAULT_ABOUT.disclosureBody,
    ctaText: row.cta_text ?? DEFAULT_ABOUT.ctaText,
    ctaButtonLabel: row.cta_button_label ?? DEFAULT_ABOUT.ctaButtonLabel,
    metaTitle: row.meta_title || DEFAULT_ABOUT.metaTitle,
    metaDescription: row.meta_description || DEFAULT_ABOUT.metaDescription,
    canonicalUrl: row.canonical_url || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || "",
  };
}

export async function getAboutPage(): Promise<AboutPageContent> {
  try {
    const rows = await sql`SELECT * FROM about_page WHERE id = 1 LIMIT 1`;
    return rows.length ? rowToAbout(rows[0]) : DEFAULT_ABOUT;
  } catch {
    return DEFAULT_ABOUT;
  }
}

export async function setAboutIndexing(noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`
    INSERT INTO about_page (id, no_index, no_follow)
    VALUES (1, ${!!noIndex}, ${!!noFollow})
    ON CONFLICT (id) DO UPDATE SET
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow
  `;
}

export async function saveAboutPage(data: AboutPageContent): Promise<void> {
  await sql`
    INSERT INTO about_page (
      id, hero_eyebrow, hero_heading, hero_subheading, hero_image, hero_image_alt,
      intro_heading, intro_paragraph_1, intro_paragraph_2, intro_image, intro_image_alt,
      reasons_heading, reasons_subheading, reasons,
      disclosure_heading, disclosure_body, cta_text, cta_button_label,
      meta_title, meta_description, canonical_url,
      no_index, no_follow, og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroEyebrow}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage}, ${data.heroImageAlt},
      ${data.introHeading}, ${data.introParagraph1}, ${data.introParagraph2}, ${data.introImage}, ${data.introImageAlt},
      ${data.reasonsHeading}, ${data.reasonsSubheading}, ${JSON.stringify(data.reasons || [])}::jsonb,
      ${data.disclosureHeading}, ${data.disclosureBody}, ${data.ctaText}, ${data.ctaButtonLabel},
      ${data.metaTitle || ""}, ${data.metaDescription || ""}, ${data.canonicalUrl || ""},
      ${!!data.noIndex}, ${!!data.noFollow}, ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_eyebrow = EXCLUDED.hero_eyebrow,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      intro_heading = EXCLUDED.intro_heading,
      intro_paragraph_1 = EXCLUDED.intro_paragraph_1,
      intro_paragraph_2 = EXCLUDED.intro_paragraph_2,
      intro_image = EXCLUDED.intro_image,
      intro_image_alt = EXCLUDED.intro_image_alt,
      reasons_heading = EXCLUDED.reasons_heading,
      reasons_subheading = EXCLUDED.reasons_subheading,
      reasons = EXCLUDED.reasons,
      disclosure_heading = EXCLUDED.disclosure_heading,
      disclosure_body = EXCLUDED.disclosure_body,
      cta_text = EXCLUDED.cta_text,
      cta_button_label = EXCLUDED.cta_button_label,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      canonical_url = EXCLUDED.canonical_url,
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}
