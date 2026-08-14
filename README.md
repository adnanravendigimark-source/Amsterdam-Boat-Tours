# Amsterdam Boat Tours

Same page layout/architecture as the Seine and Sagrada Familia sites (Next.js 14 + Tailwind), new brand: Amsterdam canal cruises, a new "canal" orange/indigo color theme, new copy, and new photos — nothing reused from the other two sites.

This is v1: homepage only, content served from static files in /data and /lib (no database/admin yet — that can be added later the same way the other two sites did it).

## Run locally

```
npm install
npm run dev
```

Then open http://localhost:3000.

## Notes
- Tour booking links in `data/tours.json` use placeholder GetYourGuide-style paths (`…-t500001` etc.) — replace with real listing paths and set `GYG_PARTNER_ID` in a `.env` file once you have real tours/affiliate IDs.
- Brand colors live in `app/globals.css` (`:root`) and `tailwind.config.ts` under the `canal` / `gold` keys.
- Content (hero copy, sections, nav/footer) lives in `lib/homepage.ts`; tours/FAQs live in `data/tours.json` and `data/faqs.json`.
