// Labels for the WhatsApp continuation in one locale, from services.ts and the UI dictionary
// (never from the Dutch form values). Built at build time and passed to the form as data-wa-labels.
import { adviceOption, bodyTypes, services, wrapFormParts } from '../data/services.ts';
import { t } from '../i18n/index.ts';
import type { Locale } from '../i18n/routes.ts';
import type { WaLabels } from './wa-text.ts';

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export function waLabels(locale: Locale): WaLabels {
  return {
    intro: t('form.wa.intro', locale),
    service: t('form.wa.service', locale),
    car: t('form.wa.car', locale),
    kleur: lowerFirst(t('form.wa.kleur', locale)),
    services: Object.fromEntries([
      ...services.map((s) => [s.slug, s.label[locale]]),
      [adviceOption.id, adviceOption.label[locale]],
    ]),
    options: Object.fromEntries(
      services.map((s) => [s.slug, Object.fromEntries(s.options.map((o) => [o.id, o.label[locale]]))]),
    ),
    parts: Object.fromEntries(wrapFormParts.map((p) => [p.formPart, p.formLabel[locale].toLowerCase()])),
    bodies: Object.fromEntries(bodyTypes.map((b) => [b.id, b.label[locale]])),
  };
}
