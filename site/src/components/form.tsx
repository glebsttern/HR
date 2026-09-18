"use client";

import { useId, useState } from "react";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { IconChevronDown, IconUpload } from "./icons";
import styles from "./form.module.css";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={styles.field} {...props} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${styles.field} ${styles.textarea}`} {...props} />;
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  placeholder: string;
  options: string[];
};

export function Select({ placeholder, options, ...rest }: SelectProps) {
  const [value, setValue] = useState("");

  return (
    <span className={styles.selectWrap}>
      <select
        className={`${styles.field} ${styles.select}`}
        value={value}
        data-placeholder={value === ""}
        onChange={(event) => setValue(event.target.value)}
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
  label: string;
  defaultChecked?: boolean;
  small?: boolean;
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

export function Checkbox({ name, label, defaultChecked, small }: ChoiceProps) {
  return (
    <label className={styles.choice}>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className={`${styles.choiceInput} ${styles.checkboxInput}`}
      />
      <span className={small ? styles.choiceLabelSmall : styles.choiceLabel}>
        {label}
      </span>
    </label>
  );
}

export function FileUpload({ name }: { name: string }) {
  const id = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <>
      <label className={styles.upload} htmlFor={id}>
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
