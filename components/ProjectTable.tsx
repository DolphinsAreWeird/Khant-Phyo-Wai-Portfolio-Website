"use client";

import { useState } from "react";
import { allProjects } from "@/content/site";
import styles from "./MoreWork.module.css";

// The full list of smaller projects, with a search box like the one on
// Khant's knowledge-base journey page.
export function ProjectTable() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const rows = q
    ? allProjects.filter((p) => `${p.name} ${p.what} ${p.part} ${p.year}`.toLowerCase().includes(q))
    : allProjects;

  return (
    <div className={styles.tableWrap}>
      <input
        type="search"
        className={styles.search}
        placeholder="Search projects, for example: voice, finance, 2025"
        aria-label="Search projects"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Project</th>
            <th scope="col">What it is</th>
            <th scope="col">My part</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.name}>
              <td>{p.year}</td>
              <th scope="row">
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer">
                    {p.name}
                  </a>
                ) : (
                  p.name
                )}
              </th>
              <td>{p.what}</td>
              <td>{p.part}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className={styles.empty}>Nothing matches &quot;{query}&quot;. Try a shorter word.</p>}
    </div>
  );
}
