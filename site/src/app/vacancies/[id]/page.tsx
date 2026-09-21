import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TechIcon } from "@/components/TechIcon";
import { IconArrowLeft, IconMapPin } from "@/components/icons";
import { VACANCIES, findVacancy } from "@/data/vacancies";
import styles from "./page.module.css";

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

  return {
    title: vacancy ? `${vacancy.title} — SoftClub` : "Вакансия не найдена",
    description: vacancy?.description,
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
        <div className={styles.inner}>
          <Link className={styles.back} href="/#vacancies">
            <IconArrowLeft size={18} />
            Все вакансии
          </Link>

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

          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Технологии</h2>
            <ul className={styles.stack}>
              {vacancy.stack.map((tech) => (
                <li key={tech} className={styles.tech}>
                  <TechIcon name={tech} size={40} />
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Чем предстоит заниматься</h2>
            <ul className={styles.list}>
              {vacancy.duties.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Что мы ждём</h2>
            <ul className={styles.list}>
              {vacancy.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <div className={styles.actions}>
            <Link href="/#apply">
              <Button variant="primary" size="large">
                Откликнуться
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
