---
name: handoff-to-figma
description: Взять хендофф-бандл из Claude Design (tar.gz с CSS + JSX + дока-страницей UI-кита) и собрать дизайн-систему в Figma через Figma MCP — Variables (Primitive → Semantic), стили (text/effect/paint), компоненты (ComponentSet с вариантами). Использовать когда есть бандл/описание UI-кита и просят «перенести в Figma», «собрать ДС в Figma», «через MCP воссоздать», «сделать копию плейбука в Figma».
---

# handoff-to-figma — перенос ДС в Figma через MCP

Берёт результат Claude Design (хендофф-бандл) и строит из него **настоящую** дизайн-систему в Figma: переменные, стили, компоненты. Обёртка над глобальным скиллом `figma-ds`. Каждый прогон — **в свежий, пустой Figma-файл** (создать новый через MCP), с нуля под текущий бандл.

## Подготовка
1. Распаковать бандл (`tar xzf`), прочитать `README.md` (хендофф для агентов) и **чаты** (`chats/`) — там интент.
2. Прочитать **источник истины по стилю**: главный CSS (токены + классы) + дока-JSX (компоненты, гейджи, чарты). Файл, открытый при хендоффе, — приоритетный.
3. Распарсить токены в `ds/foundation.md` (Primitive + Semantic) — **апрув текста до MCP-записей** (инвариант figma-ds).

## Сборка в Figma (порядок)
> Перед `use_figma` всегда грузить гайд `figma-use` (MCP-ресурс). Работать инкрементально, возвращать node ID, проверять скриншотами.
1. **Variables · Primitive** — все цвета (плоские; альфа в значении), числа (радиусы/отступы/размеры). Scopes выставлять явно.
2. **Variables · Semantic** — алиасы (`VARIABLE_ALIAS`) на Primitive (surface/text/accent/status/radius). Прибитых значений нет.
3. **Стили** (в Variables не живут): TextStyles `DS/*` (включая дот-матричный шрифт для halftone-цифр), EffectStyles `DS/*` (тени + subsurface-свечение через Inner Shadow ×N), PaintStyles `DS/*` (градиенты canvas/карточек/кнопок).
4. **Foundation-секция** — свотчи палитры, типо-шкала, радиусы, тени (видно и проверяемо).
5. **Компоненты** — реальные `ComponentSet`/`Component` (`createComponent` + `combineAsVariants`). Fills/radius — Variables; типографика — TextStyles; тени — Effect/Paint Styles. Имена вариантов `Property=value` (Tone/State/Active/Size).
6. **SVG-графика** (гейджи/чарты) — генерить точную геометрию и `createNodeFromSvg` (dasharray/градиенты/clipPath импортируются корректно).

## Инварианты (из figma-ds CONTRACT)
- Компоненты — настоящие ComponentNode, не фреймы. Auto Layout везде. Semantic → alias к Primitive. Один файл на проект. Никаких MCP-записей до апрува текстовых артефактов. Курсив не использовать.

## Ориентир объёма (типовая ДС)
Полная ДС обычно ≈ несколько десятков Primitive + Semantic переменных, ~7–9 text / effect / paint стилей, ~20–35 компонентов с осями Tone/State/Active/Size. Конкретные числа — из текущего бандла.

## На эфире
Вживую — создать свежий файл, собрать Variables + 1–2 компонента (эффектно и быстро). Полную сборку всех компонентов вживую не гнать (долго) — показать метод на части.

## Выход
- Figma-файл с Variables + стилями + UI-китом.
- `ds/foundation.md`, `ds/components.md`, `ds/CONTRACT.md`.
- Готовность к `ds-to-storybook`.
