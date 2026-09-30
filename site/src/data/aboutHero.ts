import type { FactPosition } from "@/components/FactSticker";

/**
 * Раскладка плашек-фактов на встречающем экране «Работы с нами».
 * Координаты — в кадре макета 1920×1080, как у стикеров Хиро вакансий:
 * плашка ставится центром в точку, наклон и увеличение — внутри.
 *
 * Лежит отдельным файлом, потому что список нужен и клиентскому Хиро,
 * и серверной странице — она пропускает эти факты в блоке ниже.
 */
export type PlacedFact = {
  id: string;
  position: FactPosition;
  at: { x: number; y: number };
  rotate: number;
  scale: number;
  delay: string;
};

export const PLACED_FACTS: PlacedFact[] = [
  { id: "founded", position: "left", at: { x: 360, y: 250 }, rotate: -5, scale: 1.24, delay: "0.35s" },
  { id: "users", position: "right", at: { x: 1570, y: 232 }, rotate: 7, scale: 1.2, delay: "0.5s" },
  { id: "top100", position: "top", at: { x: 1560, y: 838 }, rotate: -4, scale: 1.16, delay: "0.65s" },
  { id: "team", position: "bottom", at: { x: 380, y: 846 }, rotate: 5.5, scale: 1.2, delay: "0.8s" },
];

/** Какие факты заняты экраном — ниже по странице они не повторяются. */
export const HERO_FACT_IDS = PLACED_FACTS.map((item) => item.id);
