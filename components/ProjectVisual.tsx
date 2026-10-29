import type { CaseStudy } from "@/content/site";
import styles from "./ProjectVisual.module.css";

// One picture per project. Sonar, RoomWitness and Argus use real images from
// the projects; Cadence and Seamless are sample screens with made-up data.

function Phone({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`${styles.phone} ${className ?? ""}`}>
      <img src={src} alt={alt} width={420} height={911} loading="lazy" />
    </div>
  );
}

function Sonar() {
  return (
    <div className={`${styles.panel} ${styles.sonar}`}>
      <Phone src="/images/projects/sonar-home.webp" alt="Sonar app home screen with Thai audiobooks" className={styles.phoneLeft} />
      <Phone src="/images/projects/sonar-play.webp" alt="Sonar app player screen" className={styles.phoneRight} />
      <figure className={styles.polaroid}>
        <img src="/images/me/sonar-booth.webp" alt="Khant at a university event next to an early Sonar poster" width={271} height={509} loading="lazy" />
      </figure>
    </div>
  );
}

function RoomWitness() {
  return (
    <div className={`${styles.panel} ${styles.rw}`}>
      <div className={styles.browser}>
        <div className={styles.browserBar} aria-hidden="true">
          <i />
          <i />
          <i />
          <span>roomwitness</span>
        </div>
        <img
          src="/images/projects/roomwitness-desktop.webp"
          alt="RoomWitness verdict screen: a sample deposit case with each deduction marked lawful or not"
          width={1280}
          height={750}
          loading="lazy"
        />
      </div>
      <Phone src="/images/projects/roomwitness-mobile.webp" alt="RoomWitness landlord view on a phone" className={styles.rwPhone} />
    </div>
  );
}

function Argus() {
  return (
    <div className={`${styles.panel} ${styles.argus}`}>
      <img
        src="/images/projects/argus-concept.webp"
        alt="Concept CCTV frame: an unattended bag circled and linked to the man who left it"
        width={1400}
        height={780}
        loading="lazy"
      />
      <span className={styles.rec} aria-hidden="true">
        <i /> REC
      </span>
    </div>
  );
}

const budget = [
  { name: "Engineering", used: 62, left: "฿41,200" },
  { name: "Content", used: 81, left: "฿12,900" },
  { name: "Marketing", used: 47, left: "฿58,000" },
  { name: "Operations", used: 93, left: "฿3,100" },
];

function Cadence() {
  return (
    <div className={`${styles.panel} ${styles.cadence}`} role="img" aria-label="Sample Cadence screen: department budgets with what's left this month">
      <div className={styles.app} aria-hidden="true">
        <div className={styles.appBar}>
          <b>Cadence</b>
          <span className={styles.tabOn}>Budget</span>
          <span>Ledger</span>
          <span>People</span>
          <span>Payroll</span>
          <span>Documents</span>
        </div>
        <div className={styles.appBody}>
          <div className={styles.appTitle}>
            November budget <em>Sample data</em>
          </div>
          {budget.map((b, i) => (
            <div key={b.name} className={styles.row} style={{ "--w": `${b.used}%`, "--n": i } as React.CSSProperties}>
              <span>{b.name}</span>
              <span className={styles.bar}>
                <span className={b.used > 90 ? styles.fillWarn : styles.fill} />
              </span>
              <span className={styles.left}>{b.left} left</span>
            </div>
          ))}
          <div className={styles.toast}>
            <span className={styles.tick} /> Voucher PV-2611-014 made from ledger row 214
          </div>
          <div className={styles.ledger}>
            <span>Cloud hosting</span>
            <span>Engineering</span>
            <span>฿4,820</span>
            <span>Social ads</span>
            <span>Marketing</span>
            <span>฿7,500</span>
            <span>Office supplies</span>
            <span>Operations</span>
            <span>฿1,260</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Seamless() {
  return (
    <div className={`${styles.panel} ${styles.seamless}`} role="img" aria-label="Sample Seamless cart screen: basket, an aisle promotion and a recipe suggestion">
      <div className={styles.cart} aria-hidden="true">
        <div className={styles.screen}>
          <div className={styles.cartBar}>
            <b>Seamless</b>
            <span>Aisle 7</span>
          </div>
          <div className={styles.promo}>In this aisle: coffee, 2 for ฿99</div>
          <ul className={styles.basket}>
            <li>
              Jasmine rice, 5 kg <span>฿185</span>
            </li>
            <li>
              Fish sauce <span>฿39</span>
            </li>
            <li>
              Eggs, 10 <span>฿52</span>
            </li>
          </ul>
          <div className={styles.suggest}>
            Green curry tonight?
            <span className={styles.add}>+ Coconut milk ฿28</span>
          </div>
          <div className={styles.pay}>
            <span>Total ฿276</span>
            <span className={styles.payBtn}>Pay at the cart</span>
          </div>
        </div>
        <div className={styles.handle} />
        <div className={styles.wire} />
        <div className={styles.wheels}>
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

export function ProjectVisual({ id }: { id: CaseStudy["id"] }) {
  switch (id) {
    case "sonar":
      return <Sonar />;
    case "roomwitness":
      return <RoomWitness />;
    case "argus":
      return <Argus />;
    case "cadence":
      return <Cadence />;
    case "seamless":
      return <Seamless />;
  }
}
