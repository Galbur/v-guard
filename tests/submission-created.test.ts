// Unit tests for the Telegram message format (Ukrainian, step 23) and failure handling. No real token.
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

test('formats the message in Ukrainian with the title, whatever the page language', () => {
  assert.equal(
    formatMessage(data),
    [
      'Нова заявка з сайту V Guard',
      'Послуга: PPF, Full Front',
      'Авто: BMW X5 2021, SUV',
      'Імʼя: Test',
      'Телефон: +31 6 0000 0000',
      'Коментар: Graag mat',
      'Мова сайту: нідерландська',
    ].join('\n'),
  );
});

test('wrap request: option and colour in the service line', () => {
  const message = formatMessage({
    ...data,
    dienst: 'car-wrapping',
    optie: 'pakket',
    carrosserie: 'bus',
    kleur: 'Midnight Blue, Satijn',
    opmerking: '',
  });
  assert.match(message, /^Послуга: Обклеювання плівкою, Антихром-пакет, колір або фініш: Midnight Blue, Satijn\nАвто: BMW X5 2021, Бус \/ мікроавтобус$/m);
  assert.doesNotMatch(message, /Коментар/);
});

test('wrap «Losse delen» lists the parts from the hidden field', () => {
  const message = formatMessage({ ...data, dienst: 'car-wrapping', optie: 'delen', delen: 'dak,spiegelkappen', carrosserie: 'touringcar' });
  assert.match(message, /^Послуга: Обклеювання плівкою, Окремі деталі \(дах, дзеркала\)\nАвто: BMW X5 2021, Автобус$/m);
});

test('without JS: raw part checkboxes and an empty «Заявка» field give the same text', () => {
  const withJs = formatMessage({ ...data, dienst: 'car-wrapping', optie: 'delen', delen: 'dak,spiegelkappen', Заявка: 'Послуга: …' });
  const withoutJs = formatMessage({ ...data, dienst: 'car-wrapping', optie: 'delen', deel: ['dak', 'spiegelkappen'], Заявка: '' });
  assert.equal(withoutJs, withJs);
});

test('a hand-edited «Заявка» field does not change the message', () => {
  assert.equal(formatMessage({ ...data, Заявка: 'Телефон: 0000' }), formatMessage(data));
});

test('advice request with missing fields: no empty lines', () => {
  const message = formatMessage({ dienst: 'advies', naam: 'A', telefoon: '0600000000', taal: 'uk' });
  assert.equal(message, 'Нова заявка з сайту V Guard\nПослуга: Потрібна консультація\nІмʼя: A\nТелефон: 0600000000\nМова сайту: українська');
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
