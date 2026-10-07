// Unit tests for the Telegram message format and failure handling. No real token.
// Run with `npm test` (Node built-in test runner with type stripping).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { HandlerContext, HandlerEvent } from '@netlify/functions';
import { formatMessage, handler } from '../netlify/functions/submission-created.ts';

const data = {
  'form-name': 'offerte',
  dienst: 'ppf',
  optie: 'full-front',
  merk: 'BMW',
  model: 'X5',
  bouwjaar: '2021',
  carrosserie: 'suv',
  naam: 'Test',
  telefoon: '+31 6 0000 0000',
  email: '',
  opmerking: 'Graag mat',
  taal: 'nl',
  pagina: '/contact/',
  privacy: 'ja',
};

const event = (body: unknown) => ({ body: JSON.stringify(body) }) as HandlerEvent;
const context = {} as HandlerContext;

test('formats the message in the block specs order with NL labels', () => {
  assert.equal(
    formatMessage(data),
    [
      'Nieuwe aanvraag',
      'Dienst: PPF',
      'Optie: Full Front',
      'Auto: BMW X5 2021 SUV',
      'Naam: Test',
      'Telefoon: +31 6 0000 0000',
      'E-mail: -',
      'Opmerking: Graag mat',
      'Taal: nl',
      'Pagina: /contact/',
    ].join('\n'),
  );
});

test('wrap request carries the colour or finish line after the option', () => {
  const message = formatMessage({
    ...data,
    dienst: 'car-wrapping',
    optie: 'pakket',
    carrosserie: 'personenbus',
    kleur: 'Midnight Blue, Satijn',
    opmerking: '',
  });
  assert.match(
    message,
    /^Dienst: Car wrapping\nOptie: Black styling pakket\nKleur\/finish: Midnight Blue, Satijn\nAuto: BMW X5 2021 Personenbus$/m,
  );
});

test('no colour line when the field is empty', () => {
  assert.doesNotMatch(formatMessage({ ...data, kleur: '  ' }), /Kleur/);
});

test('advice request without option and with missing fields', () => {
  const message = formatMessage({ dienst: 'advies', naam: 'A', telefoon: '0600000000', taal: 'uk' });
  assert.match(message, /^Dienst: Ik wil advies$/m);
  assert.match(message, /^Optie: -$/m);
  assert.match(message, /^Auto: -$/m);
  assert.doesNotMatch(message, /privacy|bot-field/i);
});

test('skips Telegram when env vars are missing', async () => {
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
  const res = await handler(event({ payload: { form_name: 'offerte', data } }), context);
  assert.equal(res?.statusCode, 200);
});

test('ignores other forms', async () => {
  const res = await handler(event({ payload: { form_name: 'other', data: {} } }), context);
  assert.deepEqual(res, { statusCode: 200, body: 'ignored' });
});

test('sends to Telegram and survives a Telegram failure', async (t) => {
  process.env.TELEGRAM_BOT_TOKEN = 'test-token';
  process.env.TELEGRAM_CHAT_ID = '42';
  const calls: { url: string; body: { chat_id: string; text: string } }[] = [];
  const fetchMock = t.mock.method(globalThis, 'fetch', async (url: string, init: RequestInit) => {
    calls.push({ url, body: JSON.parse(String(init.body)) });
    return new Response('{}', { status: 200 });
  });
  t.mock.method(console, 'error', () => {});

  const ok = await handler(event({ payload: { form_name: 'offerte', data } }), context);
  assert.deepEqual(ok, { statusCode: 200, body: 'ok' });
  assert.equal(calls[0].url, 'https://api.telegram.org/bottest-token/sendMessage');
  assert.equal(calls[0].body.chat_id, '42');
  assert.equal(calls[0].body.text, formatMessage(data));

  fetchMock.mock.mockImplementation(async () => new Response('{}', { status: 500 }));
  const failed = await handler(event({ payload: { form_name: 'offerte', data } }), context);
  assert.deepEqual(failed, { statusCode: 200, body: 'telegram failed' });

  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
});
