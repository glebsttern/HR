"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";
import styles from "./Header.module.css";

export const NAV = [
  { href: "/", label: "Вакансии" },
  { href: "/about-us", label: "Работа с нами" },
  { href: "/terms", label: "Условия" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" aria-label="SoftClub — на главную">
          <Logo height={57} />
        </Link>

        <div className={styles.right}>
          <nav className={styles.nav}>
            {NAV.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                active={
                  item.href === "/"
                    ? pathname === "/" || pathname.startsWith("/vacancies")
                    : pathname.startsWith(item.href)
                }
              >
                {item.label}
              </NavItem>
            ))}
          </nav>

          <Link href="/#apply">
            <Button variant="primary" size="medium">
              Отправить резюме
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
