import SafeImage from "./SafeImage";
import ProviderRating from "./ProviderRating";
import s from "./chooser.module.css";

export type ChooserTour = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  price: number | null;
  originalPrice?: number;
  rating: number;
  reviews: number;
  ratingSource?: string;
  duration?: string;
  cancellation?: string;
  href: string;
  ctaLabel: string;
  badge?: string;
  featured?: boolean;
};

// Compact cruise cards: photo, name, rating, the two facts people decide on,
// price and one booking link. No client JS.
export default function CruiseChooser({ tours }: { tours: ChooserTour[] }) {
  if (!tours.length) return null;
  return (
    <ul className={s.grid}>
      {tours.map((tour) => (
        <li key={tour.id} className={`${s.card} ${tour.featured ? s.featured : ""}`}>
          <div className={s.media}>
            <SafeImage
              src={tour.image}
              alt={tour.imageAlt}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className={s.img}
            />
            {tour.badge && <span className={s.badge}>{tour.badge}</span>}
          </div>

          <div className={s.body}>
            <h3 className={s.name}>{tour.title}</h3>
            <ProviderRating
              rating={tour.rating}
              reviews={tour.reviews}
              source={tour.ratingSource}
              className={s.rating}
            />
            <ul className={s.meta}>
              {tour.duration && <li>{tour.duration}</li>}
              {tour.cancellation && <li className={s.ok}>{tour.cancellation}</li>}
            </ul>
          </div>

          <div className={s.foot}>
            <div className={s.price}>
              {tour.price !== null ? (
                <>
                  <span className={s.from}>from</span>
                  <span className={s.amount}>€{tour.price}</span>
                  {tour.originalPrice && tour.originalPrice > tour.price && (
                    <del className={s.was}>
                      <span className="sr-only">was </span>€{tour.originalPrice}
                    </del>
                  )}
                </>
              ) : (
                <span className={s.from}>See prices</span>
              )}
            </div>
            <a
              href={tour.href}
              target="_blank"
              rel="noopener nofollow sponsored"
              data-placement="tour_card"
              data-tour-id={tour.id}
              className={s.go}
            >
              {tour.ctaLabel}
              <span className="sr-only">: {tour.title} on GetYourGuide</span>
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
