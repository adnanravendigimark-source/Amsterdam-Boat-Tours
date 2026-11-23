import { getTours, hasPrice } from "@/lib/data";
import { getHomepageContent } from "@/lib/homepage";
import { formatCheckedDate } from "@/lib/checkedDate";
import CruiseChooser, { type ChooserTour } from "./CruiseChooser";
import s from "./chooser.module.css";

export default async function TourGrid() {
  const content = await getHomepageContent();
  const tours = await getTours();

  const orderedTours = content.showFeaturedTour
    ? [...tours].sort((a, b) => {
        if (a.id === content.featuredTourId) return -1;
        if (b.id === content.featuredTourId) return 1;
        return 0;
      })
    : tours;

  const latest = tours.map((t) => t.priceChecked || "").sort().pop();
  const checked = formatCheckedDate(latest);
  const bookNowText = content.header.bookNowText || "Check dates";

  const chooserTours: ChooserTour[] = orderedTours.map((tour) => ({
    id: tour.id,
    title: tour.title,
    image: tour.image,
    imageAlt: tour.imageAlt,
    price: hasPrice(tour) ? tour.price : null,
    originalPrice: tour.originalPrice,
    rating: tour.rating,
    reviews: tour.reviews,
    ratingSource: tour.ratingSource,
    duration: tour.duration,
    cancellation: tour.cancellation,
    href: tour.href,
    ctaLabel: tour.ctaLabel || bookNowText,
    badge:
      content.showFeaturedTour && tour.id === content.featuredTourId && content.featuredBadgeLabel
        ? content.featuredBadgeLabel
        : tour.ribbon,
    featured: content.showFeaturedTour && tour.id === content.featuredTourId,
  }));

  return (
    <section id="tours" className={s.section}>
      <div className={s.head}>
        <h2 className={s.heading}>{content.sections.tours.heading}</h2>
        {content.sections.tours.subheading && <p className={s.sub}>{content.sections.tours.subheading}</p>}
      </div>
      <CruiseChooser tours={chooserTours} />
      {checked && (
        <p className={s.note}>
          Prices are &ldquo;from&rdquo; prices per adult on GetYourGuide, checked {checked}. The price on the booking page is the one that counts.
        </p>
      )}
    </section>
  );
}
