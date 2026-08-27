export function JumpingBear() {
  return (
    <svg viewBox="0 0 60 60" className="h-16 w-16 animate-bear-jump" aria-hidden="true">
      <circle cx="14" cy="14" r="9" fill="#a97155" />
      <circle cx="46" cy="14" r="9" fill="#a97155" />

      <circle cx="30" cy="32" r="22" fill="#c98a5e" />

      <ellipse cx="30" cy="38" rx="10" ry="7" fill="#f3e0c9" />
      <circle cx="30" cy="36" r="2" fill="#3f2a1a" />
      <path
        d="M24 40 Q30 47 36 40"
        stroke="#3f2a1a"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M20 27 Q23 23 26 27"
        stroke="#2b1c10"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M34 27 Q37 23 40 27"
        stroke="#2b1c10"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
