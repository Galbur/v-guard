// Status wrapper for every value that is not yet confirmed in Site Truth.
// confirmed: ПІДТВЕРДЖЕНО · spoken: ОЗВУЧЕНО (Site Truth status, shown in preview per owner R1)
// default: «value | hint» marker from the design prompt (R1). Only the value renders; the hint
// stays in code and in `npm run check:defaults`. Before launch: check:defaults = 0
// or explicit owner approval (CLAUDE.md rules 1-2).

export type Status = 'confirmed' | 'spoken' | 'default';
export type Locale = 'nl' | 'uk';
export type Localized<T = string> = Record<Locale, T>;

export interface Fact<T> {
  value: T;
  status: Status;
  /** Site Truth ID and/or the hint from «value | hint» marker. */
  hint?: string;
}

export const fact = <T>(value: T, status: Status, hint?: string): Fact<T> => ({ value, status, hint });

/** «€1.795» */
export function euro(amount: number): string {
  return `€${amount.toLocaleString('nl-NL')}`;
}
