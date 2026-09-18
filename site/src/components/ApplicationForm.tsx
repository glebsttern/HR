"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Checkbox, FileUpload, Input, Radio, Select, Textarea } from "./form";
import styles from "./ApplicationForm.module.css";

function Row({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </span>
      <div className={styles.control}>{children}</div>
    </div>
  );
}

export function ApplicationForm() {
  const [sent, setSent] = useState(false);

  return (
    <section className={styles.section} id="apply">
      <form
        className={styles.inner}
        onSubmit={(event) => {
          // Приёмника пока нет — это заглушка до появления реального адреса отправки.
          event.preventDefault();
          setSent(true);
        }}
      >
        <h2 className={styles.title}>Отправить резюме</h2>

        <Row label="Направление" required>
          <Select
            name="direction"
            placeholder="Выбрать"
            options={["QA", "Java", "Analytics", "DevOps"]}
            aria-label="Направление"
          />
        </Row>

        <Row label="Фамилия Имя" required>
          <Input name="name" placeholder="Иванов Иван" aria-label="Фамилия Имя" />
        </Row>

        <Row label="Телефон">
          <Input name="phone" type="tel" placeholder="+375" aria-label="Телефон" />
        </Row>

        <Row label="Эл.почта" required>
          <Input
            name="email"
            type="email"
            placeholder="Например: ivanivanov@mail.com"
            aria-label="Электронная почта"
          />
        </Row>

        <Row label="LinkedIn">
          <Input
            name="linkedin"
            placeholder="Ссылка на LinkedIn-аккаунт"
            aria-label="LinkedIn"
          />
        </Row>

        <Row label="Формат работы">
          <Radio name="format" label="Гибридный (4/1)" defaultChecked />
          <Radio name="format" label="Офисный" />
          <Radio name="format" label="Удалённый" />
        </Row>

        <Row label="Резюме" required>
          <FileUpload name="resume" />
        </Row>

        <Row label="Сообщение">
          <Textarea
            name="message"
            placeholder="Напишите то, что не вошло в резюме"
            aria-label="Сообщение"
          />
        </Row>

        <div className={styles.actions}>
          <span />
          <div className={styles.actionsInner}>
            <Checkbox
              name="consent"
              label="Я даю согласие на обработку персональных данных"
              defaultChecked
              small
            />
            <Button type="submit" variant="primary" size="large">
              Отправить
            </Button>

            {sent && (
              <p className={styles.sent} role="status">
                Спасибо, анкета заполнена. Отправка пока не подключена — форма
                ждёт реального адреса получателя.
              </p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
