import { facts } from "@/content/site";
import { SideNote } from "./SideNote";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <h2 id="about-title" className="section-title">
          The short version
        </h2>
        <div className={`with-notes ${styles.body}`}>
          <p>
            <SideNote>
              If you&apos;ve been in a meeting with me, you&apos;ve heard &quot;okay, but who pays for
              it?&quot;
            </SideNote>
            I&apos;m Khant, though most people call me KP. I grew up in Yangon, taught English online
            for two years and moved to Bangkok in 2023 to study AI and computer engineering at CMKL
            University. A class project of ours became Sonar AI, where I&apos;m now a co-founder and
            the CFO.
          </p>
          <p>
            I love the start of a project, when the problem is still a mess. I&apos;m good at finding
            the real problem in there and working out the system and the money behind a fix. Then I
            make sure it ships.
          </p>
          <p className={styles.goal}>
            <SideNote>Said in public so you can hold me to it.</SideNote>
            The goal: be a multi-millionaire before I turn 35. I work day and night to get there,
            which explains the list above.
          </p>
          <figure className={styles.portrait}>
            <img
              src="/images/me/portrait-museum.webp"
              alt="Khant smiling in a white spiral gallery, wearing a corduroy shirt"
              width={820}
              height={1092}
              loading="lazy"
            />
            <figcaption>Fig. 1. The interface, in person.</figcaption>
          </figure>
          <dl className={styles.facts}>
            {facts.map((fact) => (
              <div key={fact.term} className={styles.fact}>
                <dt>{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
