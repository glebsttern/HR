import { Select } from "./form";
import { IconSearch } from "./icons";
import { VacancyCard, type Vacancy } from "./VacancyCard";
import styles from "./VacancyList.module.css";

const VACANCIES: Vacancy[] = [
  {
    title: "Стажировка для студентов: QA-тестировщик",
    description:
      "Приглашаем студентов мехмата и ФПМ БГУ, а также студентов БГУИР на стажировку по тестированию программного обеспечения.",
    city: "Беларусь, Минск",
    profession: "QA",
    level: "Junior",
  },
  {
    title: "Java-разработчик в команду банковских продуктов",
    description:
      "Разработка и поддержка серверной части банковских систем: Java, Spring, PostgreSQL. Команда из восьми человек.",
    city: "Беларусь, Минск",
    profession: "Java",
    level: "Middle",
  },
  {
    title: "Аналитик данных",
    description:
      "Сбор и интерпретация данных, построение отчётности и дашбордов для бизнес-заказчиков банка.",
    city: "Беларусь, Гомель",
    profession: "Analytics",
    level: "Middle",
  },
  {
    title: "DevOps-инженер",
    description:
      "Автоматизация сборки и доставки, поддержка инфраструктуры и мониторинга в продуктовых командах.",
    city: "Беларусь, Минск",
    profession: "DevOps",
    level: "Senior",
  },
];

const FILTERS = [
  { placeholder: "Все города", options: ["Минск", "Гомель", "Брест", "Витебск"] },
  { placeholder: "Все профессии", options: ["QA", "Java", "Analytics", "DevOps"] },
  { placeholder: "Все уровни", options: ["Junior", "Middle", "Senior"] },
  { placeholder: "Все технологии", options: ["Spring", "PostgreSQL", "Docker", "Kafka"] },
];

export function VacancyList() {
  return (
    <section className={styles.section} id="vacancies">
      <div className={styles.inner}>
        <h2 className={styles.title}>Открытые вакансии</h2>

        <div className={styles.search}>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Искать вакансии..."
            aria-label="Поиск по вакансиям"
          />
          <button className={styles.searchButton} type="button" aria-label="Найти">
            <IconSearch size={20} />
          </button>
        </div>

        <div className={styles.filters}>
          {FILTERS.map((filter) => (
            <Select
              key={filter.placeholder}
              placeholder={filter.placeholder}
              options={filter.options}
              aria-label={filter.placeholder}
            />
          ))}
        </div>

        <div className={styles.cards}>
          {VACANCIES.map((vacancy) => (
            <VacancyCard key={vacancy.title} {...vacancy} />
          ))}
        </div>
      </div>
    </section>
  );
}
