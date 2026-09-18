# Темизация (light / dark) — без пересборки

Если в ДС есть мультирежимная коллекция токенов (у shadcn это `mode` с режимами `light mode` / `dark mode`), тему экрана меняем **переключением режима коллекции на корне фрейма** — всё внутри (включая вложенные инстансы компонентов) перекрашивается каскадом, потому что привязано к семантике. Компоненты не пересобираем и не трогаем.

## Сделать тёмную копию существующего экрана

```js
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const mode = cols.find(c => c.name === "mode");
const darkId = mode.modes.find(m => m.name === "dark mode").modeId;

const light = await figma.getNodeByIdAsync("<screenId>");
const dark = light.clone();
dark.name = light.name + " (dark)";
dark.x = light.x; dark.y = light.y + light.height + 120;     // под оригиналом
dark.setExplicitVariableModeForCollection(mode, darkId);      // каскад на весь субтри
return { darkId: dark.id };
```

## Собрать экран сразу в тёмной теме

После создания корневого фрейма экрана (до или после наполнения) поставить режим:
```js
screen.setExplicitVariableModeForCollection(mode, darkId);
```
Дальнейшая сборка инстансами идёт уже в тёмной теме.

## Правила

- **setExplicitVariableModeForCollection ставим на корень субтри** (экран/клон). Режим наследуется вниз, отдельным узлам трогать не нужно.
- Передавать **объект коллекции** (или её id) и **modeId** (не имя режима).
- Работает только если значения привязаны к семантике из этой коллекции. Прибитый hex в тёмную не уйдёт — ещё одна причина не прибивать цвета (verify ловит).
- Имена режимов берём из `ds/foundation.md` (там видно, что коллекция `mode` двухрежимная) или из census. Не угадывать.
- Для пары «светлый ↔ тёмный» под запись: клон ставим под оригиналом (или справа), имя с суффиксом `(dark)`.
