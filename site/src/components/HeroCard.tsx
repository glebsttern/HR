import { VACANCIES } from "@/data/vacancies";
import { IconMapPin } from "./icons";
import styles from "./HeroCard.module.css";

/**
 * Карточка вакансии на встречающем экране (Card из HR Library, узкий вид).
 * Это витрина одной избранной вакансии, а не элемент списка.
 */
export function HeroCard({ vacancyId }: { vacancyId: string }) {
  const vacancy = VACANCIES.find((item) => item.id === vacancyId) ?? VACANCIES[0];

  return (
    <article className={styles.card}>
      <span className={styles.badge}>🔥 Горяченькое!</span>
      <h2 className={styles.title}>{vacancy.title}</h2>
      <p className={styles.subtitle}>{vacancy.profession}</p>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <IconMapPin size={16} />
          {vacancy.city}
        </span>
      </div>

      <div className={styles.tags}>
        {vacancy.stack.slice(0, 2).map((tech) => (
          <span key={tech} className={styles.tag}>
            {tech}
          </span>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.footer}>
        <span className={styles.level}>{vacancy.level}</span>
        <span className={styles.action}>Интересно</span>
      </div>
    </article>
  );
}
