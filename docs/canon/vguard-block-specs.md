# Block specs: V Guard Studio

Names and budgets come from `vguard-site-blueprint-vN.md`; if a limit here differs, the Blueprint wins.

## Contents
1. Fields every block gets
2. Layer 1 blocks
3. Layer 2 blocks
4. Lead blocks: form and selector
5. Global elements
6. Data shapes for Claude Code

## 1. Fields every block gets

| Field | What to write |
|---|---|
| Block | Library name, numbered in page order |
| Job | One line: what the reader understands here |
| Slot text NL / UA | Real words per field, both locales |
| Facts | F, P, D IDs for every number or claim, with status |
| Visual | Photo (which project), icon keyword, emphasis |
| SEO duty | What this block carries for search, if anything |
| Mobile | Behaviour at 375 px |
| Accessibility | Alt text, focus order, labels |

## 2. Layer 1 blocks

**Hero.** Eyebrow up to 3 words (optional), H1 up to 8 words, subheading up to 20 words, primary button «Offerte aanvragen» / «Отримати оцінку», secondary WhatsApp. Background: one real V Guard photo, darkened for contrast; no video. The only H1 on the page; service pages include the service and Vroomshoop or Twente.

**ProofStrip.** 2-3 chips, 3-6 words each, icon keyword per chip. Allowed sources: F5 process, F6 workmanship warranty, F8 certificate, F9 brands as text. Chips with ОЗВУЧЕНО facts are marked and hidden until confirmed. No stars, ratings or «trusted by».

**AnswerBox** (service pages). 1-2 sentences, up to 40 words, inside the first 100 words: what the service is, for whom, where. Plain HTML text.

**ServiceCards** (Home). 3 cards in order PPF, ramen blinderen, car wrapping. Fields: real photo, title up to 4 words, line up to 12 words, «vanaf €» from `services.ts` only if confirmed, link. Single column on 375.

**ProcessSteps** (key diagram). 4-5 steps from F5: title up to 3 words, line up to 12 words, icon keyword. Example order: wassen → kleibehandeling → ontvetten → aanbrengen → controle. Text alternative as an ordered list in HTML. Horizontal on 1280, vertical on 375.

**PackageCards** (PPF). Full Front, Full Body, Custom/gedeeltelijk. Fields: name, zones list (confirmed), price variable or «prijs op aanvraag», button to the form with the package preselected. No «most popular» badge.

**PriceTable** (tint). Rows: body types from `services.ts`; columns: option; values only confirmed P-prices. Caption with «vanaf» and BTW note as V Guard confirms. Scrolls inside its own container on 375.

## 3. Layer 2 blocks

**LegalNote** (tint). F10 wording verbatim in NL and UA, link to rijksoverheid.nl, line «Wij adviseren alleen toegestane folies» style statement only if V Guard confirms it.

**ProjectGallery.** Items from `src/content/projects/`: photo, car (make, model), service, film if known, caption up to 12 words. Lazy-loaded images, alt text «<auto> <dienst> door V Guard Studio». No video.

**TrustBlock.** Warranty (F6, F7 exact wording), certificate (F8 image after scan), brands (F9 as text), process link. Each element renders only when its fact is ПІДТВЕРДЖЕНО.

**ReviewsBlock.** 2-4 real Google reviews copied manually with name and date + link to all reviews. Renders only when reviews exist. No widgets, no API.

**FAQ.** Questions and answers from the copy file, answers up to 60 words. FAQPage JSON-LD from the same data.

**CtaBand.** Headline up to 6 words, line up to 15 words, «Offerte aanvragen» + WhatsApp.

**ContactBlock.** Name, address, phone, WhatsApp, hours from `site.ts`; «Route in Google Maps» link; optional click-to-load map.

## 4. Lead blocks

**QuoteForm (base, acceptance criterion).** Steps per Blueprint section 6. Rules: one question per step on mobile, Back button, progress «Stap 2 van 4», fields keep values on Back, phone required, email optional, privacy consent checkbox with link, honeypot field, clear error text in the field language. Submission through Netlify Forms; success screen with WhatsApp continuation (`wa.me/<number>?text=` URL-encoded summary).

**QuoteSelector (bonus).** Same data and same Netlify form, but steps 1 and 3 use large tappable cards with a simple icon or a generic car silhouette with up to 4 zones. No model-specific images, no price calculation beyond an optional «vanaf» line from `services.ts`. Time box 6-8 hours; otherwise ship the base form.

**Telegram message format.** `Nieuwe aanvraag` · dienst · optie · merk model bouwjaar carrosserie · naam · telefoon · e-mail · opmerking · taal · pagina. Plain text, no personal data beyond the form.

## 5. Global elements

Header, mobile menu, StickyMobileBar (WhatsApp · Bellen · Offerte), footer with NAP and socials as links. A page blueprint only states deviations.

## 6. Data shapes

```ts
// src/data/services.ts
type PriceStatus = 'confirmed' | 'spoken' | 'none';
interface Service { slug: 'ppf' | 'ramen-blinderen' | 'car-wrapping'; order: number;
  options: { id: string; label: { nl: string; uk: string }; priceFrom?: number; priceStatus: PriceStatus }[] }
// Only priceStatus === 'confirmed' renders a price.

// src/content/projects/*.md frontmatter
// car: string; service: slug; film?: string; image: string; caption: { nl: string; uk: string }; date: string
```
