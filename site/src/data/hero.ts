/**
 * Шаблоны встречающего экрана. Сняты с HR Site: Hero (`77:2050`, 5 шаблонов),
 * Color (`77:2822`, 4 круга), разъезд под списком (`82:5552`).
 *
 * Все числа — пиксели кадра макета 1920×1080. Сам кадр в вёрстке масштабируется
 * целиком (см. `FRAME` и `--k` в Hero.tsx), поэтому на любой ширине композиция
 * та же, что в Figma, — меняется только её размер.
 *
 * Тексты стикеров — из макета; вторая строка «Оплаты спорта» взята из реального
 * раздела «Условия» (`PERKS`, job.softclub.by), выдуманного тут нет.
 */

export const FRAME = { width: 1920, height: 1080 };

/** Сколько списка видно поверх Хиро в покое: в макете он начинается на 910. */
export const LIST_TOP = 910;

export type Tone = "pink" | "blue" | "purple" | "mint" | "amber";

/** Точка в кадре. Стикеры ставятся центром — они наклонены и увеличены. */
export type Point = { x: number; y: number };

type Placed = {
  id: string;
  at: Point;
  /** Наклон, градусы. */
  rotate: number;
  /** Во сколько раз инстанс крупнее мастера Sticker (14:32). */
  scale: number;
  /** Куда уезжает, когда снизу наползает список. */
  away: Point;
};

export type HeroSticker = Placed &
  (
    | { kind: "emoji"; tone: Tone; emoji: string; label: string; text: string }
    | { kind: "person"; photo: string; label: string; text: string }
    | { kind: "accent"; title: string; text: string }
  );

export type HeroMedia = {
  src: string;
  /** Прямоугольник в кадре — ровно как в макете. */
  box: { x: number; y: number; width: number; height: number };
  /** `person` сжимается от левого нижнего угла, `object` — от центра. */
  kind: "person" | "object";
  /** До какого размера сжимается под списком. */
  shrink: number;
};

export type HeroCircle = {
  tone: Tone;
  x: number;
  y: number;
  /** Край кадра, из которого круг вырастает, в координатах самого круга. */
  origin: Point;
};

export type HeroTemplate = {
  id: string;
  circle?: HeroCircle;
  media?: HeroMedia;
  card?: Placed;
  stickers: HeroSticker[];
};

/** Круг у всех шаблонов один и тот же, меняются цвет и сдвиг. */
export const CIRCLE = { width: 1469, height: 1452 };

/* Разъезд под списком: по горизонтали за край, по вертикали — от центра. */
const AWAY_LEFT_TOP = { x: -350, y: -95 };
const AWAY_RIGHT_TOP = { x: 350, y: -95 };
const AWAY_LEFT_BOTTOM = { x: -350, y: 283 };
const AWAY_RIGHT_BOTTOM = { x: 350, y: 283 };

const study = { kind: "emoji", tone: "purple", emoji: "/hero/emoji-cap.png", label: "Учёба", text: "Конференции и тренинги — бесплатно" } as const;
const hiring = { kind: "emoji", tone: "amber", emoji: "/hero/emoji-fire.png", label: "Набор открыт", text: "Резюме смотрим каждый день" } as const;
const hr = { kind: "person", photo: "/hero/avatar-hr.png", label: "HR-менеджер", text: "Расскажу про вакансии и команду" } as const;
/* Акцентные стикеры: заголовок Onder переносится там, где перенос в макете. */
const insurance = { kind: "accent", title: "Страховка", text: "Кофе-печеньки — на втором плане" } as const;
const sport = { kind: "accent", title: "Оплата\nспорта", text: "Быстрее, выше, сильнее!" } as const;

const SCOUT = "/hero/person-scout.png";
const BINOCULARS = "/hero/object-binoculars.png";

