// Wrap configurator price indication on the real data from services.ts (mockup v2 rules).
// Run with `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wrapBase, wrapBodies, wrapCarbonSurcharge, wrapPakket, wrapParts } from '../src/data/services.ts';
import { euro, fullPrice, wrapPrice, type PriceConfig, type WrapState } from '../src/lib/wrap-price.ts';

const cfg: PriceConfig = {
  base: wrapBase.amount,
  pakket: wrapPakket.amount,
  carbon: wrapCarbonSurcharge.value,
  bodies: wrapBodies.map((b) => ({
    id: b.id,
    factor: b.factor ? b.factor.value : 1,
    van: b.van,
    coach: b.id === 'coach',
  })),
  parts: wrapParts.map((p) => ({ id: p.id, price: p.price.amount, vanPrice: (p.vanPrice ?? p.price).amount })),
};

const state = (over: Partial<WrapState>): WrapState => ({
  body: 'hatch',
  full: true,
  parts: { dak: false, spiegel: false, chroom: false },
  finish: 'satijn',
  ...over,
});

test('volledige wrap per body, rounded to €5; touringcar on request', () => {
  const got = Object.fromEntries(wrapBodies.map((b) => [b.id, fullPrice(cfg, b.id)]));
  assert.deepEqual(got, { hatch: 1795, sedan: 1975, station: 2065, suv: 2335, bus: 2695, coach: null });
  assert.equal(wrapPrice(cfg, state({ body: 'coach' })), null);
});

test('loose parts: car and van prices, sum of the chosen parts', () => {
  const parts = { dak: true, spiegel: true, chroom: false };
  assert.equal(wrapPrice(cfg, state({ full: false, parts })), 249 + 69);
  assert.equal(wrapPrice(cfg, state({ body: 'bus', full: false, parts })), 349 + 89);
  assert.equal(wrapPrice(cfg, state({ full: false })), 0);
});

test('all three parts are the Black styling pakket, except on a touringcar', () => {
  const parts = { dak: true, spiegel: true, chroom: true };
  assert.equal(wrapPrice(cfg, state({ body: 'suv', full: false, parts })), 395);
  assert.equal(wrapPrice(cfg, state({ body: 'coach', full: false, parts })), 349 + 89 + 149);
});

test('carbon look adds 10%', () => {
  assert.equal(wrapPrice(cfg, state({ finish: 'carbon' })), 1975);
  assert.equal(euro(wrapPrice(cfg, state({ body: 'sedan', finish: 'carbon' }))!), '€2.173');
});
