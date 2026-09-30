import Link from "next/link";
import { NAV } from "@/data/nav";
import { CONTACTS, OFFICES, PERKS } from "@/data/company";
import { Logo } from "./Logo";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconTelegram,
} from "./icons";
import btn from "./Button.module.css";
import styles from "./FooterDark.module.css";

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

/** Четыре условия из «Работы с нами» — короткий список в колонке подвала. */
const PERK_LINKS = PERKS.slice(0, 4);

export function FooterDark() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <section className={styles.cta}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>
              Не нашли
              <br />
              свою
              <br />
              вакансию?
            </h2>
            <p className={styles.ctaLead}>
              Присылайте резюме — вернёмся, когда появится подходящая задача.
            </p>
          </div>
          <Link
            className={`${btn.button} ${btn.primary} ${btn.large} ${styles.ctaButton}`}
            href="/#apply"
          >
            Отправить резюме
          </Link>
        </section>

        <hr className={styles.divider} />

        <div className={styles.columns}>
          <div className={styles.brand}>
            <Link href="/" aria-label="SoftClub — на главную">
              <Logo height={48} tone="inverse" />
            </Link>
            <p className={styles.brandText}>
              Разработчик решений для банков, финансовых учреждений и биржевой
              отрасли. 30 лет, 1000 человек, 24+ страны.
            </p>
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

          <nav className={styles.column} aria-label="Разделы">
            <h3 className={styles.columnTitle}>Разделы</h3>
            <ul className={styles.list}>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link className={styles.link} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link className={styles.link} href="/#apply">
                  Отправить резюме
                </Link>
              </li>
            </ul>
          </nav>

          <nav className={styles.column} aria-label="Условия">
            <h3 className={styles.columnTitle}>Условия</h3>
            <ul className={styles.list}>
              {PERK_LINKS.map((perk) => (
                <li key={perk.id}>
                  <Link
                    className={styles.link}
                    href={`/about-us#${perk.id}`}
                  >
                    {perk.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Контакты</h3>
            <ul className={styles.list}>
              <li>
                <address className={styles.address}>
                  {CONTACTS.address}
                </address>
              </li>
              <li>
                <a className={styles.link} href={CONTACTS.phone.href}>
                  {CONTACTS.phone.label}
                </a>
              </li>
              <li>
                <a className={styles.linkAccent} href={CONTACTS.email.href}>
                  {CONTACTS.email.label}
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Офисы</h3>
            <ul className={styles.list}>
              {OFFICES.map((office) => (
                <li key={office.city} className={styles.office}>
                  <span className={styles.officeCity}>{office.city}</span>
                  <span className={styles.officeCountry}>{office.country}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} {CONTACTS.legal}
          </p>
          <a
            className={styles.site}
            href="https://softclub.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            softclub.com ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
