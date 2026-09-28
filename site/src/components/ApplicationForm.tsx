"use client";

import { useEffect, useState } from "react";
import { VACANCIES } from "@/data/vacancies";
import { Button } from "./Button";
import {
  Checkbox,
  FileUpload,
  Input,
  Select,
  TemplateLink,
  TextLink,
} from "./form";
import styles from "./ApplicationForm.module.css";

const VACANCY_OPTIONS = VACANCIES.map((vacancy) => vacancy.title);

/** Арифметическая капча Источника: «Сколько будет 9 − 9?». */
function makeTask() {
  const left = Math.floor(Math.random() * 9) + 1;
  const right = Math.floor(Math.random() * left);
  return { left, right, answer: left - right };
}

export function ApplicationForm() {
  // Пример на сервере и на клиенте обязан совпасть, поэтому случайный
  // подставляем уже после монтирования — иначе Next ругается на гидратацию.
  const [task, setTask] = useState({ left: 9, right: 9, answer: 0 });
  const [sent, setSent] = useState(false);

  useEffect(() => setTask(makeTask()), []);

  return (
    <section className={styles.section} id="apply">
      <form
        className={styles.card}
        onSubmit={(event) => {
          event.preventDefault();
          // ⚠️ Отправки нет — бэкенда у страницы пока не существует.
          setSent(true);
        }}
      >
        {/* ⚠️ Файл-шаблон анкеты — заглушка, реального файла в проекте нет. */}
        <div className={styles.template}>
          <TemplateLink
            href="/anketa.docx"
            title="Скачать"
            subtitle="шаблон анкеты"
          />
        </div>

        <header className={styles.header}>
          <h2 className={styles.title}>Отправить резюме</h2>
          <Select
            plain
            name="vacancy"
            placeholder="Выберите вакансию"
            options={VACANCY_OPTIONS}
            aria-label="Вакансия"
          />
        </header>

        <div className={styles.fields}>
          <Input
            label="Фамилия и Имя"
            name="name"
            filled
            required
            autoComplete="name"
          />
          <Input
            label="E-mail"
            name="email"
            type="email"
            filled
            required
            autoComplete="email"
          />
          <Input
            label="Телефон"
            name="phone"
            type="tel"
            filled
            required
            autoComplete="tel"
          />
        </div>

        <FileUpload
          name="resume"
          placeholder="Прикрепите файл-резюме"
          required
          hint="Поддерживаемые форматы: PDF, DOC, DOCX. Рекомендуемый размер — до 10 МБ."
        />

        <div className={styles.captcha}>
          <Input
            label={`Сколько будет ${task.left} − ${task.right}?`}
            name="captcha"
            filled
            required
            inputMode="numeric"
            pattern={String(task.answer)}
          />
          <TextLink onClick={() => setTask(makeTask())}>Обновить</TextLink>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="medium" type="submit">
            Отправить
          </Button>
          <Checkbox
            name="consent"
            required
            small
            label="Я даю согласие на обработку моих персональных данных в целях рассмотрения резюме"
          />
        </div>

        {sent && (
          <p className={styles.done} role="status">
            Резюме отправлено — мы вернёмся с ответом.
          </p>
        )}
      </form>
    </section>
  );
}
