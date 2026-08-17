// One-time (and safe-to-re-run) database setup for the admin CMS.
//
// What it does:
//   1. Creates every table the app needs, if they don't already exist.
//   2. If a table is empty, seeds it from the matching file in /data (the
//      real Amsterdam Boat Tours starter content) so the site has
//      real tours/posts/FAQs/homepage copy from the first run.
//
// How to run it:
//   1. Add DATABASE_URL to your .env file
//   2. Run: node scripts/setup-db.mjs

import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

function loadDotEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnv();

if (!process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL is not set. Add it to your .env file, then re-run."
  );
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const dataDir = path.join(process.cwd(), "data");

function readJsonFile(name) {
  const filePath = path.join(dataDir, name);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

async function createTables() {
  console.log("Creating tables (if they don't already exist)...");

  await sql`
    CREATE TABLE IF NOT EXISTS tours (
      id TEXT PRIMARY KEY,
      badge TEXT NOT NULL,
      ribbon TEXT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      includes JSONB NOT NULL DEFAULT '[]',
      duration TEXT,
      rating NUMERIC NOT NULL DEFAULT 5,
      reviews INTEGER NOT NULL DEFAULT 0,
      price INTEGER NOT NULL DEFAULT 0,
      original_price INTEGER,
      image TEXT NOT NULL,
      image_alt TEXT NOT NULL,
      href_path TEXT NOT NULL,
      href_extra TEXT,
      featured BOOLEAN NOT NULL DEFAULT false,
      best_for TEXT NOT NULL DEFAULT '',
      price_table_column1 TEXT NOT NULL DEFAULT '',
      price_table_feature TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      meta_title TEXT NOT NULL,
      meta_description TEXT NOT NULL,
      category TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      quick_answer TEXT NOT NULL,
      read_time TEXT NOT NULL,
      date TEXT NOT NULL,
      image TEXT NOT NULL,
      image_alt TEXT NOT NULL,
      recommended_tour_id TEXT NOT NULL DEFAULT '',
      recommended_tour_after_block INTEGER,
      content JSONB NOT NULL DEFAULT '[]',
      sort_order INTEGER NOT NULL DEFAULT 0,
      no_index BOOLEAN NOT NULL DEFAULT false,
      no_follow BOOLEAN NOT NULL DEFAULT false,
      canonical_url TEXT NOT NULL DEFAULT '',
      og_title TEXT NOT NULL DEFAULT '',
      og_description TEXT NOT NULL DEFAULT '',
      og_image TEXT NOT NULL DEFAULT ''
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS homepage (
      id INTEGER PRIMARY KEY DEFAULT 1,
      hero_badge TEXT NOT NULL DEFAULT '',
      hero_heading TEXT NOT NULL DEFAULT '',
      hero_subheading TEXT NOT NULL DEFAULT '',
      hero_image TEXT NOT NULL DEFAULT '',
      hero_image_alt TEXT NOT NULL DEFAULT '',
      hero_video TEXT NOT NULL DEFAULT '',
      rating_value TEXT NOT NULL DEFAULT '',
      rating_count TEXT NOT NULL DEFAULT '',
      show_featured_tour BOOLEAN NOT NULL DEFAULT false,
      featured_tour_id TEXT NOT NULL DEFAULT '',
      featured_badge_label TEXT NOT NULL DEFAULT '',
      featured_urgency_text TEXT NOT NULL DEFAULT '',
      featured_reasons JSONB NOT NULL DEFAULT '[]',
      no_index BOOLEAN NOT NULL DEFAULT false,
      no_follow BOOLEAN NOT NULL DEFAULT false,
      canonical_url TEXT NOT NULL DEFAULT '',
      og_title TEXT NOT NULL DEFAULT '',
      og_description TEXT NOT NULL DEFAULT '',
      og_image TEXT NOT NULL DEFAULT '',
      CONSTRAINT homepage_singleton CHECK (id = 1)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS faqs (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS privacy_policy (
      id INTEGER PRIMARY KEY DEFAULT 1,
      title TEXT NOT NULL DEFAULT 'Privacy Policy',
      last_updated TEXT NOT NULL DEFAULT '',
      content JSONB NOT NULL DEFAULT '[]',
      no_index BOOLEAN NOT NULL DEFAULT false,
      no_follow BOOLEAN NOT NULL DEFAULT false,
      canonical_url TEXT NOT NULL DEFAULT '',
      meta_title TEXT NOT NULL DEFAULT '',
      meta_description TEXT NOT NULL DEFAULT '',
      og_title TEXT NOT NULL DEFAULT '',
      og_description TEXT NOT NULL DEFAULT '',
      og_image TEXT NOT NULL DEFAULT '',
      CONSTRAINT privacy_policy_singleton CHECK (id = 1)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS about_page (
      id INTEGER PRIMARY KEY DEFAULT 1,
      hero_eyebrow TEXT NOT NULL DEFAULT '',
      hero_heading TEXT NOT NULL DEFAULT '',
      hero_subheading TEXT NOT NULL DEFAULT '',
      hero_image TEXT NOT NULL DEFAULT '',
      hero_image_alt TEXT NOT NULL DEFAULT '',
      intro_heading TEXT NOT NULL DEFAULT '',
      intro_paragraph_1 TEXT NOT NULL DEFAULT '',
      intro_paragraph_2 TEXT NOT NULL DEFAULT '',
      intro_image TEXT NOT NULL DEFAULT '',
      intro_image_alt TEXT NOT NULL DEFAULT '',
      reasons_heading TEXT NOT NULL DEFAULT '',
      reasons_subheading TEXT NOT NULL DEFAULT '',
      reasons JSONB NOT NULL DEFAULT '[]',
      disclosure_heading TEXT NOT NULL DEFAULT '',
      disclosure_body TEXT NOT NULL DEFAULT '',
      cta_text TEXT NOT NULL DEFAULT '',
      cta_button_label TEXT NOT NULL DEFAULT '',
      meta_title TEXT NOT NULL DEFAULT '',
      meta_description TEXT NOT NULL DEFAULT '',
      canonical_url TEXT NOT NULL DEFAULT '',
      no_index BOOLEAN NOT NULL DEFAULT false,
      no_follow BOOLEAN NOT NULL DEFAULT false,
      og_title TEXT NOT NULL DEFAULT '',
      og_description TEXT NOT NULL DEFAULT '',
      og_image TEXT NOT NULL DEFAULT '',
      CONSTRAINT about_page_singleton CHECK (id = 1)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS contact_page (
      id INTEGER PRIMARY KEY DEFAULT 1,
      hero_eyebrow TEXT NOT NULL DEFAULT '',
      hero_heading TEXT NOT NULL DEFAULT '',
      hero_subheading TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL DEFAULT '',
      email_note TEXT NOT NULL DEFAULT '',
      reasons_heading TEXT NOT NULL DEFAULT '',
      reasons JSONB NOT NULL DEFAULT '[]',
      footer_note TEXT NOT NULL DEFAULT '',
      cta_heading TEXT NOT NULL DEFAULT '',
      cta_button_label TEXT NOT NULL DEFAULT '',
      meta_title TEXT NOT NULL DEFAULT '',
      meta_description TEXT NOT NULL DEFAULT '',
      canonical_url TEXT NOT NULL DEFAULT '',
      no_index BOOLEAN NOT NULL DEFAULT false,
      no_follow BOOLEAN NOT NULL DEFAULT false,
      og_title TEXT NOT NULL DEFAULT '',
      og_description TEXT NOT NULL DEFAULT '',
      og_image TEXT NOT NULL DEFAULT '',
      CONSTRAINT contact_page_singleton CHECK (id = 1)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      blog_no_index BOOLEAN NOT NULL DEFAULT false,
      blog_no_follow BOOLEAN NOT NULL DEFAULT false,
      blog_meta_title TEXT NOT NULL DEFAULT '',
      blog_meta_description TEXT NOT NULL DEFAULT '',
      blog_canonical_url TEXT NOT NULL DEFAULT '',
      blog_og_title TEXT NOT NULL DEFAULT '',
      blog_og_description TEXT NOT NULL DEFAULT '',
      blog_og_image TEXT NOT NULL DEFAULT '',
      CONSTRAINT site_settings_singleton CHECK (id = 1)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL,
      pages JSONB NOT NULL DEFAULT '[]',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  console.log("Tables ready.");
}

async function addSeoColumns() {
  console.log("Ensuring SEO columns exist...");
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS no_follow BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS canonical_url TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS og_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS og_description TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS og_image TEXT NOT NULL DEFAULT ''`;

  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS no_follow BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS canonical_url TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS og_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS og_description TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS og_image TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_video TEXT NOT NULL DEFAULT ''`;

  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS no_follow BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS canonical_url TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS og_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS og_description TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS og_image TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS meta_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE privacy_policy ADD COLUMN IF NOT EXISTS meta_description TEXT NOT NULL DEFAULT ''`;

  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_no_index BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_no_follow BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_meta_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_meta_description TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_canonical_url TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_og_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_og_description TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blog_og_image TEXT NOT NULL DEFAULT ''`;

  await sql`ALTER TABLE tours ADD COLUMN IF NOT EXISTS price_table_column1 TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE tours ADD COLUMN IF NOT EXISTS price_table_feature TEXT NOT NULL DEFAULT ''`;

  // Stores the owner (.env ADMIN_EMAIL) account's password after it's
  // changed via /admin/account — see lib/adminPassword.ts. Without this
  // column, changing the owner password fails with a Postgres "column
  // does not exist" error.
  await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS admin_password_hash TEXT`;
  console.log("SEO columns ready.");
}

async function addHomepageCmsColumns() {
  console.log("Ensuring homepage CMS columns exist...");
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_gallery JSONB NOT NULL DEFAULT '[]'`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_cta_primary_text TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_cta_primary_href TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_cta_secondary_text TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_cta_secondary_href TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS meta_title TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS meta_description TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS focus_keyword TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS sections_json JSONB NOT NULL DEFAULT '{}'`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS header_json JSONB NOT NULL DEFAULT '{}'`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS footer_json JSONB NOT NULL DEFAULT '{}'`;
  await sql`ALTER TABLE homepage ADD COLUMN IF NOT EXISTS theme_json JSONB NOT NULL DEFAULT '{}'`;
  console.log("Homepage CMS columns ready.");
}

async function addBlogCmsColumns() {
  console.log("Ensuring blog CMS columns exist...");
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS focus_keyword TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS cta_heading TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS cta_body TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS cta_button_text TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS cta_button_href TEXT NOT NULL DEFAULT ''`;
  await sql`
    CREATE TABLE IF NOT EXISTS post_redirects (
      old_slug TEXT PRIMARY KEY,
      new_slug TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  console.log("Blog CMS columns ready.");
}

async function addMediaLibraryTable() {
  console.log("Ensuring media_library table exists...");
  await sql`
    CREATE TABLE IF NOT EXISTS media_library (
      id SERIAL PRIMARY KEY,
      url TEXT NOT NULL UNIQUE,
      filename TEXT NOT NULL DEFAULT '',
      content_type TEXT NOT NULL DEFAULT '',
      size_bytes INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  console.log("media_library table ready.");
}

async function seedTours() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM tours`;
  if (count > 0) {
    console.log(`tours: already has ${count} row(s) — skipping seed.`);
    return;
  }
  const tours = readJsonFile("tours.json");
  if (!tours || tours.length === 0) {
    console.log("tours: no data/tours.json to seed from — skipping.");
    return;
  }
  for (let i = 0; i < tours.length; i++) {
    const t = tours[i];
    await sql`
      INSERT INTO tours (
        id, badge, ribbon, title, description, includes, duration, rating,
        reviews, price, original_price, image, image_alt, href_path,
        href_extra, featured, best_for, sort_order
      ) VALUES (
        ${t.id}, ${t.badge}, ${t.ribbon || null}, ${t.title}, ${t.description},
        ${JSON.stringify(t.includes || [])}::jsonb, ${t.duration || null},
        ${t.rating ?? 5}, ${t.reviews ?? 0}, ${t.price ?? 0}, ${t.originalPrice ?? null},
        ${t.image}, ${t.imageAlt}, ${t.hrefPath}, ${t.hrefExtra || null},
        ${!!t.featured}, ${t.bestFor || ""}, ${i}
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log(`tours: seeded ${tours.length} row(s).`);
}

async function seedPosts() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM posts`;
  if (count > 0) {
    console.log(`posts: already has ${count} row(s) — skipping seed.`);
    return;
  }
  const posts = readJsonFile("posts.json");
  if (!posts || posts.length === 0) {
    console.log("posts: no data/posts.json to seed from — skipping.");
    return;
  }
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    await sql`
      INSERT INTO posts (
        slug, title, meta_title, meta_description, category, excerpt,
        quick_answer, read_time, date, image, image_alt,
        recommended_tour_id, recommended_tour_after_block, content, sort_order
      ) VALUES (
        ${p.slug}, ${p.title}, ${p.metaTitle}, ${p.metaDescription}, ${p.category},
        ${p.excerpt}, ${p.quickAnswer}, ${p.readTime}, ${p.date}, ${p.image}, ${p.imageAlt},
        ${p.recommendedTourId || ""}, ${p.recommendedTourAfterBlock ?? null},
        ${JSON.stringify(p.content || [])}::jsonb, ${i}
      )
      ON CONFLICT (slug) DO NOTHING
    `;
  }
  console.log(`posts: seeded ${posts.length} row(s).`);
}

async function seedHomepage() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM homepage`;
  if (count > 0) {
    console.log("homepage: already configured — skipping seed.");
    return;
  }
  const h = readJsonFile("homepage.json");
  if (!h) {
    console.log("homepage: no data/homepage.json to seed from — inserting defaults.");
    await sql`INSERT INTO homepage (id) VALUES (1) ON CONFLICT (id) DO NOTHING`;
    return;
  }
  await sql`
    INSERT INTO homepage (
      id, hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
      rating_value, rating_count, show_featured_tour, featured_tour_id,
      featured_badge_label, featured_urgency_text, featured_reasons
    ) VALUES (
      1, ${h.heroBadge || ""}, ${h.heroHeading || ""}, ${h.heroSubheading || ""},
      ${h.heroImage || ""}, ${h.heroImageAlt || ""}, ${h.ratingValue || ""}, ${h.ratingCount || ""},
      ${!!h.showFeaturedTour}, ${h.featuredTourId || ""}, ${h.featuredBadgeLabel || ""},
      ${h.featuredUrgencyText || ""}, ${JSON.stringify(h.featuredReasons || [])}::jsonb
    )
    ON CONFLICT (id) DO NOTHING
  `;
  console.log("homepage: seeded from data/homepage.json.");
}

async function seedFaqs() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM faqs`;
  if (count > 0) {
    console.log(`faqs: already has ${count} row(s) — skipping seed.`);
    return;
  }
  const faqs = readJsonFile("faqs.json");
  if (!faqs || faqs.length === 0) {
    console.log("faqs: no data/faqs.json to seed from — skipping.");
    return;
  }
  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i];
    await sql`
      INSERT INTO faqs (question, answer, sort_order) VALUES (${f.question}, ${f.answer}, ${i})
    `;
  }
  console.log(`faqs: seeded ${faqs.length} row(s).`);
}

