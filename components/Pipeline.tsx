import type { Stage } from "@/content/site";
import styles from "./Pipeline.module.css";

// A left-to-right flow diagram built from HTML boxes, so it reflows into a
// top-to-bottom flow on phones instead of shrinking.
export function Pipeline({ stages, label }: { stages: Stage[]; label: string }) {
  return (
    <ol className={styles.pipeline} aria-label={label}>
      {stages.map((stage, i) =>
        "group" in stage ? (
          <li key={i} className={`${styles.stage} ${styles.group}`} style={{ "--n": i } as React.CSSProperties}>
            {stage.group.map((box) => (
              <div key={box.label} className={styles.box}>
                <span className={styles.label}>{box.label}</span>
                {box.detail && <span className={styles.detail}>{box.detail}</span>}
              </div>
            ))}
          </li>
        ) : (
          <li key={i} className={styles.stage} style={{ "--n": i } as React.CSSProperties}>
            <div className={`${styles.box} ${styles[stage.kind ?? "step"]}`}>
              <span className={styles.label}>{stage.label}</span>
              {stage.detail && <span className={styles.detail}>{stage.detail}</span>}
            </div>
          </li>
        ),
      )}
    </ol>
  );
}
