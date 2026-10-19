// WhatsApp continuation text on the quote form success screen (step 22): page language,
// one service line (service, option, parts, colour) without car data, no stray separators.
// Run with `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { waLabels } from '../src/lib/wa-labels.ts';
import { waText, type WaRequest } from '../src/lib/wa-text.ts';

const car = { merk: 'BMW', model: '3 Serie', carrosserie: 'sedan' };

const combos: { id: string; req: WaRequest; nl: string; uk: string }[] = [
  {
    id: 'PPF Full Front',
    req: { ...car, dienst: 'ppf', optie: 'full-front' },
    nl: 'Dienst: PPF, Full Front\nAuto: BMW 3 Serie, Sedan',
    uk: 'Послуга: PPF, Full Front\nАвто: BMW 3 Serie, Седан',
  },
  {
    id: 'PPF Full Body with year',
    req: { ...car, dienst: 'ppf', optie: 'full-body', bouwjaar: '2021' },
    nl: 'Dienst: PPF, Full Body\nAuto: BMW 3 Serie 2021, Sedan',
    uk: 'Послуга: PPF, Full Body\nАвто: BMW 3 Serie 2021, Седан',
  },
  {
    id: 'PPF Custom (the reported case)',
    req: { dienst: 'ppf', optie: 'gedeeltelijk', merk: 'rgregerter', model: 'retertert', bouwjaar: '2027', carrosserie: 'sedan' },
    nl: 'Dienst: PPF, Custom (losse delen)\nAuto: rgregerter retertert 2027, Sedan',
    uk: 'Послуга: PPF, Custom (окремі деталі)\nАвто: rgregerter retertert 2027, Седан',
  },
  {
    id: 'Tint rear',
    req: { ...car, dienst: 'ramen-blinderen', optie: 'achterzijde' },
    nl: 'Dienst: Ramen blinderen, Achterzijde\nAuto: BMW 3 Serie, Sedan',
    uk: 'Послуга: Тонування, Задня частина\nАвто: BMW 3 Serie, Седан',
  },
  {
    id: 'Tint front side windows with year',
    req: { ...car, dienst: 'ramen-blinderen', optie: 'voorste-zijruiten', bouwjaar: '2019' },
    nl: 'Dienst: Ramen blinderen, Voorste zijruiten (binnen 55%)\nAuto: BMW 3 Serie 2019, Sedan',
    uk: 'Послуга: Тонування, Передні бічні (у межах 55%)\nАвто: BMW 3 Serie 2019, Седан',
  },
  {
    id: 'Tint chameleon',
    req: { ...car, dienst: 'ramen-blinderen', optie: 'chameleon' },
    nl: 'Dienst: Ramen blinderen, Chameleon\nAuto: BMW 3 Serie, Sedan',
    uk: 'Послуга: Тонування, Chameleon\nАвто: BMW 3 Serie, Седан',
  },
  {
    id: 'Wrap loose parts, two parts',
    req: { ...car, dienst: 'car-wrapping', optie: 'delen', delen: ['dak', 'spiegelkappen'] },
    nl: 'Dienst: Car wrapping, Losse delen (dak, spiegelkappen)\nAuto: BMW 3 Serie, Sedan',
    uk: 'Послуга: Обклеювання плівкою, Окремі деталі (дах, дзеркала)\nАвто: BMW 3 Serie, Седан',
  },
  {
    id: 'Wrap loose parts, two parts, colour and year',
    req: { ...car, dienst: 'car-wrapping', optie: 'delen', delen: ['dak', 'spiegelkappen'], kleur: 'satijn zwart', bouwjaar: '2020' },
    nl: 'Dienst: Car wrapping, Losse delen (dak, spiegelkappen), kleur of finish: satijn zwart\nAuto: BMW 3 Serie 2020, Sedan',
    uk: 'Послуга: Обклеювання плівкою, Окремі деталі (дах, дзеркала), колір або фініш: satijn zwart\nАвто: BMW 3 Serie 2020, Седан',
  },
  {
    id: 'Wrap full with colour',
    req: { ...car, dienst: 'car-wrapping', optie: 'volledig', kleur: 'mat grijs' },
    nl: 'Dienst: Car wrapping, Volledige wrap, kleur of finish: mat grijs\nAuto: BMW 3 Serie, Sedan',
    uk: 'Послуга: Обклеювання плівкою, Повне обклеювання, колір або фініш: mat grijs\nАвто: BMW 3 Serie, Седан',
  },
  {
    id: 'Wrap «Iets anders»',
    req: { ...car, dienst: 'car-wrapping', optie: 'anders' },
    nl: 'Dienst: Car wrapping, Iets anders\nAuto: BMW 3 Serie, Sedan',
    uk: 'Послуга: Обклеювання плівкою, Інше\nАвто: BMW 3 Serie, Седан',
  },
  {
    id: 'Advice, no option',
    req: { ...car, dienst: 'advies' },
    nl: 'Dienst: Ik wil advies\nAuto: BMW 3 Serie, Sedan',
    uk: 'Послуга: Потрібна консультація\nАвто: BMW 3 Serie, Седан',
  },
];

const intro = {
  nl: "Hallo V Guard Studio, hierbij foto's bij mijn aanvraag via de website.",
  uk: 'Вітаю, V Guard Studio! Надсилаю фото до заявки з сайту.',
};

for (const locale of ['nl', 'uk'] as const) {
  const labels = waLabels(locale);
  for (const c of combos) {
    test(`${locale}: ${c.id}`, () => {
      assert.equal(waText(labels, c.req), `${intro[locale]}\n${c[locale]}`);
    });
  }
}

test('empty optional fields leave no separators or brackets', () => {
  const labels = waLabels('uk');
  const text = waText(labels, { dienst: 'car-wrapping', optie: 'delen', delen: [], kleur: '  ', merk: 'Volvo', model: 'V60', bouwjaar: '' });
  assert.equal(text, `${intro.uk}\nПослуга: Обклеювання плівкою, Окремі деталі\nАвто: Volvo V60`);
  assert.doesNotMatch(text, /\(\)|, ,|,\n|: \n|\s$/);
});

test('UA text uses UA labels only, never Dutch form values', () => {
  const text = waText(waLabels('uk'), { dienst: 'ppf', optie: 'gedeeltelijk', merk: 'Golf', model: 'GTI', carrosserie: 'hatchback' });
  assert.doesNotMatch(text, /Hallo|Dienst|Optie|Auto:|losse delen|Hatchback/);
});
