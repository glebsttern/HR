import { Button } from "./Button";
import { Sticker } from "./Sticker";
import styles from "./Hero.module.css";

function ScribbleUnderline() {
  return (
    <svg
      className={styles.scribble}
      viewBox="0 0 560 48"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M8 26C120 10 300 8 470 16C518 19 548 25 522 34C500 42 380 40 296 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ScribbleEllipse() {
  return (
    <svg
      className={styles.scribble}
      viewBox="0 0 560 170"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M282 14C140 14 20 46 20 86C20 126 146 156 288 156C428 156 540 126 540 86C540 48 436 18 310 13C270 11 226 15 194 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" aria-hidden="true">
      <path d="M2 2.5 16 10 2 17.5Z" fill="currentColor" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>
          <span>
            Построй свою{" "}
            <span className={`${styles.underlined} ${styles.muted}`}>
              карьеру в IT
              <ScribbleUnderline />
            </span>
          </span>
          <br />
          <span>и воплощай идеи</span>
          <span className={styles.thirdLine}>
            <span className={styles.media}>
              <span className={styles.play}>
                <PlayIcon />
              </span>
              <span className={styles.mediaCaption}>
                Твоя IT-карьера
                <br />в SoftClub
              </span>
            </span>
            <span>
              вместе с{" "}
              <span className={styles.circled}>
                SoftClub
                <ScribbleEllipse />
              </span>
            </span>
          </span>
        </h1>

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
