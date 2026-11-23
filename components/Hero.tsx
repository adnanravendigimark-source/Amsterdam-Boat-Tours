import SafeImage from "./SafeImage";
import { getHomepageContent } from "@/lib/homepage";
import { getTours, hasPrice } from "@/lib/data";
import { formatCheckedDate } from "@/lib/checkedDate";
import s from "./hero.module.css";

type Fact = { text: string; icon: "price" | "cancel" | "time" | "star" };

// Pulls every hour figure out of a duration string: "1–1.5 hours" -> [1, 1.5].
function hours(duration?: string): number[] {
  if (!duration || !/hour/i.test(duration)) return [];
  return (duration.match(/\d+(?:[.,]\d+)?/g) || []).map((n) => Number(n.replace(",", ".")));
}

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, ""));

function FactIcon({ name }: { name: Fact["icon"] }) {
  const p = {
    className: s.factIcon,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "price")
    return (
      <svg {...p} aria-hidden="true">
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </svg>
    );
  if (name === "cancel")
    return (
      <svg {...p} aria-hidden="true">
        <rect x="3" y="4.5" width="18" height="16" rx="2" />
        <path d="M3 9.5h18M8 2.5v4M16 2.5v4M9 15l2 2 4-4" />
      </svg>
    );
  if (name === "time")
    return (
      <svg {...p} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  return (
    <svg {...p} aria-hidden="true">
      <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" />
    </svg>
  );
}

export default async function Hero() {
  const content = await getHomepageContent();
  const tours = await getTours();

  // Facts: only what the database already states.
  const facts: Fact[] = [];

  const priced = tours.filter(hasPrice);
  if (priced.length) {
    const min = Math.min(...priced.map((t) => t.price));
    const checked = formatCheckedDate(priced.map((t) => t.priceChecked || "").sort().pop());
    facts.push({ text: checked ? `From €${min} per adult, checked ${checked}` : `From €${min} per adult`, icon: "price" });
  }

  const cancellations = Array.from(new Set(tours.map((t) => t.cancellation?.trim() || "")));
  if (tours.length && cancellations.length === 1 && cancellations[0]) {
    facts.push({ text: cancellations[0], icon: "cancel" });
  }

  const allHours = tours.flatMap((t) => hours(t.duration));
  if (allHours.length) {
    const lo = Math.min(...allHours);
    const hi = Math.max(...allHours);
    facts.push({
      text: lo === hi ? `${fmt(lo)} hour${lo === 1 ? "" : "s"} on the water` : `${fmt(lo)}–${fmt(hi)} hours on the water`,
      icon: "time",
    });
  }

  if (content.ratingValue.trim()) {
    facts.push({ text: [content.ratingValue, content.ratingCount].filter(Boolean).join(", "), icon: "star" });
  }

  return (
    <section id="top" className={s.hero}>
      <div className={s.media}>
        {content.heroVideo ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={content.heroVideo}
            poster={content.heroImage || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className={s.video}
          />
        ) : (
          <SafeImage
            src={content.heroImage}
            alt={content.heroImageAlt}
            fill
            priority
            sizes="100vw"
            quality={80}
            className={s.img}
          />
        )}
      </div>
      <div className={s.tint} aria-hidden="true" />

      <div className={s.inner}>
        <div className={s.copy}>
          <h1 className={s.title}>{content.heroHeading}</h1>
          {content.heroSubheading && (
            <div className={s.lede} dangerouslySetInnerHTML={{ __html: content.heroSubheading }} />
          )}

          <div className={s.actions}>
            <a href={content.heroCtaPrimaryHref} className={s.primary}>
              {content.heroCtaPrimaryText}
            </a>
            {content.heroCtaSecondaryText && (
              <a href={content.heroCtaSecondaryHref} className={s.secondary}>
                {content.heroCtaSecondaryText}
              </a>
            )}
          </div>

          {facts.length > 0 && (
            <ul className={s.facts}>
              {facts.map((f) => (
                <li key={f.text} className={s.fact}>
                  <FactIcon name={f.icon} />
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
