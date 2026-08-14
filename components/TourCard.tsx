import SafeImage from "./SafeImage";
import type { Tour } from "@/lib/data";
import { LockIcon } from "./icons";

export default function TourCard({
  tour,
  recommended,
}: {
  tour: Tour;
  recommended?: {
    badgeLabel: string;
    reasons: string[];
    urgencyText: string;
  };
}) {
  return (
    <div
      className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 ${
        recommended
          ? "border-2 border-blue-600 shadow-lg shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 ring-1 ring-blue-500/20"
          : "border border-slate-200/80 shadow-sm hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-900/5"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <SafeImage
          src={tour.image}
          alt={tour.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

        {(recommended || tour.ribbon) && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
            <span>★</span>
            {recommended ? recommended.badgeLabel : tour.ribbon}
          </span>
        )}

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-900 shadow-md backdrop-blur-md">
          <span className="text-amber-500">★</span>
          {tour.rating.toFixed(1)}
          <span className="font-normal text-slate-500">({tour.reviews.toLocaleString()})</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="min-h-[3.25rem] font-display text-lg font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {tour.title}
        </h3>
        <div
          className="rich-content mt-1 line-clamp-2 min-h-[2.5rem] text-sm text-slate-600 [&>p]:m-0 [&>p]:line-clamp-2"
          dangerouslySetInnerHTML={{ __html: tour.description }}
        />

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {tour.includes.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-900 border border-sky-100"
            >
              <span className="text-blue-600 font-bold">✓</span>
              {item}
            </span>
          ))}
        </div>

        <p className="mt-3 text-xs font-medium text-slate-500">⏱ {tour.duration}</p>

        {recommended && recommended.reasons.length > 0 && (
          <div className="mt-3.5 rounded-xl bg-blue-50/70 border border-blue-200/60 p-3">
            {recommended.reasons.slice(0, 2).map((reason) => (
              <p key={reason} className="flex items-start gap-1.5 text-[11px] leading-snug text-slate-700 font-semibold">
                <span className="mt-0.5 text-blue-600">✓</span>
                {reason}
              </p>
            ))}
          </div>
        )}

        {/* Footer */}
        {recommended ? (
          <div className="mt-auto border-t border-blue-100 pt-4">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">from</p>
                <span className="font-display text-2xl font-black text-slate-900">€{tour.price}</span>
              </div>
              <a
                href={tour.href}
                target="_blank"
                rel="noopener nofollow sponsored"
                className="flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/25 transition hover:scale-[1.02] hover:shadow-blue-600/40"
              >
                Book Now
              </a>
            </div>
            {recommended.urgencyText && (
              <p className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-blue-600">
                <LockIcon className="h-3 w-3" /> {recommended.urgencyText}
              </p>
            )}
          </div>
        ) : (
          <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">from</p>
              <div className="flex items-baseline gap-2">
                {tour.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">€{tour.originalPrice}</span>
                )}
                <span className="font-display text-2xl font-black text-slate-900">€{tour.price}</span>
                <span className="text-xs text-slate-500">/ person</span>
              </div>
            </div>
            <a
              href={tour.href}
              target="_blank"
              rel="noopener nofollow sponsored"
              className="rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:scale-[1.02] hover:shadow-blue-600/30"
            >
              Book Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
