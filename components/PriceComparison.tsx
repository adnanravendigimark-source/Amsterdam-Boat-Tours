import { getTours, hasPrice } from "@/lib/data";
import { formatCheckedDate } from "@/lib/checkedDate";
import { getHomepageContent } from "@/lib/homepage";
import { safeHtml } from "@/lib/safeHtml";

export default async function PriceComparison() {
  const [tours, { sections }] = await Promise.all([getTours(), getHomepageContent()]);
  const s = sections.price;
  const checked = formatCheckedDate(tours.map((t) => t.priceChecked || "").sort().pop());
  return (
    <section id="prices" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-3xl">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600">
          {s.eyebrow}
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">{s.heading}</h2>
        <div
          className="rich-content mt-3 text-base text-slate-600"
          dangerouslySetInnerHTML={{ __html: safeHtml(s.subheading) }}
        />
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <table className="w-full min-w-[700px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-canal-navy text-white">
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">{s.itemLabel}</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">{s.priceLabel}</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">{s.column1Label}</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">{s.column2Label}</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">{s.bestForLabel}</th>
              <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tours.map((tour, i) => (
              <tr
                key={tour.id}
                className={`transition hover:bg-sky-50/40 ${
                  tour.ribbon === "Bestseller" ? "bg-sky-50/60 font-medium" : i % 2 ? "bg-slate-50/60" : ""
                }`}
              >
                <td className="px-6 py-4 font-semibold text-slate-900">{tour.title}</td>
                <td className="px-6 py-4 font-bold text-blue-600">
                  {hasPrice(tour) ? (
                    <>
                      from €{tour.price} <span className="font-normal text-xs text-slate-500">/ person</span>
                    </>
                  ) : (
                    <span className="font-semibold text-slate-600">See prices</span>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">{tour.priceTableColumn1 || tour.duration}</td>
                <td className="px-6 py-4 text-slate-600">{tour.priceTableFeature || "No"}</td>
                <td className="px-6 py-4 text-slate-600">{tour.bestFor}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={tour.href}
                    target="_blank"
                    rel="noopener nofollow sponsored"
                    data-placement="price_table"
                    data-tour-id={tour.id}
                    className="inline-flex min-h-11 items-center rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors"
                  >
                    {s.bookLabel}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3.5 text-xs text-slate-500">
        {s.note}
        {checked ? ` Prices checked ${checked}.` : ""}
      </p>
    </section>
  );
}