async function seedPrivacyPolicy() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM privacy_policy`;
  if (count > 0) {
    console.log("privacy_policy: already configured — skipping seed.");
    return;
  }
  const p = readJsonFile("privacy-policy.json");
  const today = new Date().toISOString().slice(0, 10);
  if (!p) {
    console.log("privacy_policy: no data/privacy-policy.json to seed from — inserting defaults.");
    await sql`INSERT INTO privacy_policy (id, last_updated) VALUES (1, ${today}) ON CONFLICT (id) DO NOTHING`;
    return;
  }
  await sql`
    INSERT INTO privacy_policy (id, title, last_updated, content)
    VALUES (1, ${p.title || "Privacy Policy"}, ${today}, ${JSON.stringify(p.sections || p.content || [])}::jsonb)
    ON CONFLICT (id) DO NOTHING
  `;
  console.log("privacy_policy: seeded from data/privacy-policy.json.");
}

async function seedSiteSettings() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM site_settings`;
  if (count > 0) {
    console.log("site_settings: already configured — skipping seed.");
    return;
  }
  const blogTitle = "Amsterdam Canal Cruise Guides & Tips | Amsterdam Boat Tours";
  const blogDescription =
    "Practical guides for Amsterdam canal cruises — daytime sightseeing vs. evening wine & cheese cruise, best times to book, routes, and tips.";
  await sql`
    INSERT INTO site_settings (id, blog_meta_title, blog_meta_description)
    VALUES (1, ${blogTitle}, ${blogDescription})
    ON CONFLICT (id) DO NOTHING
  `;
  console.log("site_settings: seeded (Blog listing page SEO fields, indexing ON by default).");
}

