import { running } from "@/content/site";
import { SideNote } from "./SideNote";
import styles from "./CurrentlyRunning.module.css";

// Everything Khant is carrying this semester, laid out like a process list.
export function CurrentlyRunning() {
  return (
    <section id="now" className={`section ${styles.section}`} aria-labelledby="now-title">
      <div className="wrap">
        <h2 id="now-title" className="section-title">
          Currently running
        </h2>
        <div className="with-notes">
          <p className="section-intro">
            <SideNote>Nothing has crashed yet. Sleep is running in low-power mode.</SideNote>
            This is my semester, all at the same time. Six things are running and every one of them
            is on track.
          </p>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Process</th>
              <th scope="col">Status</th>
              <th scope="col">What it is</th>
            </tr>
          </thead>
          <tbody>
            {running.map((p) => (
              <tr key={p.name} className={p.status === "Done" ? styles.done : undefined}>
                <th scope="row">{p.name}</th>
                <td>
                  <span className={styles.status}>
                    <span className={styles.dot} aria-hidden="true" />
                    {p.status}
                  </span>
                </td>
                <td>{p.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
