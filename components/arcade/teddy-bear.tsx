export function TeddyBear({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <ellipse cx="30" cy="128" rx="16" ry="9" fill="#f0f0f0" stroke="#d4d4d4" strokeWidth="1" />
      <ellipse cx="66" cy="128" rx="16" ry="9" fill="#f0f0f0" stroke="#d4d4d4" strokeWidth="1" />
      <ellipse cx="30" cy="129" rx="7" ry="4" fill="#fafafa" />
      <ellipse cx="66" cy="129" rx="7" ry="4" fill="#fafafa" />

      <path
        d="M14 60 Q14 42 48 42 Q82 42 82 60 L82 112 Q82 126 48 126 Q14 126 14 112 Z"
        fill="#f0f0f0"
        stroke="#d4d4d4"
        strokeWidth="1"
      />
      <ellipse cx="48" cy="90" rx="18" ry="24" fill="#fafafa" />

      <circle cx="48" cy="26" r="19" fill="#f0f0f0" stroke="#d4d4d4" strokeWidth="1" />
      <circle cx="33" cy="12" r="7" fill="#f0f0f0" stroke="#d4d4d4" strokeWidth="1" />
      <circle cx="63" cy="12" r="7" fill="#f0f0f0" stroke="#d4d4d4" strokeWidth="1" />
      <circle cx="33" cy="12" r="3" fill="#e8b4c8" />
      <circle cx="63" cy="12" r="3" fill="#e8b4c8" />

      <ellipse cx="48" cy="32" rx="9" ry="7" fill="#fafafa" />
      <circle cx="41" cy="23" r="2.2" fill="#2b2b2b" />
      <circle cx="55" cy="23" r="2.2" fill="#2b2b2b" />
      <ellipse cx="48" cy="29" rx="3" ry="2.2" fill="#2b2b2b" />
      <path
        d="M48 31 L48 34 M43 37 Q48 40 53 37"
        stroke="#2b2b2b"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M78 78 Q100 78 108 68"
        stroke="#f0f0f0"
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="108" cy="68" r="7.5" fill="#f0f0f0" stroke="#d4d4d4" strokeWidth="1" />

      <path
        d="M76 95 Q98 98 108 92"
        stroke="#f0f0f0"
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="108" cy="92" r="7.5" fill="#f0f0f0" stroke="#d4d4d4" strokeWidth="1" />
    </svg>
  );
}
