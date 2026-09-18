# Figma MCP для сборки — правила Plugin API

Сборка идёт через `use_figma` (исполняет JS по Plugin API). Перед первым вызовом загрузить гайд figma-use (`/figma-use` или ресурс `skill://figma/figma-use/SKILL.md`), в вызовах передавать `skillNames:"resource:figma-use"`.

## Обязательное (иначе падает)

- **Async API:** `getNodeByIdAsync`, `getLocalVariableCollectionsAsync`, `getVariableByIdAsync`, `setCurrentPageAsync`, `loadFontAsync`. Sync-аналоги в dynamic-page не работают.
- **Страницы лениво.** Чтобы строить на отдельной странице — `await figma.setCurrentPageAsync(page)` один раз за вызов. Мастера компонентов на других страницах подтягиваются через `getNodeByIdAsync(id)` (он их загрузит).
- **return — единственный вывод.** Всегда возвращать ID созданных узлов: `return { createdNodeIds:[...] }`.
- **Атомарность:** упавший скрипт не выполняется. При ошибке СТОП → читать → чинить → повтор.
- **Инкрементально:** ≤10 логических операций на вызов. Строить каркас → секции → проверка скриншотом.
- **Позиция:** новые top-level узлы ставить не в (0,0) (искать свободное место).

## Инстанс компонента

- Мастер по Node ID: `const master = await figma.getNodeByIdAsync("73:3681")`.
- `COMPONENT` → `master.createInstance()`.
- `COMPONENT_SET` → инстансить нужный вариант: `master.defaultVariant.createInstance()` или найти вариант по имени: `master.children.find(c=>c.name.includes("State=open")).createInstance()`.
- Варианты на инстансе: `inst.setProperties({ State:"open", Type:"primary" })` (ключи/значения из `componentPropertyDefinitions`; если матрица в именах вариантов — инстансить нужного ребёнка напрямую).

## Текст в слот инстанса

```js
const t = inst.findOne(n => n.type === "TEXT" && n.name === "Email"); // имя слота из деталей
await figma.loadFontAsync(t.fontName);   // ОБЯЗАТЕЛЬНО до записи
t.characters = "Электронная почта";
```
Если в инстансе несколько TEXT — бери по имени слоя (см. `ds/components/<категория>.md`). Шрифт грузить именно текущий узла.

## Привязка цвета к семантике

```js
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const mode = cols.find(c => c.name === "mode");
const vs = await Promise.all(mode.variableIds.map(id => figma.variables.getVariableByIdAsync(id)));
const tok = Object.fromEntries(vs.map(v => [v.name, v]));
let fill = { type:"SOLID", color:{r:1,g:1,b:1} };
fill = figma.variables.setBoundVariableForPaint(fill, "color", tok["card"]); // вернёт НОВЫЙ paint
frame.fills = [fill];
// обводка:
let st = { type:"SOLID", color:{r:0,g:0,b:0} };
st = figma.variables.setBoundVariableForPaint(st, "color", tok["border"]);
frame.strokes = [st]; frame.strokeWeight = 1;
```

## Auto Layout

`figma.createAutoLayout('VERTICAL', { itemSpacing: 16, name:'Card' })`. Children: после `appendChild` ставить `layoutSizingHorizontal='FILL'` для растяжки. Радиус — числом или биндом `radius-*`.
