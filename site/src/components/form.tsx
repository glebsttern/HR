"use client";

import { useId, useState } from "react";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { IconChevronDown, IconUpload } from "./icons";
import styles from "./form.module.css";

type FieldStyle = { filled?: boolean };

export function Input({ filled, ...props }: InputHTMLAttributes<HTMLInputElement> & FieldStyle) {
  return (
    <input
      className={filled ? `${styles.field} ${styles.filled}` : styles.field}
      {...props}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${styles.field} ${styles.textarea}`} {...props} />;
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
  ...rest
}: SelectProps) {
  // Без внешнего value поле живёт само по себе, с ним — подчиняется родителю.
  const [innerValue, setInnerValue] = useState("");
  const current = value === undefined ? innerValue : String(value);

  return (
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
}: { name: string } & FieldStyle) {
  const id = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <>
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
        onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
      />
    </>
  );
}
