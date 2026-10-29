// A handwritten side comment in red marker. Rendered as a <span> so it can sit
// inside a paragraph; CSS floats it into the margin on wide screens.
export function SideNote({ children }: { children: React.ReactNode }) {
  return (
    <span className="sidenote" role="note">
      <svg className="sidenote-arrow" viewBox="0 0 30 18" aria-hidden="true">
        <path
          d="M28 5c-7-3-16-2-24 9M4 14l1-7M4 14l7-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </span>
  );
}
