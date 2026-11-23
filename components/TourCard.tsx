import SafeImage from "./SafeImage";
import StarRating from "./StarRating";
import { hasPrice, type Tour } from "@/lib/data";
import ProviderRating from "./ProviderRating";

export default function TourCard({
  tour,
  recommended,
  bookNowText = "Book Now",
}: {
  tour: Tour;
  recommended?: {
    badgeLabel: string;
    reasons: string[];
    urgencyText: string;
  };
  bookNowText?: string;
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

        {tour.rating > 0 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-900 shadow-md backdrop-blur-md">
            <StarRating rating={tour.rating} showValue size="xs" />
          </div>
        )}
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

        {/* First 3 admin "Includes" items, boxed. */}
        <div className="mt-4 space-y-1.5">
          {tour.includes.slice(0, 3).map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 rounded-md bg-slate-50 px-2.5 py-1.5 text-[11.5px] text-slate-700 border border-slate-100"
            >
              <span className="mt-0.5 text-blue-600 font-bold shrink-0">✓</span>
              <span className="leading-tight font-medium line-clamp-1">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-1 text-xs text-slate-600">
          <ProviderRating rating={tour.rating} reviews={tour.reviews} source={tour.ratingSource} />
          {tour.duration && <p className="font-medium text-slate-500">⏱ {tour.duration}</p>}
          {tour.cancellation && <p className="font-medium text-emerald-700">{tour.cancellation}</p>}
        </div>

        {/* Footer */}
        {recommended ? (
          <div className="mt-auto border-t border-blue-100 pt-4">
            <div className="flex items-end justify-between gap-2">
              {hasPrice(tour) ? (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">from</p>
                  <span className="font-display text-2xl font-bold text-slate-900">€{tour.price}</span>
                </div>
              ) : (
                <span className="text-sm font-semibold text-slate-600">See prices</span>
              )}
              <a
                href={tour.href}
                target="_blank"
                rel="noopener nofollow sponsored"
                data-placement="tour_card"
                data-tour-id={tour.id}
                className="flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/25 transition hover:scale-[1.02] hover:shadow-blue-600/40"
              >
                {tour.ctaLabel || bookNowText}
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
            {hasPrice(tour) ? (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">from</p>
                <div className="flex items-baseline gap-2">
                  {tour.originalPrice && tour.originalPrice > tour.price && (
                    <span className="text-sm text-slate-400 line-through">€{tour.originalPrice}</span>
                  )}
                  <span className="font-display text-2xl font-bold text-slate-900">€{tour.price}</span>
                  <span className="text-xs text-slate-500">/ person</span>
                </div>
              </div>
            ) : (
              <span className="text-sm font-semibold text-slate-600">See prices</span>
            )}
            <a
              href={tour.href}
              target="_blank"
              rel="noopener nofollow sponsored"
              data-placement="tour_card"
              data-tour-id={tour.id}
              className="rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:scale-[1.02] hover:shadow-blue-600/30"
            >
              {tour.ctaLabel || bookNowText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
