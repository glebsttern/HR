import { VACANCIES } from "./vacancies";

/**
 * ⚠️ Цифры, кроме количества вакансий, — заглушки.
 * Реальных данных по найму SoftClub у нас нет; перед публикацией их нужно
 * либо подтвердить у HR, либо выкинуть соответствующий стикер из пака.
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
  {
    id: "hired",
    kind: "stat",
    value: "18",
    caption: "Человек вышло в команду за последний год",
  },
  {
    id: "internship",
    kind: "stat",
    value: "7 лет",
    caption: "Стажёрской программе для студентов",
  },
  {
    id: "answer",
    kind: "stat",
    value: "3 дня",
    caption: "Средний срок ответа на резюме",
  },
  {
    id: "stay",
    kind: "stat",
    value: "60%",
    caption: "Стажёров остаются в штате",
  },
  {
    id: "steps",
    kind: "stat",
    value: "2",
    caption: "Собеседования до оффера — без марафона",
  },
  {
    id: "team",
    kind: "stat",
    value: "300+",
    caption: "Разработчиков, тестировщиков и аналитиков",
  },
  {
    id: "hybrid",
    kind: "stat",
    value: "4/1",
    caption: "Гибрид: четыре дня дома, один в офисе",
  },
  {
    id: "hiring",
    kind: "status",
    label: "Набор открыт",
    text: "Резюме смотрим каждый день",
  },
  {
    id: "mentor",
    kind: "quote",
    label: "Наставник в первый месяц",
    text: "«Проведу по проекту и покажу, где что лежит»",
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
