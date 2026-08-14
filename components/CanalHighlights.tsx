const highlights = [
  {
    title: "UNESCO Canal Ring",
    body: "The 17th-century Grachtengordel is a UNESCO World Heritage Site — over 1,500 bridges and 165 canals wind through the historic center.",
    icon: "🏛️",
  },
  {
    title: "Anne Frank House & Golden Bend",
    body: "Pass right by the Anne Frank House and the grand merchant mansions of the Golden Bend on Herengracht, all from the water.",
    icon: "🏘️",
  },
  {
    title: "Open, Covered & Glass-Top Boats",
    body: "Choose an open-air boat for fresh canal air, or a glass-topped saloon boat that stays warm and dry whatever the weather.",
    icon: "🛶",
  },
  {
    title: "Golden Hour Glow",
    body: "After sunset, gabled townhouses and houseboats light up along the water, and the low bridges make for a magical, close-up ride.",
    icon: "✨",
  },
];

export default function CanalHighlights() {
  return (
    <section id="highlights" className="bg-canal-ink py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
          Why the Canals
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold">Amsterdam Canal Highlights</h2>
        <p className="mt-3 max-w-2xl text-white/70">
          The canals aren't just a way to get between landmarks — they're a viewpoint on their own.
          Here's what makes the ride itself worth booking.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-canal-orange/40 hover:bg-white/10"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
