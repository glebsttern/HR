# Фаза 4b — Глубокие профили компонентов (второй слой)

После того как карта (`components.md`) собрана, для качественной сборки экранов нужен **второй слой**: анатомия, слоты, полный набор props/вариантов и размеры по каждому компоненту. Карта = что и где; профиль = как устроено внутри. Складываем по категориям в `ds/components/<категория>.md` — сборка тянет только нужную категорию (прогрессивное раскрытие).

## Что снимаем с каждого компонента

- **Полный список вариантов** набора (имена детей) и `componentPropertyDefinitions` (VARIANT/BOOLEAN/TEXT/INSTANCE_SWAP с дефолтами). Важно: в некоторых китах матрица закодирована **в именах вариантов**, а `componentPropertyDefinitions` пуст — тогда берём имена детей.
- **Представитель** для анатомии — **самый крупный вариант по площади** (`width*height`). Это ловит реальное состояние (`open`/`active`), а не триггер-кнопку.
- **Анатомия**: дерево слоёв глубиной ≤3, имена + типы, для TEXT — образец текста. Повторяющиеся соседние слои схлопываем (`×k`). Кап ~26-32 узла.
- **Размеры** представителя (w×h).

## Рабочий сниппет (проверен на shadcn-ките)

Читаем по странице через `loadAsync`, без рекурсии в инстансы:

```js
figma.skipInvisibleInstanceChildren = true;
const PAGE_IDS = ["<page id>", "..."]; // категория = батч страниц
const MAXN = 30;
function anatomy(root) {
  const raw = [];
  (function walk(n, d) {
    if (d > 3) return;
    for (const c of (n.children || [])) {
      if (raw.length >= MAXN) return;
      const r = { n: c.name, t: c.type, d };
      if (c.type === "TEXT") r.tx = (c.characters || "").slice(0, 34);
      raw.push(r);
      if (c.type === "FRAME" || c.type === "GROUP" || c.type === "INSTANCE" || c.type === "COMPONENT") walk(c, d + 1);
    }
  })(root, 1);
  const out = []; // схлопывание повторов
  for (const r of raw) { const l = out[out.length - 1];
    if (l && l.n === r.n && l.t === r.t && l.d === r.d && !r.tx) l.k = (l.k || 1) + 1; else out.push({ ...r }); }
  return out;
}
const out = [];
for (const pid of PAGE_IDS) {
  const page = await figma.getNodeByIdAsync(pid); await page.loadAsync();
  const sets = page.findAllWithCriteria({ types: ["COMPONENT_SET"] });
  const singles = page.findAllWithCriteria({ types: ["COMPONENT"] }).filter(c => !c.parent || c.parent.type !== "COMPONENT_SET");
  for (const n of [...sets, ...singles]) {
    let props = null;
    try { const d = n.componentPropertyDefinitions; if (d && Object.keys(d).length)
      props = Object.entries(d).map(([k, v]) => ({ name: k.replace(/#.*$/, ""), type: v.type, def: v.defaultValue, opts: v.variantOptions || null })); } catch (e) {}
    let rep = n, variants = null, repVariant = null;
    if (n.type === "COMPONENT_SET" && n.children.length) {
      variants = n.children.map(c => c.name);
      rep = n.children.reduce((a, b) => (b.width * b.height) > (a.width * a.height) ? b : a, n.children[0]); // крупнейший
      repVariant = rep.name;
    }
    out.push({ page: page.name, name: n.name, id: n.id, type: n.type === "COMPONENT_SET" ? "Set" : "Comp", repVariant, w: Math.round(rep.width), h: Math.round(rep.height), props, variants, anatomy: anatomy(rep) });
  }
}
return out;
```

## Порционность и бюджет

- Один батч = одна категория (≤8 страниц). Крупные категории (формы, контейнеры) дроби на 2 вызова.
- Если ответ обрезан (упёрся в лимит MCP ~25k) — уменьши число страниц в батче или `MAXN`/глубину. Прогресс по уже прочитанным категориям не теряется (каждая пишется в свой файл сразу).

## Запись: `ds/components/<категория>.md`

Категории как разделы карты: actions, forms, navigation, overlays, containers-data, feedback-media. На каждый компонент — компактный профиль: имя, тип, Node ID, размеры, варианты/props, ключевые слоты (из анатомии словами), заметки. Сырое дерево не дампим, переводим в читаемые слоты.

В `ds/components.md` добавляем блок ссылок на эти файлы.

## Заметки (грабли из реального прогона)

- `findAllWithCriteria({types:["COMPONENT"]})` тянет variant-детей наборов — фильтровать `parent.type !== "COMPONENT_SET"`.
- Первый вариант набора (`default`) часто триггер, реальная анатомия в крупнейшем — потому берём по площади.
- Демо-страницы (Card, Table, Examples) содержат компонент как композицию примеров, а не чистый атом — помечать в профиле.
