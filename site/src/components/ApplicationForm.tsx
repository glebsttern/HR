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

/** Подпись над полем — так устроена анкета у оригинала. */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </span>
      {children}
    </label>
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
        className={styles.card}
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
          <div className={styles.headLeft}>
            <h2 className={styles.title}>Отправить резюме</h2>

            <Select
              name="vacancy"
              placeholder="Выберите вакансию"
              options={VACANCIES.map((vacancy) => vacancy.title)}
              aria-label="Вакансия"
              plain
              required
            />
          </div>

          <a className={styles.template} href={TEMPLATE_URL} download>
            <IconDownload size={20} />
            <span>
              Скачать
              <span className={styles.templateSub}>шаблон анкеты</span>
            </span>
          </a>
        </div>

        <div className={styles.row}>
          <Field label="Фамилия и Имя" required>
            <Input name="name" placeholder="Иванов Иван" filled required />
          </Field>

          <Field label="E-mail" required>
            <Input
              name="email"
              type="email"
              placeholder="ivanivanov@mail.com"
              filled
              required
            />
          </Field>

          <Field label="Телефон">
            <Input name="phone" type="tel" placeholder="+375" filled />
          </Field>
        </div>

        <div className={styles.upload}>
          <FileUpload name="resume" filled />
          <span className={styles.hint}>
            Поддерживаемые форматы: PDF, DOC, DOCX. Рекомендуемый размер — до 10 МБ.
          </span>
        </div>

        <div className={styles.captchaRow}>
          <Field label={`Сколько будет ${captcha.a} + ${captcha.b}?`} required>
            <Input
              name="captcha"
              inputMode="numeric"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              filled
              required
            />
          </Field>

          <button className={styles.refresh} type="button" onClick={refresh}>
            Обновить
          </button>
        </div>

        {error && <span className={styles.error}>{error}</span>}

        <div className={styles.footer}>
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
        </div>

        {sent && (
          <p className={styles.sent} role="status">
            Спасибо, анкета заполнена. Отправка пока не подключена — форма ждёт
            реального адреса получателя.
          </p>
        )}
      </form>
    </section>
  );
}
