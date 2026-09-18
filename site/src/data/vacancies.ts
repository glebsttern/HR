export type Vacancy = {
  id: string;
  title: string;
  description: string;
  city: string;
  profession: string;
  level: string;
  stack: string[];
};

export const VACANCIES: Vacancy[] = [
  {
    id: "qa-internship",
    title: "Стажировка для студентов: QA-тестировщик",
    description:
      "Приглашаем студентов мехмата и ФПМ БГУ, а также студентов БГУИР на стажировку по тестированию программного обеспечения.",
    city: "Минск",
    profession: "QA",
    level: "Junior",
    stack: ["Postman", "SQL"],
  },
  {
    id: "java-banking",
    title: "Java-разработчик в команду банковских продуктов",
    description:
      "Разработка и поддержка серверной части банковских систем: Java, Spring, PostgreSQL. Команда из восьми человек.",
    city: "Минск",
    profession: "Java",
    level: "Middle",
    stack: ["Spring", "PostgreSQL", "Kafka"],
  },
  {
    id: "data-analyst",
    title: "Аналитик данных",
    description:
      "Сбор и интерпретация данных, построение отчётности и дашбордов для бизнес-заказчиков банка.",
    city: "Гомель",
    profession: "Analytics",
    level: "Middle",
    stack: ["SQL", "Python"],
  },
  {
    id: "devops",
    title: "DevOps-инженер",
    description:
      "Автоматизация сборки и доставки, поддержка инфраструктуры и мониторинга в продуктовых командах.",
    city: "Минск",
    profession: "DevOps",
    level: "Senior",
    stack: ["Docker", "Kubernetes", "Kafka"],
  },
];

export type FilterKey = "city" | "profession" | "level" | "stack";

export const FILTERS: { key: FilterKey; placeholder: string }[] = [
  { key: "city", placeholder: "Все города" },
  { key: "profession", placeholder: "Все профессии" },
  { key: "level", placeholder: "Все уровни" },
  { key: "stack", placeholder: "Все технологии" },
];

/** Варианты фильтра собираются из самих вакансий, чтобы не было пунктов «в никуда». */
export function filterOptions(key: FilterKey): string[] {
  const values = VACANCIES.flatMap((vacancy) => {
    const field = vacancy[key];
    return Array.isArray(field) ? field : [field];
  });
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "ru"));
}
