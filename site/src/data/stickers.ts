import { FACTS } from "./company";
import { VACANCIES } from "./vacancies";

/**
 * Все факты — с job.softclub.by (цифры компании и раздел «Условия»),
 * выдуманных цифр в паке нет.
 */

export type Sticker =
  | { id: string; kind: "stat"; value: string; caption: string }
  | { id: string; kind: "quote"; label: string; text: string }
  | { id: string; kind: "person"; initials: string; label: string; text: string }
  | { id: string; kind: "status"; label: string; text: string };

export const STICKERS: Sticker[] = [
  {
    id: "open",
    kind: "stat",
    value: String(VACANCIES.length),
    caption: "Открытых вакансий прямо сейчас",
  },
  ...FACTS.map((fact, index) => ({
    id: `fact-${index}`,
    kind: "stat" as const,
    value: fact.value,
    caption: fact.caption,
  })),
  {
    id: "hiring",
    kind: "status",
    label: "Набор открыт",
    text: "Резюме смотрим каждый день",
  },
  {
    id: "office",
    kind: "quote",
    label: "Офисы",
    text: "Шаговая доступность от метро «Уручье»",
  },
  {
    id: "study",
    kind: "quote",
    label: "Учёба",
    text: "Конференции и тренинги — бесплатно",
  },
  {
    id: "sport",
    kind: "quote",
    label: "Спорт",
    text: "Половину абонемента оплачивает компания",
  },
  {
    id: "students",
    kind: "quote",
    label: "Студентам",
    text: "«Пишите даже без коммерческого опыта»",
  },
  {
    id: "hr",
    kind: "person",
    initials: "HR",
    label: "HR-менеджер",
    text: "Расскажу про вакансии и команду",
  },
];

/** Места, куда стикер может лечь: поля слева и справа от текста хиро. */
export const SLOTS = ["leftTop", "leftBottom", "rightTop", "rightBottom"] as const;

export type Slot = (typeof SLOTS)[number];

function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Случайные стикеры по случайным слотам — свой набор на каждую загрузку. */
export function pickStickers(count: number): { sticker: Sticker; slot: Slot }[] {
  const slots = shuffle(SLOTS);
  return shuffle(STICKERS)
    .slice(0, Math.min(count, slots.length))
    .map((sticker, index) => ({ sticker, slot: slots[index] }));
}
