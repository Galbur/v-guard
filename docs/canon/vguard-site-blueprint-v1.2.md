# V Guard Studio: Site Blueprint v1.2

Дата: 2026-10-06. Канон фактів: `vguard-site-truth-v4.md`. Статус: чинний.

Blueprint володіє картою сайту, навігацією, типами сторінок, бібліотекою блоків, бюджетами слів і статусом пілотів. Факти, ціни і рішення беруться лише з Site Truth.

**Головний принцип:** простий мобільний сайт, який показує всі послуги і веде до заявки. Не «гарний сайт», а шлях: Google Maps / TikTok → сторінка послуги → довіра → заявка / WhatsApp.

---

## 1. Карта сайту

```
NL (корінь)                      UA (/uk/)
/                                /uk/
├── /ppf/                        ├── /uk/ppf/
├── /ramen-blinderen/            ├── /uk/tonuvannia/
├── /car-wrapping/               ├── /uk/car-wrapping/
├── /projecten/                  ├── /uk/proiekty/
├── /contact/                    ├── /uk/kontakty/
└── /privacy/                    └── /uk/privacy/
404 (обидві мови)
```

Перемикач мов веде на відповідну сторінку іншої мови, не на головну.

## 2. Навігація

**Header, десктоп (1280):** логотип (→ головна) · PPF · Ramen blinderen · Car wrapping · Projecten · Contact · NL / UA · кнопка «Offerte aanvragen» (primary).
**Header, мобільний (375):** логотип · NL / UA · бургер. У меню ті самі пункти.
**Нижня панель, мобільний, завжди видима:** WhatsApp · Bellen · Offerte. Три рівні кнопки, мінімум 44 px висотою.
**Footer:** назва, адреса, телефон, години (NAP ідентичний GBP) · посилання на всі сторінки · TikTok, Instagram, Facebook (текстові посилання або іконки, без embed) · Privacy · KvK.

Сторінка без місця в header або footer не публікується.

## 3. Типи сторінок і шаблони

| Тип | Сторінки | Блоки по порядку (шар 1 жирним) | Пілот |
|---|---|---|---|
| Головна | `/`, `/uk/` | **Hero · ProofStrip · ServiceCards · ProcessSteps** · ProjectGallery (6) · TrustBlock · PriceTeaser · ReviewsBlock* · QuoteEntry · ContactBlock | ПІЛОТ 1, не затверджено |
| Послуга | PPF, tint, wrap | **Hero · ProofStrip · AnswerBox · PackageCards або PriceTable** · ProcessSteps · LegalNote (лише tint) · ProjectGallery (фільтр послуги) · TrustBlock · FAQ · CtaBand | ПІЛОТ 2 = PPF, не затверджено |

Відхилення по сторінках послуг (v1.2):
- Тонування: шар 1 = Hero · ProofStrip · AnswerBox · **LegalDiagram** (ключова схема замість ProcessSteps) · PackageCards або PriceTable · **BeforeAfter**. ProcessSteps у шарі 2 після кроків тонування від V Guard.
- Car wrapping: 3 фото ProjectGallery у шарі 1 одразу після PackageCards.
- ProofStrip рендериться лише з 2+ підтвердженими чипами.
| Проєкти | `/projecten/` | **Hero (короткий) · ProjectGallery (усі)** · CtaBand | після пілотів |
| Контакти | `/contact/` | **Hero (короткий) · QuoteForm / QuoteSelector** · ContactBlock | після пілоту 1 |
| Юридична | Privacy | Текст | без макета |

\* ReviewsBlock рендериться лише коли є реальні відгуки Google. Блок без реального контенту не рендериться.

## 4. Бюджети слів (мобільний вирішує)

| Що | Ліміт |
|---|---|
| Перший екран на 375 (H1 + підзаголовок + кнопки + ProofStrip) | до 35 слів |
| Шар 1 сторінки | до 150 слів |
| H1 | до 8 слів, з послугою і Vroomshoop/Twente на сторінках послуг |
| Підзаголовок | до 20 слів |
| Картка (ServiceCard, PackageCard, ValueCard) | заголовок до 4 слів, рядок до 12 слів |
| AnswerBox | 1-2 речення, до 40 слів |
| FAQ-відповідь | до 60 слів |
| Підпис проєкту | авто + послуга + плівка, до 12 слів |

UA-версія тримає ті самі слоти; якщо UA довша на понад 15%, скорочується UA, а не дизайн.

## 5. Бібліотека блоків

Специфікації полів: `docs/canon/vguard-block-specs.md` (копія `references/block-specs.md` скіла `vguard-page-blueprint`).

