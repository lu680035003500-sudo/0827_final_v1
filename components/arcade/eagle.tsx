export function Eagle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 100" className={className} aria-hidden="true">
      <path
        d="M68 50 L4 20 Q0 30 10 34 L2 40 Q0 48 12 48 L4 56 Q4 64 16 60 L30 64 Q50 66 68 56 Z"
        fill="#5b3a24"
        stroke="#3d2717"
        strokeWidth="1"
      />
      <path
        d="M72 50 L136 20 Q140 30 130 34 L138 40 Q140 48 128 48 L136 56 Q136 64 124 60 L110 64 Q90 66 72 56 Z"
        fill="#5b3a24"
        stroke="#3d2717"
        strokeWidth="1"
      />

      <path d="M62 70 L70 92 L78 70 Z" fill="#f5f5f0" stroke="#c9c9c0" strokeWidth="1" />

      <ellipse cx="70" cy="55" rx="14" ry="20" fill="#5b3a24" stroke="#3d2717" strokeWidth="1" />

      <circle cx="70" cy="30" r="13" fill="#f5f5f0" stroke="#d8d8cd" strokeWidth="1" />
      <path d="M70 34 L82 38 L70 42 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
      <circle cx="65" cy="27" r="2" fill="#1c1917" />
    </svg>
  );
}
