import SafeImage from "./SafeImage";
import { getTours } from "@/lib/data";
import { getHomepageContent } from "@/lib/homepage";

export default async function FeaturedTour() {
  const content = await getHomepageContent();
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
            <span className="inline-flex items-center gap-0.5 text-amber-500 font-bold">
              ★ {tour.rating.toFixed(1)}
            </span>
            <span>·</span>
            <span>
              from <span className="font-bold text-slate-900">€{tour.price}</span>
            </span>
          </div>
        </div>
        <a
          href={tour.href}
          target="_blank"
          rel="noopener nofollow sponsored"
          className="shrink-0 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
