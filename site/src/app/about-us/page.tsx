import type { Metadata } from "next";
import Link from "next/link";
import { ABOUT, COMPANY_FACTS, PERKS } from "@/data/company";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { HERO_FACT_IDS } from "@/data/aboutHero";
import { AboutHero } from "@/components/AboutHero";
import { FactSticker } from "@/components/FactSticker";
import { Header } from "@/components/Header";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Работа с нами — SoftClub",
  description:
    "О компании, цифры и условия работы в SoftClub: учёба, страховка, спорт, офисы и программа лояльности.",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <AboutHero />

      <main className={styles.page}>

        {/* Остальные факты — те четыре, что не попали на встречающий экран. */}
        <section className={styles.facts}>
          {COMPANY_FACTS.filter((fact) => !HERO_FACT_IDS.includes(fact.id)).map(
            (fact) => (
              <FactSticker
                key={fact.id}
                emoji={fact.emoji}
                value={fact.value}
                caption={fact.caption}
              />
            ),
          )}
        </section>

        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>О компании</h2>
          <div className={styles.text}>
            {ABOUT.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/*
          Условия — отдельная страница у Источника, здесь они разделом:
          сначала все плюшки списком, ниже каждая раскрыта подробно.
        */}
        <section className={styles.terms} id="terms">
          <h2 className={styles.sectionTitle}>Условия</h2>
          <p className={styles.termsLead}>
            Что получает сотрудник помимо зарплаты. Условия действуют для всех,
            детали уточнит HR-менеджер.
          </p>

          <ul className={styles.perkList}>
            {PERKS.map((perk) => (
              <li key={perk.id}>
                <a className={styles.perkChip} href={`#perk-${perk.id}`}>
                  {perk.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {PERKS.map((perk) => (
          <article className={styles.perk} id={`perk-${perk.id}`} key={perk.id}>
            <div className={styles.perkHead}>
              <h3 className={styles.perkTitle}>{perk.title}</h3>
              <p className={styles.perkSummary}>{perk.summary}</p>
            </div>

            <div className={styles.perkBody}>
              {perk.details.map((paragraph) => (
                <p className={styles.perkText} key={paragraph}>
                  {paragraph}
                </p>
              ))}

              {perk.items && (
                <ul className={styles.items}>
                  {perk.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Похоже на то, что вы искали?</h2>
          <p className={styles.ctaText}>
            Посмотрите открытые вакансии — или отправьте резюме без них, мы
            вернёмся, когда появится подходящая.
          </p>
          <div className={styles.actions}>
            <Link href="/#vacancies">
              <Button variant="primary" size="medium">
                Смотреть вакансии
              </Button>
            </Link>
            <Link href="/#apply">
              <Button variant="outline" size="medium">
                Отправить резюме
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
