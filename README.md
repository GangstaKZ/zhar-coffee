# ☕ ЖАР — specialty coffee · Astana

[![Vercel Deploy](https://img.shields.io/badge/Vercel-deployed-black?logo=vercel&logoColor=white)](https://zhar-coffee.vercel.app)
[![Astro 5](https://img.shields.io/badge/Astro-5.18-orange?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> 🇰🇿 Спешиалти-кофейня в центре Астаны: эспрессо-бар, ручной фильтр, альтернатива на свежей обжарке, кухня и **бронь стола онлайн**.
> Лендинг с минимумом JS, максимумом типографики и серверным API бронирования.

---

## 🖼 Превью / Preview

<img src="./public/og.jpg" width="1200" alt="ЖАР — specialty coffee preview">

| Ссылка | URL |
|---|---|
| 🚀 **Прод** | **https://zhar-coffee.vercel.app** |
| 🔗 Короткий alias | https://zhar-coffee-sana-q.vercel.app |
| 📋 Deployment Details | [vercel.com/sana-q/zhar-coffee/deployments](https://vercel.com/sana-q/zhar-coffee/deployments) |
| 📦 GitHub | [github.com/GangstaKZ/zhar-coffee](https://github.com/GangstaKZ/zhar-coffee) |

---

## 📖 О проекте / About

Лендинг для кофейни **ЖАР** (Астана, ул. Достык 16) на Astro 5:

- ☕ **20 позиций меню** из Content Collections (markdown + zod-схема): эспрессо ×6, фильтр ×4, альтернатива ×4, еда ×6
- 📅 **Бронь стола** — форма с датой, слотами времени и счётчиком гостей; `POST /api/booking` → Telegram Bot API
- 🗺 **Карта OpenStreetMap** вместо 2GIS-iframe — у 2GIS есть антибот-captcha, которая ломает embed с части IP; кнопки «Маршрут в 2GIS» сохранены
- 🔍 SEO: JSON-LD `CafeOrCoffeeShop`, OG-картинка, sitemap, `site: https://zhar.coffee`

---

## ✨ Фичи / Features

| Фича | Детали |
|---|---|
| 🔀 **Сортировка меню** | В табе «Все» — по категориям: `espresso ×6 → filter ×4 → alt ×4 → food ×6`, внутри по `order` |
| 👆 **Слоты времени** | Тап-таргет `py-2.5` (~40 px) на мобильных, 9 слотов 12:00–20:00 |
| 🖥 **Hero в первый экран** | `text-[clamp(2.4rem,7vw,5.8rem)]` — заголовок, подзаголовок и CTA влезают в 720p |
| ✍️ **Типографика** | Глобально `text-wrap: balance` для `h1–h3` и `text-wrap: pretty` для `p` — без «вдов» и однословных последних строк |
| 🚫 **Кастомная 404** | «Страница остыла» с display-заголовком и трекингом `tracking-[-0.02em]` в стиле сайта |
| 🛡 **API-брони** | Honeypot-поле + антиспам-гейт (<1500 мс) + zod-валидация; телефон-маска `+7 (7XX) XXX-XX-XX` |
| 📱 **Мобилка** | Проверено на 375 / 414 / 768 px: без горизонтального скролла и обрезанного текста (замеры DOM, не скриншоты) |

---

## 🛠 Технологии / Tech stack

| Слой | Выбор |
|---|---|
| Фреймворк | **Astro 5.18** (`output: 'server'`) |
| Хостинг | **Vercel** через `@astrojs/vercel@9` |
| Стили | **Tailwind CSS 4** (`@tailwindcss/vite`, токены в `@theme`) |
| Язык | **TypeScript** (strict) |
| Контент | Astro Content Collections + zod |
| Адаптер | был `@astrojs/node` (standalone) → стал `@astrojs/vercel` |
| Шрифты | Unbounded (display) + Inter Variable (body), fontsource |

> 📌 **AGENTS.md** — правила сборки для MiMo Code агента, можно игнорировать для разработки.

---

## 🚀 Быстрый старт / Quick start

```bash
# 1. Зависимости
npm i

# 2. DEV-сервер → http://localhost:4321
npm run dev

# 3. Продакшен-сборка (вывод: dist/client + .vercel/output)
npm run build

# 4. Локально как в проде (нужен vercel login/link)
npx vercel dev
```

> ℹ️ После перехода на vercel-адаптер локальный сервер гоняется через `npm run dev` или `npx vercel dev` — собранный `dist/server/entry.mjs` больше не создаётся (серверный код собирается в `.vercel/output/functions`).

---

## 🔐 Env-переменные / Environment

Скопируй пример и заполни:

```bash
cp .env.example .env
```

| Переменная | Нужна | Описание |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | ✅ для уведомлений | Токен Telegram-бота (`123456:ABC-...`) |
| `TELEGRAM_CHAT_ID` | ✅ для уведомлений | ID чата/канала, куда падают заявки |
| `PUBLIC_DGIS_KEY` | ⬜ опционально | Ключ 2GIS JS API (когда понадобится карта 2GIS) |
| `PUBLIC_SITE_URL` | ⬜ опционально | Канонический URL (для sitemap/OG) |

> 🧪 **Демо-режим:** без `TELEGRAM_*` сайт полностью работает — `/api/booking` логирует заявку в stdout и отвечает `{"ok":true}`, но в Telegram ничего не шлёт. На Vercel переменные добавляются в Settings → Environment Variables.

---

## ☁️ Деплой / Deployment

1. **Git → Vercel:** репозиторий [GangstaKZ/zhar-coffee](https://github.com/GangstaKZ/zhar-coffee) подключён к проекту `sana-q/zhar-coffee`
2. Каждый **push в `main`** триггерит автодеплой (~**18–35 s** сборки на Vercel)
3. Текущий прод: **https://zhar-coffee.vercel.app**

### 🔗 Свой домен zhar.coffee

1. Vercel → проект **zhar-coffee** → **Settings → Domains** → ввести `zhar.coffee`
2. У регистратора домена создать DNS-записи, которые покажет Vercel:
   - `A` → `76.76.21.21`, либо `CNAME` → `cname.vercel-dns.com`
3. После валидации домена HTTPS выпускается автоматически
4. Обнови `PUBLIC_SITE_URL=https://zhar.coffee` в переменных окружения Vercel и `site:` в `astro.config.mjs` (сейчас `https://zhar.coffee` уже указан)

---

## 📁 Структура проекта / Project structure

```
src/
├── pages/               # Маршруты
│   ├── index.astro      # Главная (сборка секций)
│   ├── 404.astro        # Кастомная страница 404
│   └── api/booking.ts   # POST /api/booking → Telegram
├── components/          # UI-секции
│   ├── hero/  menu/  map/  booking/  nav/
│   ├── about/  marquee/  shared/     # Reveal, Button, SectionHeading...
├── layouts/
│   ├── BaseLayout.astro # <head>, шрифты, JSON-LD, OG
│   └── SectionShell.astro
├── content/menu/        # 20 markdown-позиций меню (Content Collections)
├── lib/                 # site.ts (контент-константы), booking-schema.ts (zod)
├── scripts/             # reveal.ts (IntersectionObserver), menu-tabs.ts
└── styles/global.css    # Tailwind 4 @theme-токены, grain, marquee, hovers
```

---

<div align="center">

 Made with ☕ in Astana · [ЖАР](https://zhar-coffee.vercel.app) · MIT License

</div>
