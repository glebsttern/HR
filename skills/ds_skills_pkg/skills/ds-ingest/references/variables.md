# Фаза 3 — Foundation: Variables по коллекциям

Цель: снять токены в `ds/foundation.md`, читая **по коллекции** (крупную — отдельным вызовом), только имя/тип/значение/alias. Каждая коллекция в манифесте — отдельная строка со статусом.

## Чтение одной коллекции (async API, все режимы)

```js
// Вход: COLLECTION_ID (например "VariableCollectionId:90:589")
const col = (await figma.variables.getLocalVariableCollectionsAsync()).find(c => c.id === COLLECTION_ID);
const modes = col.modes; // [{modeId, name}, ...]
const hx = x => Math.round(x * 255).toString(16).padStart(2, "0");
const vars = [];
for (const id of col.variableIds) {
  const v = await figma.variables.getVariableByIdAsync(id);
  const perMode = {};
  for (const m of modes) {
    const raw = v.valuesByMode[m.modeId];
    let value;
    if (raw && raw.type === "VARIABLE_ALIAS") {
      const t = await figma.variables.getVariableByIdAsync(raw.id);
      value = "→ " + (t ? t.name : raw.id);            // alias на примитив
    } else if (v.resolvedType === "COLOR" && raw) {
      value = "#" + hx(raw.r) + hx(raw.g) + hx(raw.b) + (raw.a != null && raw.a < 1 ? ` a${raw.a.toFixed(2)}` : "");
    } else value = raw;
    perMode[m.name] = value;
  }
  vars.push({ name: v.name, type: v.resolvedType, modes: perMode });
}
return { collection: col.name, count: vars.length, modeNames: modes.map(m => m.name), vars };
```

Цвета приходят как `{r,g,b,a}` в 0..1 — конвертируем в hex. Если в коллекции сотни переменных и ответ рискует не влезть — режь `col.variableIds.slice(from, to)` окнами и склеивай.

**Не путать слои по имени.** В реальных китах коллекция может называться неочевидно: например в shadcn-ките коллекция `tokens` это **числовая шкала** (FLOAT), а семантические цвета лежат в коллекции `mode` (light/dark, алиасы на `neutral/*`, `red/*`, `blue/*`). Определяй слой по содержимому (есть ли alias на цветовые примитивы, тип COLOR), а не по названию коллекции.

## Запись в `ds/foundation.md`

Структура — по шаблону `templates/foundation.md` (два-три слоя). Пиши **инкрементально**: первая коллекция создаёт файл, следующие дописывают свой слой.

- Если в ДС есть отдельная коллекция со ссылками (alias) — это Слой 2 (Semantic), отображай связи `имя → target` как есть.
- Если все Variables в одной плоской коллекции (бывает в старых ДС) — пометь это и предложи раздельную модель, но не переделывай исходник (read-only).
- Сразу после записи коллекции отметь её строку в манифесте как `done`.

## Замечания (копятся в конец foundation.md)

```markdown
## Замечания после внесения (Variables)
- [ ] Привязки Semantic → Primitive: <сделаны / частично / плоская коллекция>
- [ ] Кириллица в шрифте: <поддерживается / не проверена / отсутствует>  ← при локали ru/ru+en проверить обязательно
- [ ] Дубликаты имён переменных: <если есть>
- [ ] Переменные без использования: <если детектируется>
```

## Правила

- Read-only. Variables не создаём и не правим на канвасе.
- Имена переменных оставляем как в Figma (латиница). Значения нормализуем (hex для цветов).
- Кириллица: при ru/ru+en проверь, что `font-sans` ДС поддерживает русский (Щ/Ъ/Ь/Ы). На корпоративных ДС иногда шрифт без кириллицы — это блокер, выносим в замечания.
- Коллекцию помечаем `done` в манифесте только после успешной записи.
