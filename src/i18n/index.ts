import { nl, type UiKey } from './nl.ts';
import { uk } from './uk.ts';
import type { Locale } from './routes.ts';

export type { UiKey };

const dictionaries: Record<Locale, Record<UiKey, string>> = { nl, uk };

/** UI string for a locale; `{name}` placeholders are filled from params. */
export function t(key: UiKey, locale: Locale, params?: Record<string, string | number>): string {
  const value = dictionaries[locale][key];
  if (!params) return value;
  return value.replace(/\{(\w+)\}/g, (match, name: string) => (name in params ? String(params[name]) : match));
}
