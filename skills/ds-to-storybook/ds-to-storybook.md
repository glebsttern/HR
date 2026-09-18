---
name: ds-to-storybook
description: Из хендофф-бандла (CSS + JSX) собрать React-библиотеку компонентов + Storybook (живой интерактивный плейбук) — порт компонентов 1:1 по стилю, состояния/вариации, интерактив (табы переключаются, тогглы кликаются), анимации по design-engineering (emil-design-eng), мастер-компоненты ★ Playground на каждую группу (работают как на сайте), интерактивные графики/гейджи. Использовать когда есть бандл/CSS+JSX и просят «собрать плейбук», «React-компоненты + Storybook», «живой каталог компонентов», «синхронизировать ДС с кодом», «доработать анимации/графики/гейджи».
---

# ds-to-storybook — живой плейбук (React + Storybook)

Превращает ДС в **переиспользуемую React-библиотеку** с интерактивным каталогом (Storybook). Замыкает мост Figma ↔ код.

## Стек
Vite + React + TypeScript + Storybook 8 (`@storybook/react-vite`). Стили — **CSS из бандла как есть** (гарантирует визуал 1:1). Шрифты — через `previewHead` (Google Fonts: основной грот + дот-матрица для halftone).

## Сборка
1. Скаффолд: `package.json` (react/vite/storybook), `tsconfig`, `.storybook/main.ts` (+ previewHead со шрифтами), `.storybook/preview.tsx` (импорт CSS + декоратор-обёртка в scope-класс ДС на спокойном холсте).
2. Скопировать CSS из бандла в `src/`.
3. Порт компонентов в `.tsx` по классам CSS (карточки, кнопки, контролы, формы, навигация, бейджи, гейджи, чарты, оверлеи). Гейджи/чарты — порт SVG-функций из дока-JSX.
4. **Интерактивные core-компоненты делать самоуправляемыми** (uncontrolled fallback через `useState`): Tabs/SegSoft/Toggle/Checkbox/Radio переключаются по клику из коробки; контролируемый режим — через проп.
5. **Состояния**: default/hover/focus/disabled/error — через CSS (`:hover`, `:disabled`) + пропы.
6. **Анимации по `emil-design-eng`** (`*-motion.css`) — загрузить скилл и применить его философию:
   - кастомные кривые (`--ease-out: cubic-bezier(.23,1,.32,1)` и т.п.), не дефолтные CSS-easing; никаких `transition: all`;
   - `scale(0.97)` на `:active` (мгновенный отклик), hover за `@media (hover:hover) and (pointer:fine)`;
   - origin-aware поповеры (растут из триггера), модалки — из центра; длительности UI <300мс;
   - spinner/skeleton/stagger; **никогда не анимировать от `scale(0)`**;
   - **видимость контента не зависит от анимации** (stagger/draw через `animation-fill-mode: both`, а не базовый `opacity:0`);
   - `prefers-reduced-motion` — убрать движение, оставить фейды;
   - графики — draw-эффект (pathLength/dashoffset), hover-оверлеи HTML поверх SVG (чтобы `preserveAspectRatio` не плющил круги); гейджи — свип к значению на маунте (CSS-transition → interruptible на live-обновлениях), count-up чисел.
   - формат ревью моушена — таблица **Before/After/Почему** (как требует скилл).
7. **Stories** (плейбук): по категориям, каждая — вариации компонента; интерактивные демо (stateful) для табов/списков/пагинации/Select/Modal.
8. **Мастер-компонент ★ Playground на каждую группу** — не статичные состояния, а рабочий составной экран «как на сайте»: форма с печатью и валидацией, async-кнопки (press→spinner→галочка), панель с переключаемыми табами, триггеры оверлеев (тост/модалка/дропдаун), поиск+пагинация, аналитика с hover-графиком, живые метрики (авто-гейдж + слайдер). Именно это — главный «вау» блока плейбука на эфире.
9. Проверка: `npm run build-storybook` (ловит ошибки компиляции), затем `npm run storybook` (live на :6006). Проверить интерактив в браузере (печать в инпут, клик по табу меняет контент, hover на графике даёт тултип, слайдер двигает гейдж). `tsc --noEmit` для типов.

## Правило стиля
Курсив не использовать нигде ([[feedback_no_italic]]). Halftone-цифры — через токен `--font-dot` (заменяемо на брендовый дот-шрифт одной переменной).

## Ориентир состава библиотеки
Типовой пакет: `components.tsx` (Input печатаемый, Slider draggable, AsyncButton, Tabs с едущим инком), `cards.tsx`, `gauges.tsx` (свип + count-up), `viz.tsx` (интерактивный AreaChart, DonutChart с легендой, Radar, BarChart), `overlays.tsx`, `more.tsx`, `<name>-motion.css` (моушен-система по emil-design-eng), `src/stories/*` — в каждой группе **мастер-компонент `Playground` (★)**. `npm run storybook` → localhost:6006. Собирается с нуля под текущий бандл.

## Выход
- React-пакет `<name>-ds/` + Storybook (плейбук).
- Подключение в продукт: `import { Button, Card } from '<name>-ds'` + CSS.
