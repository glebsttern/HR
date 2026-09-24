import Image from "next/image";
import type { HeroSticker } from "@/data/hero";
import styles from "./Sticker.module.css";

/**
 * Стикер встречающего экрана — компонент Sticker из HR Library.
 * Три вида: кружок с эмодзи, кружок с фото человека, акцентная надпись без кружка.
 */
export function Sticker({ sticker }: { sticker: HeroSticker }) {
  if (sticker.kind === "accent") {
    return (
      <div className={styles.sticker}>
        <div className={styles.column}>
          <span className={styles.title}>{sticker.title}</span>
          <span className={styles.text}>{sticker.text}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.sticker}>
      {sticker.kind === "emoji" ? (
        <span className={styles.avatar} data-tone={sticker.tone}>
          <Image className={styles.emoji} src={sticker.emoji} alt="" width={72} height={72} />
        </span>
      ) : (
        <span className={styles.avatar}>
          <Image className={styles.photo} src={sticker.photo} alt="" width={72} height={72} />
        </span>
      )}
      <div className={styles.column}>
        <span className={styles.label}>{sticker.label}</span>
        <span className={styles.text}>{sticker.text}</span>
      </div>
    </div>
  );
}
