import type { Vacancy } from "@/data/vacancies";
import { IconMapPin } from "./icons";
import styles from "./VacancyCard.module.css";

export function VacancyCard({
  title,
  description,
  city,
  profession,
  level,
  stack,
}: Vacancy) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.tags}>
        <span className={styles.tag}>
          <IconMapPin size={14} />
          Беларусь, {city}
        </span>
        <span className={styles.tag}>{profession}</span>
        <span className={styles.tag}>{level}</span>
        {stack.map((tech) => (
          <span key={tech} className={styles.tag}>
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