| Блок | Призначення | Обов'язкові дані |
|---|---|---|
| Hero | Що, де, наступний крок | H1, підзаголовок, primary «Offerte aanvragen», secondary WhatsApp |
| ProofStrip | 2-3 факти довіри | лише F6, F8, F9, F5 після підтвердження |
| ServiceCards | 3 послуги | назва, рядок, фото, «від €» якщо підтверджено |
| ProcessSteps | Ключова схема: якість через процес | 4-5 кроків з F5 |
| PackageCards | PPF: Full Front / Full Body / Custom | зони, «від €» або «op aanvraag» |
| PriceTable | Tint за типом кузова | лише підтверджені P-ціни |
| LegalNote | Норма тонування | дослівно за F10, посилання на rijksoverheid.nl |
| LegalDiagram | Тонування: що дозволено, вид авто зверху, 3 зони | F10; підпис «Bron: Rijksoverheid»; текстова альтернатива списком |
| BeforeAfter | Тонування: результат на одному авто | 2 реальні фото, однаковий ракурс (D12, D13); слайдер vanilla JS, `<input type="range">`, без JS два статичні фото |
| ProjectGallery | Реальні роботи | фото + підпис; без відео |
| TrustBlock | Гарантія, сертифікат, бренди | F6, F7, F8, F9; бренди текстом без логотипів |
| PriceTeaser | Ціни «від» на головній | P-ціни |
| ReviewsBlock | Відгуки Google | вибрані реальні відгуки вручну + посилання |
| FAQ | Питання | тексти з copy-файлу; FAQPage = видимий FAQ |
| QuoteEntry | Вхід у заявку з головної | 3 кнопки послуг → `/contact/?service=` |
| QuoteForm | Базова покрокова форма | поля з розділу 6 |
| QuoteSelector | Бонус: візуальні картки | ті самі поля, картки замість select |
| ContactBlock | NAP, години, маршрут | посилання «Route in Google Maps», без iframe до кліку |
| CtaBand | Завершальний CTA | заголовок до 6 слів, 2 кнопки |
| StickyMobileBar | Завжди видимий CTA | WhatsApp · Bellen · Offerte |

## 6. Форма заявки

Кроки: 1) послуга (PPF / Ramen blinderen / Car wrapping / Advies) → 2) авто: merk, model, bouwjaar, carrosserie (hatchback, sedan, stationwagon, coupé, SUV, bus, anders) → 3) опція послуги (PPF: Full Front / Full Body / gedeeltelijk; tint: achterzijde / voorste zijruiten (binnen 55%) / chameleon; wrap: volledig / gedeeltelijk + finish) → 4) контакт: naam, telefoon/WhatsApp (обов'язково), e-mail (опційно), opmerking, згода з Privacy.
Після відправки: екран подяки + кнопка «Stuur foto's via WhatsApp» з `wa.me` і готовим текстом (послуга, авто).
Без акаунтів, без бази даних, без оплати. Дані послуг і опцій лише з `src/data/services.ts`.

## 7. Візуальні правила

- Стиль: чорний + золотий за затвердженим style guide (ОЧІКУЄ, D10). До style guide пілот малюється на нейтральних токенах.
- Реальні фото V Guard; без стокових фото, без логотипів брендів плівок, без чужих логотипів. Обробка лише за Site Truth D12; номери і обличчя розмиті.
- Жодного відео, iframe чи embed до кліку.
- JS лише для: мобільне меню, кроки форми, селектор (бонус), слайдер BeforeAfter (D13).
- Одна ключова схема в шарі 1: ProcessSteps.
- Контраст WCAG AA; золото на чорному перевіряється на дрібному тексті.

## 8. Статус пілотів

| Пілот | Сторінка | Статус |
|---|---|---|
| 1 | Головна NL | не почато |
| 2 | PPF NL | не почато |

Сторінки типу без затвердженого пілоту не будуються.

## 9. Changelog

| Версія | Дата | Що |
|---|---|---|
| v1 | 2026-10-05 | Створено з ТЗ docx розділи 8-11 і Site Truth v1; канон фактів оновлено до v2 |
| v1.1 | 2026-10-06 | Посилання на Site Truth v3; шлях block-specs у репо |
| v1.2 | 2026-10-06 | Site Truth v4; блоки LegalDiagram і BeforeAfter; відхилення сторінок тонування і wrap; правило ProofStrip 2+; опція форми «voorste zijruiten (binnen 55%)»; обробка фото D12; JS для слайдера D13 |
