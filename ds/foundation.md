# Foundation (внесена через ds-ingest)

**Источник:** HR Library (корпоративная), страница Variables API — коллекции: 🎨 Primitives, 🧩 Semantic, 📐 Spacing, 🔘 Radius, ✏️ Typography, 🔩 Components. См. `ds/source.md`.
**Дата внесения:** 2026-09-17
**Обновлено:** 2026-09-17 — заведена шкала `green/400–700` (бренд SoftClub) и акцент перекинут с `red/*` на `green/*`; затем заведены `text/error`/`border/error` (Semantic) на `red/*` и `input/*-error` (Components) перепривязаны на них; затем заведены шкалы `success/400–700`, `warning/400–700`, `info/400–700` в Primitives и парные `text/border` Semantic-токены для каждой; затем построен каталог компонентов (`ds/components.md`); затем добавлены 5 component-токенов hover/focus для search/navbar/sticky «по аналогии» с уже существующими паттернами — см. Замечания.

Слои токенов как в исходной ДС (3 слоя, все коллекции — с alias-цепочками Component → Semantic → Primitive). На экранах используется только Semantic/Component-слой. Прибитые значения вне Variables запрещены (см. `ds/CONTRACT.md`).

## Слой 1 — примитивные токены (`🎨 Primitives`, режим Value, 39 шт.)

### Палитра — neutral
| Токен | Hex |
|---|---|
| `neutral/0` | `#ffffff` |
| `neutral/25` | `#f8f8fa` |
| `neutral/50` | `#f7f7f7` |
| `neutral/100` | `#efefef` |
| `neutral/200` | `#e0e0e0` |
| `neutral/300` | `#bdbdbd` |
| `neutral/400` | `#9e9e9e` |
| `neutral/450` | `#73777d` |
| `neutral/500` | `#757575` |
| `neutral/600` | `#616161` |
| `neutral/700` | `#424242` |
| `neutral/800` | `#2e2e2e` |
| `neutral/900` | `#1a1a1a` |
| `neutral/1000` | `#111111` |

### Палитра — акцент/статус/прочее
| Токен | Hex | Прим. |
|---|---|---|
| `green/50` | `#e7f3ec` | добавлен 2026-09-17 — светлый тинт бренда, **замерен на job.softclub.by** (фон активного пункта меню) |
| `green/400` | `#0cb65e` | добавлен 2026-09-17 — светлее базового, для Dark-режима |
| `green/500` | `#008c44` | добавлен 2026-09-17 — **точный бренд SoftClub**, взят с job.softclub.by (замерен как фон активной кнопки нав-меню) |
| `green/600` | `#006632` | добавлен 2026-09-17 — темнее, для hover |
| `green/700` | `#004220` | добавлен 2026-09-17 — самый тёмный, для парности со шкалой red |
| `red/400` | `#f05252` | оставлен как есть, ссылок из Semantic больше нет (см. Замечания) |
| `red/500` | `#e63333` | — |
| `red/600` | `#cc2222` | — |
| `red/700` | `#b01414` | — |
| `black/overlay-10` | `#000000 a0.10` | — |
| `black/overlay-40` | `#000000 a0.40` | — |
| `white/overlay-80` | `#ffffff a0.80` | добавлен 2026-09-17 — под «стеклянную» шапку, по аналогии с `black/overlay-*` |
| `white/overlay-20` | `#ffffff a0.20` | добавлен 2026-09-24 — под панель списка вакансий, которая наползает на Хиро |
| `blue/border-light` | `#e1e2fb` | — |
| `success/400` | `#51f08c` | добавлен 2026-09-17 |
| `success/500` | `#33e674` | добавлен 2026-09-17 |
| `success/600` | `#22ce61` | добавлен 2026-09-17 |
| `success/700` | `#13ae4c` | добавлен 2026-09-17 |
| `warning/400` | `#f0b651` | добавлен 2026-09-17 |
| `warning/500` | `#e6a433` | добавлен 2026-09-17 |
| `warning/600` | `#ce8f22` | добавлен 2026-09-17 |
| `warning/700` | `#ae7613` | добавлен 2026-09-17 |
| `info/400` | `#518ef0` | добавлен 2026-09-17 |
| `info/500` | `#3377e6` | добавлен 2026-09-17 |
| `info/600` | `#2264ce` | добавлен 2026-09-17 |
| `info/700` | `#134fae` | добавлен 2026-09-17 |

