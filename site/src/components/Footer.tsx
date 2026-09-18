import { Logo } from "./Logo";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconTelegram,
  IconVk,
} from "./icons";
import styles from "./Footer.module.css";

const NAV = [
  { href: "#vacancies", label: "Вакансии" },
  { href: "#about", label: "Работа с нами" },
  { href: "#terms", label: "Условия" },
  { href: "#apply", label: "Отправить резюме" },
];

const SOCIAL = [
  { label: "Instagram", Icon: IconInstagram },
  { label: "LinkedIn", Icon: IconLinkedin },
  { label: "Telegram", Icon: IconTelegram },
  { label: "VK", Icon: IconVk },
  { label: "Facebook", Icon: IconFacebook },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Logo height={57} />

          <nav className={styles.nav}>
            {NAV.map((item) => (
              <a key={item.href} className={styles.link} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.social}>
            {SOCIAL.map(({ label, Icon }) => (
              <a
                key={label}
                className={styles.socialLink}
                href="#"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <span className={styles.copyright}>© 2026 SoftClub</span>
          <a
            className={styles.siteLink}
            href="https://softclub.by"
            target="_blank"
            rel="noreferrer"
          >
            softclub.by
          </a>
        </div>
      </div>
    </footer>
  );
}
