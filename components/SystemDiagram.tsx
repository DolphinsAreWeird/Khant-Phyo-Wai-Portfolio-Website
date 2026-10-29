import styles from "./SystemDiagram.module.css";

// Khant drawn as a system: a messy problem comes in at the top, business sits
// on one side, engineering on the other, the team underneath, and Khant is
// the interface in the middle. Two hand-placed layouts: a wide one for
// desktop and a tall one for phones.

type Box = { x: number; y: number; w: number; h: number };
type Cluster = Box & { title: string; nodes: (Box & { label: string })[] };
type Edge = {
  d: string;
  label: string[];
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
  oneWay?: boolean;
};
type Note = { text: string; x: number; y: number; anchor: "start" | "middle" | "end"; arrow: string };
type Layout = {
  viewBox: string;
  problem: Box;
  clusters: Cluster[];
  core: Box;
  edges: Edge[];
  notes: Note[];
};

const nodeH = 38;

function column(x: number, y: number, w: number, labels: string[], gap = 10, h = nodeH) {
  return labels.map((label, i) => ({ label, x, y: y + i * (h + gap), w, h }));
}

const business = ["Financial models", "Unit economics", "Business models", "Market research"];
const engineering = ["System architecture", "Multi-agent AI", "Voice and vision", "Forecasting"];
const people = ["Leading teams", "User research", "Teaching"];

const wide: Layout = {
  viewBox: "0 -64 760 612",
  problem: { x: 290, y: -40, w: 180, h: 44 },
  clusters: [
    { title: "Business", x: 2, y: 30, w: 196, h: 254, nodes: column(18, 78, 164, business) },
    { title: "Engineering", x: 562, y: 30, w: 196, h: 254, nodes: column(578, 78, 164, engineering) },
    {
      title: "People",
      x: 176,
      y: 408,
      w: 408,
      h: 136,
      nodes: people.map((label, i) => ({ label, x: 192 + i * 128, y: 456, w: 120, h: nodeH })),
    },
  ],
  core: { x: 290, y: 116, w: 180, h: 96 },
  edges: [
    { d: "M380 4 V116", label: ["find the real one"], lx: 392, ly: 66, anchor: "start", oneWay: true },
    { d: "M198 164 H290", label: ["projections,", "pricing, risk"], lx: 244, ly: 128, anchor: "middle" },
    { d: "M562 164 H470", label: ["architecture,", "trade-offs"], lx: 516, ly: 128, anchor: "middle" },
    { d: "M380 212 V408", label: ["a plan people", "can follow"], lx: 394, ly: 300, anchor: "start" },
  ],
  notes: [
    { text: "me. the box in the middle.", x: 272, y: -30, anchor: "end", arrow: "M250 -16c-6 46 8 96 36 124" },
    { text: "my favourite part.", x: 520, y: -10, anchor: "start", arrow: "M514 -18c-12-4-24-4-36 0" },
  ],
};

const tall: Layout = {
  viewBox: "0 -84 360 644",
  problem: { x: 95, y: -80, w: 170, h: 40 },
  clusters: [
    { title: "Business", x: 1, y: 1, w: 171, h: 236, nodes: column(12, 46, 149, business, 8, 36) },
    { title: "Engineering", x: 188, y: 1, w: 171, h: 236, nodes: column(199, 46, 149, engineering, 8, 36) },
    {
      title: "People",
      x: 6,
      y: 446,
      w: 348,
      h: 108,
      nodes: people.map((label, i) => ({ label, x: 18 + i * 110, y: 492, w: 104, h: 36 })),
    },
  ],
  core: { x: 95, y: 302, w: 170, h: 80 },
  edges: [
    { d: "M180 -40 V302", label: [], lx: 0, ly: 0, anchor: "start", oneWay: true },
    { d: "M60 237 V342 H95", label: [], lx: 0, ly: 0, anchor: "start" },
    { d: "M300 237 V342 H265", label: [], lx: 0, ly: 0, anchor: "end" },
    { d: "M180 382 V446", label: ["a plan people can follow"], lx: 190, ly: 418, anchor: "start" },
  ],
  notes: [
    { text: "my favourite part.", x: 356, y: -12, anchor: "end", arrow: "M300 -26c-6-6-14-10-24-12" },
    { text: "me, in the middle.", x: 2, y: 420, anchor: "start", arrow: "M90 404c8-4 14-10 20-18" },
  ],
};

