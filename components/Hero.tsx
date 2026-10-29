import { profile } from "@/content/site";
import { SystemDiagram } from "./SystemDiagram";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <div className="wrap">
        <h1 id="hero-name" className={styles.name}>
          <span>Khant</span> <span>Phyo Wai</span>
        </h1>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.lede}>
              I find the problem worth solving and work out the tech and the money behind the fix.
              Then I get a team to build it.
            </p>
            <p className={styles.sub}>
              Co-founder and CFO at Sonar AI. Final-year AI and computer engineering student at CMKL.
              Open to forward deployed engineer and system architect jobs from 2027, and{" "}
              <a href="#contact">plenty more</a>.
            </p>
            <div className={styles.actions}>
              <a className="button button-solid" href="#work">
                See the work
              </a>
              <a className="button" href={`mailto:${profile.email}`}>
                Email me
              </a>
            </div>
          </div>
          <figure className={styles.diagram}>
            <SystemDiagram />
          </figure>
        </div>
      </div>
    </section>
  );
}
