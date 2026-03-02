# Pizza Delivery App

Современное веб-приложение для доставки пиццы, созданное на Next.js 16 с использованием App Router.

## 🍕 Функционал

- **Каталог товаров** - категории: Пицца, Напитки, Десерты
- **Hero Slider** - анимированный баннер с акциями
- **Карточки товаров** - с горизонтальным скроллом и адаптивностью
- **Модальное окно товара** - детальная информация о продукте
- **Корзина** - выдвижная панель с управлением количеством товаров
- **Оформление заказа** - форма с валидацией и отправкой в базу данных
- **Анимации** - плавные переходы с Framer Motion

## 🛠 Технологический стек

| Категория | Технология |
|-----------|------------|
| Framework | Next.js 16 |
| Language | TypeScript |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| UI Components | Shadcn/UI |
| Animations | Framer Motion |
| Icons | Lucide React |
| State Management | Zustand |
| Forms | React Hook Form + Zod |
| Backend/DB | Supabase (PostgreSQL) |
| Notifications | Sonner |

## 📋 Требования

- Node.js 18+
- Yarn или npm
- Аккаунт в Supabase (для работы с базой данных)

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
yarn install
```

### 2. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```bash
cp .env.example .env.local
```

Откройте `.env.local` и добавьте ваши данные из Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> **Примечание:** Приложение будет работать и без настройки Supabase, используя тестовые данные.

### 3. Настройка базы данных (опционально)

Если вы хотите использовать Supabase, выполните SQL скрипт из файла `supabase-schema.sql` в SQL Editor вашего проекта Supabase.

### 4. Запуск приложения

```bash
# Режим разработки
yarn dev

# Production сборка
yarn build
yarn start

# Линтинг
yarn lint
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## 📁 Структура проекта

```
next-app/
├── src/
│   ├── app/                    # App Router страницы
│   │   ├── layout.tsx          # Глобальный layout
│   │   ├── page.tsx            # Главная страница
│   │   ├── checkout/           # Страница оформления заказа
│   │   └── success/            # Страница успешного заказа
│   ├── components/
│   │   ├── ui/                 # Shadcn/UI компоненты
│   │   ├── layout/             # Layout компоненты (Header)
│   │   ├── home/               # Компоненты главной (HeroSlider)
│   │   ├── products/           # Компоненты товаров (Card, Modal)
│   │   └── cart/               # Компоненты корзины (Drawer)
│   ├── lib/
│   │   ├── supabase.ts         # Supabase клиент
│   │   ├── utils.ts            # Утилиты
│   │   └── validations.ts      # Zod схемы валидации
│   ├── store/
│   │   └── useCartStore.ts     # Zustand store корзины
│   └── types/
│       └── database.ts         # TypeScript типы
├── public/                     # Статические файлы
├── supabase-schema.sql         # SQL схема базы данных
├── .env.example                # Пример переменных окружения
└── package.json
```

## 🎨 Особенности дизайна

- **Цветовая схема**: Теплая оранжевая палитра (Tailwind `orange-500`)
- **Шрифты**: Geist Sans и Geist Mono
- **Анимации**:
  - Подпрыгивание иконки корзины при добавлении товара
  - Плавное появление модальных окон
  - Автопереключение слайдов баннера каждые 5 секунд
  - Hover-эффекты на карточках товаров

## 📱 Адаптивность

Приложение полностью адаптивно:
- **Desktop**: 4 карточки товара в ряд
- **Tablet**: 2-3 карточки в ряд
- **Mobile**: 1.5 карточки (с видимым краем следующей)

## 🗄 База данных

### Таблицы

1. **categories** - категории товаров
   - `id`, `name`, `image_url`, `order`

2. **products** - товары
   - `id`, `name`, `description`, `price`, `image_url`, `category_id`, `ingredients`

3. **orders** - заказы
   - `id`, `created_at`, `customer_name`, `customer_phone`, `customer_address`, `total_amount`, `status`, `items`

## 🔧 Разработка

### Добавление новых компонентов

```bash
npx shadcn@latest add [component-name]
```

### Типичные задачи

1. **Добавить новый товар**: Через SQL Editor в Supabase
2. **Изменить цвета**: В `src/app/globals.css` (CSS переменные)
3. **Добавить категорию**: В SQL Editor или через админку Supabase

## 📝 Лицензия

MIT

## 👥 Авторы

Создано с использованием Next.js, Supabase и Shadcn/UI.
