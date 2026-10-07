// Wrap configurator price indication (mockup «VG Site 04 Car wrapping v2»). Pure functions on
// a plain config, so the client island and the tests share them without loading services.ts.

export type BodyId = 'hatch' | 'sedan' | 'station' | 'suv' | 'bus' | 'coach';
export type PartId = 'dak' | 'spiegel' | 'chroom';

export interface PriceConfig {
  base: number;
  pakket: number;
  /** Carbon look surcharge, 0.1 = +10%. */
  carbon: number;
  /** factor null: price on request. coach: no Black styling pakket. */
  bodies: { id: BodyId; factor: number | null; van: boolean; coach: boolean }[];
  parts: { id: PartId; price: number; vanPrice: number }[];
}

export interface WrapState {
  body: BodyId;
  full: boolean;
  parts: Record<PartId, boolean>;
  finish: string;
}

const PART_IDS: PartId[] = ['dak', 'spiegel', 'chroom'];

function body(cfg: PriceConfig, id: BodyId) {
  const found = cfg.bodies.find((b) => b.id === id);
  if (!found) throw new Error(`Unknown body: ${id}`);
  return found;
}

/** Volledige wrap for a body, rounded to €5; null when the price is on request. */
export function fullPrice(cfg: PriceConfig, id: BodyId): number | null {
  const { factor } = body(cfg, id);
  return factor === null ? null : Math.round((cfg.base * factor) / 5) * 5;
}

export function partPrice(cfg: PriceConfig, part: PartId, id: BodyId): number {
  const p = cfg.parts.find((x) => x.id === part);
  if (!p) throw new Error(`Unknown part: ${part}`);
  return body(cfg, id).van ? p.vanPrice : p.price;
}

/** All three parts chosen on a body that has the pakket. */
export function isPakket(cfg: PriceConfig, st: WrapState): boolean {
  return !st.full && PART_IDS.every((p) => st.parts[p]) && !body(cfg, st.body).coach;
}

export function chosenParts(st: WrapState): PartId[] {
  return PART_IDS.filter((p) => st.parts[p]);
}

/** Indication in euro: null = on request, 0 = nothing chosen yet. */
export function wrapPrice(cfg: PriceConfig, st: WrapState): number | null {
  let price: number | null;
  if (st.full) price = fullPrice(cfg, st.body);
  else if (isPakket(cfg, st)) price = cfg.pakket;
  else price = chosenParts(st).reduce((sum, p) => sum + partPrice(cfg, p, st.body), 0);
  if (price !== null && st.finish === 'carbon') price *= 1 + cfg.carbon;
  return price === null ? null : Math.round(price);
}

/** «€1.795» */
export function euro(amount: number): string {
  return `€${Math.round(amount).toLocaleString('nl-NL')}`;
}
