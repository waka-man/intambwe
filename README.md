# Intambwe — Website Draft

*Designing Africa's Next Icons.* — a modern, dark, editorial single-page site for the
Kigali-based multidisciplinary creative studio & design house.

Built with **Astro + Bun**. Zero UI frameworks, scoped CSS, a tiny vanilla-TS interaction
layer (scroll reveal, custom cursor, magnetic buttons, live Kigali clock, mobile nav).

## Quick start

```bash
bun install
bun dev        # dev server at http://localhost:4321
bun run build  # static build -> dist/
bun run preview
```

Requires **Bun ≥ 1.1** (and Node ≥ 18 as a fallback).

## Structure

```
public/images/
  logo-blue.png        # original logo, white bg removed -> transparent blue mark
  logo-white.png       # dark-variant logo, dark bg removed -> transparent white mark
  work/alzuri-*.webp  # Alzuri (Kigali nightclub) photos, optimised to WebP
src/
  layouts/Layout.astro     # <head>, fonts, preloader, grain, script bootstrap
  components/Header.astro  # fixed wordmark nav + mobile panel
  components/Footer.astro  # wordmark, columns, live clock
  components/Marquee.astro # infinite capability marquee
  pages/index.astro        # the whole page (sections 01–06)
  styles/global.css        # design tokens + base + utilities
  scripts/main.ts          # interactions (respects prefers-reduced-motion)
```

## How the low-quality logos were handled

The supplied logos were raster JPEGs on solid backgrounds, so they couldn't be placed
directly on a dark UI. Two workarounds were used:

1. **Programmatic background removal** (`process_images.py`) produced transparent PNGs:
   a cobalt-blue mark (for light surfaces) and a white mark (for dark surfaces).
2. **A strong typographic wordmark** ("Intambwe") is the *primary* brand element in the
   chrome (header/footer/hero), with the raster marks shown only as framed "Identity"
   artifacts in the Studio section — a clean, intentional treatment that hides edge noise.

When a vector logo is supplied, drop it in as `public/images/logo.svg` and swap the
`<img>` sources; the wordmark can stay or be replaced.

## Design language

- **Palette:** warm near-black canvas (`#0a0a0c`), warm off-white ink (`#f3efe6`),
  single cobalt accent (`#2f5bff`) drawn from the logo. The nightclub imagery supplies
  the amber/red warmth — no second accent needed.
- **Type:** Space Grotesk (display) + Inter (body) + Instrument Serif italic (accents).
- **Motion:** subtle, slow, eased; fully disabled under `prefers-reduced-motion`.
- **References:** Off-White (bold editorial type), Karim Rashid (confidence/colour),
  Malerba (refined furniture restraint).

## Iteration roadmap (next passes)

- [ ] Replace logo PNGs with a vector SVG for crispness at all sizes.
- [ ] Add a `/work/[slug]` case-study template (brief, gallery, credits, process).
- [ ] Real contact form / Calendly integration in `#contact`.
- [ ] More projects beyond Alzuri (currently a single, repeated project).
- [ ] Open Graph hero image + a custom SVG favicon.
- [ ] Lighthouse pass: add explicit width/height to all `<img>` (avoid CLS), `preload`
      the hero image, add `aria-label`s to icon-only buttons.
- [ ] Consider a light theme toggle + i18n (EN/FR/KN) given the Kigali audience.

## Notes / assumptions

- Copy is adapted from the supplied brand brief; email/social links are placeholders
  (`hello@intambwe.rw`, `#` socials) — update before launch.
- Address ("Kigali Heights, 4th Floor") is a placeholder — replace with the real one.
- Images were processed from the WhatsApp-supplied JPEGs; source higher-res masters
  for the hero and case-study pages when available.
