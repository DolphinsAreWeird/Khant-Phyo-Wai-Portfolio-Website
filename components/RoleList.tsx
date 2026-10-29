"use client";

import { useState } from "react";
import { openTo } from "@/content/site";
import styles from "./Contact.module.css";

const shown = 5;

// The first few job titles, a button for the rest, then "or anything."
export function RoleList() {
  const [all, setAll] = useState(false);
  const roles = all ? openTo : openTo.slice(0, shown);

  return (
    <ul className={styles.roles} id="role-list">
      {roles.map((role, i) => (
        <li key={role} className={i >= shown ? styles.newRole : undefined} style={{ "--i": i - shown } as React.CSSProperties}>
          {role}
        </li>
      ))}
      {!all && (
        <li>
          <button type="button" className={styles.moreRoles} aria-controls="role-list" aria-expanded={all} onClick={() => setAll(true)}>
            +{openTo.length - shown} more
          </button>
        </li>
      )}
      <li className={styles.anything}>or anything.</li>
    </ul>
  );
}
