"use client";

import { useId, useState } from "react";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { IconChevronDown, IconDownload, IconUpload } from "./icons";
import styles from "./form.module.css";

type FieldStyle = {
  filled?: boolean;
  /** Подпись и подсказка живут внутри поля — так же устроен компонент в ДС. */
  label?: string;
  required?: boolean;
  hint?: string;
};

/** Обвязка поля: подпись сверху, подсказка снизу. Общая для Input/Select/Textarea. */
function Labelled({
  label,
  required,
  hint,
  children,
}: FieldStyle & { children: React.ReactNode }) {
  if (!label && !hint) return <>{children}</>;

  return (
    <label className={styles.labelled}>
      {label && (
        <span className={styles.labelText}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </span>
      )}
      {children}
      {hint && <span className={styles.hint}>{hint}</span>}
    </label>
  );
}

export function Input({
  filled,
  label,
  required,
  hint,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & FieldStyle) {
  return (
    <Labelled label={label} required={required} hint={hint}>
      <input
        className={filled ? `${styles.field} ${styles.filled}` : styles.field}
        required={required}
        {...props}
      />
    </Labelled>
  );
}

export function Textarea({
  filled,
  label,
  required,
  hint,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & FieldStyle) {
  return (
    <Labelled label={label} required={required} hint={hint}>
      <textarea
        className={`${styles.field} ${styles.textarea}${filled ? " " + styles.filled : ""}`}
        required={required}
        {...props}
      />
    </Labelled>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  FieldStyle & {
    placeholder: string;
    options: string[];
    /** Селект без плашки — крупной строкой, как у заголовка анкеты. */
    plain?: boolean;
  };

export function Select({
  placeholder,
  options,
  value,
  onChange,
  filled,
  plain,
  label,
  required,
  hint,
  ...rest
}: SelectProps) {
  // Без внешнего value поле живёт само по себе, с ним — подчиняется родителю.
  const [innerValue, setInnerValue] = useState("");
  const current = value === undefined ? innerValue : String(value);

  return (
    <Labelled label={label} required={required} hint={hint}>
    <span className={plain ? `${styles.selectWrap} ${styles.plainWrap}` : styles.selectWrap}>
      <select
        className={[
          styles.field,
          styles.select,
          filled ? styles.filled : null,
          plain ? styles.plain : null,
        ]
          .filter(Boolean)
          .join(" ")}
        value={current}
        data-placeholder={current === ""}
        onChange={(event) => {
          if (value === undefined) setInnerValue(event.target.value);
          onChange?.(event);
        }}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className={styles.selectIcon}>
        <IconChevronDown size={20} />
      </span>
    </span>
    </Labelled>
  );
}

type ChoiceProps = {
  name: string;
  label: React.ReactNode;
  defaultChecked?: boolean;
  small?: boolean;
  required?: boolean;
};

export function Radio({ name, label, defaultChecked }: ChoiceProps) {
  return (
    <label className={styles.choice}>
      <input
        type="radio"
        name={name}
        defaultChecked={defaultChecked}
        className={`${styles.choiceInput} ${styles.radioInput}`}
      />
      <span className={styles.choiceLabel}>{label}</span>
    </label>
  );
}

export function Checkbox({
  name,
  label,
  defaultChecked,
  small,
  required,
}: ChoiceProps) {
  return (
    <label className={styles.choice}>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        required={required}
        className={`${styles.choiceInput} ${styles.checkboxInput}`}
      />
      <span className={small ? styles.choiceLabelSmall : styles.choiceLabel}>
        {label}
      </span>
    </label>
  );
}

export function FileUpload({
  name,
  filled,
  hint,
  required,
}: { name: string } & FieldStyle) {
  const id = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <span className={styles.uploadWrap}>
      <label
        className={filled ? `${styles.upload} ${styles.uploadFilled}` : styles.upload}
        htmlFor={id}
      >
        <span className={styles.uploadIcon}>
          <IconUpload size={24} />
        </span>
        {fileName ?? "Перетащите файл или нажмите, чтобы выбрать"}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        className={styles.visuallyHidden}
        required={required}
        onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
      />
      {hint && <span className={styles.hint}>{hint}</span>}
    </span>
  );
}

/** Подчёркнутая текстовая ссылка — «Обновить» в капче. Компонент `TextLink` в ДС. */
export function TextLink({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={styles.textLink} type="button" {...props}>
      {children}
    </button>
  );
}

/** Плашка со скачиванием файла — компонент `TemplateLink` в ДС. */
export function TemplateLink({
  href,
  title,
  subtitle,
}: {
  href: string;
  title: string;
  subtitle: string;
}) {
  return (
    <a className={styles.templateLink} href={href} download>
      <IconDownload size={20} />
      <span className={styles.templateLabels}>
        <span className={styles.templateTitle}>{title}</span>
        <span className={styles.templateSubtitle}>{subtitle}</span>
      </span>
    </a>
  );
}
