import { profile } from "@/content/site";
import { CopyEmail } from "./CopyEmail";
import { RoleList } from "./RoleList";
import { SideNote } from "./SideNote";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={`section ${styles.contact}`} aria-labelledby="contact-title">
      <div className="wrap">
        <h2 id="contact-title" className="section-title">
          Now accepting requests
        </h2>
        <div className="with-notes">
          <p className={styles.pitch}>
            <SideNote>Rate limit: none.</SideNote>
            I graduate in May 2027. Titles I&apos;d answer to:
          </p>
        </div>
        <RoleList />
        <p className={styles.solution}>
          If it has a problem and you want AI to fix it, I can be part of the solution.
        </p>
        <div className={styles.reach}>
          <div>
            <p className={styles.email}>
              <a id="contact-email" href={`mailto:${profile.email}`}>
                {/* Break before the @ on narrow screens rather than mid-word. */}
                {profile.email.split("@")[0]}
                <wbr />@{profile.email.split("@")[1]}
              </a>
            </p>
            <div className={styles.actions}>
              <a className="button button-solid" href={`mailto:${profile.email}`}>
                Email me
              </a>
              <CopyEmail email={profile.email} />
            </div>
            <ul className={styles.elsewhere} aria-label="Elsewhere">
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href={profile.links.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <figure className={styles.photo}>
            <img
              src="/images/me/aice-gallery.webp"
              alt="Khant in a CMKL AI and Computer Engineering t-shirt and white trousers, backpack on, smiling in a gallery aisle"
              width={720}
              height={959}
              loading="lazy"
            />
            <figcaption>Bag packed, ready when you are.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
