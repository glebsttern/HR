# Фаза 4 — Проверка экрана

После сборки — скриншот + быстрый аудит на консистентность. Read-only.

## Скриншот

`get_screenshot` по `screenId` или `await screen.screenshot()` в конце build-вызова. Смотреть: нет наложений, нет обрезанного текста, отступы ровные, тема единая.

## Аудит (read-only `use_figma`)

```js
const screen = await figma.getNodeByIdAsync("<screenId>");
const all = screen.findAll(() => true);
const report = { instances: 0, rawFills: [], unboundText: 0 };
for (const n of all) {
  if (n.type === "INSTANCE") report.instances++;
  // прибитый цвет (SOLID без привязки к Variable) на наших каркасных фреймах
  if ((n.type === "FRAME") && Array.isArray(n.fills)) {
    for (const f of n.fills) {
      if (f.type === "SOLID" && !(n.boundVariables && n.boundVariables.fills)) report.rawFills.push(n.name);
    }
  }
}
return report;
```

## Что проверяем

- **Инстансы реальные** (`instances > 0`, контролы это INSTANCE, а не нарисованные фреймы).
- **Нет прибитого hex** на каркасных фреймах (фон/карточка/обводка должны быть привязаны к токенам `mode`). Внутри инстансов цвета от мастера — норма.
- **Консистентность между экранами:** второй экран собран из тех же компонентов и токенов → выглядит как одна система.

## Если что-то не так

Точечный фикс-скрипт на сломанный участок, не пересборка всего. Прибитый цвет → перепривязать через `setBoundVariableForPaint`. Обрезанный текст → проверить `layoutSizing`/`textAutoResize`.
