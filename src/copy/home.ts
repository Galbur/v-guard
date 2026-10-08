// Home (/ and /uk/). Design prompt sections 6, 12, 13.
import { trust } from '../config/site.ts';
import type { Locale } from '../data/fact.ts';
import type { ServiceSlug } from '../data/services.ts';
import { chipPrep, chipWarranty } from './shared.ts';

const brands = trust.brands.value.join(', ');

export const home = {
  nl: {
    title: 'PPF, ramen blinderen en car wrapping Vroomshoop | V Guard Studio',
    description:
      'V Guard Studio in Vroomshoop, Twente: PPF lakbescherming, ramen blinderen en car wrapping. Bekijk prijzen en ons werk en vraag een offerte aan.',
    h1: 'PPF, ramen blinderen en car wrapping in Vroomshoop',
    sub: 'Bescherming en een nieuwe look voor je auto. Studio in Twente.',
    chips: [chipWarranty.nl, brands, chipPrep.nl],
    servicesTitle: 'Wat we doen',
    cards: {
      ppf: { title: 'PPF lakbescherming', text: 'Transparante folie die je lak beschermt tegen steenslag en krassen.', more: 'Meer over PPF' },
      'ramen-blinderen': { title: 'Ramen blinderen', text: 'Meer privacy en minder felle zon in je auto.', more: 'Meer over ramen blinderen' },
      'car-wrapping': {
        title: 'Car wrapping',
        text: 'Nieuwe kleur of finish met folie, volledig of gedeeltelijk.',
        more: 'Meer over car wrapping',
      },
    } satisfies Record<ServiceSlug, { title: string; text: string; more: string }>,
    processTitle: 'Kwaliteit boven snelheid',
    processSub: 'Zo werken we bij PPF en wraps.',
    recentTitle: 'Recent werk',
    whyTitle: 'Waarom V Guard Studio',
    reviewsTitle: 'Wat klanten zeggen',
    reviewsLink: 'Alle reviews op Google',
    quoteTitle: 'Waarvoor wil je een offerte?',
    quoteText: 'Kies een dienst en vertel ons welke auto je hebt.',
  },
  uk: {
    title: 'PPF, тонування і car wrapping у Vroomshoop | V Guard Studio',
    description:
      'V Guard Studio у Vroomshoop, Твенте: PPF захист лаку, тонування і car wrapping. Подивіться ціни і наші роботи та отримайте оцінку.',
    h1: 'PPF, тонування і обклеювання плівкою у Vroomshoop',
    sub: 'Захист і новий вигляд вашого авто. Студія у Твенте.',
    chips: [chipWarranty.uk, brands, chipPrep.uk],
    servicesTitle: 'Що ми робимо',
    cards: {
      ppf: { title: 'PPF захист лаку', text: 'Прозора плівка, що захищає лак від сколів і подряпин.', more: 'Детальніше про PPF' },
      'ramen-blinderen': {
        title: 'Тонування вікон',
        text: 'Більше приватності й менше яскравого сонця в салоні.',
        more: 'Детальніше про тонування',
      },
      'car-wrapping': {
        title: 'Обклеювання плівкою',
        text: 'Новий колір або фініш плівкою, повністю чи частково.',
        more: 'Детальніше про обклеювання',
      },
    } satisfies Record<ServiceSlug, { title: string; text: string; more: string }>,
    processTitle: 'Якість важливіша за швидкість',
    processSub: 'Так ми працюємо з PPF і wrap.',
    recentTitle: 'Наші роботи',
    whyTitle: 'Чому V Guard Studio',
    reviewsTitle: 'Відгуки клієнтів',
    reviewsLink: 'Усі відгуки в Google',
    quoteTitle: 'Для чого потрібна оцінка?',
    quoteText: 'Оберіть послугу і розкажіть, яке у вас авто.',
  },
} satisfies Record<Locale, unknown>;
