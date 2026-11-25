import SafeImage from "./SafeImage";
import { hasPrice, type Tour } from "@/lib/data";
import ProviderRating from "./ProviderRating";

export default function TourPromoCard({
  tour,
  recommendedLabel = "Recommended Option",
  bookNowText = "Book Now",
}: {
  tour: Tour;
  recommendedLabel?: string;
  bookNowText?: string;
}) {
  return (
    <div className="my-10 flex flex-col gap-6 overflow-hidden rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50/70 via-white to-blue-50/40 p-6 shadow-md sm:flex-row sm:items-center">
      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-44 shadow-sm">
        <SafeImage src={tour.image} alt={tour.imageAlt} fill sizes="200px" className="object-cover" />
      </div>
      <div className="flex-1">
        <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-blue-600">
          {recommendedLabel}
        </span>
        <p className="mt-1 font-display text-lg font-bold text-slate-900">{tour.title}</p>
        <div className="mt-1.5 flex items-center gap-2 text-xs font-medium text-slate-600">
          <ProviderRating rating={tour.rating} reviews={tour.reviews} source={tour.ratingSource} />
          {hasPrice(tour) && <span>· from €{tour.price}/person</span>}
        </div>
      </div>
      <a
        href={tour.href}
        target="_blank"
        rel="noopener nofollow sponsored"
        data-placement="post_promo"
        data-tour-id={tour.id}
        className="shrink-0 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3 text-center text-sm font-bold text-white shadow-md transition-colors"
      >
        {tour.ctaLabel || bookNowText}
      </a>
    </div>
  );
}
