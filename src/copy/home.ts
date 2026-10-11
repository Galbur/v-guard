// Home (/ and /uk/). Design prompt sections 6, 12, 13.
import { trust } from '../config/site.ts';
import type { Locale } from '../data/fact.ts';
import type { ServiceSlug } from '../data/services.ts';
import { chipPrep, chipWarranty, prepSteps, type Step } from './shared.ts';

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
    steps: prepSteps.nl,
    recentTitle: 'Recent werk',
    whyTitle: 'Waarom V Guard Studio',
    reviewsTitle: 'Wat klanten zeggen',
    reviewsLink: 'Alle reviews op Google',
    quoteTitle: 'Waarvoor wil je een offerte?',
    quoteText: 'Kies een dienst en vertel ons welke auto je hebt.',
  },
  uk: {
    title: 'PPF, тонування і обклеювання плівкою у Vroomshoop | V Guard Studio',
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
