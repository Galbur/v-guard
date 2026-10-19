// Owner-facing text of a quote request (step 23): the form field «Заявка» and the Telegram message.
// Pure and import-free apart from wa-text.ts, so the browser bundle stays small; the labels are
// always Ukrainian (leadLabels in wa-labels.ts), whatever the page language.
import { carSummary, clean, serviceSummary, type WaLabels, type WaRequest } from './wa-text.ts';

export interface LeadLabels extends WaLabels {
  name: string;
  phone: string;
  email: string;
  comment: string;
  language: string;
  /** Page locale → language name. */
  languages: Record<string, string>;
}

export interface LeadRequest extends WaRequest {
  naam?: string;
  telefoon?: string;
  email?: string;
  opmerking?: string;
  /** Page locale: «nl» or «uk». */
  taal?: string;
}

/** One «Label: value» line per filled field; empty fields are left out entirely. */
export function leadText(l: LeadLabels, r: LeadRequest): string {
  const taal = clean(r.taal);
  return [
    [l.service, serviceSummary(l, r)],
    [l.car, carSummary(l, r)],
    [l.name, clean(r.naam)],
    [l.phone, clean(r.telefoon)],
    [l.email, clean(r.email)],
    [l.comment, clean(r.opmerking)],
    [l.language, taal ? (l.languages[taal] ?? taal) : ''],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
}
