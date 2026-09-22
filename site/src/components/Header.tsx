"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";
import { IconClose, IconMenu } from "./icons";
import styles from "./Header.module.css";

export const NAV = [
  { href: "/", label: "Вакансии" },
  { href: "/about-us", label: "Работа с нами" },
  { href: "/terms", label: "Условия" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Меню закрывается при переходе — иначе на новой странице оно осталось бы раскрытым.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/vacancies")
      : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" aria-label="SoftClub — на главную">
          <Logo height={44} />
        </Link>

        <div className={styles.right}>
          <nav className={styles.nav}>
            {NAV.map((item) => (
              <NavItem key={item.href} href={item.href} active={isActive(item.href)}>
                {item.label}
              </NavItem>
            ))}
          </nav>

          <Link className={styles.cta} href="/#apply">
            <Button variant="primary" size="medium">
              Отправить резюме
            </Button>
          </Link>

          <button
            className={styles.burger}
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose size={24} /> : <IconMenu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className={styles.mobileNav}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              className={
                isActive(item.href)
                  ? `${styles.mobileLink} ${styles.mobileLinkActive}`
                  : styles.mobileLink
              }
              href={item.href}
            >
              {item.label}
            </Link>
          ))}

          <Link className={styles.mobileCta} href="/#apply">
            <Button variant="primary" size="medium">
              Отправить резюме
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
