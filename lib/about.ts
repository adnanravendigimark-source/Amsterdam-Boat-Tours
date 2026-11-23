import { sql } from "./db";

export interface AboutPageContent {
  heroEyebrow: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  // One flowing rich-text field for the whole page body — written and
  // edited just like a blog post's article content (see
  // components/admin/AboutForm.tsx / TiptapArticleEditor).
  content: string;
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
    "We help travellers compare Amsterdam canal cruises — sightseeing, evening and drinks cruises — explained in plain language.",
  heroImage: "https://vel8aqzfqfybmsb2.public.blob.vercel-storage.com/uploads/amsterdam-canal-boat-hero-M7TeLyUpOHh3doGlrxzdwr4smtU1SL.jpg",
  heroImageAlt: "Classic canal cruise boat gliding along Amsterdam canals past gabled townhouses",
  content: `<h2>Our Mission</h2>
<p>We built this site around one belief: exploring Amsterdam from the water is the single best way to understand the city's 17th-century Golden Age architecture and layout — but only if you book the right boat. With dozens of docks scattered across Damrak, Rokin, and the Anne Frank House, finding the right departure shouldn't be confusing.</p>
<p>We are an independent Amsterdam canal cruise guide — not an official boat operator. We compare canal cruises bookable on GetYourGuide — sightseeing, evening and drinks cruises — and link you straight to the listing.</p>
<h2>How We Choose Our Amsterdam Canal Cruises</h2>
<p>Every cruise listed on this site is screened against four criteria before it earns a spot.</p>
<ul>
<li><strong>Bookable on GetYourGuide</strong> — Every cruise listed here is sold through GetYourGuide, with the operator named on each listing.</li>
<li><strong>Real Review Volume</strong> — We only list cruises with thousands of reviews on GetYourGuide, and show the rating and review count with the date we checked them.</li>
<li><strong>Prices With a Date</strong> — Prices are "from" prices per adult with the date we checked them. The price on the booking page is the one that counts.</li>
<li><strong>Honest, Clear Info</strong> — We say what's included on each cruise — guide type, languages, drinks options and age rules — as the listing states it.</li>
</ul>
<h2>Independent Amsterdam Canal Cruise Guide</h2>
<p>This is an independent guide, not an official canal cruise operator or municipal ticketing authority. Bookings made through links on this site are processed by GetYourGuide, our trusted third-party booking partner, and are subject to GetYourGuide's own pricing, availability, and cancellation terms.</p>
<h2>Our Content</h2>
<p>We aim to write practical, honest guides rather than oversold sales copy, so you know what a cruise actually includes before you book. Tour details, prices, and availability can change, so always check the booking page for the most current information before you travel.</p>
<h2>Affiliate Disclosure</h2>
<p>When you book an Amsterdam canal cruise through a link on this site, we may earn a small affiliate commission from the operator at no extra cost to you. This is how we keep the site free and independently maintained without banner ads.</p>
<p>Have questions before you book? Reach out via our <a href="/contact">contact page</a>.</p>`,
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

function rowToAbout(row: any): AboutPageContent {
  return {
    heroEyebrow: row.hero_eyebrow ?? DEFAULT_ABOUT.heroEyebrow,
    heroHeading: row.hero_heading ?? DEFAULT_ABOUT.heroHeading,
    heroSubheading: row.hero_subheading ?? DEFAULT_ABOUT.heroSubheading,
    heroImage: row.hero_image ?? DEFAULT_ABOUT.heroImage,
    heroImageAlt: row.hero_image_alt ?? DEFAULT_ABOUT.heroImageAlt,
    content: row.content ?? DEFAULT_ABOUT.content,
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
      content,
      meta_title, meta_description, canonical_url,
      no_index, no_follow, og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroEyebrow}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage}, ${data.heroImageAlt},
      ${data.content},
      ${data.metaTitle || ""}, ${data.metaDescription || ""}, ${data.canonicalUrl || ""},
      ${!!data.noIndex}, ${!!data.noFollow}, ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_eyebrow = EXCLUDED.hero_eyebrow,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      content = EXCLUDED.content,
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
