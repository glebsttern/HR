import { Button } from "./Button";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";
import styles from "./Header.module.css";

const NAV = [
  { href: "#vacancies", label: "Вакансии", active: true },
  { href: "#about", label: "Работа с нами", active: false },
  { href: "#terms", label: "Условия", active: false },
];

export function Header() {
  return (
    <header className={styles.header}>
      <a href="/" aria-label="SoftClub — на главную">
        <Logo height={57} />
      </a>

      <div className={styles.right}>
        <nav className={styles.nav}>
          {NAV.map((item) => (
            <NavItem key={item.href} href={item.href} active={item.active}>
              {item.label}
            </NavItem>
          ))}
        </nav>

        <Button variant="primary" size="medium">
          Отправить резюме
        </Button>
      </div>
    </header>
  );
}
