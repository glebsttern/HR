import Link from "next/link";
import type { Vacancy } from "@/data/vacancies";
import { IconMapPin } from "./icons";
import { TechIcon } from "./TechIcon";
import styles from "./VacancyCard.module.css";

export function VacancyCard({
  id,
  title,
  description,
  city,
  profession,
  level,
  stack,
}: Vacancy) {
  return (
    <Link className={styles.card} href={`/vacancies/${id}`}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.meta}>
        <div className={styles.tags}>
          <span className={styles.tag}>
            <IconMapPin size={14} />
            Беларусь, {city}
          </span>
          <span className={styles.tag}>{profession}</span>
          <span className={styles.tag}>{level}</span>
        </div>

        <div className={styles.stack}>
          {stack.map((tech) => (
            <TechIcon key={tech} name={tech} size={32} />
          ))}
        </div>
      </div>
    </Link>
  );
}
