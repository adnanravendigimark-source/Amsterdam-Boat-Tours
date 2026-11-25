// Links typed into the admin (CTA buttons, nav/footer links, hero buttons)
// are rendered straight into href attributes, which React does not filter:
// a stored "javascript:..." would run for every visitor. Only these forms are
// allowed; anything else renders as "#".
//   https://… http://… mailto:… tel:…   /same-site/path   #anchor
export function safeHref(value: unknown): string {
  if (typeof value !== "string") return "#";
  const v = value.trim();
  if (!v) return "";
  if (/^(https?:|mailto:|tel:)/i.test(v)) return v;
  if (v.startsWith("#")) return v;
  // Same-site paths, but not protocol-relative ("//evil") or "/\evil".
  if (v.startsWith("/") && !v.startsWith("//") && !v.startsWith("/\\")) return v;
  return "#";
}

// Applies safeHref to every string property whose key ends in "href"
// (href, ctaHref, primaryButtonHref, heroCtaPrimaryHref, …) at any depth.
export function sanitizeHrefs<T>(value: T): T {
  if (Array.isArray(value)) return value.map((v) => sanitizeHrefs(v)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = typeof v === "string" && /href$/i.test(k) ? safeHref(v) : sanitizeHrefs(v);
    }
    return out as T;
  }
  return value;
}
