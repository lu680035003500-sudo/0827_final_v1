export function BearFromBehind({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden="true">
      <rect x="28" y="120" width="16" height="26" rx="7" fill="#8b5e3c" />
      <rect x="56" y="120" width="16" height="26" rx="7" fill="#8b5e3c" />

      <path
        d="M20 60 Q20 40 50 40 Q80 40 80 60 L80 115 Q80 130 50 130 Q20 130 20 115 Z"
        fill="#a97155"
      />
      <path
        d="M50 45 L50 125"
        stroke="#8b5e3c"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.4"
      />

      <circle cx="50" cy="24" r="20" fill="#a97155" />
      <circle cx="34" cy="10" r="8" fill="#a97155" />
      <circle cx="66" cy="10" r="8" fill="#a97155" />
      <circle cx="34" cy="10" r="4" fill="#8b5e3c" />
      <circle cx="66" cy="10" r="4" fill="#8b5e3c" />

      <path
        d="M76 62 Q100 55 108 40"
        stroke="#a97155"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="108" cy="40" r="8" fill="#a97155" />

      <path
        d="M72 85 Q98 88 110 78"
        stroke="#8b5e3c"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="110" cy="78" r="8" fill="#8b5e3c" />
    </svg>
  );
}