function Diagram({ layout, id, className }: { layout: Layout; id: string; className: string }) {
  const { core, problem } = layout;
  const cx = core.x + core.w / 2;
  const cy = core.y + core.h / 2;
  const isWide = id === "wide";

  return (
    <svg
      viewBox={layout.viewBox}
      className={`${styles.svg} ${className}`}
      role="img"
      aria-labelledby={`sd-title-${id} sd-desc-${id}`}
    >
      <title id={`sd-title-${id}`}>Khant Phyo Wai as a system diagram</title>
      <desc id={`sd-desc-${id}`}>
        A messy problem flows into Khant, who sits in the middle as the interface. On one side is
        business: financial models, unit economics, business models and market research. On the
        other is engineering: system architecture, multi-agent AI, voice and vision, and
        forecasting. Underneath are people: leading teams, user research and teaching.
      </desc>
      <defs>
        <marker
          id={`arrow-${id}`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" className={styles.arrowHead} />
        </marker>
      </defs>

      <g className={styles.problem}>
        <rect x={problem.x} y={problem.y} width={problem.w} height={problem.h} />
        <text
          x={problem.x + problem.w / 2}
          y={problem.y + problem.h / 2}
          textAnchor="middle"
          dominantBaseline="central"
        >
          A messy problem
        </text>
      </g>

      {layout.clusters.map((cluster, ci) => (
        <g key={cluster.title} className={styles.cluster} style={{ "--i": ci } as React.CSSProperties}>
          <rect x={cluster.x} y={cluster.y} width={cluster.w} height={cluster.h} className={styles.frame} />
          <text x={cluster.x + 14} y={cluster.y + (isWide ? 30 : 28)} className={styles.clusterTitle}>
            {cluster.title}
          </text>
          {cluster.nodes.map((node) => (
            <g key={node.label} className={styles.node}>
              <rect x={node.x} y={node.y} width={node.w} height={node.h} />
              <text
                x={node.x + node.w / 2}
                y={node.y + node.h / 2}
                textAnchor="middle"
                dominantBaseline="central"
                className={isWide ? undefined : styles.small}
              >
                {node.label}
              </text>
            </g>
          ))}
        </g>
      ))}

      {layout.edges.map((edge, ei) => (
        <g key={edge.d} className={styles.edgeGroup} style={{ "--i": ei } as React.CSSProperties}>
          <path
            d={edge.d}
            pathLength={1}
            className={styles.edge}
            markerStart={edge.oneWay ? undefined : `url(#arrow-${id})`}
            markerEnd={`url(#arrow-${id})`}
          />
          {edge.label.length > 0 && (
            <text x={edge.lx} y={edge.ly} textAnchor={edge.anchor} className={styles.edgeLabel}>
              {edge.label.map((line, li) => (
                <tspan key={line} x={edge.lx} dy={li === 0 ? 0 : 16}>
                  {line}
                </tspan>
              ))}
            </text>
          )}
        </g>
      ))}

      <g className={styles.core}>
        <rect x={core.x} y={core.y} width={core.w} height={core.h} />
        <text x={cx} y={cy - 9} textAnchor="middle" className={styles.coreName}>
          Khant Phyo Wai
        </text>
        <text x={cx} y={cy + 17} textAnchor="middle" className={styles.coreRole}>
          the interface
        </text>
      </g>

      {layout.notes.map((note, ni) => (
        <g
          key={note.text}
          className={`${styles.note} annotation`}
          style={{ "--i": ni } as React.CSSProperties}
          aria-hidden="true"
        >
          <text x={note.x} y={note.y} textAnchor={note.anchor}>
            {note.text}
          </text>
          <path d={note.arrow} pathLength={1} className={styles.noteArrow} />
        </g>
      ))}
    </svg>
  );
}

export function SystemDiagram() {
  return (
    <>
      <Diagram layout={wide} id="wide" className={styles.wide} />
      <Diagram layout={tall} id="tall" className={styles.tall} />
    </>
  );
}
