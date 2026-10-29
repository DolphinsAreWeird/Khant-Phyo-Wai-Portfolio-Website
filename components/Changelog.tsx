import { changelog } from "@/content/site";
import { Chevron } from "./Chevron";
import { SideNote } from "./SideNote";
import styles from "./Changelog.module.css";

export function Changelog() {
  return (
    <section id="changelog" className="section" aria-labelledby="changelog-title">
      <div className="wrap">
        <h2 id="changelog-title" className="section-title">
          Changelog
        </h2>
        <div className="with-notes">
          <p className="section-intro">
            <SideNote>Next release: May 2027. Ask me what&apos;s in it.</SideNote>
            Each release shipped with more responsibility than the one before. Open one for the
            release notes.
          </p>
        </div>
        <ol className={styles.list}>
          {changelog.map((r, i) => (
            <li key={r.version} className={styles.release}>
              <details open={i === 0}>
                <summary className={styles.row}>
                  <span className={styles.version}>
                    <span className="visually-hidden">Version </span>v{r.version}
                  </span>
                  <span className={styles.head}>
                    <span className={styles.title}>{r.title}</span>
                    <span className={styles.org}>
                      {r.org}
                      <span className={styles.when}>{r.when}</span>
                    </span>
                  </span>
                  {r.photo && (
                    <span className={styles.hasPhoto} aria-hidden="true">
                      photo
                    </span>
                  )}
                  <Chevron />
                </summary>
                <div className={styles.notesWrap}>
                  <ul className={styles.notes}>
                    {r.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                  {r.photo && (
                    <img
                      className={styles.photo}
                      src={r.photo.src}
                      alt={r.photo.alt}
                      width={r.photo.width}
                      height={r.photo.height}
                      loading="lazy"
                    />
                  )}
                </div>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
