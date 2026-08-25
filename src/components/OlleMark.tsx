interface OlleMarkProps {
  className?: string;
}

// A small abstract waypoint mark (two linked boxes on a trail line) in the
// spirit of the Jeju Olle trail-marker signposts — not a reproduction of
// the official Jeju Olle organization logo.
export default function OlleMark({ className }: OlleMarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="3" />
      <path d="M12.5 20 V29 H33" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="28" y="29" width="15" height="14" rx="3" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
