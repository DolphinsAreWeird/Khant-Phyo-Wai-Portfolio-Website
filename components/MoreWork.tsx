import { allProjects } from "@/content/site";
import { Chevron } from "./Chevron";
import { ProjectTable } from "./ProjectTable";
import styles from "./MoreWork.module.css";

function PyawMock() {
  return (
    <div className={styles.ime} role="img" aria-label="Pyaw turning 'kyay zu tin par tal' into Burmese script">
      <div className={styles.field} aria-hidden="true">
        kyay zu tin par tal<span className={styles.caret} />
      </div>
      <ol className={styles.candidates} aria-hidden="true">
        <li className={styles.picked}>
          <span>1</span>
          <b lang="my">ကျေးဇူးတင်ပါတယ်</b>
        </li>
        <li>
          <span>2</span>
          <b lang="my">ကျေးဇူးပါ</b>
        </li>
      </ol>
    </div>
  );
}

export function MoreWork() {
  return (
    <section id="more" className="section" aria-labelledby="more-title">
      <div className="wrap">
        <h2 id="more-title" className="section-title">
          Also on the board
        </h2>
        <p className="section-intro">Two favourites, then everything else in one table.</p>

        <div className={styles.highlights}>
          <article className={styles.highlight}>
            <div className={`${styles.hlVisual} ${styles.icarus}`}>
              <img
                src="/images/projects/icarus-mascot.webp"
                alt="Icarus's mascot, a small winged fox, winking"
                width={240}
                height={240}
                loading="lazy"
              />
            </div>
            <div>
              <h3 className={styles.hlName}>Icarus Assistant</h3>
              <p>
                Four of us built a Thai and English voice guide for a finance app in 24 hours. It came 3rd
                in the AI track at U-Hackathon 2026, out of almost 400 people.
              </p>
              <a href="https://github.com/DolphinsAreWeird/Icarus-Assistant" target="_blank" rel="noopener noreferrer">
                Code on GitHub
              </a>
            </div>
          </article>
          <article className={styles.highlight}>
            <div className={styles.hlVisual}>
              <PyawMock />
            </div>
            <div>
              <h3 className={styles.hlName}>Pyaw</h3>
              <p>
                Most Burmese people text in English letters, and everyone spells it differently. I
                couldn&apos;t type Burmese on my Mac, so I built an input method that fixes it as you
                type. Free and open source.
              </p>
              <a href="https://github.com/DolphinsAreWeird/pyaw" target="_blank" rel="noopener noreferrer">
                Pyaw on GitHub
              </a>
            </div>
          </article>
        </div>

        <details className={styles.all}>
          <summary className={styles.allSummary}>
            <span className="when-closed">See all {allProjects.length} projects as a table</span>
            <span className="when-open">Hide the table</span>
            <Chevron />
          </summary>
          <ProjectTable />
        </details>
      </div>
    </section>
  );
}
