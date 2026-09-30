import type { CompanyFact } from "@/data/company";
import styles from "./FactSticker.module.css";

/**
 * Плашка-факт встречающего экрана — компонент `FactSticker` из HR Site.
 * Position задаёт сторону кружка, чтобы плашка была развёрнута внутрь экрана.
 */
export type FactPosition = "left" | "right" | "top" | "bottom";

export function FactSticker({
  emoji,
  value,
  caption,
  position = "left",
}: Pick<CompanyFact, "emoji" | "value" | "caption"> & {
  position?: FactPosition;
}) {
  return (
    <div className={`${styles.sticker} ${styles[position]}`}>
      <span className={styles.badge} aria-hidden>
        {emoji}
      </span>
      <span className={styles.column}>
        <span className={styles.value}>{value}</span>
        <span className={styles.caption}>{caption}</span>
      </span>
    </div>
  );
}