export const HERO_TEMPLATES: HeroTemplate[] = [
  {
    id: "scout-mint",
    circle: { tone: "mint", x: -538, y: 226, origin: { x: 538, y: 854 } },
    media: { src: SCOUT, kind: "person", box: { x: 85, y: 387, width: 462, height: 693 }, shrink: 0.56 },
    stickers: [
      { ...study, id: "study", at: { x: 374, y: 267 }, rotate: -5, scale: 1.44, away: AWAY_LEFT_TOP },
      { ...hiring, id: "hiring", at: { x: 1616, y: 229 }, rotate: 9, scale: 1.43, away: AWAY_RIGHT_TOP },
      { ...insurance, id: "insurance", at: { x: 1563, y: 846 }, rotate: 0, scale: 1, away: AWAY_RIGHT_BOTTOM },
    ],
  },
  {
    id: "scout-purple",
    circle: { tone: "purple", x: -150, y: 226, origin: { x: 1110, y: 854 } },
    media: { src: SCOUT, kind: "person", box: { x: 48, y: 378, width: 468, height: 702 }, shrink: 0.6 },
    card: { id: "card", at: { x: 1676, y: 284 }, rotate: 0, scale: 1, away: AWAY_RIGHT_TOP },
    stickers: [],
  },
  {
    id: "binoculars-amber",
    circle: { tone: "amber", x: -538, y: 226, origin: { x: 538, y: 854 } },
    media: {
      src: "/hero/person-binoculars.png",
      kind: "person",
      box: { x: 85, y: 490, width: 886, height: 590 },
      shrink: 0.61,
    },
    card: { id: "card", at: { x: 1668, y: 541 }, rotate: 0, scale: 1, away: AWAY_RIGHT_TOP },
    stickers: [],
  },
  {
    id: "object-blue",
    circle: { tone: "blue", x: 226, y: 234, origin: { x: 734, y: 846 } },
    media: { src: BINOCULARS, kind: "object", box: { x: 633, y: 673, width: 674, height: 674 }, shrink: 0.51 },
    stickers: [
      { ...study, id: "study", at: { x: 360, y: 304 }, rotate: -7.2, scale: 1.36, away: AWAY_LEFT_TOP },
      { ...insurance, id: "insurance", at: { x: 1533, y: 224 }, rotate: 13, scale: 1.36, away: AWAY_RIGHT_TOP },
      { ...hr, id: "hr", at: { x: 410, y: 727 }, rotate: 5.9, scale: 1.3, away: AWAY_LEFT_BOTTOM },
      { ...hiring, id: "hiring", at: { x: 1577, y: 827 }, rotate: -9.5, scale: 1.44, away: AWAY_RIGHT_BOTTOM },
    ],
  },
  {
    id: "object-plain",
    media: { src: BINOCULARS, kind: "object", box: { x: 633, y: 662, width: 674, height: 674 }, shrink: 0.51 },
    stickers: [
      { ...study, id: "study", at: { x: 367, y: 309 }, rotate: -12, scale: 1.44, away: AWAY_LEFT_TOP },
      { ...insurance, id: "insurance", at: { x: 1595, y: 258 }, rotate: 13, scale: 1, away: AWAY_RIGHT_TOP },
      { ...sport, id: "sport", at: { x: 300, y: 774 }, rotate: -4.5, scale: 1, away: AWAY_LEFT_BOTTOM },
      { ...hiring, id: "hiring", at: { x: 1627, y: 796 }, rotate: 7.2, scale: 1.415, away: AWAY_RIGHT_BOTTOM },
    ],
  },
];

export function pickTemplate(): HeroTemplate {
  return HERO_TEMPLATES[Math.floor(Math.random() * HERO_TEMPLATES.length)];
}

/**
 * Какие вакансии показываем карточкой на встречающем экране. Короткий заголовок —
 * условие: длинный разваливается на четыре строки и карточка перестаёт быть
 * витриной. Выбираем из них, а не берём первую попавшуюся.
 */
export const FEATURED = ["data-analyst", "devops"];

export function pickFeatured(): string {
  return FEATURED[Math.floor(Math.random() * FEATURED.length)];
}
