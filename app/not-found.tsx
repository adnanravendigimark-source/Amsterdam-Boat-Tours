import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <p className="font-display text-7xl font-black text-blue-600">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
          Looks like this page missed the boat.
        </h1>
        <p className="mt-3 max-w-md text-slate-600">
          The page you're looking for doesn't exist or may have moved. Try one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#tours"
            className="rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:scale-[1.02]"
          >
            Compare Canal Cruises &amp; Tickets →
          </Link>
          <Link
            href="/blog"
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Read the Travel Guide
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
