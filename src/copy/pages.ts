// Projecten, Contact, 404. Design prompt sections 10, 11, 12, 13 and frame 10.
import { site } from '../config/site.ts';
import type { Locale } from '../data/fact.ts';
import type { CtaBand } from './shared.ts';

export const projectsCopy = {
  nl: {
    title: 'Projecten: PPF, ramen blinderen en wraps | V Guard Studio',
    description: 'Echte projecten van V Guard Studio in Vroomshoop: PPF, getinte ruiten en car wrapping.',
    h1: 'Projecten van V Guard Studio',
    sub: "Echte auto's uit onze studio in Vroomshoop: PPF, getinte ruiten en wraps.",
    cta: { title: 'Jouw auto als volgende?', text: 'Vraag een offerte aan of stuur ons een WhatsApp.' } satisfies CtaBand,
  },
  uk: {
    title: 'Проєкти V Guard Studio',
    description: 'Справжні проєкти V Guard Studio у Vroomshoop: PPF, тонування і car wrapping.',
    h1: 'Проєкти V Guard Studio',
    sub: 'Справжні авто з нашої студії у Vroomshoop: PPF, тонування і wrap.',
    cta: { title: 'Ваше авто наступне?', text: 'Отримайте оцінку або напишіть нам у WhatsApp.' } satisfies CtaBand,
  },
} satisfies Record<Locale, unknown>;

export const contactCopy = {
  nl: {
    title: 'Offerte en contact | V Guard Studio Vroomshoop',
    description:
      'Vraag in vier stappen een offerte aan voor PPF, ramen blinderen of car wrapping. V Guard Studio, Twentelaan 14 D, Vroomshoop.',
    h1: 'Offerte aanvragen bij V Guard Studio',
    sub: `Vier korte stappen. We nemen ${site.responseTime.value.nl} contact op via telefoon of WhatsApp.`,
  },
  uk: {
    title: 'Оцінка і контакти | V Guard Studio',
    description: 'Отримайте оцінку на PPF, тонування або car wrapping у чотири кроки. V Guard Studio, Twentelaan 14 D, Vroomshoop.',
    h1: 'Отримати оцінку у V Guard Studio',
    sub: `Чотири короткі кроки. Зв'яжемося ${site.responseTime.value.uk} телефоном або у WhatsApp.`,
  },
} satisfies Record<Locale, unknown>;

export const notFoundCopy = {
  nl: {
    title: 'Pagina niet gevonden | V Guard Studio',
    h1: 'Deze pagina bestaat niet (meer)',
    text: 'Ga terug naar home of vraag direct een offerte aan.',
  },
  uk: {
    title: 'Сторінку не знайдено | V Guard Studio',
    h1: 'Такої сторінки немає (більше)',
    text: 'Поверніться на головну або одразу отримайте оцінку.',
  },
} satisfies Record<Locale, unknown>;