async function seedAboutPage() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM about_page`;
  if (count > 0) {
    console.log("about_page: already configured — skipping seed.");
    return;
  }
  const reasons = [
    { icon: "ShieldCheckIcon", title: "Licensed, Established Operators", body: "Every cruise we list runs with certified Dutch canal boat operators — not unregulated third-party resellers." },
    { icon: "StarIcon", title: "Real Review Volume", body: "We only list canal cruises with thousands of verified customer reviews and high customer satisfaction ratings." },
    { icon: "LockIcon", title: "Transparent Pricing", body: "The price you see on each tour card is the full price you pay — no unexpected booking surcharges at checkout." },
    { icon: "HeadsetIcon", title: "Honest, Clear Info", body: "We tell you exactly what is included on each boat — from audio headsets in 19 languages to Dutch wine and cheese pairings." },
  ];
  const a = {
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
    disclosureHeading: "A Note on How We Earn",
    disclosureBody:
      "When you book an Amsterdam canal cruise through a link on this site, we may earn a small affiliate commission from the operator at no extra cost to you. This is how we keep the site free and independently maintained without banner ads.",
    ctaText: "Ready to book your Amsterdam canal cruise?",
    ctaButtonLabel: "Compare Amsterdam Boat Tours",
    metaTitle: "About Us | Amsterdam Canal Cruise Tour & Ticket Booking Guide",
    metaDescription:
      "Who curates our Amsterdam canal sightseeing and evening cruises online, how we select licensed operators, and why booking ahead saves time.",
  };
  await sql`
    INSERT INTO about_page (
      id, hero_eyebrow, hero_heading, hero_subheading, hero_image, hero_image_alt,
      intro_heading, intro_paragraph_1, intro_paragraph_2, intro_image, intro_image_alt,
      reasons_heading, reasons_subheading, reasons,
      disclosure_heading, disclosure_body, cta_text, cta_button_label,
      meta_title, meta_description
    ) VALUES (
      1, ${a.heroEyebrow}, ${a.heroHeading}, ${a.heroSubheading}, ${a.heroImage}, ${a.heroImageAlt},
      ${a.introHeading}, ${a.introParagraph1}, ${a.introParagraph2}, ${a.introImage}, ${a.introImageAlt},
      ${a.reasonsHeading}, ${a.reasonsSubheading}, ${JSON.stringify(reasons)}::jsonb,
      ${a.disclosureHeading}, ${a.disclosureBody}, ${a.ctaText}, ${a.ctaButtonLabel},
      ${a.metaTitle}, ${a.metaDescription}
    )
    ON CONFLICT (id) DO NOTHING
  `;
  console.log("about_page: seeded with About page copy.");
}

async function seedContactPage() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM contact_page`;
  if (count > 0) {
    console.log("contact_page: already configured — skipping seed.");
    return;
  }
  const reasons = [
    { icon: "HeadsetIcon", title: "Booking Help", body: "Not sure whether to book the standard 1-hour sightseeing cruise, evening wine & cheese, or museum combo? Ask us before you book." },
    { icon: "BriefcaseIcon", title: "Partnerships & Affiliates", body: "Boat operators, tourism boards, and affiliate partners — reach out about listing or collaboration opportunities." },
    { icon: "MailIcon", title: "General Inquiries", body: "Site feedback, content corrections, or travel tips regarding Amsterdam canal tours." },
  ];
  const c = {
    heroEyebrow: "Contact",
    heroHeading: "Get in Touch",
    heroSubheading:
      "Questions about an Amsterdam canal cruise or ticket — or a partnership inquiry? Reach out directly by email.",
    email: "livetravelpartner@gmail.com",
    emailNote: "We typically reply within 1–2 business days.",
    reasonsHeading: "What we can help with",
    footerNote:
      "Already have a booking? Contact the cruise operator directly via your confirmation email — they handle modifications and cancellations directly.",
    ctaHeading: "Not booked yet?",
    ctaButtonLabel: "Compare Amsterdam Boat Tours & Tickets",
    metaTitle: "Contact Us | Amsterdam Boat Tours",
    metaDescription:
      "Questions about booking an Amsterdam canal sightseeing cruise, evening cruise, or tickets online? Reach out directly — including for partnership inquiries.",
  };
  await sql`
    INSERT INTO contact_page (
      id, hero_eyebrow, hero_heading, hero_subheading, email, email_note,
      reasons_heading, reasons, footer_note, cta_heading, cta_button_label,
      meta_title, meta_description
    ) VALUES (
      1, ${c.heroEyebrow}, ${c.heroHeading}, ${c.heroSubheading}, ${c.email}, ${c.emailNote},
      ${c.reasonsHeading}, ${JSON.stringify(reasons)}::jsonb, ${c.footerNote}, ${c.ctaHeading}, ${c.ctaButtonLabel},
      ${c.metaTitle}, ${c.metaDescription}
    )
    ON CONFLICT (id) DO NOTHING
  `;
  console.log("contact_page: seeded with Contact page copy.");
}

async function main() {
  await createTables();
  await addSeoColumns();
  await addHomepageCmsColumns();
  await addBlogCmsColumns();
  await addMediaLibraryTable();
  await seedTours();
  await seedPosts();
  await seedHomepage();
  await seedFaqs();
  await seedPrivacyPolicy();
  await seedSiteSettings();
  await seedAboutPage();
  await seedContactPage();
  console.log("\nDone. Amsterdam database is ready.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("\nSetup failed:", err);
    process.exit(1);
  });
