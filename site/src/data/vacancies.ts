export type Vacancy = {
  id: string;
  title: string;
  description: string;
  city: string;
  profession: string;
  level: string;
  stack: string[];
  duties: string[];
  requirements: string[];
};

/** ⚠️ Содержание вакансий — выдуманное наполнение под макет, не настоящие тексты HR. */
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
    duties: [
      "Писать и выполнять тест-кейсы по функциональности банковских продуктов",
      "Заводить и сопровождать дефекты, проверять исправления",
      "Разбирать требования вместе с аналитиком и разработчиком",
    ],
    requirements: [
      "Учитесь на мехмате, ФПМ БГУ или в БГУИР",
      "Понимаете, что такое клиент-серверное приложение и SQL-запрос",
      "Готовы уделять стажировке не меньше 20 часов в неделю",
    ],
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
    duties: [
      "Разрабатывать и поддерживать серверную часть банковских систем",
      "Проектировать интеграции с внутренними и внешними сервисами",
      "Покрывать код тестами и участвовать в ревью",
    ],
    requirements: [
      "От двух лет коммерческой разработки на Java",
      "Уверенный Spring, опыт с PostgreSQL",
      "Понимание очередей сообщений — у нас Kafka",
    ],
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
    duties: [
      "Собирать и проверять данные из учётных систем банка",
      "Строить отчётность и дашборды для бизнес-заказчиков",
      "Формулировать выводы и защищать их перед заказчиком",
    ],
    requirements: [
      "Уверенный SQL и опыт работы с большими выборками",
      "Python для обработки данных",
      "Умение объяснять цифры словами, а не только графиком",
    ],
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
    duties: [
      "Поддерживать и развивать конвейеры сборки и доставки",
      "Обслуживать инфраструктуру продуктовых команд",
      "Настраивать мониторинг и разбирать инциденты",
    ],
    requirements: [
      "Опыт с Docker и Kubernetes в продакшене",
      "Понимание сетей и Linux на уровне администратора",
      "Опыт автоматизации рутины скриптами",
    ],
  },
];

export function findVacancy(id: string): Vacancy | undefined {
  return VACANCIES.find((vacancy) => vacancy.id === id);
}

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
