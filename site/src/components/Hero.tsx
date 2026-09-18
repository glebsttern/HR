import { Button } from "./Button";
import { Sticker } from "./Sticker";
import styles from "./Hero.module.css";

export function Hero() {
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

      <Sticker
        variant="comment"
        className={`${styles.sticker} ${styles.stickerComment}`}
      />
      <Sticker
        variant="person"
        className={`${styles.sticker} ${styles.stickerPerson}`}
      />
      <Sticker
        variant="message"
        className={`${styles.sticker} ${styles.stickerMessage}`}
      />
    </section>
  );
}
