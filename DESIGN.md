---
name: Amsterdam Boat Cruise
description: Independent comparison of Amsterdam canal cruise tickets, bookable on GetYourGuide.
colors:
  royal-blue: "#2563eb"
  canal-blue: "#0284c7"
  sky-azure: "#0ea5e9"
  midnight-navy: "#091b3d"
  lantern-amber: "#f59e0b"
  brick-orange: "#ea580c"
  ink: "#0f172a"
  body-slate: "#475569"
  muted-slate: "#64748b"
  hairline: "#e2e8f0"
  mist: "#f8fafc"
  paper: "#fafaf9"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.1em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  section: "80px"
  container: "1152px"
components:
  button-primary:
    backgroundColor: "{colors.royal-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  card-tour:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.xl}"
    padding: "24px"
  chip-ribbon:
    backgroundColor: "{colors.royal-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
  table-header:
    backgroundColor: "{colors.midnight-navy}"
    textColor: "{colors.white}"
---

# Design System: Amsterdam Boat Cruise

## Overview

**Creative North Star: "Canal Daylight"**

Amsterdam Boat Cruise is a bright, clear ticket-comparison site: water-blue accents on white and warm paper, midnight-navy anchors for dark sections, and amber reserved for ratings. The aim is the feeling of a sunny morning on the canals: open, calm and easy to read, so a visitor can compare three cruises and book in under a minute.

Components are warm and tactile: solid fills, softly rounded corners and paper-like cards with a light lift. Density is moderate, with generous section spacing and compact cards. The current code still uses a three-stop blue→indigo→sky gradient on buttons and ribbons; new work replaces it with solid royal blue, so the blue stays but the gloss goes.

The site never uses tourist clichés (tulips, clogs, windmills as decoration) and never pressures: no urgency badges, countdowns or shouting calls to action.

**Key Characteristics:**
- Bright royal blue as the one action colour, on white and warm-paper surfaces
- Midnight navy for dark bands (hero overlay, price-table header, footer)
- Amber only for rating stars
- Outfit headings, Plus Jakarta Sans body text
- Soft corners (12–16px) and light shadows; calm, honest booking cues

## Colors

A bright water-blue family on white and warm paper, anchored by midnight navy.