Зелёная брендовая шкала (`green/*`) заведена в Figma через `ds-ingest`-сессию 2026-09-17 (создание Variable — исключение из read-only режима скилла, сделано по прямому запросу пользователя). Hue/насыщенность сохранены от точного бренд-замера (`green/500`), 400/600/700 — производные по HSL (та же логика ступеней, что у `red/*`).

`success/*`, `warning/*`, `info/*` заведены 2026-09-17 (по запросу) той же схемой ступеней S/L, что у `red/*` (400: S84/L63, 500: S78/L55, 600: S72/L47, 700: S80/L38), на новых hue: success 142° (позитивный зелёный, намеренно отличается от бренд-зелёного `green/*` — оттенок светлее и ярче, чтобы не путался с primary action), warning 38° (янтарный), info 217° (синий, отличается от уже существующего `blue/border-light`, который остаётся только под инпуты). **Только примитивы** — Semantic/Component-алиасы под них ещё не заведены, см. Замечания.

### Типографика (`✏️ Typography`, 27 шт.)
- `font/family/primary` = **Inter**
- Размеры: `display-xl` 80 · `display-l` 64 · `display-m` 48 · `h1` 40 · `h2` 32 · `h3` 24 · `h4` 20 · `h5` 16 · `body-l` 18 · `body-m` 16 · `body-s` 14 · `label-l` 16 · `label-m` 14 · `label-s` 12 · `caption-m` 12 · `caption-s` 10 · `nav` 13 · `btn-l` 14 · `btn-m` 13 · `btn-s` 12 · `tag` 11
- Line-height: `tight` 1.0 · `snug` 1.1 · `normal` 1.3 · `relaxed` 1.4 · `loose` 1.6
- Веса как отдельных Variables нет (веса, судя по всему, заданы текстовыми стилями на странице «Styles & Variables», не Variables — не входит в текущий охват).

### Радиусы (`🔘 Radius`, 7 шт.)
`radius/0` 0 · `radius/4` 4 · `radius/8` 8 · `radius/12` 12 · `radius/16` 16 · `radius/24` 24 · `radius/full` 9999

### Отступы (`📐 Spacing`, 17 шт.)
2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 56 · 64 · 80 · 96 · 120 · 160

### Тени
Variables для теней в файле нет (ни в одной из 6 коллекций). Возможно заданы как Effect Styles на канвасе — вне охвата этого внесения (охватывали только Variables API).

## Слой 2 — смысловые токены (`🧩 Semantic`, Light/Dark, 38 шт.)

