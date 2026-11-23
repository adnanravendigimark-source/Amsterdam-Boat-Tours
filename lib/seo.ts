import { SITE_URL } from "./site";

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function resolveRobots(
  noIndex: boolean,
  noFollow: boolean = noIndex
): { index: boolean; follow: boolean } {
  return { index: !noIndex, follow: !noFollow };
}

export function resolveCanonical(path: string, override?: string | null): string {
  const trimmed = (override || "").trim();
  if (trimmed && isOwnHttpsUrl(trimmed)) return trimmed;
  const cleanPath = path === "/" ? "" : path;
  return `${SITE_URL}${cleanPath}`;
}

// An admin-entered canonical is only honoured when it points at this site
// over https. A typo'd or foreign domain would tell Google to credit another
// site with the page, so anything else falls back to the page's own URL.
function isOwnHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.host === new URL(SITE_URL).host;
  } catch {
    return false;
  }
}

export interface OgFields {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export function resolveOg(
  fields: OgFields,
  fallback: { title: string; description: string; image?: string }
) {
  return {
    title: fields.ogTitle?.trim() || fallback.title,
    description: fields.ogDescription?.trim() || fallback.description,
    image: fields.ogImage?.trim() || fallback.image || "",
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function buildArticleJsonLd(article: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  authorName: string;
  siteName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    ...(article.image ? { image: [article.image] } : {}),
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: { "@type": "Organization", name: article.authorName },
    publisher: { "@type": "Organization", name: article.siteName },
    mainEntityOfPage: { "@type": "WebPage", "@id": article.url },
  };
}

// Every page's <title>. The root layout's template appends the brand, but
// admins often type it into the SEO title already, which produced
// "… | Amsterdam Boat Tours | Amsterdam Boat Tours". This
// returns an absolute title instead: the admin's text as-is when it already
// names the brand, otherwise with the brand appended only if the result
// stays within Google's ~60-character display width.
export const SITE_BRAND = "Amsterdam Boat Cruise";
// The site's previous name; stripped from admin-typed titles so it never
// appears next to (or instead of) the current brand.
const LEGACY_BRANDS = ["Amsterdam Boat Tours"];
const TITLE_MAX = 60;

export function pageTitle(raw: string): { absolute: string } {
  let title = (raw || "").trim();
  for (const legacy of LEGACY_BRANDS) {
    title = title.replace(new RegExp(`\\s*[|\\-–—]\\s*${legacy}\\s*`, "gi"), " ").trim();
  }
  if (!title) return { absolute: SITE_BRAND };
  const fold = (v: string) => v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (fold(title).includes(fold(SITE_BRAND))) return { absolute: title };
  const withBrand = `${title} | ${SITE_BRAND}`;
  return { absolute: withBrand.length <= TITLE_MAX ? withBrand : title };
}
