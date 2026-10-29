import { AnnotationsToggle } from "./AnnotationsToggle";
import { DolphinMark } from "./Dolphin";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./SiteHeader.module.css";

const nav = [
  { href: "#now", label: "Now" },
  { href: "#work", label: "Work" },
  { href: "#approach", label: "How I work" },
  { href: "#changelog", label: "Changelog" },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label="Khant Phyo Wai, back to top">
          <DolphinMark className={styles.mark} />
          <span className={styles.name}>Khant Phyo Wai</span>
        </a>
        <nav aria-label="Sections" className={styles.nav}>
          <ul>
            {nav.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href="#contact" className={styles.contact}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.switches}>
          <AnnotationsToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
