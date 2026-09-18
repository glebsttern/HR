"use client";

import { useMemo, useState } from "react";
import { FILTERS, VACANCIES, filterOptions, type FilterKey } from "@/data/vacancies";
import { Select } from "./form";
import { IconSearch } from "./icons";
import { VacancyCard } from "./VacancyCard";
import styles from "./VacancyList.module.css";

type Selected = Partial<Record<FilterKey, string>>;

export function VacancyList() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Selected>({});

  const found = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return VACANCIES.filter((vacancy) => {
      const matchesQuery =
        needle === "" ||
        `${vacancy.title} ${vacancy.description} ${vacancy.stack.join(" ")}`
          .toLowerCase()
          .includes(needle);

      const matchesFilters = FILTERS.every(({ key }) => {
        const value = selected[key];
        if (!value) return true;
        const field = vacancy[key];
        return Array.isArray(field) ? field.includes(value) : field === value;
      });

      return matchesQuery && matchesFilters;
    });
  }, [query, selected]);

  const hasFilters = query !== "" || Object.values(selected).some(Boolean);

  function reset() {
    setQuery("");
    setSelected({});
  }

  return (
    <section className={styles.section} id="vacancies">
      <div className={styles.inner}>
        <header className={styles.head}>
          <h2 className={styles.title}>Открытые вакансии</h2>
          <p className={styles.count}>
            {found.length} из {VACANCIES.length}
          </p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.rail}>
            <div className={styles.search}>
              <input
                className={styles.searchInput}
                type="search"
                placeholder="Искать вакансии..."
                aria-label="Поиск по вакансиям"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button
                className={styles.searchButton}
                type="button"
                aria-label="Найти"
              >
                <IconSearch size={20} />
              </button>
            </div>

            {FILTERS.map(({ key, placeholder }) => (
              <Select
                key={key}
                placeholder={placeholder}
                options={filterOptions(key)}
                aria-label={placeholder}
                value={selected[key] ?? ""}
                onChange={(event) =>
                  setSelected((prev) => ({ ...prev, [key]: event.target.value }))
                }
              />
            ))}

            {hasFilters && (
              <button className={styles.reset} type="button" onClick={reset}>
                Сбросить фильтры
              </button>
            )}
          </aside>

          <div className={styles.cards}>
            {found.map((vacancy) => (
              <VacancyCard key={vacancy.id} {...vacancy} />
            ))}

            {found.length === 0 && (
              <p className={styles.empty}>
                Под эти условия вакансий нет. Попробуйте снять часть фильтров или
                отправьте резюме — мы вернёмся, когда появится подходящая.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
