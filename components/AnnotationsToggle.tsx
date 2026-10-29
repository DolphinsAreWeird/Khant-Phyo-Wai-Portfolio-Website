"use client";

import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";

// Lets a visitor read the straight version of the page without Khant's
// handwritten side comments. The choice is remembered per browser.
export function AnnotationsToggle() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(document.documentElement.dataset.annotations !== "off");
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = !on;
    setOn(next);
    if (next) {
      delete root.dataset.annotations;
      // Replays the write-in animation on the comments that just came back.
      root.dataset.annotationsJustOn = "";
      window.setTimeout(() => delete root.dataset.annotationsJustOn, 900);
    } else {
      root.dataset.annotations = "off";
    }
    try {
      localStorage.setItem("kp-annotations", next ? "on" : "off");
    } catch {
      // Storage can be blocked; the toggle still works for this visit.
    }
  }

  return (
    <button type="button" className={styles.toggle} aria-pressed={on} aria-label="Side comments" onClick={toggle}>
      <span className={styles.toggleBox} aria-hidden="true" />
      <span className={styles.toggleLong} aria-hidden="true">Side comments</span>
      <span className={styles.toggleShort} aria-hidden="true">Notes</span>
    </button>
  );
}
