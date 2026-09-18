# Фаза 1 — Перепись (census-first)

Цель: до любого тяжёлого чтения снять **дешёвую карту масштаба** — сколько страниц, секций, наборов компонентов, коллекций Variables. От этой картины считаем размер порций в Фазе 2. Перепись почти бесплатна по токенам, потому что возвращает только счётчики и имена, без описаний, матриц и значений.

## Что снимаем

- Список страниц файла (имена).
- Для страниц с компонентами: верхний уровень — типы и имена детей (COMPONENT_SET / COMPONENT / FRAME / SECTION), без захода внутрь.
- Счётчики: сколько ComponentSet, сколько одиночных Component, сколько группирующих фреймов/секций (и сколько прямых детей-компонентов в каждом).
- Коллекции Variables: имена и количество переменных в каждой.

## Шаг A — лёгкий вызов: страницы + коллекции (НЕ грузим children)

Страницы в Figma грузятся лениво: `page.children` пуст, пока страница не загружена. Поэтому сначала снимаем только список страниц (id, name) и коллекции Variables — это не требует загрузки.

```js
// Async API обязателен. children здесь НЕ трогаем.
const pages = figma.root.children.map(p => ({ id: p.id, name: p.name }));
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const cols = collections.map(c => ({
  name: c.name, id: c.id,
  modes: c.modes.map(m => m.name),
  count: c.variableIds.length
}));
return { pageCount: pages.length, pages, collectionCount: cols.length, collections: cols };
```

По результату определяешь **топологию** (это решает нарезку порций):
- **Одна страница = один компонент** (имена страниц это имена компонентов: Button, Card, ...) → порция = страница.
- **Одна страница Components со всем** → порция = секция или окно индексов внутри страницы.

## Шаг B — счётчики компонентов по страницам (с `loadAsync`)

Чтобы посчитать компоненты на странице, её нужно загрузить. Используй `await page.loadAsync()` — он грузит одну страницу **без** переключения текущей (так можно пройти несколько страниц за один вызов, не нарушая правило одного `setCurrentPageAsync`).

```js
figma.skipInvisibleInstanceChildren = true; // ускоряет обход
const ids = ["<page id 1>", "<page id 2>", "..."]; // батч страниц из шага A
const out = [];
for (const id of ids) {
  const page = await figma.getNodeByIdAsync(id);
  if (!page) { out.push({ id, error: "not found" }); continue; }
  await page.loadAsync();
  // ComponentSet не вложены друг в друга — считаем напрямую
  const sets = page.findAllWithCriteria({ types: ["COMPONENT_SET"] }).length;
  // standalone COMPONENT = не variant-ребёнок набора (иначе счёт раздувается вариантами)
  const singles = page.findAllWithCriteria({ types: ["COMPONENT"] })
    .filter(c => !c.parent || c.parent.type !== "COMPONENT_SET").length;
  out.push({ page: page.name, id, sets, singles });
}
return out;
```

**Важно:** `findAllWithCriteria({types:["COMPONENT"]})` возвращает и variant-детей внутри `COMPONENT_SET`. Всегда фильтруй по `parent.type !== "COMPONENT_SET"`, иначе счёт компонентов раздувается в разы.

Icon-библиотеки (тысячи глифов) на шаге B только считаем (`.length`), не листаем.

## Выход: `ds/_scan/census.md`

```markdown
# Перепись ДС

**Источник:** <из source.md>
**Дата:** <ISO>

## Страницы
| Страница | Node ID | Всего сверху | ComponentSet | Component | Группы | Прим. |
|---|---|---|---|---|---|---|
| Components | 1:2 | 220 | 180 | 30 | 10 | основная |
| Blocks | 3:4 | 60 | 40 | 5 | 15 | блоки/шаблоны |

## Группирующие фреймы/секции (по страницам)
- Components → `Forms` (id 5:6, 24 комп.), `Navigation` (id 5:7, 12 комп.), ...

## Коллекции Variables
| Коллекция | Node ID | Режимы | Кол-во переменных |
|---|---|---|---|
| Primitives | 9:1 | Light, Dark | 320 |
| Semantic | 9:2 | Light, Dark | 140 |

## Итого
- Наборов компонентов: <N>
- Одиночных компонентов: <M>
- Переменных всего: <K> в <C> коллекциях
- Грубая оценка: <«помещается в 1-2 порции» / «нужно ~6 порций по 40»>
```

## Правила

- Перепись **обязательна** до Фазы 4. Без неё нельзя корректно нарезать порции.
- Перепись read-only и лёгкая. Если вдруг и она тяжёлая — режь её саму по страницам.
- Уже на переписи помечай аномалии: страницы с компонентами вне ожидаемой `Components`, подозрительно большие группы, плоская единственная коллекция Variables. Это вход для Фазы 2 и Фазы 5.
