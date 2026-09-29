"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
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

type SelectProps = FieldStyle & {
  placeholder: string;
  options: string[];
  value?: string;
  /** Отдаёт выбранное значение; пустая строка — «сброшено». */
  onChange?: (value: string) => void;
  name?: string;
  /** Селект без плашки — крупной строкой, как у заголовка анкеты. */
  plain?: boolean;
  "aria-label"?: string;
};

/**
 * Селект со своим выпадающим списком. Нативный список рисует ОС, и привести
 * его к стилю сайта нельзя, поэтому список свой: та же скруглённая форма,
 * что у полей, тень карточки, подсветка наведённого и выбранного пункта.
 * Механика триггера взята у Главного примера — там кнопка со скруглением 16
 * и шевроном, а список системный; мы доводим до конца и список.
 */
export function Select({
  placeholder,
  options,
  value,
  onChange,
  name,
  filled,
  plain,
  label,
  required,
  hint,
  "aria-label": ariaLabel,
}: SelectProps) {
  // Без внешнего value поле живёт само по себе, с ним — подчиняется родителю.
  const [innerValue, setInnerValue] = useState("");
  const current = value === undefined ? innerValue : value;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const listId = useId();

  // Список закрывается кликом мимо и по Esc — иначе он остаётся висеть.
  useEffect(() => {
    if (!open) return;

    const onDocClick = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(option: string) {
    if (value === undefined) setInnerValue(option);
    onChange?.(option);
    setOpen(false);
  }

  function onTriggerKey(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActive(Math.max(0, options.indexOf(current)));
        return;
      }
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + options.length) % options.length);
    }
    if (open && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      choose(options[active]);
    }
  }

  const trigger = (
    <span
      className={plain ? `${styles.selectWrap} ${styles.plainWrap}` : styles.selectWrap}
      ref={wrapRef}
    >
      <button
        type="button"
        className={[
          styles.field,
          styles.select,
          filled ? styles.filled : null,
          plain ? styles.plain : null,
          current === "" ? styles.selectEmpty : null,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={ariaLabel}
        onClick={() => {
          setOpen((v) => !v);
          setActive(Math.max(0, options.indexOf(current)));
        }}
        onKeyDown={onTriggerKey}
      >
        {current === "" ? placeholder : current}
      </button>

      <span className={open ? `${styles.selectIcon} ${styles.selectIconOpen}` : styles.selectIcon}>
        <IconChevronDown size={20} />
      </span>

      {open && (
        <ul className={styles.options} id={listId} role="listbox">
          {current !== "" && (
            <li>
              <button
                type="button"
                className={styles.option}
                onClick={() => choose("")}
              >
                {placeholder}
              </button>
            </li>
          )}
          {options.map((option, index) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={option === current}
                className={[
                  styles.option,
                  option === current ? styles.optionSelected : null,
                  index === active ? styles.optionActive : null,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseEnter={() => setActive(index)}
                onClick={() => choose(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}

      {name && <input type="hidden" name={name} value={current} />}
    </span>
  );

  return (
    <Labelled label={label} required={required} hint={hint}>
      {trigger}
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
  label,
  required,
  placeholder = "Перетащите файл или нажмите, чтобы выбрать",
}: { name: string; placeholder?: string } & FieldStyle) {
  const id = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <span className={styles.uploadWrap}>
      {label && (
        <span className={styles.labelText}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </span>
      )}
      <label
        className={filled ? `${styles.upload} ${styles.uploadFilled}` : styles.upload}
        htmlFor={id}
      >
        <span className={styles.uploadIcon}>
          <IconUpload size={24} />
        </span>
        {fileName ?? placeholder}
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
