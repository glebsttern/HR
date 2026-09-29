import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PERKS } from "@/data/company";
import { VACANCIES, findVacancy } from "@/data/vacancies";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TechIcon } from "@/components/TechIcon";
import { IconArrowLeft, IconMapPin } from "@/components/icons";
import styles from "./page.module.css";

/** Страницы вакансий известны заранее — собираем их на сборке, а не по запросу. */
export function generateStaticParams() {
  return VACANCIES.map((vacancy) => ({ id: vacancy.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const vacancy = findVacancy(id);
  if (!vacancy) return { title: "Вакансия не найдена" };

  return {
    title: `${vacancy.title} — вакансия в SoftClub`,
    description: vacancy.description,
  };
}

export default async function VacancyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vacancy = findVacancy(id);
  if (!vacancy) notFound();

  return (
    <>
      <Header />

      <main className={styles.page}>
        {/* Шапка вакансии — карточка, как у Источника: заголовок, теги,
            описание и ряд кнопок с откликом и переходами по разделам. */}
        <article className={styles.head}>
          <h1 className={styles.title}>{vacancy.title}</h1>

          <div className={styles.tags}>
            <span className={styles.tag}>
              <IconMapPin size={14} />
              Беларусь, {vacancy.city}
            </span>
            <span className={styles.tag}>{vacancy.profession}</span>
            <span className={styles.tag}>{vacancy.level}</span>
          </div>

          <p className={styles.lead}>{vacancy.description}</p>

          <div className={styles.actions}>
            <Link href="/#apply">
              <Button variant="primary" size="medium">
                Откликнуться
              </Button>
            </Link>
            <a className={styles.jump} href="#requirements">
              Требования
            </a>
            <a className={styles.jump} href="#duties">
              Задачи
            </a>
            <a className={styles.jump} href="#conditions">
              Условия
            </a>
          </div>
        </article>

        <Link className={styles.back} href="/#vacancies">
          <IconArrowLeft size={20} />
          Назад, к списку всех вакансий
        </Link>

        <section className={styles.section} id="requirements">
          <h2 className={styles.sectionTitle}>Требования</h2>

          <div className={styles.subsection}>
            <h3 className={styles.subTitle}>Главное</h3>
            <ul className={styles.list}>
              {vacancy.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subTitle}>Технологии</h3>
            <div className={styles.stack}>
              {vacancy.stack.map((tech) => (
                <span className={styles.tech} key={tech}>
                  <TechIcon name={tech} size={32} />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="duties">
          <h2 className={styles.sectionTitle}>Задачи</h2>

          <div className={styles.subsection}>
            <h3 className={styles.subTitle}>Основные задачи</h3>
            <ul className={styles.list}>
              {vacancy.duties.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.respond}>
            <Link href="/#apply">
              <Button variant="primary" size="medium">
                Откликнуться
              </Button>
            </Link>
            <p className={styles.respondText}>
              Отправим анкету в команду {vacancy.profession} — ответим в течение
              пяти рабочих дней.
            </p>
          </div>
        </section>

        <section className={styles.section} id="conditions">
          <h2 className={styles.sectionTitle}>Условия</h2>

          <ul className={styles.perks}>
            {PERKS.slice(0, 4).map((perk) => (
              <li className={styles.perk} key={perk.id}>
                <h3 className={styles.perkTitle}>{perk.title}</h3>
                <p className={styles.perkText}>{perk.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
