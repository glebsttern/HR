# Фаза 3 — Сборка экрана

Инкрементально: каркас → секции → проверка. ≤10 операций на вызов, возвращать ID.

## Шаг 1. Страница и каркас

```js
// отдельная страница для экранов (создаём один раз)
let page = figma.root.children.find(p => p.name === "Screens");
if (!page) { page = figma.createPage(); page.name = "Screens"; }
await figma.setCurrentPageAsync(page);

// токены
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const mode = cols.find(c => c.name === "mode");
const vs = await Promise.all(mode.variableIds.map(id => figma.variables.getVariableByIdAsync(id)));
const tok = Object.fromEntries(vs.map(v => [v.name, v]));

const screen = figma.createAutoLayout("VERTICAL", { name: "Screen/<Name>", itemSpacing: 0 });
screen.x = 200; screen.y = 200;                       // не в (0,0)
screen.primaryAxisAlignItems = "CENTER";
screen.counterAxisAlignItems = "CENTER";
screen.paddingTop = screen.paddingBottom = 64; screen.paddingLeft = screen.paddingRight = 64;
let bg = figma.variables.setBoundVariableForPaint({type:"SOLID",color:{r:1,g:1,b:1}}, "color", tok["background"]);
screen.fills = [bg];
return { screenId: screen.id, pageId: page.id };
```

## Шаг 2. Контейнер-карточка (если нужен)

```js
const screen = await figma.getNodeByIdAsync("<screenId>");
const card = figma.createAutoLayout("VERTICAL", { name: "Card", itemSpacing: 16 });
card.paddingTop = card.paddingBottom = 24; card.paddingLeft = card.paddingRight = 24;
card.cornerRadius = 10;                                 // radius-lg
let cf = figma.variables.setBoundVariableForPaint({type:"SOLID",color:{r:1,g:1,b:1}}, "color", tok["card"]);
card.fills = [cf];
let cs = figma.variables.setBoundVariableForPaint({type:"SOLID",color:{r:0,g:0,b:0}}, "color", tok["border"]);
card.strokes = [cs]; card.strokeWeight = 1;
card.resize(400, card.height); card.primaryAxisSizingMode = "AUTO";
screen.appendChild(card);
return { cardId: card.id };
```
(`tok` пересобрать в каждом вызове, переменные между вызовами не живут — передавай ID строками.)

## Шаг 3. Инстансы компонентов в секцию

```js
const card = await figma.getNodeByIdAsync("<cardId>");
// поле Email
const inputMaster = await figma.getNodeByIdAsync("588:108");           // Input/With Label (Set)
const email = (inputMaster.defaultVariant || inputMaster.children[0]).createInstance();
card.appendChild(email);
email.layoutSizingHorizontal = "FILL";                                  // после appendChild
// текст в слот (если надо поменять):
const lbl = email.findOne(n => n.type === "TEXT" && n.name === "Email");
if (lbl) { await figma.loadFontAsync(lbl.fontName); lbl.characters = "Email"; }
return { emailId: email.id };
```

Кнопка из набора, где матрица в именах вариантов (Button `73:3681`):
```js
const btnSet = await figma.getNodeByIdAsync("73:3681");
const variant = btnSet.children.find(c => c.name.includes("Type=primary") && c.name.includes("State=default")) || btnSet.defaultVariant;
const btn = variant.createInstance();
card.appendChild(btn); btn.layoutSizingHorizontal = "FILL";
const bt = btn.findOne(n => n.type === "TEXT");
if (bt) { await figma.loadFontAsync(bt.fontName); bt.characters = "Sign in"; }
```

## Правила

- **Инстансы, не копии.** `createInstance()` от мастера по Node ID. Не пересобирать компонент руками.
- **FILL ставить после appendChild** (иначе ошибка value-rejection).
- **Шрифт грузить** перед любой правкой `characters`.
- **Цвета каркаса/карточки — только бинд к семантике.** Внутри инстансов цвета уже привязаны мастером, не трогаем.
- **Возвращать ID** каждого созданного узла для следующих шагов.
- После каждой секции — `get_screenshot` или `await screen.screenshot()` для проверки.
- Если матрицы вариантов нет в `setProperties` — выбирать вариант-ребёнка по имени и инстансить его.

## Грабли (из реальных сборок)

- **Node ID набора, а не страницы.** В `ds/components.md` лежит ID ComponentSet (напр. Sidebar `616:3399`). НЕ путать с ID страницы компонента (`269:32`) — `getNodeByIdAsync` по ID страницы вернёт PAGE, и `.defaultVariant`/`createInstance` упадут. Проверяй `node.type === "COMPONENT_SET" | "COMPONENT"`.
- **`createAutoLayout`/`createFrame` дают дефолтную белую заливку.** Контейнеры-обёртки без собственной поверхности (Header, ряды, группировки) — явно `frame.fills = []`, иначе это незримый прибитый белый (verify его поймает). Заливку ставим только там, где нужна поверхность (экран, карточка), и только через токен.
- **Инстанс упирается в свою ширину.** Готовые компоненты (Table) имеют фиксированную внутреннюю раскладку; `layoutSizingHorizontal="FILL"` может не растянуть содержимое. Это норма, не ошибка; при нужде оборачивать в контейнер.
- **Менять ВСЕ нужные текстовые слоты, не только лейбл.** У поля бывает и лейбл, и плейсхолдер с одинаковым именем слоя (`Email`): `findOne` вернёт первый. Для пароля поменяй и лейбл, и внутренний плейсхолдер (перебери `findAll(TEXT)` по нужным узлам), иначе останется чужой текст.
- **Тёмная тема — не пересборка.** Не дублируй экран руками под dark. Клонируй и переключи режим коллекции (`references/theming.md`).
