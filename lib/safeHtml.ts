import sanitizeHtml from "sanitize-html";

// Admin-edited rich text (tour descriptions, FAQ answers, blog posts, About,
// Contact, Privacy, homepage copy, footer) is rendered with
// dangerouslySetInnerHTML. Any editor account can write it, so it is cleaned
// here on every render: only the tags and attributes the editor and the
// stored content actually use survive, links keep safe schemes, and scripts,
// event handlers, iframes and arbitrary inline styles are dropped.
// Rendering happens on the server, so this library never ships to browsers.

const ALLOWED_TAGS = [
  "p", "br", "hr", "div", "span",
  "h2", "h3", "h4",
  "strong", "b", "em", "i", "u", "s", "code", "pre", "blockquote",
  "ul", "ol", "li",
  "a", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "colgroup", "col",
];

const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: {
    "*": ["class", "aria-hidden", "data-section-id", "data-start", "data-end"],
    // ids only on headings (table-of-contents anchors), so content can't
    // claim ids the page or scripts rely on.
    h2: ["id"], h3: ["id"], h4: ["id"],
    a: ["href", "target", "rel", "title", "data-placement"],
    img: ["src", "alt", "title", "width", "height", "loading", "decoding", "sizes", "srcset"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
    col: ["span", "style"],
    table: ["style"],
  },
  // Inline styles only for table column widths (what the table editor writes).
  allowedStyles: {
    col: { "min-width": [/^\d{1,4}(px|%|rem|em)$/], width: [/^\d{1,4}(px|%|rem|em)$/] },
    table: { "min-width": [/^\d{1,4}(px|%|rem|em)$/], width: [/^\d{1,4}(px|%|rem|em)$/] },
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["https"] },
  allowProtocolRelative: false,
  transformTags: {
    // A link that opens a new tab never gets access to window.opener.
    a: (tagName, attribs) => {
      if (attribs.target === "_blank") {
        const rel = new Set((attribs.rel ?? "").split(/\s+/).filter(Boolean));
        rel.add("noopener");
        rel.add("noreferrer");
        attribs.rel = [...rel].join(" ");
      }
      return { tagName, attribs };
    },
  },
};

/** Clean admin-edited HTML before it is rendered with dangerouslySetInnerHTML. */
export function safeHtml(html: string | null | undefined): string {
  if (!html) return "";
  return sanitizeHtml(html, OPTIONS);
}

/**
 * Serialise structured data for a <script type="application/ld+json"> tag.
 * Escapes "<" so content containing "</script>" cannot close the tag early.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
