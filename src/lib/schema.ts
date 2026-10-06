// JSON-LD nodes for service pages (design prompt section 13): Service + Offer, FAQPage.
import { isPriceShown, type Price } from '../data/services.ts';
import type { Faq } from '../copy/shared.ts';

export interface OfferInput {
  name: string;
  price: Price;
}

export function serviceSchema(opts: { name: string; serviceType: string; url: string; offers: OfferInput[] }) {
  return {
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.serviceType,
    url: opts.url,
    provider: { '@id': `${new URL('/', opts.url).href}#business` },
    areaServed: ['Vroomshoop', 'Twente'],
    offers: opts.offers
      .filter((o) => isPriceShown(o.price) && !o.price.plus)
      .map((o) => ({
        '@type': 'Offer',
        name: o.name,
        priceCurrency: 'EUR',
        ...(o.price.from
          ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: o.price.amount, priceCurrency: 'EUR', valueAddedTaxIncluded: true } }
          : { price: o.price.amount }),
      })),
  };
}

/** FAQPage from exactly the questions rendered on the page. */
export function faqSchema(items: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
