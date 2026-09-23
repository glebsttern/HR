# Components (HR Library, страница Components)

**Источник:** страница «Components» (Node ID `0:1`), https://www.figma.com/design/UPfefWk5FHbm4ljnfzeJrr/HR-Library?node-id=0-1
**Кол-во:** 16 переиспользуемых компонентов/наборов + 1 пример-композиция + 2 кастомные иконки.
**Обновлено:** 2026-09-17 — четвёртый проход: полное переименование слоёв в PascalCase/английский, атом `NavItem`, компонент `Header` (1660).

## Соглашение об именовании (с 2026-09-17)

- **Все слои — PascalCase, только латиница.** Русский остаётся только в *контенте* текстовых слоёв (это продуктовые тексты ru-сайта), не в именах.
- Секции страницы: `Actions`, `Inputs`, `Containers`, `Navigation`, `Feedback`, `Data`, `Misc`, `CustomIcons`.
- Варианты: `Property=Value` в PascalCase — `Variant=Primary, Size=Medium, State=Default`.
- Служебные слои: `Label`, `Value`, `Hint`, `Title`, `Subtitle`, `Caption`, `Placeholder`, `Field`, `MetaRow`, `MetaItem`, `MetaLabel`, `TagRow`, `Footer`, `Salary`, `Trigger`, `Item`, `ItemLabel`, `ItemHover`, `TextColumn`, `IconButton`, `SearchButton`, `Number`, `Initials`, `Mark`, `Wordmark`, `Shape`, `NavGroup`, `RightGroup`.
- Иконки-инстансы: `IconUpload`, `IconSearch`, `IconMapPin`, `IconBriefcase`, `IconMenu`, `IconChevronDown/Left/Right`, `IconUser`, `IconRibbon`, `IconInstagram`, `IconLinkedin`, `IconFacebook`, `IconTelegram`, `IconVk`.
- **Токены-переменные оставлены в прежней конвенции** (`button/primary/bg`, `navitem/text-active` — lowercase со слэшами). Это отдельный слой именования, PascalCase к нему не применялся сознательно.

## Статус

Все цвета/радиусы/отступы/шрифты — через Variables; тени и блюр — через Effect Styles (`shadow/card`, `shadow/card-hover`, `shadow/search`, `blur/glass`), т.к. Figma Variables не поддерживают тип EFFECT. Иконки — инстансы HR Icons, кроме `IconTelegram`/`IconVk` (задокументированное исключение, см. `CustomIcons`).

## Actions
| Имя | Тип | Node ID | Матрица | Used in | Назначение |
|-----|-----|---------|---------|---------|------------|
| `Button` | ComponentSet | `85:26` | `Variant: Primary\|Secondary\|Outline` × `Size: Small\|Medium\|Large` × `State: Default\|Hover\|Disabled` — 27 вариантов | Card, Header | Кнопка действия. Пилюля (`radius/full`) — механика whitesnake.by |
| `TextLink` | ComponentSet | `166:139` | `State: Default\|Hover` | ApplicationForm | Подчёркнутая текстовая ссылка («Обновить» в капче). Заведён 2026-09-23 |
| `TemplateLink` | ComponentSet | `166:152` | `State: Default\|Hover` | ApplicationForm | Плашка скачивания файла в две строки с иконкой («Скачать / шаблон анкеты»). Hover — заливка `action/primary`. Заведён 2026-09-23. ⚠️ На Hover иконка осталась акцентной, а не инверсной — поправить |

