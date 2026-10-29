import { knownIssues, type Issue } from "@/content/site";
import { Chevron } from "./Chevron";
import { DolphinShape } from "./Dolphin";
import styles from "./KnownIssues.module.css";

const shown = 3;

function Row({ issue, n }: { issue: Issue; n: number }) {
  return (
    <li className={`${styles.issue} ${issue.extra === "dolphin" ? styles.dolphinRow : ""}`} tabIndex={issue.extra === "dolphin" ? 0 : undefined}>
      <p className={styles.id} aria-hidden="true">
        #{String(n).padStart(2, "0")}
      </p>
      <div className={styles.text}>
        <h3 className={styles.title}>{issue.title}</h3>
        <p className={styles.body}>{issue.body}</p>
        {issue.extra === "photo" && (
          <figure className={styles.photo}>
            <img
              src="/images/exhibit-a.webp"
              alt="Khant asleep on a railing above a mountain valley, giving a thumbs up anyway"
              width={700}
              height={933}
              loading="lazy"
            />
            <span className={styles.zzz} aria-hidden="true">
              <i>z</i>
              <i>z</i>
              <i>z</i>
            </span>
            <figcaption>Asleep. Still approving.</figcaption>
          </figure>
        )}
        {issue.extra === "dolphin" && <DolphinShape className={styles.leaper} />}
      </div>
      <p className={styles.status}>{issue.status}</p>
    </li>
  );
}

export function KnownIssues() {
  const rest = knownIssues.slice(shown);
  return (
    <section id="issues" className="section" aria-labelledby="issues-title">
      <div className="wrap">
        <h2 id="issues-title" className="section-title">
          Known issues
        </h2>
        <p className="section-intro">Disclosed for transparency. None of them are getting fixed.</p>
        <ul className={styles.list}>
          {knownIssues.slice(0, shown).map((issue, i) => (
            <Row key={issue.title} issue={issue} n={i + 1} />
          ))}
        </ul>
        <details className={styles.more}>
          <summary className={styles.moreSummary}>
            <span className="when-closed">Show {rest.length} more issues</span>
            <span className="when-open">Show fewer</span>
            <Chevron />
          </summary>
          <ul className={styles.list}>
            {rest.map((issue, i) => (
              <Row key={issue.title} issue={issue} n={i + shown + 1} />
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
