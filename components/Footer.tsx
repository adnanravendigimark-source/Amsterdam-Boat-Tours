import Link from "next/link";
import Logo from "./Logo";
import { getSiteChrome } from "@/lib/homepage";
import { safeHtml } from "@/lib/safeHtml";

export default async function Footer() {
  const { header, footer } = await getSiteChrome();
  return (
    <footer className="border-t border-stone-800 bg-canal-navy text-stone-100">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="stacked" theme="dark" line1={header.logoLine1} line2={header.logoLine2} />
            <div
              className="mt-5 max-w-sm text-sm leading-relaxed text-stone-300 rich-content rich-content-invert"
              dangerouslySetInnerHTML={{ __html: safeHtml(footer.tagline) }}
            />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-bold uppercase tracking-widest text-sky-400">
                  {column.title}
                </p>
                <ul className="mt-2 space-y-0 text-sm text-stone-300 sm:mt-4 sm:space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="inline-flex min-h-11 items-center hover:text-white hover:underline transition-colors sm:min-h-0">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {((footer.addressLine1 || "").trim() || (footer.addressLine2 || "").trim()) && (
              <div>
                {(footer.addressHeading || "").trim() && (
                  <p className="text-xs font-bold uppercase tracking-widest text-sky-400">
                    {footer.addressHeading}
                  </p>
                )}
                <p className="mt-4 text-sm leading-relaxed text-stone-300">
                  {footer.addressLine1}
                  {(footer.addressLine1 || "").trim() && (footer.addressLine2 || "").trim() && <br />}
                  {footer.addressLine2}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} {footer.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
