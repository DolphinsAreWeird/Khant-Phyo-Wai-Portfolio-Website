import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <p>© 2026 Khant Phyo Wai. Made in Bangkok.</p>
        <p>Built with Next.js. Diagrams placed by hand, jokes unaudited.</p>
      </div>
    </footer>
  );
}
