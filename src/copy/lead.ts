// Owner-facing summary of a quote request: the form field «Заявка» (first field in the Netlify
// Forms email) and the Telegram message. Always Ukrainian, whatever the page language (step 23).
export const leadCopy = {
  /** Field name in the Netlify form «offerte»; the Netlify email shows it as the field label. */
  fieldName: 'Заявка',
  telegramTitle: 'Нова заявка з сайту V Guard',
  name: 'Імʼя',
  phone: 'Телефон',
  email: 'Email',
  comment: 'Коментар',
  language: 'Мова сайту',
  languages: { nl: 'нідерландська', uk: 'українська' } as Record<string, string>,
};
