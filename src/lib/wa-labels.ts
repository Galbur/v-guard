// Labels for the WhatsApp continuation in one locale and for the Ukrainian owner text (leadLabels),
// from services.ts, the UI dictionary and copy/lead.ts (never from the Dutch form values). Built at
// build time and passed to the form as data-wa-labels and data-lead-labels.
import { leadCopy } from '../copy/lead.ts';
import { adviceOption, bodyTypes, services, wrapFormParts } from '../data/services.ts';
import { t } from '../i18n/index.ts';
import type { Locale } from '../i18n/routes.ts';
import type { LeadLabels } from './lead-text.ts';
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

/** Labels for the owner-facing request text: always Ukrainian (step 23). */
export function leadLabels(): LeadLabels {
  const { name, phone, email, comment, language, languages } = leadCopy;
  return { ...waLabels('uk'), name, phone, email, comment, language, languages };
}
