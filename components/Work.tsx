import { caseStudies, type CaseStudy } from "@/content/site";
import { Chevron } from "./Chevron";
import { Pipeline } from "./Pipeline";
import { ProjectVisual } from "./ProjectVisual";
import { SideNote } from "./SideNote";
import styles from "./Work.module.css";

function Project({ study }: { study: CaseStudy }) {
  const headingId = `${study.id}-title`;
  const colour = { "--proj-light": study.color.light, "--proj-dark": study.color.dark } as React.CSSProperties;

  return (
    <article id={study.id} className={`proj-scope ${styles.project}`} style={colour} aria-labelledby={headingId}>
      <div className={styles.top}>
        <div className={styles.text}>
          <h3 id={headingId} className={styles.name}>
            <span className={styles.swatch} aria-hidden="true" />
            {study.name}
          </h3>
          <p className={styles.summary}>{study.summary}</p>
          <dl className={styles.facts}>
            {study.card.map((f) => (
              <div key={f.term}>
                <dt>{f.term}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className={styles.visual}>
          <ProjectVisual id={study.id} />
          <figcaption>{study.visualCaption}</figcaption>
        </figure>
      </div>

      <details className={styles.record}>
        <summary className={styles.opener}>
          <span className="when-closed">Open the decision record</span>
          <span className="when-open">Close the decision record</span>
          <Chevron />
        </summary>
        <div className={styles.recordBody}>
          <div className={`with-notes ${styles.prose}`}>
            <h4>The problem</h4>
            <p>
              <SideNote>{study.aside}</SideNote>
              {study.problem}
            </p>
          </div>

          <figure className={styles.flow}>
            <figcaption>{study.pipelineTitle}</figcaption>
            <Pipeline stages={study.pipeline} label={`${study.name}: ${study.pipelineTitle}`} />
          </figure>

          <div className={`with-notes ${styles.prose}`}>
            <h4>Calls I made</h4>
            <ul className={styles.decisions}>
              {study.decisions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h4>My part</h4>
            <p>{study.myPart}</p>
            <h4>Outcome</h4>
            <p>{study.outcome}</p>
            <dl className={styles.context}>
              {study.context.map((f) => (
                <div key={f.term}>
                  <dt>{f.term}</dt>
                  <dd>{f.detail}</dd>
                </div>
              ))}
              {study.stack && (
                <div>
                  <dt>Built with</dt>
                  <dd>{study.stack}</dd>
                </div>
              )}
            </dl>
            {(study.links.length > 0 || study.privateNote) && (
              <p className={styles.links}>
                {study.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ))}
                {study.privateNote && <span>{study.privateNote}</span>}
              </p>
            )}
          </div>
        </div>
      </details>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <h2 id="work-title" className="section-title">
          The work
        </h2>
        <p className="section-intro">
          Five projects, each with its own colour. Open one for the full decision record.
        </p>
        {caseStudies.map((study) => (
          <Project key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
}
