// Netlify event function: runs after every verified Netlify Forms submission and
// forwards «offerte» requests to the internal V Guard Telegram chat (D4).
// TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID come from Netlify env vars only (D5).
// A Telegram failure is logged and never breaks the submission.
import type { Handler } from '@netlify/functions';
import { adviceOption, bodyTypes, getService, wrapFormParts } from '../../src/data/services.ts';

type FormData = Record<string, string | undefined>;

const EMPTY = '-';

function serviceLabel(id: string | undefined): string {
  if (!id) return EMPTY;
  if (id === adviceOption.id) return adviceOption.label.nl;
  return getService(id)?.label.nl ?? id;
}

function optionLabel(serviceId: string | undefined, optionId: string | undefined): string {
  if (!optionId) return EMPTY;
  return getService(serviceId ?? '')?.options.find((o) => o.id === optionId)?.label.nl ?? optionId;
}

function bodyTypeLabel(id: string | undefined): string | undefined {
  if (!id) return undefined;
  return bodyTypes.find((b) => b.id === id)?.label.nl ?? id;
}

const text = (value: string | undefined) => value?.trim() || EMPTY;

/** Wrap «Losse delen»: part ids from the hidden «delen» field (or the raw checkbox without JS). */
function partsLabel(data: FormData): string | undefined {
  const ids = (data.delen || data.deel || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
  if (!ids.length) return undefined;
  return ids.map((id) => wrapFormParts.find((p) => p.formPart === id)?.formLabel.nl.toLowerCase() ?? id).join(', ');
}

/** Plain-text Telegram message (block specs section 4). Form data only. */
export function formatMessage(data: FormData): string {
  const car = [data.merk, data.model, data.bouwjaar, bodyTypeLabel(data.carrosserie)]
    .map((v) => v?.trim())
    .filter(Boolean)
    .join(' ');
  return [
    'Nieuwe aanvraag',
    `Dienst: ${serviceLabel(data.dienst)}`,
    `Optie: ${optionLabel(data.dienst, data.optie)}`,
    // Wrap only: chosen parts (step W4) and colour or finish (step W3).
    ...(partsLabel(data) ? [`Delen: ${partsLabel(data)}`] : []),
    ...(data.kleur?.trim() ? [`Kleur/finish: ${data.kleur.trim()}`] : []),
    `Auto: ${car || EMPTY}`,
    `Naam: ${text(data.naam)}`,
    `Telefoon: ${text(data.telefoon)}`,
    `E-mail: ${text(data.email)}`,
    `Opmerking: ${text(data.opmerking)}`,
    `Taal: ${text(data.taal)}`,
    `Pagina: ${text(data.pagina)}`,
  ].join('\n');
}

export async function sendTelegram(message: string, token: string, chatId: string): Promise<void> {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, disable_web_page_preview: true }),
  });
  if (!res.ok) throw new Error(`Telegram API responded ${res.status}`);
}

export const handler: Handler = async (event) => {
  try {
    const payload = JSON.parse(event.body ?? '{}').payload ?? {};
    const formName: string | undefined = payload.form_name ?? payload.data?.['form-name'];
    if (formName !== 'offerte') return { statusCode: 200, body: 'ignored' };

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      console.warn('submission-created: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set, Telegram skipped');
      return { statusCode: 200, body: 'telegram not configured' };
    }

    await sendTelegram(formatMessage(payload.data ?? {}), token, chatId);
    return { statusCode: 200, body: 'ok' };
  } catch (error) {
    // Never fail the submission because of Telegram; the lead is stored in Netlify Forms.
    console.error('submission-created: Telegram notification failed', error);
    return { statusCode: 200, body: 'telegram failed' };
  }
};
