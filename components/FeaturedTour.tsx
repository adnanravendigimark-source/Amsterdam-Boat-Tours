import SafeImage from "./SafeImage";
import StarRating from "./StarRating";
import { getTours, hasPrice } from "@/lib/data";
import { getHomepageContent } from "@/lib/homepage";

export default async function FeaturedTour() {
  const content = await getHomepageContent();
  const bookNowText = content.header.bookNowText;
  if (!content.showFeaturedTour) return null;

  const tours = await getTours();
  const tour = tours.find((t) => t.id === content.featuredTourId);
  if (!tour) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_-8px_25px_rgba(0,0,0,0.12)] backdrop-blur-md sm:hidden">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
          <SafeImage src={tour.image} alt={tour.imageAlt} fill sizes="48px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold leading-tight text-slate-900">{tour.title}</p>
          <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500">
            {tour.rating > 0 && <StarRating rating={tour.rating} showValue size="xs" />}
            {tour.rating > 0 && hasPrice(tour) && <span>·</span>}
            {hasPrice(tour) && (
              <span>
                from <span className="font-bold text-slate-900">€{tour.price}</span>
              </span>
            )}
          </div>
        </div>
        <a
          href={tour.href}
          target="_blank"
          rel="noopener nofollow sponsored"
          data-placement="sticky_mobile"
          data-tour-id={tour.id}
          className="inline-flex min-h-11 shrink-0 items-center rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-md"
        >
          {tour.ctaLabel || bookNowText}
        </a>
      </div>
    </div>
  );
}
