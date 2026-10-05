"use client";

import { useMemo, useState } from "react";
import { FILTERS, VACANCIES, filterOptions, type FilterKey } from "@/data/vacancies";
import { Select } from "./form";
import { VacancyCard } from "./VacancyCard";
import styles from "./VacancyList.module.css";

type Selected = Partial<Record<FilterKey, string>>;

/** «4 вакансии» / «2 вакансии» — чтобы счётчик читался, а не считался. */
function plural(n: number) {
  const ten = n % 100;
  const one = n % 10;
  if (ten > 10 && ten < 20) return "вакансий";
  if (one === 1) return "вакансия";
  if (one > 1 && one < 5) return "вакансии";
  return "вакансий";
}

export function VacancyList() {
  const [selected, setSelected] = useState<Selected>({});

  const found = useMemo(
    () =>
      VACANCIES.filter((vacancy) =>
        FILTERS.every(({ key }) => {
          const value = selected[key];
          if (!value) return true;
          const field = vacancy[key];
          return Array.isArray(field) ? field.includes(value) : field === value;
        }),
      ),
    [selected],
  );

  const hasFilters = Object.values(selected).some(Boolean);

  function reset() {
    setSelected({});
  }

  return (
    <section className={styles.section} id="vacancies">
      <div className={styles.inner}>
        <header className={styles.head}>
          <h2 className={styles.title}>Открытые вакансии</h2>
          <p className={styles.count}>
            {hasFilters
              ? `${found.length} из ${VACANCIES.length}`
              : `${VACANCIES.length} ${plural(VACANCIES.length)}`}
          </p>
        </header>

        {/* Фильтры в строку над списком — так они стоят у Источника. */}
        <div className={styles.filters}>
          {FILTERS.map(({ key, placeholder }) => (
            <Select
              key={key}
              plain
              placeholder={placeholder}
              options={filterOptions(key)}
              aria-label={placeholder}
              value={selected[key] ?? ""}
              onChange={(next) =>
                setSelected((prev) => ({ ...prev, [key]: next }))
              }
            />
          ))}

          {hasFilters && (
            <button className={styles.reset} type="button" onClick={reset}>
              Сбросить
            </button>
          )}
        </div>

        <div className={styles.cards}>
          {found.map((vacancy) => (
            <VacancyCard key={vacancy.id} {...vacancy} />
          ))}

          {found.length === 0 && (
            <p className={styles.empty}>
              Под эти условия вакансий нет. Снимите часть фильтров или
              отправьте резюме — вернёмся, когда появится подходящая задача.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
