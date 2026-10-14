// Home (/ and /uk/). Design prompt sections 6, 12, 13.
import { trust } from '../config/site.ts';
import type { Locale } from '../data/fact.ts';
import type { ServiceSlug } from '../data/services.ts';
import { chipPrep, chipWarranty, type Step } from './shared.ts';

const brands = trust.brands.value.join(', ');

export const home = {
  nl: {
    title: 'PPF, ramen blinderen en car wrapping Vroomshoop | V Guard Studio',
    description:
      'V Guard Studio in Vroomshoop, Twente: PPF lakbescherming, ramen blinderen en car wrapping. Bekijk prijzen en ons werk en vraag een offerte aan.',
    h1: 'PPF, ramen blinderen en car wrapping in Vroomshoop',
    sub: 'Bescherming en een nieuwe uitstraling voor je auto. Onze studio vind je in Twente.',
    chips: [chipWarranty.nl, brands, chipPrep.nl],
    servicesTitle: 'Wat we doen',
    cards: {
      ppf: { title: 'PPF-lakbescherming', text: 'Transparante beschermfolie tegen steenslag en lichte krassen.', more: 'Meer over PPF' },
      'ramen-blinderen': {
        title: 'Ramen blinderen',
        text: 'Meer privacy en minder hinder van fel zonlicht.',
        more: 'Meer over ramen blinderen',
      },
      'car-wrapping': {
        title: 'Car wrapping',
        text: 'Een nieuwe kleur of afwerking voor je hele auto of losse onderdelen.',
        more: 'Meer over car wrapping',
      },
    } satisfies Record<ServiceSlug, { title: string; text: string; more: string }>,
    // Card illustrations (AI, D18): neutral alt; PPF and wrap keep the empty alt they have on their own pages.
    cardAlts: {
      ppf: '',
      'ramen-blinderen': 'Handen brengen raamfolie aan met een rakel',
      'car-wrapping': '',
    } satisfies Record<ServiceSlug, string>,
    processTitle: 'Kwaliteit boven snelheid',
    processSub: 'Zo brengen we PPF en wrapfolie aan.',
    // Home only: the PPF page has its own steps.
    steps: [
      { title: 'Wassen', text: 'We reinigen de auto grondig in meerdere stappen.' },
      { title: 'Kleibehandeling', text: 'Met reinigingsklei verwijderen we vastzittend vuil van de lak.' },
      { title: 'Ontvetten', text: 'We ontvetten de lak zodat de folie goed hecht.' },
      { title: 'Aanbrengen', text: 'We brengen de folie zorgvuldig aan op de voorbereide lak.' },
      { title: 'Controle', text: 'We controleren de randen en het oppervlak voordat je de auto ophaalt.' },
    ] satisfies Step[],
    recentTitle: 'Recent uitgevoerde projecten',
    whyTitle: 'Waarom V Guard Studio',
    reviewsTitle: 'Wat klanten zeggen',
    reviewsLink: 'Alle reviews op Google',
    quoteTitle: 'Waarvoor wil je een offerte aanvragen?',
    quoteText: 'Kies een dienst en vertel ons wat voor auto je hebt.',
  },
  uk: {
    title: 'PPF, тонування та обклеювання авто у Vroomshoop | V Guard Studio',
    description:
      'V Guard Studio у Vroomshoop, Твенте: PPF захист лаку, тонування і car wrapping. Подивіться ціни і наші роботи та отримайте оцінку.',
    h1: 'PPF, тонування та обклеювання авто у Vroomshoop',
    sub: 'Захист кузова та оновлення вигляду авто. Студія в регіоні Twente.',
    chips: [chipWarranty.uk, brands, chipPrep.uk],
    servicesTitle: 'Що ми робимо',
    cards: {
      ppf: { title: 'PPF захист кузова', text: 'Прозора плівка для захисту кузова від сколів і подряпин.', more: 'Детальніше про PPF' },
      'ramen-blinderen': {
        title: 'Тонування скла',
        text: 'Більше приватності та захист від яскравого сонця.',
        more: 'Детальніше про тонування',
      },
      'car-wrapping': {
        title: 'Обклеювання плівкою',
        text: 'Зміна кольору або фактури всього кузова чи окремих деталей.',
        more: 'Детальніше про обклеювання',
      },
    } satisfies Record<ServiceSlug, { title: string; text: string; more: string }>,
    // Card illustrations (AI, D18): neutral alt; PPF and wrap keep the empty alt they have on their own pages.
    cardAlts: {
      ppf: '',
      'ramen-blinderen': 'Руки наносять плівку на скло ракелем',
      'car-wrapping': '',
    } satisfies Record<ServiceSlug, string>,
    processTitle: 'Якість важливіша за швидкість',
    processSub: 'Так ми встановлюємо захисну та вінілову плівку.',
    // Home only: the PPF page has its own steps.
    steps: [
      { title: 'Миття', text: 'Ретельно миємо авто та видаляємо забруднення.' },
      { title: 'Очищення глиною', text: 'Спеціальна глина видаляє стійкі забруднення з поверхні кузова.' },
      { title: 'Знежирення', text: 'Знежирюємо поверхню для надійного зчеплення плівки.' },
      { title: 'Монтаж', text: 'Встановлюємо плівку на підготовлену поверхню.' },
      { title: 'Перевірка', text: 'Перевіряємо краї та поверхню плівки перед видачею авто.' },
    ] satisfies Step[],
    recentTitle: 'Наші роботи',
    whyTitle: 'Чому V Guard Studio',
    reviewsTitle: 'Відгуки клієнтів',
    reviewsLink: 'Усі відгуки в Google',
    quoteTitle: 'Як дізнатися вартість?',
    quoteText: 'Оберіть послугу та вкажіть марку й модель авто.',
  },
} satisfies Record<Locale, unknown>;
