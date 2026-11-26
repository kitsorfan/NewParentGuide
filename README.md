# Newborn Guide · Οδηγός Νεογέννητου

A bilingual (Greek / English) guide for parents expecting a baby in Greece. Seven pages, reachable
from the left sidebar (a slide-in menu on phones):

| Page                     | What it covers                                                                                                                                                                                                                                                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shopping list**        | 74 items in 9 categories, each with a **priority** (essential / recommended / optional), **quantity**, **Greek price range**, a photo, a hover hint on _why_ to buy it, a **"what to look for"** checklist, a Skroutz link, and what another parent bought in 2024. Budget totals and a tick-list. |
| **Hospital bag**         | What to pack for the maternity hospital (documents, mum, baby, partner, trip home), ticked off and remembered, linked to the shopping list.                                                                                                                                                        |
| **Month by month**       | What to expect from the first two weeks to the first birthday: feeding, sleep, development, care, safety, and when to call the paediatrician. Enter the birth/due date to see "you are here".                                                                                                      |
| **Sleep guide**          | Safe sleep (the three basics, do's and don'ts, safer bed-sharing), how much sleep by age, a room-temperature/TOG chart, routines and settling, coping with crying, and when to get help. With a birth date, the baby's age band is marked.                                                         |
| **Breastfeeding guide**  | The first days, stomach size, latch step by step and feeding positions, a nappy chart for "is baby getting enough?", common problems (sore nipples, engorgement, mastitis, supply, tongue-tie, thrush), expressing and storing milk, and Greek support (helpline 10525, La Leche League Greece).   |
| **Vaccines & check-ups** | Timeline of pregnancy vaccines, hospital tests, paediatric check-ups and the Greek National Immunisation Programme 2026, a vaccine chart, and the paperwork after birth. With a due date, every step gets a calendar date.                                                                         |
| **Sources**              | Every official source used, photo credits and the disclaimer.                                                                                                                                                                                                                                      |

Built with React 19, TypeScript 7 (strict) and Vite 8. It is a static site with hash-based routing
(`#/guide`, `#/health/vaccines`, …), so it works on GitHub Pages with no server configuration.
Light and dark mode follow the system setting.

## Getting started

Requires Node.js 22+ (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                                      |
| ------------------- | ----------------------------------------------------------------- |
| `npm run dev`       | Start the dev server                                              |
| `npm run build`     | Type-check and build to `dist/`                                   |
| `npm run preview`   | Serve the production build locally                                |
| `npm run typecheck` | TypeScript only                                                   |
| `npm run lint`      | [oxlint](https://oxc.rs) (React, hooks, a11y, TypeScript, Vitest) |
| `npm run format`    | Format with Prettier (`format:check` to verify)                   |
| `npm test`          | Run the tests once (`test:watch` for watch mode)                  |
| `npm run coverage`  | Tests with a coverage report (fails under 80% lines)              |
| `npm run check`     | Everything CI runs: typecheck + lint + format check + tests       |

> Windows note: `npm test` goes through `scripts/vitest.mjs`, which upper-cases the drive letter of
> the working directory. Without it, a terminal opened as `c:\…` makes Vitest fail with
> "failed to find the current suite".

## Deploying to GitHub Pages

1. Create a GitHub repository and push this folder to its `main` branch.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which checks, tests and builds the
   site, then publishes it at `https://<user>.github.io/<repo>/`.

The build uses a relative base (`base: './'`), so the repository can have any name. Pull requests
and other branches run the same checks via `.github/workflows/ci.yml`.

Share a link in a specific language with `?lang=en` or `?lang=el`, e.g. `…/?lang=en#/bag`.

## Project structure

```text
src/
  data/            ← all content: edit these to change the guide
    items.ts             the 74 shopping-list items (text, priority, quantity, prices)
    lookFor.ts           "what to look for" checklists per item
    photos.ts            photo credits (files in public/images/items/)
    referenceOrder.ts    the 2024 order from the PDF
    hospitalBag.ts       hospital-bag checklist
    stages.ts            month-by-month guide
    sleep.ts             sleep guide
    breastfeeding.ts     breastfeeding guide
    health.ts            vaccines, tests, check-ups, paperwork (+ their sources)
    categories.ts, avoid.ts, tips.ts, sources.ts
  pages/           ← one component per page
  components/      ← cards, sidebar, hints, …
  router/          ← tiny hash router (no dependency)
  i18n/            ← UI strings (messages.ts) and the language provider
  lib/             ← pure logic: budget, filtering, dates, catalog helpers
  hooks/           ← localStorage-backed state, scroll-spy, page sections
  styles/          ← design tokens (light + dark), base and app styles
```

### Updating content

- **Prices or items:** edit `src/data/items.ts`. Each `price` is for **one unit** (see `unit`), and
  `typical` is a sensible mid-range choice used in the totals.
- **Vaccine schedule:** `src/data/health.ts` follows the Ministry of Health circular of 4/3/2026.
  Check [moh.gov.gr](https://www.moh.gov.gr) for a newer programme each year.
- **Translations:** every text has `el` and `en`. The English UI strings in `src/i18n/messages.ts`
  are typed against the Greek ones, so a missing translation is a compile error.

The data tests (`src/data/*.test.ts`) check that every text has both languages, prices are
consistent, links are https, bag entries point to real items, the vaccine chart only uses known
columns, and that the reference order still adds up to €960.32, so `npm test` catches most mistakes.

## Photos

Item photos are openly licensed (Creative Commons) photos of the _type_ of product, self-hosted as
WebP in `public/images/items/`, and credited on the Sources page. Shop and manufacturer photos are
copyrighted, so they are not used; the Skroutz link on each card shows real products.

## Disclaimer

Prices are indicative and change often. The guidance summarises public advice (Greek Ministry of
Health, AAP, NHS, WHO and others listed on the Sources page) and does **not** replace advice from
your paediatrician.
