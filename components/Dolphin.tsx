// Khant's mark: a dolphin, after his GitHub handle DolphinsAreWeird.
// The same drawing is the favicon (app/icon.svg).

const body =
  "M58.5 26.5C55.5 25 54 21 49.5 19 44 16.5 38 16 35 16.8L27.5 9.5l1.1 10.1C21.5 24 16.5 31 15 39l-8 2.5 5.6 3.5 5.9 5.5 2-8C22 34.5 29 28.5 38 27.4c5-.6 9 .4 12.5 1 3 .5 6-.2 8-1.9z";

export function DolphinMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="var(--mark-bg, #18202e)" />
      <path
        d="M4 53c7-5 13-5 20 0s13 5 20 0 11-4 16-1.5"
        fill="none"
        stroke="#5c7bff"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <g className="dolphin-body">
        <path d={body} fill="#f4f6f3" stroke="#f4f6f3" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="48.6" cy="22.6" r="1.7" fill="var(--mark-bg, #18202e)" />
      </g>
    </svg>
  );
}

export function DolphinShape({ className }: { className?: string }) {
  return (
    <svg viewBox="4 6 58 48" className={className} aria-hidden="true">
      <path d={body} fill="currentColor" />
      <circle cx="48.6" cy="22.6" r="1.7" fill="var(--paper)" />
    </svg>
  );
}
