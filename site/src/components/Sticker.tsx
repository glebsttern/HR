import type { Sticker as StickerData } from "@/data/stickers";
import styles from "./Sticker.module.css";

export function Sticker({
  sticker,
  className,
  style,
}: {
  sticker: StickerData;
  className?: string;
  style?: React.CSSProperties;
}) {
  const classes = [styles.sticker, className].filter(Boolean).join(" ");

  if (sticker.kind === "stat") {
    return (
      <div className={classes} style={style}>
        <span className={styles.value}>{sticker.value}</span>
        <span className={styles.caption}>{sticker.caption}</span>
      </div>
    );
  }

  if (sticker.kind === "status") {
    return (
      <div className={classes} style={style}>
        <span className={styles.label}>
          <span className={styles.dot} aria-hidden />
          {sticker.label}
        </span>
        <span className={styles.message}>{sticker.text}</span>
      </div>
    );
  }

  if (sticker.kind === "person") {
    return (
      <div className={`${classes} ${styles.withAvatar}`} style={style}>
        <span className={styles.avatar}>{sticker.initials}</span>
        <span className={styles.body}>
          <span className={styles.label}>{sticker.label}</span>
          <span className={styles.message}>{sticker.text}</span>
        </span>
      </div>
    );
  }

  return (
    <div className={classes} style={style}>
      <span className={styles.label}>{sticker.label}</span>
      <span className={styles.message}>{sticker.text}</span>
    </div>
  );
}