| Токен | Light | Dark |
|---|---|---|
| `bg/page` | → `neutral/100` | → `neutral/900` |
| `bg/surface` | → `neutral/0` | → `neutral/800` |
| `bg/surface-elevated` | → `neutral/0` | → `neutral/700` |
| `text/primary` | → `neutral/1000` | → `neutral/0` |
| `text/secondary` | → `neutral/500` | → `neutral/400` |
| `text/disabled` | → `neutral/300` | → `neutral/600` |
| `text/inverse` | → `neutral/0` | → `neutral/900` |
| `text/accent` | → **`green/500`** | → **`green/400`** |
| `border/default` | → `neutral/200` | → `neutral/700` |
| `border/strong` | → `neutral/400` | → `neutral/500` |
| `border/accent` | → **`green/500`** | → **`green/400`** |
| `action/primary` | → **`green/500`** | → **`green/500`** |
| `action/primary-hover` | → **`green/600`** | → **`green/400`** |
| `action/primary-text` | → `neutral/0` | → `neutral/0` |
| `action/secondary` | → `neutral/0` | → `neutral/0` |
| `action/secondary-border` | → `neutral/1000` | → `neutral/0` |
| `action/secondary-text` | → `neutral/1000` | → `neutral/900` |
| `action/btn-secondary` | → `neutral/1000` | → `neutral/0` |
| `action/btn-secondary-text` | → `neutral/0` | → `neutral/900` |
| `action/btn-outline-bg` | → `neutral/0` | `#000000 a0.00` |
| `action/btn-outline-border` | → `neutral/1000` | → `neutral/0` |
| `action/btn-outline-text` | → `neutral/1000` | → `neutral/0` |
| `border/input` | → `blue/border-light` | → `neutral/600` |
| `bg/input` | → `neutral/0` | → `neutral/800` |
| `bg/input-disabled` | → `neutral/200` | → `neutral/700` |
| `text/placeholder` | → `neutral/450` | → `neutral/500` |
| `text/error` | → `red/500` | → `red/400` |
| `border/error` | → `red/500` | → `red/400` |
| `bg/muted` | → `neutral/100` | → `neutral/700` |
| `bg/muted-hover` | → `neutral/200` | → `neutral/600` |
| `bg/accent-subtle` | → `green/50` | → `green/700` |
| `bg/glass` | → `white/overlay-80` | → `black/overlay-40` |
| `bg/glass-soft` | → `white/overlay-20` | → `black/overlay-10` |
| `text/success` | → `success/500` | → `success/400` |
| `border/success` | → `success/500` | → `success/400` |
| `text/warning` | → `warning/500` | → `warning/400` |
| `border/warning` | → `warning/500` | → `warning/400` |
| `text/info` | → `info/500` | → `info/400` |
| `border/info` | → `info/500` | → `info/400` |

`text/error`/`border/error` добавлены 2026-09-17 — выделяют error-состояние из accent-токенов. `text/success`/`border/success`, `text/warning`/`border/warning`, `text/info`/`border/info` добавлены 2026-09-17 той же схемой (Light → `/500`, Dark → `/400`) поверх примитивов `success/warning/info/400-700`, см. Замечания. Сознательно нет `bg/*` для статусов — по аналогии с `error`, чтобы не плодить токены, которых пока не просит ни один компонент (страница Components пуста); при появлении бейджей/алертов `bg/success` и т.п. добавляются тем же способом.

## Слой 3 — компонентные токены (`🔩 Components`, Light/Dark, 124 шт. — 80 исходных + 5 hover/focus «по аналогии» + 7 под `NavItem`/`Header` + 10 под `Select` + 9 под `Radio` + 8 под `Checkbox` + 5 под `Footer`). `Textarea` и `SearchButton` новых токенов не потребовали — переиспользуют `input/*` и `search/*`

Все — alias на Semantic (не на Primitive напрямую), кроме одного плоского исключения ниже. Сгруппировано по семейству:

