import styles from "./NavItem.module.css";

type NavItemProps = {
  href: string;
  active?: boolean;
  children: React.ReactNode;
};

export function NavItem({ href, active = false, children }: NavItemProps) {
  const classes = [styles.navItem, active ? styles.active : null]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} href={href} aria-current={active ? "page" : undefined}>
      {children}
    </a>
  );
}
