import styles from "./Sticker.module.css";

type StickerProps = {
  variant: "message" | "comment" | "person";
  className?: string;
};

const CONTENT = {
  message: { label: "NEW MESSAGE", text: "Привет! Мы ждём твоё резюме" },
  comment: { label: "COMMENTED", text: "«Помогу с онбордингом :)»" },
  person: { label: "HR-менеджер", text: "Расскажу про вакансии и команду" },
} as const;

export function Sticker({ variant, className }: StickerProps) {
  const { label, text } = CONTENT[variant];

  return (
    <div className={[styles.sticker, className].filter(Boolean).join(" ")}>
      {variant === "person" && <span className={styles.avatar}>HR</span>}
      <div className={styles.body}>
        <span className={styles.label}>{label}</span>
        <span className={styles.message}>{text}</span>
      </div>
    </div>
  );
}
