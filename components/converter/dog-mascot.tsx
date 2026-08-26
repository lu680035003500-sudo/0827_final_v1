export function DogMascot() {
  return (
    <svg
      viewBox="0 0 64 48"
      className="h-10 w-14 shrink-0 animate-dog-walk"
      aria-hidden="true"
    >
      <ellipse cx="30" cy="36" rx="22" ry="9" fill="#e8dcc8" />
      <rect x="14" y="34" width="4" height="10" rx="2" fill="#e8dcc8" />
      <rect x="42" y="34" width="4" height="10" rx="2" fill="#e8dcc8" />
      <ellipse cx="47" cy="18" rx="12" ry="11" fill="#f5efe0" />
      <ellipse cx="55" cy="12" rx="5" ry="7" fill="#8a5a34" transform="rotate(25 55 12)" />
      <circle cx="51" cy="16" r="1.6" fill="#2b2b2b" />
      <ellipse cx="58" cy="19" rx="2.4" ry="1.8" fill="#2b2b2b" />
      <path d="M8 30 Q0 22 6 16" stroke="#e8dcc8" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
