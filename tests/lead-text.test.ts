// Owner-facing request text (form field «Заявка», Telegram), step 23: always Ukrainian labels,
// whatever the page language; empty fields leave no line, comma or bracket behind.
// Run with `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { leadText, type LeadRequest } from '../src/lib/lead-text.ts';
import { leadLabels } from '../src/lib/wa-labels.ts';

const contact = { naam: 'Peter de Vries', telefoon: '+31611111111', email: 'peter@example.com', opmerking: 'Graag in november' };
const car = { merk: 'BMW', model: '3 Serie', carrosserie: 'sedan' };

// Same 11 combinations as tests/wa-continuation.test.ts (step 22): request and the expected «Послуга» and «Авто» values.
const combos: { id: string; req: Omit<LeadRequest, 'taal'>; service: string; auto: string }[] = [
  { id: 'PPF Full Front', req: { ...car, dienst: 'ppf', optie: 'full-front' }, service: 'PPF, Full Front', auto: 'BMW 3 Serie, Седан' },
  {
    id: 'PPF Full Body with year',
    req: { ...car, dienst: 'ppf', optie: 'full-body', bouwjaar: '2021' },
    service: 'PPF, Full Body',
    auto: 'BMW 3 Serie 2021, Седан',
  },
  {
    id: 'PPF Custom',
    req: { dienst: 'ppf', optie: 'gedeeltelijk', merk: 'rgregerter', model: 'retertert', bouwjaar: '2027', carrosserie: 'sedan' },
    service: 'PPF, Custom (окремі деталі)',
    auto: 'rgregerter retertert 2027, Седан',
  },
  {
    id: 'Tint rear',
    req: { ...car, dienst: 'ramen-blinderen', optie: 'achterzijde' },
    service: 'Тонування, Задня частина',
    auto: 'BMW 3 Serie, Седан',
  },
  {
    id: 'Tint front side windows with year',
    req: { ...car, dienst: 'ramen-blinderen', optie: 'voorste-zijruiten', bouwjaar: '2019' },
    service: 'Тонування, Передні бічні (у межах 55%)',
    auto: 'BMW 3 Serie 2019, Седан',
  },
  {
    id: 'Tint chameleon',
    req: { ...car, dienst: 'ramen-blinderen', optie: 'chameleon' },
    service: 'Тонування, Chameleon',
    auto: 'BMW 3 Serie, Седан',
  },
  {
    id: 'Wrap loose parts, two parts',
    req: { ...car, dienst: 'car-wrapping', optie: 'delen', delen: ['dak', 'spiegelkappen'] },
    service: 'Обклеювання плівкою, Окремі деталі (дах, дзеркала)',
    auto: 'BMW 3 Serie, Седан',
  },
  {
    id: 'Wrap loose parts, two parts, colour and year',
    req: { ...car, dienst: 'car-wrapping', optie: 'delen', delen: ['dak', 'spiegelkappen'], kleur: 'satijn zwart', bouwjaar: '2020' },
    service: 'Обклеювання плівкою, Окремі деталі (дах, дзеркала), колір або фініш: satijn zwart',
    auto: 'BMW 3 Serie 2020, Седан',
  },
  {
    id: 'Wrap full with colour',
    req: { ...car, dienst: 'car-wrapping', optie: 'volledig', kleur: 'mat grijs' },
    service: 'Обклеювання плівкою, Повне обклеювання, колір або фініш: mat grijs',
    auto: 'BMW 3 Serie, Седан',
  },
  {
    id: 'Wrap «Iets anders»',
    req: { ...car, dienst: 'car-wrapping', optie: 'anders' },
    service: 'Обклеювання плівкою, Інше',
    auto: 'BMW 3 Serie, Седан',
  },
  { id: 'Advice, no option', req: { ...car, dienst: 'advies' }, service: 'Потрібна консультація', auto: 'BMW 3 Serie, Седан' },
];

const languageName = { nl: 'нідерландська', uk: 'українська' };

for (const taal of ['nl', 'uk'] as const) {
  for (const c of combos) {
    test(`${taal} page: ${c.id}`, () => {
      assert.equal(
        leadText(leadLabels(), { ...c.req, ...contact, taal }),
        [
          `Послуга: ${c.service}`,
          `Авто: ${c.auto}`,
          'Імʼя: Peter de Vries',
          'Телефон: +31611111111',
          'Email: peter@example.com',
          'Коментар: Graag in november',
          `Мова сайту: ${languageName[taal]}`,
        ].join('\n'),
      );
    });
  }

  test(`${taal} page: all optional fields empty`, () => {
    const text = leadText(leadLabels(), {
      dienst: 'ppf',
      optie: 'full-front',
      delen: [],
      kleur: '',
      merk: 'Volkswagen',
      model: 'Golf',
      bouwjaar: '',
      carrosserie: 'hatchback',
      naam: 'Peter de Vries',
      telefoon: '+31611111111',
      email: '',
      opmerking: '  ',
      taal,
    });
    assert.equal(
      text,
      [
        'Послуга: PPF, Full Front',
        'Авто: Volkswagen Golf, Хетчбек',
        'Імʼя: Peter de Vries',
        'Телефон: +31611111111',
        `Мова сайту: ${languageName[taal]}`,
      ].join('\n'),
    );
    assert.doesNotMatch(text, /\(\)|, ,|,\n|: \n|:$|Email|Коментар/m);
  });
}

test('the NL page text has no Dutch labels or ids', () => {
  const text = leadText(leadLabels(), { ...combos[6].req, ...contact, taal: 'nl' });
  assert.doesNotMatch(text, /Dienst|Optie|Auto:|Losse delen|spiegelkappen|car-wrapping|delen\b/);
});
