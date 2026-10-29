"use client";

import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";

// Light/dark switch. The page follows the system until the visitor picks one;
// the knob position comes from CSS so it's right before React loads.
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setDark(root.dataset.theme ? root.dataset.theme === "dark" : media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("kp-theme", next ? "dark" : "light");
    } catch {
      // Storage can be blocked; the switch still works for this visit.
    }
  }

  return (
    <button type="button" role="switch" aria-checked={dark} className={styles.theme} onClick={toggle}>
      <span className={styles.track} aria-hidden="true">
        <svg className={styles.sun} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7 7 17M17 7l1.7-1.7" />
        </svg>
        <svg className={styles.moon} viewBox="0 0 24 24">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        </svg>
        <span className={styles.knob} />
      </span>
      <span className={styles.themeLabel}>
        <span className={styles.labelLight}>Light</span>
        <span className={styles.labelDark}>Dark</span>
      </span>
      <span className="visually-hidden">Dark mode</span>
    </button>
  );
}