### Primary
- **Royal Sapphire** (#2563eb): the action colour, used for booking buttons, links, active nav, ribbons and price highlights. In code it's `blue-600`, often inside the legacy blue→indigo→sky gradient.
- **Canal Blue** (#0284c7): secondary accent for eyebrows, icon tints, checkmarks and the evening-section button. It's the runtime value of `canal-blue`, set from the admin theme.

### Secondary
- **Sky Azure** (#0ea5e9): light accent in gradients and focus/hover glows; use sparingly.
- **Midnight Navy** (#091b3d): dark bands, such as the price-comparison table header, hero overlays and the footer. Taken from the logo hull.

### Tertiary
- **Lantern Amber** (#f59e0b): rating stars and the occasional warm highlight. Never for buttons.
- **Brick Orange** (#ea580c): the admin theme's "primary" (`canal-primary`/`canal-orange`). It's barely used (about 6 places). Keep it out of new work unless the theme is changed deliberately.

### Neutral
- **Ink** (#0f172a): headings and strong text (`slate-900`).
- **Body Slate** (#475569): body copy (`slate-600`).
- **Muted Slate** (#64748b): captions, "from" labels, footnotes.
- **Hairline** (#e2e8f0): card borders and table dividers (`slate-200`).
- **Mist** (#f8fafc): boxed include rows and zebra table rows (`slate-50`).
- **Warm Paper** (#fafaf9): page background (`stone-50`).
- **White** (#ffffff): cards and the header.

### Named Rules
**The One Action Colour Rule.** Every booking action is royal blue. Canal blue, navy and amber never sit on a booking button.

**The Amber Is For Stars Rule.** Amber marks ratings only. It isn't used for warnings, badges or urgency.

## Typography

**Display Font:** Outfit (with system-ui, sans-serif)
**Body Font:** Plus Jakarta Sans (with system-ui, sans-serif)

**Character:** A friendly geometric display face over a warm, highly legible humanist sans. Modern and approachable without feeling corporate.

### Hierarchy
- **Display** (700, 1.875rem → 3rem, 1.15): the hero H1 only.
- **Headline** (700, 1.875rem → 2.25rem, 1.2): section H2s.
- **Title** (700, 1.125rem, 1.35): card titles and promo-card names, clamped to 2 lines.
- **Body** (400, 1rem, 1.6): paragraphs and guide text, kept to about 70ch in guides.
- **Label** (700, 0.75rem, 0.1em, uppercase): eyebrows, "from" labels, table headers and ribbons.

### Named Rules
**The Two Faces Rule.** Outfit for headings, Plus Jakarta Sans for everything else. No third font.

## Layout

- **Container:** a single centred container, max 1152px (`max-w-6xl`) with 16px / 24px side padding.
- **Rhythm:** sections stack at 80px vertical spacing (`py-20`), each led by eyebrow → H2 → subheading (max about 48rem).
- **Tour cards:** a 1 / 2 / 3 column grid with 24px gaps.
- **Price comparison:** a horizontally scrollable table on small screens (min width 700px).
- **Guides:** a two-column layout (article plus a 280px sidebar) on large screens, single column below.
- **Mobile:** a fixed bottom booking bar for the featured cruise, and a 64px sticky white header.

## Elevation & Depth

A light, layered system: white cards with a hairline border and a small shadow sit on warm paper, lifting slightly on hover. Dark navy bands give depth by contrast rather than shadow.

### Shadow Vocabulary
- **Rest** (`box-shadow: 0 1px 2px rgba(0,0,0,0.05)`): cards and the table at rest.
- **Lift** (`box-shadow: 0 20px 25px -5px rgba(30,58,138,0.05)` plus `translateY(-4px)`): card hover.
- **Button** (`box-shadow: 0 4px 6px -1px rgba(37,99,235,0.2)`): primary buttons.

### Named Rules
**The No Glow Rule.** The Tailwind `glow` and `blue-glow` shadows exist in config but aren't used in new work. Depth comes from lift, not light.

## Shapes

Softly rounded rectangles throughout: 12px for buttons and small panels, 16px for cards, images and tables, 8px for ribbons and badges, and full pills for rating chips. Images fill their frames edge to edge with `object-cover`. There's no decorative geometry.

## Components

### Buttons
- **Character:** solid, friendly and confident.
- **Shape:** gently rounded (12px).
- **Primary:** royal blue with white bold text (10px 20px; 12px 24px in promos). Legacy code uses the blue→indigo→sky gradient. New work uses solid royal blue.
- **Hover / Focus:** a small scale (1.02) plus a slightly stronger shadow. Focus uses a visible 2px royal-blue ring.
- **Secondary:** a white or translucent-white outline on dark backgrounds (hero), or plain text links on light ones.

### Chips (ribbons and rating badges)
- **Ribbon:** royal blue fill, white uppercase label, 8px radius, top-left of the card image.
- **Rating badge:** white pill on the image with amber star, value and count. Always attributed ("on GetYourGuide") in the card body.

### Cards / Containers (tour card)
- **Corner Style:** 16px.
- **Background:** white with a hairline border. The featured card has a 2px royal-blue border.
- **Shadow Strategy:** rest, then lift on hover (see Elevation).
- **Internal Padding:** 20–24px.
- **Content:** 16:10 image → title (2 lines) → description (2 lines) → up to 3 boxed include rows on mist → rating, duration and cancellation → footer with "from €" price and the booking button.

### Navigation
- **Header:** sticky white bar (64px) with a hairline bottom border and slight blur. Nav links are semibold slate-700, turning royal blue on hover with an underline that grows from the left. A "Book" button on the right.
- **Mobile:** a slide-in menu, and a fixed bottom bar with the featured cruise, its price and the booking button.

### Price Comparison Table
Navy header row with white uppercase labels, zebra rows on mist, "from €" prices in royal blue, and a small primary button per row. A footnote gives the date prices were checked.

## Do's and Don'ts

### Do:
- **Do** use royal blue (#2563eb) as a solid fill for every booking button in new work.
- **Do** show prices as "from €X" with the date they were checked, and ratings as attributed text ("4.5★ · 27,381 reviews on GetYourGuide").
- **Do** keep cards white on warm paper (#fafaf9) with 16px corners and a hairline border.
- **Do** use real canal photography (boats, canal houses, bridges, water).

### Don't:
- **Don't** use tourist clichés as decoration: tulips, clogs, windmills, cartoon cheese.
- **Don't** add urgency or pressure: "Limited spots", countdowns, "only X left", flashing badges.
- **Don't** introduce new blue→indigo→sky gradients or glow shadows. Replace the legacy ones when a component is touched.
- **Don't** use amber or brick orange on booking buttons.
