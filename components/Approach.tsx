import { principles } from "@/content/site";
import { Chevron } from "./Chevron";
import styles from "./Approach.module.css";

export function Approach() {
  return (
    <section id="approach" className="section" aria-labelledby="approach-title">
      <div className="wrap">
        <h2 id="approach-title" className="section-title">
          How I work
        </h2>
        <p className="section-intro">
          Same steps every time, whether it&apos;s a 24-hour hackathon or a company&apos;s books.
        </p>
        <div className={styles.layout}>
          <ol className={styles.list}>
            {principles.map((p, i) => (
              <li key={p.title}>
                <details className={styles.item} open={i === 0}>
                  <summary className={styles.row}>
                    <span className={styles.step} aria-hidden="true">
                      {i + 1}
                    </span>
                    <h3 className={styles.title}>{p.title}</h3>
                    <Chevron />
                  </summary>
                  <div className={styles.text}>
                    <p className={styles.body}>{p.body}</p>
                    <p className={styles.seen}>
                      Seen in{" "}
                      {p.seenIn.map((link, j) => (
                        <span key={link.label}>
                          <a href={link.href}>{link.label}</a>
                          {j < p.seenIn.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  </div>
                </details>
              </li>
            ))}
          </ol>
          <figure className={styles.photo}>
            <img
              src="/images/me/presenting.webp"
              alt="Khant presenting to a room at CMKL with a microphone, mid-explanation"
              width={1200}
              height={800}
              loading="lazy"
            />
            <figcaption>Step four in progress: explaining the plan so the room can run with it.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
