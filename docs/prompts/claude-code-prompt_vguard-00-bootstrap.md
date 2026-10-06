# Claude Code: V Guard Studio, крок 00: каркас репозиторію

Дата: 2026-10-05. Канон: Site Truth v2, Blueprint v1. Дизайн: макету ще немає, тому лише каркас без візуального дизайну.
Пріоритет: високий. Виконавець: Claude Code (єдиний автор змін).

**Передумова (стоп-умова):** у робочій папці є `CLAUDE.md`, `docs/canon/vguard-site-truth-v2.md`, `docs/canon/vguard-site-blueprint-v1.md`, `docs/canon/vguard-block-specs.md`. Якщо хоча б одного файлу немає, зупинись і повідом.

**Не чіпати:** нічого поза новою папкою проєкту; жодних акаунтів Netlify, GitHub, DNS.

## Рішення

| ID | Рішення | Статус |
|---|---|---|
| D1 | NL у корені, UA у `/uk/` | чинне |
| D2 | Відео немає | чинне |
| D4 | Netlify Forms + `submission-created` → Telegram | чинне |
| D5 | Секрети лише в env | чинне |
| D6 | Фото: upload чи WhatsApp | НЕ ВИРІШЕНО: у формі поля файлу немає, лише WhatsApp-продовження |
| D7 | Жодних third-party запитів до кліку | чинне |

## Правила виконання

Усі правила `CLAUDE.md`. Додатково: у цьому кроці жодного маркетингового тексту. Сторінки містять лише структуру і ключі i18n; блоки без даних не рендеряться. Нічого не пушити, не відкривати PR і не деплоїти без окремої команди.

## Мета

Робочий каркас Astro-сайту з маршрутами NL і UA, даними, i18n, SEO-шаром і повним ланцюгом заявки, щоб наступні кроки лише наповнювали блоки за затвердженими пілотами.

## Обсяг

**Входить:**
1. Ініціалізація Astro (static), `package.json` зі скриптами `dev`, `build`, `preview`, `check`.
2. Структура папок за `CLAUDE.md`.
3. `src/config/site.ts`: поля NAP, phone, whatsapp, emailNotify, socials, SITE_URL, `LIVE_PAGES = []`. Значення фактів, яких немає в Site Truth зі статусом ПІДТВЕРДЖЕНО, лишаються `null`, і компоненти їх не рендерять.
4. `src/data/services.ts` за формою з `docs/canon/vguard-block-specs.md` розділ 6: три послуги в порядку PPF, ramen-blinderen, car-wrapping; опції за Blueprint розділ 6; усі ціни `priceStatus: 'spoken'` або `'none'`, жодна не рендериться.
5. `src/i18n/nl.ts`, `uk.ts`, `routes.ts` з парами сторінок за Site Truth розділ 8; `t()` і `localizedPath()`.
6. `layouts/Base.astro`: title, meta, canonical, hreflang `nl-NL`, `uk-UA`, `x-default`, `noindex` поки `LIVE_PAGES` порожній, JSON-LD `AutoRepair` лише з не-null полями.
7. Порожні маршрути: `/`, `/ppf/`, `/ramen-blinderen/`, `/car-wrapping/`, `/projecten/`, `/contact/`, `/privacy/` і пари в `/uk/`; 404 для обох мов.
8. Глобальні компоненти без стилізації бренду: Header з перемикачем мов на пару сторінки, мобільне меню, StickyMobileBar (WhatsApp · Bellen · Offerte, приховані кнопки, якщо номер `null`), Footer.
9. `QuoteForm` (4 кроки за Blueprint розділ 6) з Netlify Forms, honeypot, валідацією, збереженням значень при «Назад», екраном успіху з WhatsApp-продовженням.
10. `netlify/functions/submission-created.ts`: формат повідомлення з `docs/canon/vguard-block-specs.md` розділ 4, `TELEGRAM_BOT_TOKEN` і `TELEGRAM_CHAT_ID` з env, помилка Telegram лише логується.
11. `netlify.toml`: build command, publish dir, заголовки безпеки.
12. `src/styles/tokens.css` з нейтральними токенами (без чорно-золотого стилю до style guide).
13. Скрипт перевірки `npm run check`: пошук `TODO`, `TBD`, `[[`, `lorem`, U+2014, U+2013 у `src/`; перевірка, що кожен NL маршрут має UA пару.

**Не входить:** тексти сторінок, фото, дизайн, селектор, аналітика, деплой.

## QA

1. `npm run build` без помилок.
2. `npm run check` без збігів.
3. Усі 14 маршрутів і 2 сторінки 404 збираються; перемикач мов веде на пару.
4. `noindex` присутній на всіх сторінках.
5. Форма в `npm run preview`: валідація, кроки, «Назад» зберігає значення, екран успіху формує правильний `wa.me` текст (номер тестовий лише в `.env.local`, не в коді).
6. Функція: локальний тест через `netlify dev` або unit-тест форматування повідомлення без реального токена.
7. У `dist/` немає запитів до сторонніх доменів.

## Звіт

Крок 0 (що знайдено, `файл:рядок`), дерево файлів, коміти, результати QA по пунктах 1-7, «Не виконано / потрібне рішення».

Нічого не пушити, не відкривати PR і не деплоїти без окремої команди.