- **button** (14): `primary/bg,bg-hover,text` → `action/primary*`; `secondary/bg,bg-hover,text` → `action/btn-secondary*`; `outline/bg,bg-hover,border,border-hover,text,text-hover` → `action/btn-outline*` / `action/btn-secondary*`; `disabled/bg,text` → `text/disabled`, `text/secondary`
- **input** (11): `bg,bg-disabled,border-default,border-hover,border-focus,border-error,text-value,text-placeholder,text-label,text-hint,text-error` → `bg/input*`, `border/input`, `border/strong`, `text/primary`, `text/*`; `border-error`→`border/error`, `text-error`→`text/error` (с 2026-09-17, было `border/accent`/`text/accent`)
- **fileupload** (7): `bg,border,border-hover,text,text-hover,icon,bg-filled` → `bg/page`, `text/primary`, **`action/primary`** (hover), `text/secondary`, `bg/surface`
- **dropdown** (10): `bg,border,item-bg,item-bg-hover,item-text,item-text-selected,item-bg-selected,icon,icon-selected,shadow` → `bg/surface`, `border/default`, `bg/page`, **`action/primary`** (selected/icon-selected)
- **tag** (5): `bg,bg-active,border,text,text-active` → `bg/surface`, **`action/primary`** (active), `border/default`, `text/primary`, `action/primary-text`
- **badge** (4): `bg-hot,text-hot` → **`action/primary`**, `action/primary-text`; `bg-new,text-new` → `bg/surface-elevated`, `text/primary`
- **card** (4): `bg,border,title,subtitle` → `bg/surface`, `border/default`, `text/primary`, `text/secondary`. `border` не использовался при первой сборке (Card default — без обводки, только тень); с 2026-09-17 применяется на `state=hover` (тот же токен, повторно — новый не заводили)
- **header** (7, бывш. `navbar/*` — переименовано 2026-09-17 вместе с компонентом; ссылки в Figma по ID, поэтому переименование безопасно): `bg,border,text,text-active,text-accent,text-hover` → `bg/surface`, `border/default`, `text/secondary`, `text/primary`, **`text/accent`**, `text/primary`; `bg-glass`→`bg/glass` (добавлен 2026-09-17 под «стекло» шапки). Сейчас в `Header` реально используется только `bg-glass` — текстовые токены остались доступными на случай простых текстовых ссылок в шапке
- **select** (10, новый набор 2026-09-17): `bg`→`bg/input`, `bg-hover`→`bg/input`, `bg-disabled`→`bg/input-disabled`, `border`→`border/input`, `border-hover`→`border/strong`, `border-open`→`text/primary`, `text`→`text/primary`, `text-placeholder`→`text/placeholder`, `text-disabled`→`text/disabled`, `icon`→`text/secondary`. **Намеренно ведут ровно на ту же семантику, что и `input/*`** — селект должен выглядеть как поле ввода (по запросу пользователя; первая версия смотрела на `bg/surface`+`bg/muted` и выбивалась из формы)
- **footer** (5, новый набор 2026-09-18): `bg`→`bg/surface`, `text`→`text/secondary`, `link`→`text/primary`, `link-hover`→`text/accent`, `border`→`border/default`. По аналогии с `header/*`
- **checkbox** (8, новый набор 2026-09-18): `bg`→`bg/input`, `bg-checked`→`action/primary`, `bg-checked-hover`→`action/primary-hover`, `bg-disabled`→`bg/input-disabled`, `border`→`border/input`, `border-hover`→`border/strong`, `border-disabled`→`text/disabled`, `icon`→`action/primary-text`. Зеркалит `radio/*`, плюс заливка-акцент под галочку
- **radio** (9, новый набор 2026-09-17): `bg`→`bg/input`, `bg-active-hover`→`bg/accent-subtle`, `bg-disabled`→`bg/input-disabled`, `border`→`border/input`, `border-hover`→`border/strong`, `border-active`→`action/primary`, `border-disabled`→`text/disabled`, `dot`→`action/primary`, `dot-disabled`→`text/disabled`. Границы по аналогии с `input/*`, акцент — `action/primary`
- **navitem** (6, новый набор 2026-09-17): `bg`→`bg/muted`, `bg-hover`→`bg/muted-hover`, `bg-active`→`bg/accent-subtle`, `text`→`text/primary`, `text-hover`→`text/primary`, `text-active`→`text/accent`. Заведён под атом `NavItem` (пункт меню-пилюля); активное состояние повторяет job.softclub.by — светло-зелёная плашка + зелёный текст
- **divider** (1): `color` → `border/default`
- **search** (7): `bg,border,icon,btn-bg` → `bg/surface`, `border/input`, `text/secondary`, **`action/primary`**; `border-hover`→`border/strong`, `border-focus`→`text/primary`, `btn-bg-hover`→`action/primary-hover` (добавлены 2026-09-17, по аналогии с `input/border-hover`, `input/border-focus`, `button/primary/bg-hover`)
- **sticky** (4): `bg,title,subtitle` → `bg/surface`, `text/primary`, `text/secondary`; `bg-hover`→`bg/surface-elevated` (добавлен 2026-09-17, по аналогии с `dropdown/item-bg-hover`)
- **social** (4): `bg,bg-hover,icon,icon-hover` → `bg/surface-elevated`, `text/primary`, `action/primary-text`
- **avatar** (2): `bg,text` → `bg/surface-elevated`, `text/secondary`
- **pagination** (5): `bg,bg-active,text,text-active,border` → `bg/surface`, **`action/primary`**, `text/primary`, `action/primary-text`, `border/default`

