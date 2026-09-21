"use client";

import { useEffect, useState } from "react";
import { VACANCIES } from "@/data/vacancies";
import { Button } from "./Button";
import { Checkbox, FileUpload, Input, Select } from "./form";
import { IconDownload } from "./icons";
import styles from "./ApplicationForm.module.css";

/** Шаблон анкеты лежит на job.softclub.by — свою копию не держим. */
const TEMPLATE_URL = "https://job.softclub.by/docs/SC_JOB_Developer.docx";

function newCaptcha() {
  return { a: 1 + Math.floor(Math.random() * 9), b: 1 + Math.floor(Math.random() * 9) };
}

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
  // Капча считается на клиенте: на сервере случайные числа дали бы рассинхрон.
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => setCaptcha(newCaptcha()), []);

  function refresh() {
    setCaptcha(newCaptcha());
    setAnswer("");
    setError(null);
  }

  return (
    <section className={styles.section} id="apply">
      <form
        className={styles.inner}
        onSubmit={(event) => {
          event.preventDefault();

          if (Number(answer) !== captcha.a + captcha.b) {
            setError("Неверный ответ — проверьте пример ещё раз");
            return;
          }

          // Приёмника пока нет — это заглушка до появления реального адреса отправки.
          setError(null);
          setSent(true);
        }}
      >
        <div className={styles.head}>
          <h2 className={styles.title}>Отправить резюме</h2>

          <a className={styles.template} href={TEMPLATE_URL} download>
            <IconDownload size={20} />
            Скачать шаблон анкеты
          </a>
        </div>

        <Row label="Вакансия" required>
          <Select
            name="vacancy"
            placeholder="Выберите вакансию"
            options={VACANCIES.map((vacancy) => vacancy.title)}
            aria-label="Вакансия"
            required
          />
        </Row>

        <Row label="Фамилия и Имя" required>
          <Input
            name="name"
            placeholder="Иванов Иван"
            aria-label="Фамилия и Имя"
            required
          />
        </Row>

        <Row label="E-mail" required>
          <Input
            name="email"
            type="email"
            placeholder="Например: ivanivanov@mail.com"
            aria-label="E-mail"
            required
          />
        </Row>

        <Row label="Телефон">
          <Input name="phone" type="tel" placeholder="+375" aria-label="Телефон" />
        </Row>

        <Row label="Резюме" required>
          <FileUpload name="resume" />
          <span className={styles.hint}>
            Поддерживаемые форматы: PDF, DOC, DOCX. Рекомендуемый размер — до 10 МБ.
          </span>
        </Row>

        <Row label={`Сколько будет ${captcha.a} + ${captcha.b}?`} required>
          <div className={styles.captcha}>
            <Input
              name="captcha"
              inputMode="numeric"
              aria-label="Ответ на пример"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              required
            />
            <button className={styles.refresh} type="button" onClick={refresh}>
              Обновить
            </button>
          </div>
          {error && <span className={styles.error}>{error}</span>}
        </Row>

        <div className={styles.actions}>
          <span />
          <div className={styles.actionsInner}>
            <Checkbox
              name="consent"
              required
              small
              label={
                <>
                  Я даю{" "}
                  <a
                    className={styles.consentLink}
                    href="https://job.softclub.by/resume"
                    target="_blank"
                    rel="noreferrer"
                  >
                    согласие на обработку моих персональных данных в целях
                    рассмотрения резюме
                  </a>
                </>
              }
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