## Inputs
| Имя | Тип | Node ID | Матрица | Used in | Назначение |
|-----|-----|---------|---------|---------|------------|
| `Input` | ComponentSet | `86:27` | `State: Default\|Hover\|Focus\|Error\|Disabled` × `Style: Outline\|Filled` — 10 вариантов | ApplicationForm | Текстовое поле. `radius/16`, высота ≈56 |
| `FileUpload` | ComponentSet | `86:46` | `State: Default\|Hover\|Filled` × `Style: Outline\|Filled` — 6 вариантов | ApplicationForm | Загрузка резюме. Пунктирная граница, `IconUpload` |
| `Search` | ComponentSet | `103:45` | `State: Default\|Hover\|Focus` | SearchFilters (HR Site) | Поисковая строка: пилюля + инстанс `SearchButton` справа, тень `shadow/search`. В `State=Hover` подставлен `SearchButton/State=Hover` |
| `SearchButton` | ComponentSet | `137:58` | `State: Default\|Hover` | Search | Круглая кнопка поиска, 48×48, `radius/full`, фон `search/btn-bg` / `search/btn-bg-hover`, иконка `IconSearch` в инверсном цвете. Вынесена из `Search` отдельным компонентом |
| `Select` | ComponentSet | `127:81` | `State: Default\|Hover\|Open\|Selected\|Disabled` × `Style: Outline\|Filled` — 10 вариантов | SearchFilters, ApplicationForm (HR Site) | Селект **в стиле поля `Input`**: высота `spacing/56`, `radius/16`, паддинги 20, бордер `input/*`, текст `body-m`, шеврон справа (в Open развёрнут), в Selected — выбранное значение тёмным. Токены `select/*` (10) ведут на ту же семантику, что и `input/*` |
| `Radio` | ComponentSet | `127:89` | `State: Default\|DefaultHover\|Active\|ActiveHover\|Disabled` | ApplicationForm (HR Site) | Радиокнопка — только сам контрол, без подписи. 20×20, точка 8, акцент `action/primary`; ActiveHover подсвечен `bg/accent-subtle`. Токены `radio/*` (9) |
| `Checkbox` | ComponentSet | `139:102` | `State: Default\|DefaultHover\|Checked\|CheckedHover\|Disabled` | — | Чекбокс — только контрол. 20×20, `radius/4`, галочка `IconCheck` из HR Icons на заливке `action/primary`. Токены `checkbox/*` (8) |
| `Textarea` | ComponentSet | `139:90` | `State: Default\|Hover\|Focus\|Error\|Disabled` | — | Многострочное поле. Повторяет `Input`, но поле высотой `spacing/160` и текст от верхнего края. **Новых токенов не заводил — использует те же `input/*`** |

## Containers
| Имя | Тип | Node ID | Матрица | Used in | Назначение |
|-----|-----|---------|---------|---------|------------|
| `Card` | ComponentSet | `103:64` | `State: Default\|Hover` | — | Карточка вакансии: Badge + Title + Subtitle + MetaRow + TagRow + Footer(Salary, Button). Default — `shadow/card` без обводки; Hover — `card/border` + `shadow/card-hover` |
| `Divider` | Component | `93:42` | — | — | Горизонтальный разделитель 1px |

## Navigation
| Имя | Тип | Node ID | Матрица | Used in | Назначение |
|-----|-----|---------|---------|---------|------------|
| `Header` | Component | `116:67` | без вариантов | все страницы | **Шапка сайта, ширина 1660.** Собрана из атомов: `Logo` + 3×`NavItem` + `Button` (Отправить резюме). Фон `header/bg-glass` (полупрозрачный белый) + `blur/glass` — «стекло»; sticky-поведение описано, реализуется в вёрстке. Паддинги: `spacing/80` по бокам, `spacing/16` сверху/снизу → высота 89 (референс job.softclub.by — 88) |
| `NavItem` | ComponentSet | `116:66` | `State: Default\|Hover\|Active` | Header | Атом пункта меню. Пилюля (механика whitesnake) + плотность/активное состояние с job.softclub.by: активный — светло-зелёная плашка `navitem/bg-active` + зелёный текст `navitem/text-active` |
| `Footer` | Component | `146:64` | без вариантов | все страницы | **Подвал сайта, ширина 1660.** Логотип + ссылки меню + `Social`, разделитель `Divider`, строка копирайта и ссылка на softclub.by. Паддинги `spacing/80` по бокам, `spacing/48` сверху/снизу. Токены `footer/*` (5) |
| `Logo` | Component | `99:31` | — | Header, Footer | Логотип SoftClub, SVG 1:1 с шапки job.softclub.by. Цвет прибит намеренно (фирменный знак не зависит от темы) |
| `Dropdown` | Component | `94:44` | — | — | Выпадающий список (выбор города). Trigger + 3 Item + ItemHover |
| `Social` | ComponentSet | `100:69` | `State: Default\|Hover` | — | 5 соц-иконок: Instagram / LinkedIn / Telegram / VK / Facebook |

