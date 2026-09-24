import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { VacancyList } from "@/components/VacancyList";
import styles from "./page.module.css";

export default function VacanciesPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <Hero />
        {/* ⚠️ Список — заглушка из прошлой сборки. Нужен, чтобы проверить,
            как он наползает на Хиро; своим блоком займёмся отдельно. */}
        <div
          className={styles.list}
          id="vacancies"
          style={{ backdropFilter: "var(--filter-blur-glass)" }}
        >
          <VacancyList />
        </div>
      </main>
    </>
  );
}
