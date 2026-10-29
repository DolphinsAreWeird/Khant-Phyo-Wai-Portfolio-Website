import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={`wrap ${styles.page}`}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>This box isn&apos;t connected to anything.</h1>
      <p className={styles.body}>
        The page you asked for doesn&apos;t exist, or it moved when the site was rebuilt.
      </p>
      <Link href="/" className="button button-solid">
        Back to the diagram
      </Link>
    </main>
  );
}
