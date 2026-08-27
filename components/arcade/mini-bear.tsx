export function MiniBear({ delay = "0s" }: { delay?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-6 w-6 animate-bear-bob"
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="6" fill="#a97155" />
      <circle cx="31" cy="9" r="6" fill="#a97155" />
      <circle cx="20" cy="21" r="15" fill="#c98a5e" />
      <circle cx="16" cy="20" r="2" fill="#2b1c10" />
      <circle cx="24" cy="20" r="2" fill="#2b1c10" />
      <ellipse cx="20" cy="26" rx="5" ry="3.5" fill="#f3e0c9" />
      <circle cx="20" cy="25" r="1.3" fill="#3f2a1a" />
    </svg>
  );
}
