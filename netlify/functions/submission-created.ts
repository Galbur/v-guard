// Netlify event function: runs after every verified Netlify Forms submission and
// forwards «offerte» requests to the internal V Guard Telegram chat (D4), in Ukrainian (step 23).
// TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID come from Netlify env vars only (D5).
// A Telegram failure is logged and never breaks the submission.
import type { Handler } from '@netlify/functions';
import { leadCopy } from '../../src/copy/lead.ts';
import { leadText } from '../../src/lib/lead-text.ts';
import { leadLabels } from '../../src/lib/wa-labels.ts';

type FormData = Record<string, string | string[] | undefined>;

const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v.join(',') : (v ?? ''));

/**
 * Plain-text Telegram message (step 23): title, then the same Ukrainian text as the form field
 * «Заявка». It is rebuilt here from the raw fields with the same function (lead-text.ts), so a
 * submission without JS (empty field) reads the same and a hand-edited field cannot change it.
 */
export function formatMessage(data: FormData): string {
  // Wrap «Losse delen»: part ids from the hidden «delen» field, or the raw checkboxes without JS.
  const delen = str(data.delen || data.deel)
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
  const text = leadText(leadLabels(), {
    dienst: str(data.dienst),
    optie: str(data.optie),
    delen,
    kleur: str(data.kleur),
    merk: str(data.merk),
    model: str(data.model),
    bouwjaar: str(data.bouwjaar),
    carrosserie: str(data.carrosserie),
    naam: str(data.naam),
    telefoon: str(data.telefoon),
    email: str(data.email),
    opmerking: str(data.opmerking),
    taal: str(data.taal),
  });
  return `${leadCopy.telegramTitle}\n${text}`;
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
