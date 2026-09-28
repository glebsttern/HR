import Link from "next/link";
import { NAV } from "@/data/nav";
import { Logo } from "./Logo";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconTelegram,
} from "./icons";
import styles from "./Footer.module.css";

/** Ссылки соцсетей — реальные, с softclub.com. VK у компании не нашлось. */
const SOCIAL = [
  {
    href: "https://www.instagram.com/softclubcom/",
    label: "Instagram",
    Icon: IconInstagram,
  },
  {
    href: "https://www.linkedin.com/company/softclub/",
    label: "LinkedIn",
    Icon: IconLinkedin,
  },
  { href: "https://t.me/softclubcom", label: "Telegram", Icon: IconTelegram },
  {
    href: "https://www.facebook.com/profile.php?id=100093105371625",
    label: "Facebook",
    Icon: IconFacebook,
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Link href="/" aria-label="SoftClub — на главную">
            <Logo height={48} />
          </Link>

          <nav className={styles.nav} aria-label="Подвал">
            {NAV.map((item) => (
              <Link key={item.href} className={styles.link} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className={styles.link} href="/#apply">
              Отправить резюме
            </Link>
          </nav>

          <ul className={styles.social}>
            {SOCIAL.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  className={styles.socialLink}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Icon size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} SoftClub
          </p>
          <a
            className={styles.site}
            href="https://softclub.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            softclub.by
          </a>
        </div>
      </div>
    </footer>
  );
}
