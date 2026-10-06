# CLAUDE.md: V Guard Studio website

Local car studio in Vroomshoop (NL): PPF, ramen blinderen, car wrapping. Small, fast, mobile-first marketing site whose job is to turn visitors from Google Maps and TikTok into requests. Not a web application.

## Canon

Facts, prices, decisions: `docs/canon/vguard-site-truth-vN.md` (highest N). Structure and blocks: `docs/canon/vguard-site-blueprint-vN.md`. Page blueprints: `docs/blueprints/`. If a prompt conflicts with the canon, stop and report. Never invent a fact, price, warranty, brand or address.

## Stack

- Astro, static output. Plain CSS with tokens in `src/styles/tokens.css`. No UI framework, no Tailwind.
- JS only for: mobile menu, form steps, optional selector. No hydration frameworks.
- Netlify hosting, Netlify Forms, one function `netlify/functions/submission-created.ts`.

## Structure

```
src/
  config/site.ts        NAP, phone, WhatsApp, emails, socials, LIVE_PAGES, SITE_URL
  data/services.ts      services, packages, body types, options, prices with status
  content/projects/     one file per project (car, service, film, image, caption nl/uk)
  i18n/nl.ts, uk.ts     UI strings; t(key, locale)
  i18n/routes.ts        page pairs NL ↔ UA; localizedPath()
  components/           Header, Footer, StickyMobileBar, Hero, ProofStrip, ServiceCards,
                        ProcessSteps, PackageCards, PriceTable, LegalNote, ProjectGallery,
                        TrustBlock, ReviewsBlock, FAQ, CtaBand, ContactBlock, QuoteForm
  layouts/Base.astro    head, SEO, hreflang, JSON-LD
  pages/                NL routes (root)
  pages/uk/             UA routes
netlify/functions/submission-created.ts
docs/canon/, docs/blueprints/, docs/prompts/
```

## Hard rules

1. No placeholders in site content: `TODO`, `TBD`, `[[`, `lorem`, fake phone numbers. A missing fact means the block does not render and the gap is reported.
2. Prices only from `src/data/services.ts`, and only when `priceStatus === 'confirmed'`. Format `€200`, «vanaf €200». Ranges with a hyphen.
3. NAP only from `src/config/site.ts`. Site, JSON-LD and footer read the same values.
4. No U+2014 (em dash) or U+2013 (en dash) anywhere in copy.
5. No video, no iframe, no third-party script, font or image before a user click. Fonts self-hosted. Google Maps only as a link or click-to-load.
6. Secrets (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) only in Netlify env vars, read in the function. Never in `src/`.
7. Every NL page has a UA pair with the same facts. Language switcher goes to the pair, not to the homepage.
8. Forbidden wording: «nr. 1», «de beste», «perfect», «snelste», «XPEL certified/dealer», competitor names, any guarantee of results.
9. Tint legality text only from Site Truth F10.
10. Accessibility: one H1, labelled form fields, focus visible, AA contrast, tap targets at least 44 px.
11. Preview builds are `noindex` until launch; `LIVE_PAGES` controls sitemap and links.

## Lead flow

Form `name="offerte"` with `data-netlify="true"`, `netlify-honeypot="bot-field"`, hidden `form-name`. Fields: dienst, optie, merk, model, bouwjaar, carrosserie, naam, telefoon, email (optional), opmerking, taal, pagina, privacy. Success state shows the WhatsApp continuation built from `site.ts` WhatsApp number and URL-encoded summary. The function formats a plain-text Telegram message; a Telegram failure is logged and never breaks the submission.

## Workflow

- Step 0 of every task: read-only discovery with `file:line` evidence.
- `npm run build` after every commit; fix all errors before the next step.
- Commit messages in English, imperative.
- Never push, open a PR or deploy without an explicit command.
- Report: what changed, commits, QA results, screenshots at 375 and 1280, «Не виконано / потрібне рішення».
