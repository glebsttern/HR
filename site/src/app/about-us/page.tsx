import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ABOUT, FACTS, PERKS } from "@/data/company";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Работа с нами — SoftClub",
  description: ABOUT.lead,
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <h1 className={styles.title}>Работа с нами</h1>
            <p className={styles.lead}>{ABOUT.lead}</p>
          </div>
        </section>

        <section className={styles.facts}>
          <div className={styles.factsInner}>
            {FACTS.map((fact) => (
              <div key={fact.caption} className={styles.fact}>
                <span className={styles.factValue}>{fact.value}</span>
                <span className={styles.factCaption}>{fact.caption}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.text}>
            {ABOUT.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.blockTitle}>Что даём</h2>

            <div className={styles.perks}>
              {PERKS.map((perk) => (
                <Link
                  key={perk.id}
                  className={styles.perk}
                  href={`/terms#${perk.id}`}
                >
                  <span className={styles.perkTitle}>{perk.title}</span>
                  <span className={styles.perkSummary}>{perk.summary}</span>
                  <span className={styles.perkMore}>Подробнее →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Посмотрите, кого мы ищем сейчас</h2>
            <div className={styles.ctaActions}>
              <Link href="/#vacancies">
                <Button variant="primary" size="large">
                  Смотреть вакансии
                </Button>
              </Link>
              <Link href="/#apply">
                <Button variant="outline" size="large">
                  Отправить резюме
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
