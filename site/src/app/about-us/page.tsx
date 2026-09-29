import type { Metadata } from "next";
import Link from "next/link";
import { ABOUT, FACTS, PERKS } from "@/data/company";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
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

      <main className={styles.page}>
        {/* Шапка страницы — то же, что у Источника на «Работа с нами»:
            кто мы одной фразой и два действия. */}
        <section className={styles.intro}>
          <p className={styles.kicker}>SoftClub</p>
          <h1 className={styles.title}>Работа с нами</h1>
          <p className={styles.lead}>{ABOUT.lead}</p>

          <div className={styles.actions}>
            <Link href="/#vacancies">
              <Button variant="primary" size="medium">
                Вакансии
              </Button>
            </Link>
            <Link href="/#apply">
              <Button variant="outline" size="medium">
                Отправить резюме
              </Button>
            </Link>
            {/* Условия — раздел этой же страницы, отдельного пункта в меню нет. */}
            <a className={styles.introJump} href="#terms">
              Условия
            </a>
          </div>
        </section>

        <section className={styles.facts}>
          {FACTS.map((fact) => (
            <div className={styles.fact} key={fact.caption}>
              <p className={styles.factValue}>{fact.value}</p>
              <p className={styles.factCaption}>{fact.caption}</p>
            </div>
          ))}
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