## CustomIcons
| Имя | Тип | Node ID | Назначение |
|-----|-----|---------|------------|
| `IconTelegram` | Component | `100:32` | Официальный брендмарк Telegram (Simple Icons). **Исключение из правила «иконки только из HR Icons»** — в HR Icons нет этих соцсетей |
| `IconVk` | Component | `100:35` | Официальный брендмарк VK (Simple Icons). Тот же статус исключения |

## Feedback
| Имя | Тип | Node ID | Матрица | Used in | Назначение |
|-----|-----|---------|---------|---------|------------|
| `Sticky` | ComponentSet | `103:70` | `State: Default\|Hover` | — | Плашка-достижение, `IconRibbon`. ⚠️ Назначение уточняется: https://www.figma.com/design/UPfefWk5FHbm4ljnfzeJrr/HR-Library?node-id=103-70 |

## Data
| Имя | Тип | Node ID | Матрица | Used in | Назначение |
|-----|-----|---------|---------|---------|------------|
| `Tag` | ComponentSet | `89:16` | `Variant: Default\|Active` | Card | Тег/фильтр-чип |
| `Badge` | ComponentSet | `89:21` | `Variant: Hot\|New` | Card | Статус-бейдж вакансии |
| `Avatar` | ComponentSet | `89:27` | `Variant: Initials\|IconFallback\|Photo` × `Background: Pink\|Blue\|Purple\|Mint\|Amber` — 15 вариантов | AvatarGroup | Круглый аватар 48. Фон — токены `avatar/bg-*` (→ `bg/avatar-*` → `pastel/*-100`, заведены 2026-09-24). `Photo` — заглушка-заливка: фото ставится через Fill → Image на самом инстансе |
| `AvatarGroup` | Component | `184:115` | — | — | Пять `Avatar` внахлёст (−12), белая обводка 3 на `bg/surface`. Элемент хиро whitesnake.by |
| `Rating` | ComponentSet | `181:184` | `Value: 1\|2\|3\|4\|5` | — | Звёзды 24 из HR Icons (`li:star`), заполненные — `text/warning`, пустые — `neutral/300`. ⚠️ Звёзды контурные: залитой в HR Icons не было — добавил `hr:star-filled` в HR Icons, после публикации HR Icons заменить |
| `PaginationItem` | ComponentSet | `89:32` | `Variant: Default\|Active` | PaginationExample | Элемент пагинации |
| `PaginationExample` | Frame | `89:33` | — | — | Собранный пример пагинации, **не мастер-компонент** |

## Misc
*(пусто)*

## Замечания

- [x] Все слои переименованы в PascalCase/латиницу — 205 правок, 2026-09-17.
- [x] Переименование не сломало инстансы: `Card → Footer → Button` по-прежнему указывает на `Variant=Primary, Size=Medium, State=Default`.
- [x] Старый `Navbar` (960px, текстовые ссылки) удалён и заменён на `Header` (1660, атомарный).
- [x] Компоненты без описания: 0%.
- [ ] `Sticky` — назначение уточняется позже.
- [ ] **Мобильные версии компонентов** — отложены пользователем.
- [ ] **Черновые значения токенов** (`hover`-состояния, подобранные по аналогии) — ждут содержательной правки.
- [ ] `font/size/nav` = 13 остался неиспользованным: для `NavItem` взят `font/size/label-l` = 16 как ближайший к референсным 17px на job.softclub.by. При правке токенов стоит решить, что делать с `nav`.
