import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PERKS } from "@/data/company";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Условия работы — SoftClub",
  description:
    "Учёба, страховка, спорт, подарки, программа лояльности и офисы SoftClub на Уручье.",
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className={styles.inner}>
          <header className={styles.head}>
            <h1 className={styles.title}>Условия</h1>
            <p className={styles.lead}>
              Что получает сотрудник SoftClub помимо зарплаты и интересных задач.
            </p>
          </header>

          <nav className={styles.toc}>
            {PERKS.map((perk) => (
              <a key={perk.id} className={styles.tocItem} href={`#${perk.id}`}>
                {perk.title}
              </a>
            ))}
          </nav>

          {PERKS.map((perk) => (
            <section key={perk.id} className={styles.block} id={perk.id}>
              <h2 className={styles.blockTitle}>{perk.title}</h2>
              <p className={styles.summary}>{perk.summary}</p>

              <div className={styles.details}>
                {perk.details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {perk.items && (
                <ul className={styles.items}>
                  {perk.items.map((item) => (
                    <li key={item} className={styles.item}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className={styles.actions}>
            <Link href="/#vacancies">
              <Button variant="primary" size="large">
                Смотреть вакансии
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
