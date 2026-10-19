// WhatsApp continuation on the quote form success screen (step 22): one plain-text message in the
// page language. Pure and import-free, so the browser bundle only gets this function; the labels
// for a locale come from wa-labels.ts (server side, data-wa-labels).

export interface WaLabels {
  /** «Hallo V Guard Studio, hierbij foto's ...» / «Вітаю, V Guard Studio! ...» */
  intro: string;
  /** «Dienst» / «Послуга» */
  service: string;
  /** «Auto» / «Авто» */
  car: string;
  /** «kleur of finish» / «колір або фініш», lower case: it sits inside the service line. */
  kleur: string;
  /** Service id (and «advies») → label. */
  services: Record<string, string>;
  /** Service id → option id → label. */
  options: Record<string, Record<string, string>>;
  /** Wrap part id → label, lower case. */
  parts: Record<string, string>;
  /** Body type id → label. */
  bodies: Record<string, string>;
}

/** What the visitor chose, as form ids and raw text. */
export interface WaRequest {
  dienst: string;
  optie?: string;
  delen?: string[];
  kleur?: string;
  merk: string;
  model: string;
  bouwjaar?: string;
  carrosserie?: string;
}

const clean = (v: string | undefined) => (v ?? '').trim();

/**
 * Intro, then «Dienst: service, option (parts), kleur of finish: …», then «Auto: merk model jaar, body».
 * Empty values leave no separator or brackets behind.
 */
export function waText(l: WaLabels, r: WaRequest): string {
  const service = l.services[r.dienst] ?? clean(r.dienst);
  const option = r.optie ? (l.options[r.dienst]?.[r.optie] ?? r.optie) : '';
  const parts = (r.delen ?? []).map((id) => l.parts[id] ?? id).filter(Boolean);
  const optionAndParts = option && parts.length ? `${option} (${parts.join(', ')})` : option || parts.join(', ');
  const kleur = clean(r.kleur) ? `${l.kleur}: ${clean(r.kleur)}` : '';
  const serviceLine = [service, optionAndParts, kleur].filter(Boolean).join(', ');

  const car = [r.merk, r.model, r.bouwjaar].map(clean).filter(Boolean).join(' ');
  const body = r.carrosserie ? (l.bodies[r.carrosserie] ?? r.carrosserie) : '';
  const carLine = [car, body].filter(Boolean).join(', ');

  return [l.intro, serviceLine && `${l.service}: ${serviceLine}`, carLine && `${l.car}: ${carLine}`]
    .filter(Boolean)
    .join('\n');
}
