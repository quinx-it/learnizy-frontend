# learnizy

## Установка и запуск

### С помощью предустановленного npm

1. Клонирование репозитория

```bash
git clone https://github.com/quinx-it/learnizy-frontend.git
cd learnizy-frontend
```

2. Установка pnpm (если не установлен)

```bash
npm install -g pnpm
```

3. Установка зависимостей

```bash
pnpm install
```

4. Запуск проекта в режиме разработки

```bash
pnpm dev
```

Приложение будет доступно по адресу:

```
http://localhost:3000
```

### Альтернативный вариант (c помощью Docker):

Cоберите образ и поднимите контейнер:

```bash
docker build --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.edu.pxel.software -t edu-frontend:latest .
docker run --rm -p 3015:3000 edu-frontend:latest
```

После этого приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

## Стек технологий

- **TypeScript** — [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

- **Next.js** — [https://nextjs.org/docs](https://nextjs.org/docs)

- **Tailwind CSS** — [https://tailwindcss.com/](https://tailwindcss.com/)

- **shadcn/ui** — [https://ui.shadcn.com/](https://ui.shadcn.com/)

- **React** — [https://react.dev/](https://react.dev/)

## Работа с ветками и пулл-реквестами

1. Для каждой новой задачи берём её ID из системы трекинга задач.

2. Создаём новую ветку для работы над задачей по шаблону:

```
feature/ID
```

например:

```
feature/123
```

3. Основные ветки в репозитории:

- `main` — ветка для продакшн-сборки и релизов.
- `dev` — ветка для девелоперского стенда.

4. После завершения работы над задачей создаём пулл-реквест (Pull Request, PR):

- PR должен быть основан на ветке `dev`;
- В описании PR обязательно указывайте ссылку на задачу;
- Прикладывайте скриншоты с результатами выполненной работы;
- Для слияния задачи необходимо собрать минимум два одобренных PR.

## Структура проекта и оформление компонентов

### Основные папки

- `app` — используется для маршрутизации (routing) приложения.
- `store` — содержит глобальный стейт и логику управления состоянием (если понадобится).
- `shared` — папка с переиспользуемыми компонентами и утилитами, включает в себя:
  - `ui` — стандартные UI-компоненты.
  - `components` — кастомные компоненты, специфичные для приложения.
  - `constants` — константы, используемые по всему приложению.
  - `hooks` — кастомные React-хуки.
  - `types` — типы TypeScript.
  - `app-pages` - компоненты для страниц,весь контент будет в них и далее компонент уже вставляется в page.tsx

### Именование файлов и папок

- Названия папок пишутся в формате с дефисами, например:

```

home-widget

```

- В каждой папке с компонентом должен быть файл с расширением `.tsx`, названный так же, как папка.  
  Например, для папки `home-widget` файл должен называться:

```

home-widget.tsx

```

- Кроме того, в папке обязательно должен быть файл `index.ts`, который экспортирует компонент из основного файла:

```ts
export { HomeWidget } from './home-widget';
```

Такой подход упрощает навигацию и делает структуру проекта более понятной и масштабируемой.

## Оптимизация проекта

- Для отображения изображений используйте компонент `Image` из Next.js:

```tsx
import Image from 'next/image';

<Image src="/profile.webp" alt="Profile picture" width={500} height={500} />;
```

- Все картинки рекомендуется конвертировать в формат **webp** для оптимального качества и размера.

- Изображения размещайте в папке `public` проекта.

- Для навигации используйте компонент `Link` из `components`:

```tsx
import Link from '@/components/Link';

<Link href="/blog">Blog</Link>;
```

- Для SVG-иконок создавайте отдельные компоненты. Папка для иконок:

```
src/shared/ui/icons
```

## Дизайн-система

- Для стилизации используем готовые утилитарные классы Tailwind CSS.

- Кастомные стили и переменные цветов определены в файле `globals.css`:

```css
:root {
  --color-light: var(--light);
  --color-soft: var(--soft);
  --color-medium: var(--medium);
  --color-dark: var(--dark);
  --color-deep: var(--deep);
}
```

## Typography-компонент

- Для текста в проекте есть собственный компонент Typography с двумя основными элементами: `<Heading>` и `<Text>`.  
  Они поддерживают разные варианты размеров и теги (`h1`-`h6`, `p`, `span`).

### Пример использования

```tsx
import { Heading, Text } from '@/components/Typography';

<Heading tag="h1" variant="minor-6xl">
  Заголовок первого уровня
</Heading>

<Text tag="p" variant="m-16">
  Обычный абзац текста с размером 16px.
</Text>
```
