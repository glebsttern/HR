import Link from "next/link";
import { ABOUT, COMPANY_FACTS } from "@/data/company";
import { Button } from "./Button";
import { FactSticker, type FactPosition } from "./FactSticker";
import styles from "./AboutHero.module.css";

/**
 * Встречающий экран «Работы с нами». Механика та же, что у Хиро вакансий:
 * заголовок по центру, ближе к верху, а вокруг него по четырём сторонам —
 * плашки-факты. Факты и их порядок — с главной softclub.by.
 */
const PLACED: { id: string; position: FactPosition }[] = [
  { id: "founded", position: "left" },
  { id: "users", position: "right" },
  { id: "top100", position: "top" },
  { id: "team", position: "bottom" },
];

/** Какие факты заняты встречающим экраном — ниже по странице они не повторяются. */
export const HERO_FACTS = PLACED.map((item) => item.id);

export function AboutHero() {
  const facts = PLACED.map(({ id, position }) => {
    const fact = COMPANY_FACTS.find((item) => item.id === id);
    return fact ? { ...fact, position } : null;
  }).filter((fact) => fact !== null);

  return (
    <section className={styles.hero} aria-labelledby="about-heading">
      <div className={styles.frame}>
        {facts.map((fact) => (
          <div
            className={styles.slot}
            data-position={fact.position}
            key={fact.id}
            aria-hidden
          >
            <FactSticker
              emoji={fact.emoji}
              value={fact.value}
              caption={fact.caption}
              position={fact.position}
            />
          </div>
        ))}

        <div className={styles.content}>
          <p className={styles.kicker}>SoftClub</p>
          <h1 className={styles.heading} id="about-heading">
            Работа
            <br />
            <span className={styles.accent}>с нами</span>
          </h1>
          <p className={styles.lead}>{ABOUT.lead}</p>

          <div className={styles.actions}>
            <Link href="/#vacancies">
              <Button variant="primary" size="large">
                Вакансии
              </Button>
            </Link>
            <Link href="/#apply">
              <Button variant="outline" size="large">
                Отправить резюме
              </Button>
            </Link>
          </div>

          <a className={styles.jump} href="#terms">
            Условия работы
          </a>
        </div>
      </div>
    </section>
  );
}
