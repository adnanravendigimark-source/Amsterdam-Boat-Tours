import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/Logo.png";

export default function Logo({
  className = "",
  variant = "compact",
  theme = "light",
  src = "",
  alt = "Amsterdam Boat Tours",
  line1 = "Amsterdam",
  line2 = "Boat Tours",
}: {
  className?: string;
  variant?: "compact" | "stacked";
  theme?: "light" | "dark";
  src?: string;
  alt?: string;
  line1?: string;
  line2?: string;
}) {
  const isDark = theme === "dark";
  const customSrc = src?.trim();

  if (variant === "stacked") {
    return (
      <Link href="/" className={`inline-flex flex-col items-center gap-3.5 ${className}`}>
        {/* Sized to the boat artwork's actual ~3.58:1 aspect ratio (rather
            than a taller box built for the old mark) so the illustration
            fills its box edge-to-edge instead of shrinking inside empty
            letterbox space. */}
        <span className="relative block h-24 w-[344px] sm:h-28 sm:w-[401px] transition-transform duration-300 hover:scale-105">
          <Image
            src={customSrc || logo}
            alt={alt}
            fill
            sizes="401px"
            className="object-contain"
            priority
          />
        </span>
        <div className="text-center leading-tight">
          <span
            className={`block font-display text-2xl font-black tracking-[-0.03em] uppercase ${isDark ? "text-white" : "text-slate-900"
              }`}
          >
            {line1}
          </span>
          <span className="block font-display text-xs font-extrabold uppercase tracking-[0.32em] bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            {line2}
          </span>
        </div>
      </Link>
    );
  }

  const image = (
    <span className="relative block h-12 w-[172px] overflow-hidden sm:h-14 sm:w-[200px] transition-transform duration-300 group-hover:scale-105">
      <Image
        src={customSrc || logo}
        alt={alt}
        fill
        priority
        sizes="200px"
        className="object-contain"
      />
    </span>
  );

  const wordmark = (
    <span className="hidden items-center gap-3.5 sm:flex">
      <span
        className={`h-8 w-[1.5px] shrink-0 rounded-full ${isDark
            ? "bg-gradient-to-b from-sky-400/80 to-blue-600/30"
            : "bg-gradient-to-b from-blue-600/60 to-sky-400/20"
          }`}
        aria-hidden="true"
      />
      <div className="flex flex-col leading-[1.08]">
        <span
          className={`block whitespace-nowrap font-display text-[1.18rem] font-black tracking-[-0.03em] uppercase ${isDark ? "text-white" : "text-slate-900"
            }`}
        >
          {line1}
        </span>
        <span className="block whitespace-nowrap font-display text-[10.5px] font-extrabold uppercase tracking-[0.28em] bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
          {line2}
        </span>
      </div>
    </span>
  );

  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      {image}
      {wordmark}
    </Link>
  );
}
