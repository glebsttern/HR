"use client";

import { useEffect, useState } from "react";
import { pickStickers, type Slot, type Sticker as StickerData } from "@/data/stickers";
import { Button } from "./Button";
import { Sticker } from "./Sticker";
import styles from "./Hero.module.css";

const VISIBLE_STICKERS = 3;

export function Hero() {
  // Набор выбирается после гидратации: на сервере случайность дала бы
  // рассинхрон разметки, да и появляться стикеры должны уже на готовой странице.
  const [picked, setPicked] = useState<{ sticker: StickerData; slot: Slot }[]>([]);

  useEffect(() => {
    setPicked(pickStickers(VISIBLE_STICKERS));
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Люди в команду, которых мы ищем</h1>

        <p className={styles.tagline}>
          Открытые вакансии, стажировки и практика в SoftClub
        </p>

        <div className={styles.actions}>
          <Button variant="primary" size="large">
            Отправить резюме
          </Button>
          <Button variant="outline" size="large">
            Смотреть вакансии
          </Button>
        </div>
      </div>

      <div className={styles.stickers} aria-hidden>
        {picked.map(({ sticker, slot }, index) => (
          <Sticker
            key={sticker.id}
            sticker={sticker}
            className={`${styles.sticker} ${styles[slot]}`}
            style={{ animationDelay: `${300 + index * 220}ms` }}
          />
        ))}
      </div>
    </section>
  );
}