Жирным — узлы, где акцентный цвет входит в цепочку (все теперь ведут на `green/500`/`green/400`, проверено пересчётом полной alias-цепочки Component → Semantic → Primitive после правки).

## Замечания после внесения (Variables)

- [x] Привязки Semantic → Primitive: **сделаны** (Semantic и Component-слой — чистые alias-цепочки, хардкода почти нет). Единственное плоское значение — `action/btn-outline-bg` в Dark = `#000000 a0.00` (прозрачный чёрный, не alias — вероятно намеренно как «прозрачный», но не через `neutral`).
- [x] Кириллица в шрифте: **поддерживается** — `font/family/primary` = Inter, кириллица есть.
- [x] Дубликаты имён переменных: не обнаружены (все 202 имени уникальны в пределах своих коллекций: 178 исходных + `green/400-700` + `text/error`+`border/error` + `success/400-700`+`warning/400-700`+`info/400-700` + `text/success`+`border/success`+`text/warning`+`border/warning`+`text/info`+`border/info`).
- [ ] Переменные без использования: не проверялось (нужен обход инстансов на канвасе — вне охвата read-only переписи по Variables API).
- [x] **✅ БЛОКЕР БРЕНДА ЗАКРЫТ 2026-09-17.** Заведена шкала `green/400–700` в `🎨 Primitives` (`green/500` = `#008c44`, точный замер с job.softclub.by), и 4 семантических токена акцента перекинуты с `red/*` на `green/*`: `text/accent`, `border/accent`, `action/primary`, `action/primary-hover` (маппинг Light/Dark сохранён 1:1 таким же, каким был на red). Проверено пересчётом полной цепочки — все компонентные акценты (`button/primary/bg`, `badge/bg-hot`, `tag/bg-active`, `search/btn-bg`, `dropdown/*-selected`, `pagination/bg-active`, `navbar/text-accent`) теперь резолвятся в `#008c44`. `red/*` primitives оставлены в файле нетронутыми (на них больше никто не ссылается из Semantic/Components), можно переиспользовать под error-состояния (см. следующий пункт) или удалить, если владелец ДС решит, что они не нужны.
- [x] **✅ ERROR-СОСТОЯНИЯ ОТВЯЗАНЫ ОТ ACCENT, 2026-09-17.** До правки `input/border-error`/`input/text-error` (Components) alias'ились на `border/accent`/`text/accent` (Semantic) — то есть accent и error всегда делили один токен, что после перевода accent на зелёный сделало бы error-состояние поля тоже зелёным. Исправлено: заведены новые Semantic-токены `text/error` и `border/error` (alias на `red/500` Light / `red/400` Dark — те же значения и структура, что раньше были у `text/accent`/`border/accent`), и `input/border-error` → `border/error`, `input/text-error` → `text/error` перепривязаны на них. Проверено пересчётом цепочки: `input/border-error` и `input/text-error` резолвятся в `#e63333` (Light) / `#f05252` (Dark), независимо от бренд-акцента. `red/*` primitives теперь используются осмысленно (error), не как случайный остаток импорта.
- [x] **✅ ШКАЛЫ SUCCESS/WARNING/INFO + СЕМАНТИКА ЗАВЕДЕНЫ 2026-09-17 (по запросу).** Primitives: `success/400-700` (H142°, зелёный, намеренно светлее/ярче бренд-зелёного `green/*`, чтобы статус не путался с primary-действием), `warning/400-700` (H38°, янтарный), `info/400-700` (H217°, синий) — та же схема S/L-ступеней, что у `red/*`. Semantic: по образцу `text/error`/`border/error` заведены `text/success`/`border/success`, `text/warning`/`border/warning`, `text/info`/`border/info` (Light → `/500`, Dark → `/400`). Проверено пересчётом цепочки — все 6 резолвятся в ожидаемый hex примитива. **Компонентный слой не тронут** — bg-варианты и сами component-токены (`badge/bg-success` и т.п.) не заведены, т.к. на странице Components пока нет ни одного реального компонента, которому они бы принадлежали (см. `ds/components.md`); заводить их раньше компонентов означало бы гадать на пустом месте.
- [x] Тени: заведены как Effect Styles (не Variables — Figma Variables не поддерживают тип EFFECT): `shadow/card`, `shadow/search` (замерены на whitesnake.by), `shadow/card-hover` (2026-09-17, усиленная версия `shadow/card` по аналогии — offset/blur/opacity увеличены пропорционально, не заводился отдельный замер).
- [x] **✅ КОМПОНЕНТНЫЙ КАТАЛОГ ПОСТРОЕН, 2026-09-17.** Страница «Components» заполнена (16 компонентов/наборов + пример + 2 кастомные иконки) — подробности и Node ID в `ds/components.md`.
- [x] **✅ ТОКЕНЫ ПОД ШАПКУ И МЕНЮ, 2026-09-17.** Добавлено 13 переменных под `Header`/`NavItem`: примитивы `green/50` (#e7f3ec, замер с job.softclub.by) и `white/overlay-80`; семантика `bg/muted`, `bg/muted-hover`, `bg/accent-subtle`, `bg/glass`; компонентные `navitem/bg|bg-hover|bg-active|text|text-hover|text-active` и `header/bg-glass`. Группа `navbar/*` переименована в `header/*` (ссылки в Figma по ID — переименование ничего не ломает). Плюс Effect Style `blur/glass` (BACKGROUND_BLUR 20) под «стекло».
- [ ] `font/size/nav` = 13 не используется: в `NavItem` взят `font/size/label-l` = 16 как ближайший к референсным 17px. При правке токенов решить судьбу `nav`.
- [x] **✅ HOVER/FOCUS-ТОКЕНЫ ДОБАВЛЕНЫ «ПО АНАЛОГИИ», 2026-09-17 (по запросу пользователя, ожидается доводка позже).** 5 новых Component-переменных, каждая скопирована с того же Semantic-таргета, что и ближайший существующий аналог в файле — не придуманы с нуля:
  - `search/border-hover` → `border/strong` (тот же таргет, что `input/border-hover`)
  - `search/border-focus` → `text/primary` (тот же таргет, что `input/border-focus`)
  - `search/btn-bg-hover` → `action/primary-hover` (тот же таргет, что `button/primary/bg-hover`)
  - `navbar/text-hover` → `text/primary` (тот же таргет, что `navbar/text-active`)
  - `sticky/bg-hover` → `bg/surface-elevated` (тот же таргет, что `dropdown/item-bg-hover`)

  `card/border` — новый токен не заводился, переиспользован существующий (был в файле с самого начала, но не использовался ни в одном компоненте).

  **Известный побочный эффект, ждёт правки:** `sticky/bg` (→`bg/surface`) и `sticky/bg-hover` (→`bg/surface-elevated`) в Light-режиме резолвятся в один и тот же белый (`bg/surface-elevated` Light = `neutral/0` = `#ffffff`, совпадает с `bg/surface` Light) — hover визуально не отличается от default на светлой теме (в Dark отличие есть: neutral/800 vs neutral/700). Аналогичный паттерн уже был замечен на `avatar/bg` ранее и оставлен как есть по решению пользователя — вероятно, тот же случай.
