import { IconMapPin } from "./icons";
import styles from "./VacancyCard.module.css";

export type Vacancy = {
  title: string;
  description: string;
  city: string;
  profession: string;
  level: string;
};

export function VacancyCard({ title, description, city, profession, level }: Vacancy) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.tags}>
        <span className={styles.tag}>
          <IconMapPin size={14} />
          {city}
        </span>
        <span className={styles.tag}>{profession}</span>
        <span className={styles.tag}>{level}</span>
      </div>
    </article>
  );
}
